<template>
  <div class="centered-container">
    <div class="centered-content">
      <h1 class="header-bg">Login</h1>
      <div class="container">
        <div class="row">
          <div class="col-sm"></div>
          <div class="col-sm">

            <form @submit.prevent="handleLogin">

              <div class="form-group">
                <label for="exampleInputUsername" class="line">Username</label>
                <input
                  v-model="username"
                  type="text"
                  class="form-control"
                  id="exampleInputUsername"
                  aria-describedby="usernameHelp"
                  placeholder="Enter username"
                />
              </div>

              <div class="form-group">
                <label
                  for="exampleInputPassword1"
                  class="line"
                  style="margin-top: 30px;"
                  >Password</label
                >
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>


              <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>

              <button
                type="submit"
                class="btn btn-primary"
                style="
                  background-color: #8298e4;
                  border-color: #8298e4;
                  margin-top: 30px;
                  border: 1px solid black;
                "
              > Submit </button>

            </form>
          </div>
          <div class="col-sm"></div>
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
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async handleLogin() {
      try {

        const response = await apiClient.post('/auth/login', {
          username: this.username,
          password: this.password
        });
        

        localStorage.setItem('token', response.data.token);


        this.$router.push('/profile');
      } catch (error) {

        this.errorMessage = error.response?.data?.message || 'Login failed';
      }
    }
  }
};
</script>

<style scoped>

.text-danger {
  color: #ff0000;
  margin-top: 10px;
  font-size: 14px;
}

</style>
