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
            <p>{{ post.description }}</p>
          </div>

          <div class="line-long"></div>

          <div class="comment-container">
            <h2>Comments:</h2>

            <div v-for="comment in post.comments" :key="comment._id" class="comment">
              <p>{{ comment.username }} - {{ new Date(comment.date).toLocaleDateString() }}</p>
              <p>{{ comment.text }}</p>
            </div>
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
    };
  },
  async created() {
    try {

      const response = await apiClient.get(`/posts/${this.$route.params.postId}`);
      this.post = response.data;
    } catch (error) {
      console.error('Error fetching post data', error);
    }
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
  background-color: #c2d8fa;
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





</style>
