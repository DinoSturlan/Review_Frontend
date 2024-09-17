<template>
  <div class="centered-container-create">
    <div class="centered-content-create">
      <h1>Create Review</h1>
      <div class="line-thick"></div>

      <form @submit.prevent="submitPost">
        <div class="form-group" style = "margin-bottom: 70px;">
          <label for="image">Add image (optional):  </label>
          <input type="file" id="image" @change="onImageChange">
        </div>
        <div class="form-group" style = "margin-bottom: 70px;">
          <label for="description">Description:</label>
          <textarea v-model="description" id="description" placeholder="Description"></textarea>
        </div>

        <div class="form-group" style="margin-bottom: 70px;">
           <label for="category">Category:</label>
           <select v-model="category" id="category" required>
           <option value="Electronics">Electronics</option>
           <option value="Software">Software</option>
           <option value="Clothes">Clothes</option>
           <option value="Health/Beauty">Health/Beauty</option>
           <option value="Home">Home</option>
           <option value="Food/Beverage">Food/Beverage</option>
           <option value="Travel">Travel</option>
           <option value="Auto/Moto">Auto/Moto</option>
           <option value="Education">Education</option>
           <option value="Art">Art</option>
           <option value="Garden">Garden</option>
           <option value="Sports">Sports</option>
           <option value="Media">Media</option>
           <option value="Kids">Kids</option>
           <option value="Pets">Pets</option>
           <option value="Office">Office</option>
           <option value="Gifts">Gifts</option>
           <option value="Services">Services</option>
           <option value="Other">Other</option>
           </select>
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
      errorMessage: '',
      category: ''
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
            category: this.category,
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
  min-height: 100vh;
}


.centered-content-create {
  width: 60vw;
  min-height: auto;
  padding: 20px;
  border-radius: 10px;
  color: #2c3e50;
  background-color: #c2d8fa;
  text-align: center;
  display: flex;
  flex-direction: column;
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

.form-group {
  width: 100%;
  max-width: 500px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.form-group label {
  font-size: 18px;
  margin-bottom: 10px;
}

textarea {
  width: 120%;
  height: 150px;
  border: 1px solid #263646;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  color: #2c3e50;
  resize: none;
}

select {
  width: 50%;
}

button {
  background-color: #8298e4;
  color: white;
  padding: 10px 20px;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  margin-bottom: 40px;
}

button:hover {
  background-color: #c2d8fa;
}

</style>
