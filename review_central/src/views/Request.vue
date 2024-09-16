<template>
  <div class="centered-container-create">
    <div class="centered-content-create">
      <div>
        <div class="about-container">

          <div class="image-placeholder">
            <img :src="post.image" alt="Post Image" />
          </div>

          <div class="info">
            <p>{{ post.username }}</p>
            <p>{{ new Date(post.date).toLocaleDateString() }}</p>
          </div>

          <div class="description-container">
            <label for="description" class="description-label">Description: </label>
            <div class="post-description">{{ post.description }}</div>
          </div>

          <div v-if="isPostOwner">
            <button @click="deletePost" class="delete-button">Delete Post</button>
          </div>

          <div class="line-long"></div>

          <div class="comment-container">
            <h2>Comments:</h2>
            <div class="comment_line"></div>

            <div v-for="comment in post.comments" :key="comment._id" class="comment">
              <p style = "font-size: 12px">User: {{ comment.username }} - {{ new Date(comment.date).toLocaleDateString() }}</p>
              <p style = "font-weight: bold;">- {{ comment.comment }}</p>

              <div class="like-section">
                <button @click="likeComment(comment)" class="like-button" v-if="isLoggedIn && !hasLiked(comment)">Like</button>
                <span style="padding: 10px; color: red;"> Likes: {{ comment.likes }}</span>
              </div>

              <div class="line-thin"></div>
            </div>

            <div v-if="isLoggedIn">
              <textarea v-model="newComment" placeholder="Write a comment..." class="comment-textarea"></textarea>
              <button @click="submitComment" class="comment-button">Add Comment</button>
            </div>
            <p v-else>Please log in to add a comment.</p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>



<script>
import apiClient from '../axios';

export default {
  props: ['postId'],
  data() {
    return {
      post: {},
      newComment: '',
      currentUser: ''
    };
  },

  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('token');
    },

    isPostOwner() {
      return this.post.username === this.currentUser;
    },

    hasLiked(comment) {
      return (comment) => {

      return comment.likedBy && comment.likedBy.includes(this.currentUser);
    };
    }
  },


  async created() {
    try {

      const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          this.currentUser = decodedToken.username;
      }

      const response = await apiClient.get(`/posts/${this.$route.params.postId}`);
      this.post = response.data;
    } catch (error) {
      console.error('Error fetching post data', error);
    }
  },

    methods: {
    async submitComment() {
      if (this.newComment.trim() === '') {
        return;
      }

      try {

        const token = localStorage.getItem('token');
        await apiClient.post(`/posts/${this.$route.params.postId}/comment`, {
          comment: this.newComment,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.newComment = '';

        const response = await apiClient.get(`/posts/${this.$route.params.postId}`);
        this.post = response.data;

      } catch (error) {
        console.error('Error submitting comment:', error);
      }
    },


    async likeComment(comment) {
      try {

        const token = localStorage.getItem('token');
        if (!token) {
        throw new Error("User not authenticated.");
        }

        const postId = this.$route.params.postId;
        const commentId = comment._id;

        await apiClient.post(`/posts/${postId}/comment/${commentId}/like`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const response = await apiClient.get(`/posts/${postId}`);
        this.post = response.data;
      } catch (error) {
        console.error('Error liking comment:', error);
      }
    },

    async deletePost() {
      if (confirm('Are you sure you want to delete this post?')) {
        try {
          const token = localStorage.getItem('token');
          await apiClient.delete(`/posts/${this.$route.params.postId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          alert('Post deleted successfully');
          this.$router.push('/');
        } catch (error) {
          console.error('Error deleting post:', error);
          alert('Error deleting post');
        }
      }
    },
  },
};
</script>


<style scoped>

.centered-container-create {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}


.centered-content-create {
  width: 60vw;
  height: auto;
  min-height: 50vw;
  padding: 20px;
  border-radius: 10px;
  color: #2c3e50;
  background-color: #8298e4;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

}


.about-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
}


h2 {
  font-size: 20px;
  font-weight: bold;
  text-align: left;
}


.line-long {
  width: 50vw;
  height: 3px;
  background-color: #263646;
  margin-bottom: 20px;
}


.comment-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  text-align: left;
  width: 50vw;
  height: auto;
}

.comment-textarea {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  font-size: 16px;
}

.comment-button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #c2d8fa;
  border: none;
  color: black;
  cursor: pointer;
}


.image-placeholder {
  width: 500px;
  height: 400px;
  border: 2px #263646;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  background-color: #ffffff;
  overflow: hidden;
}

.image-placeholder img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.image-placeholder p {
  color: #263646;
  font-size: 20px;
}

.info {
  font-size: 12px;
  text-decoration: underline;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  text-align: left;
  width: 50vw;
  height: auto;
}

.description-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  text-align: left;
  width: 50vw;
  height: auto;
  margin-bottom: 30px;
}

.description-label {
  font-size: 18px;
  color: #263646;
  margin-bottom: 10px;
  display: block;
}



.description-textbox {
  width: 32vw;
  height: 100px;
  border: 1px solid #263646;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  color: #2c3e50;
}


.text-container {
  width: 80%;
  max-width: 800px;
  text-align: left;
  margin-top: 20px;
}

.text-container p {
  font-size: 18px;
  line-height: 1.6;
  color: #263646;
}

.line-thin {
  width: 20vw;
  height: 1px;
  background-color: black;
  margin: 10px auto;
}

.comment_line {
  width: 50vw;
  height: 1px;
  background-color: black;
  margin: 10px auto;
}

.delete-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 15px;
}

.delete-button:hover {
  background-color: #e60000;
}

.post-description {
  font-weight: bold;
  font-size: 16px;
  color: #263646;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-height: 1.5;
  word-wrap: break-word;
  white-space: normal;
}

.like-section {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.like-button {
  background-color: #c2d8fa;
  border: none;
  padding: 5px 10px;
  color: black;
  cursor: pointer;
  margin-left: 10px;
}

.like-button:hover {
  background-color: #8298e4;
}

</style>
