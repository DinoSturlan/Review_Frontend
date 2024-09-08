<template>
  <div id="app">

    <button 
      @click="toggleNav" 
      class="sidebar-btn"
      :class="{ 'shifted': isNavOpen }">
      {{ isNavOpen ? '<' : '☰' }} 
    </button>

    <div :class="['sidenav', { 'active': isNavOpen }]">


      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/signup">Sign Up</router-link>
      <router-link to="/createreview">Create Review</router-link>
      <router-link to="/createrequest">Create Request</router-link>
      <router-link to="/profile">Profile</router-link>
      <router-link to="/about">About</router-link>


    </div>

    <div :class="['main-content', { 'shifted': isNavOpen }]">
      <router-view />
    </div>

  </div>
</template>


<script>
export default {
  data() {
    return {
      isNavOpen: false,
    };
  },
  methods: {
    toggleNav() {
      this.isNavOpen = !this.isNavOpen;
    },
  },
};
</script>


<style lang="scss">

body {
  background-color: #dfe8f1;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}


.sidenav {
  height: 100%; 
  width: 0; 
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #8298e4;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 70px;
  white-space: nowrap;
  border-right: 2px solid black;

}


.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #263646;
  display: block;
  transition: color 0.3s;
  text-decoration: underline;

  text-align: center;
  width: 100%;

}


.sidenav a:hover {
  color: #ffffff;
}


.sidebar-btn {
  font-size: 20px;
  cursor: pointer;
  background-color: #8298e4;
  color: #263646;
  border: none;
  padding: 10px;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1;
  width: 60px;
  height: 60px; 
  border-radius: 50%;
  transition: left 0.5s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid black;
}


.sidebar-btn.shifted {
  left: 270px; 
}


.main-content {
  margin-left: 0;
  padding: 16px;
  transition: margin-left 0.5s;
}


.sidenav.active {
  width: 260px;
}


.main-content.shifted {
  margin-left: 200px;
}

</style>
