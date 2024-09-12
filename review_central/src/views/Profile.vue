<template>
  <div class="profile-container">
    <h1>User Profile</h1>


    <h2>{{ username }}</h2>
    <p class="bio">Sample</p>


    <div class="line-thick"></div>

    <div class="profile-info">
      <div class="profile-item">
        <span class="label">Joined:</span>

        <span class="info">{{ dateJoined }}</span>

      </div>

      <div class="line-thin"></div>

      <div class="profile-item">
        <span class="label">Reviews:</span>
        <span class="info">Number Placeholder</span>
      </div>
      <div class="line-thin"></div>

      <div class="profile-item">
        <span class="label">Requests:</span>
        <span class="info">Number Placeholder</span>
      </div>
      <div class="line-thin"></div>

      <div class="profile-item">
        <span class="label">Comments:</span>
        <span class="info">Number Placeholder</span>
      </div>
      <div class="line-thin"></div>

      <div class="profile-item">
        <span class="label">Solved requests:</span>
        <span class="info">Number Placeholder</span>
      </div>
      <div class="line-thin"></div>
    </div>
  </div>
</template>



<script>

export default {
  data() {
    return {
      username: '',
      dateJoined: ''
    };
  },

  created() {
    const token = localStorage.getItem('token');
    if (token) {
      const userData = JSON.parse(atob(token.split('.')[1]));
      this.username = userData.username;
      this.dateJoined = new Date(userData.dateJoined).toLocaleDateString(); // Convert date to a readable format
    }
  }
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


.bio {
  font-size: 16px;
  color: #575e66;
  margin-bottom: 20px;
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
