<template>
  <div class="vertical-lines">
    <div class="posts-container">
      <div
        v-for="post in posts"
        :key="post._id"
        :class="post.type === 'review' ? 'review-post' : 'request-post'"
        @click="navigateToPost(post)"
        class="post-item">
        <img :src="post.image" alt="Post Image" class="post-image" />

        <div class="post-description-container">
          <label for="description" class="description-label">User: {{ post.username }}, {{ new Date(post.date).toLocaleDateString() }}</label>
          <div class="post-description">{{ post.description }}</div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '../axios';

export default {
  data() {
    return {
      posts: [],
    };
  },
  methods: {

    async fetchPosts() {
      try {
        const response = await apiClient.get('/posts');
        this.posts = response.data;
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    },

    navigateToPost(post) {
      if (post.type === 'review') {
        this.$router.push({ name: 'review', params: { postId: post._id } });
      } else if (post.type === 'request') {
        this.$router.push({ name: 'request', params: { postId: post._id } });
      }
    },
  },
  created() {
    this.fetchPosts();
  },
};
</script>


<style scoped>

body, html {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}



.vertical-lines {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
}

.vertical-lines::before,
.vertical-lines::after {
  content: '';
  position: fixed;
  top: 0;
  width: 3px;
  background-color: #263646;
  height: 100vh;
}

.vertical-lines::before {
  left: 20%;
}

.vertical-lines::after {
  right: 20%;
}

.posts-container {
  padding: 20px;
  margin: 0 auto;
  max-width: 60vw;
  max-height: 200px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.post-item {
  display: flex;
  align-items: flex-start;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 20px;
  cursor: pointer;
}

.review-post {
  background-color: #c2d8fa;
}

.request-post {
  background-color: #8298e4;
}

.post-image {
  height: 150px;
  width: auto;
  margin-right: 20px;
  border-radius: 10px;
}

.post-description {
  font-size: 16px;
  color: #263646;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-height: 1.5;
  max-height: calc(1.5em * 3);
  word-wrap: break-word;
  white-space: normal;
}

.post-description-container {
  width: 100%;
  display: block;
  text-align: left;
}

.description-label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #263646;
  display: block;
}

</style>

