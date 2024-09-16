<template>
  <div class="centered-container-create">
    <div class="centered-content-create">
      <h1>Create Review</h1>
      <div class="line-thick"></div>

      <form @submit.prevent="submitPost">
        <div class="form-group" style = "margin-bottom: 70px;">
          <label for="image">Add image:  </label>
          <input type="file" id="image" @change="onImageChange">
        </div>
        <div class="form-group" style = "margin-bottom: 70px;">
          <label for="description">Description:</label>
          <textarea v-model="description" id="description" placeholder="Description"></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import apiClient from '../axios';

export default {
  data() {
    return {
      description: '',
      image: null,
      errorMessage: ''
    };
  },

  methods: {
    onImageChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.image = reader.result;
      };
      reader.readAsDataURL(file);
    },

    async submitPost() {
      try {
        const postType = this.$route.path.includes('review') ? 'review' : 'request';


        const token = localStorage.getItem('token');


        const response = await apiClient.post(
          '/posts/create',
          {
            description: this.description,
            image: this.image,
            type: postType,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        this.$router.push('/');
      } catch (error) {
        console.error('Error creating post:', error);
        this.errorMessage = error.response?.data?.message || 'Failed to create post';
      }
    }
  }
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
  height: 30vw;
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


h1 {
  font-size: 36px;
  font-weight: bold;
  margin-top: 70px;
}


.line-thick {
  width: 70%;
  height: 3px;
  background-color: #263646;
  margin-bottom: 70px;
}




.image-placeholder {
  width: 300px;
  height: 200px;
  border: 2px dashed #263646;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  background-color: #ffffff;
}

.image-placeholder p {
  color: #263646;
  font-size: 20px;
}



.description-container {
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
  margin-top: 20px;
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
