<template>
  <div class="profile-container">
    <h1>User Profile</h1>

    <h2>{{ username }}</h2>

    <div class="line-thick"></div>

    <div class="profile-info">
      <div class="profile-item">
        <span class="label">Joined:</span>
        <span class="info">{{ date }}</span>
      </div>

      <div class="line-thin"></div>

      <div class="profile-item">
        <span class="label">Posts:</span>
        <span class="info">{{ posts }}</span>
      </div>
      <div class="line-thin"></div>

      <div class="profile-item">
        <span class="label">Comments:</span>
        <span class="info">{{ comments }}</span>
      </div>
      <div class="line-thin"></div>
    </div>
  </div>
</template>



<script>
import apiClient from '../axios';

export default {
  data() {
    return {
      username: '',
      date: '',
      posts: 0,
      comments: 0,
    };
  },

  async created() {
    const token = localStorage.getItem('token');
    if (token) {
      const userData = JSON.parse(atob(token.split('.')[1]));
      this.username = userData.username;
      this.date = new Date(userData.date).toLocaleDateString();

      try {
        const response = await apiClient.get('/profile/stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.posts = response.data.posts;
        this.comments = response.data.comments;
      } catch (error) {
        console.error('Error fetching user stats:', error);
      }
    }
  },
};
</script>




<style scoped>


.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
}


h1 {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 80px;
}


h2 {
  font-size: 28px;
  margin-bottom: 5px;
}


.line-thick {
  width: 70%;
  height: 3px;
  background-color: #263646;
  margin: 20px 0;
}


.profile-info {
  max-width: 700px;
  text-align: left;
  padding: 0 10%;
}


.profile-item {
  display: flex;
  align-items: center;
  font-size: 18px;
  margin: 10px 0;
}


.label {
  font-weight: bold;
  margin-right: 10px;
}


.line-thin {
  width: 20vw;
  height: 1px;
  background-color: black;
  margin: 10px auto;
}

.info {
  flex-grow: 0;
}

</style>
