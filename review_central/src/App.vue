
<template>
  <div id="app">

    <button 
      @click="toggleNav" 
      class="sidebar-btn"
      :class="{ 'shifted': isNavOpen }">
      {{ isNavOpen ? '<' : '☰' }} 
    </button>

    <div :class="['sidenav', { 'active': isNavOpen }]">

      <div style = "margin-bottom: 100px">
        <img :src="logo" alt="Logo" class="logo" />
      </div>
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/signup">Sign Up</router-link>
      <router-link to="/profile">Profile</router-link>
      <router-link to="/about">About</router-link>
      <router-link v-if="isLoggedIn" to="/login" @click.prevent="logout">Log out</router-link>

    </div>

    <div :class="['main-content', { 'shifted': isNavOpen }]">
      <router-view />

<div v-if="$route.path === '/'">
  <div v-if="isLoggedIn" class="button-container">
    <button @click="toggleCategoryMenu" class="category-btn">Categories</button>
    <button @click="toggleMenu" class="plus-btn">+</button>
    
    <div :class="['expanding-menu-categories', { 'open': isCategoryMenuOpen }]">
      <label>
        <input type="checkbox" value="All" v-model="selectedCategories" /> All
      </label>
      <label v-for="category in categories" :key="category">
        <input type="checkbox" :value="category" v-model="selectedCategories" /> {{ category }}
      </label>
      <button @click="applyCategoryFilter" style="margin-top: 10px">Select</button>
    </div>

    <div :class="['expanding-menu', { 'open': isMenuOpen }]">
      <router-link to="/createreview" class="menu-link">Create Review</router-link>
      <router-link to="/createrequest" class="menu-link">Create Request</router-link>
    </div>
  </div>
</div>


    </div>

  </div>
</template>


<script>
export default {
  data() {
    return {
      isNavOpen: false,
      isMenuOpen: false,
      isCategoryMenuOpen: false,
      selectedCategories: ['All'],
      logo: require('@/assets/logo.png'),
      categories: [
        'Electronics', 'Software', 'Clothes', 'Health/Beauty', 'Home',
        'Food/Beverage', 'Travel', 'Auto/Moto', 'Education', 'Art', 'Garden',
        'Sports', 'Media', 'Kids', 'Pets', 'Office', 'Gifts', 'Services', 'Other'
    ]
    };
  },

  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('token');
    }
  },

  methods: {
    toggleNav() {
      this.isNavOpen = !this.isNavOpen;
    },

    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      this.isCategoryMenuOpen = false;
    },

    toggleCategoryMenu() {
      this.isCategoryMenuOpen = !this.isCategoryMenuOpen;
      this.isMenuOpen = false;
    },

    applyCategoryFilter() {
        if (this.selectedCategories.includes('All')) {
          this.$router.push({
            name: 'Home', 
           query: { categories: 'all' }
            });
       } else {

         this.$router.push({
            name: 'Home',
            query: { categories: this.selectedCategories.join(',') }
         });
  }

        this.isCategoryMenuOpen = false;
      },

    logout() {

      localStorage.removeItem('token');
      
      this.$router.push('/login').then(() => {
        window.location.reload();
      });
    }
  }
}
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

.sidebar-btn:hover {
  background-color: #c2d8fa;
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



.plus-button-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 2;
}

.plus-btn {
  font-size: 30px;
  cursor: pointer;
  background-color: #8298e4;
  color: #263646;
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;
  border: 1px solid black;
}

.plus-btn:hover {
  background-color: #c2d8fa;
}

.expanding-menu {
  background-color: #8298e4;
  border-radius: 8px;
  padding: 20px;
  position: absolute;
  top: 70px;
  right: 0;
  width: 300px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  transition: opacity 0.5s ease;
  opacity: 0;
  visibility: hidden;
}

.expanding-menu-categories {
  background-color: #8298e4;
  color: black;
  border-radius: 8px;
  padding: 20px;
  position: absolute;
  top: 70px;
  right: 0;
  width: 300px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  transition: opacity 0.5s ease;
  opacity: 0;
  visibility: hidden;
  align-items: flex-start;
}

.expanding-menu.open {
  opacity: 1;
  visibility: visible;
}

.expanding-menu-categories.open {
  opacity: 1;
  visibility: visible;
}

.menu-link {
  padding: 10px 0;
  color: #000000;
  text-decoration: none;
  text-align: center;
  border-bottom: 1px solid #000000;
  font-size: 25px;
}

.menu-link:last-child {
  border-bottom: none;
}

.menu-link:hover {
  background-color: #c2d8fa;
}

.logo {
  width: 150px;
  height: auto;
}

.button-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 2;
  display: flex;
  align-items: center;
}

.category-btn {
  font-size: 20px;
  background-color: #8298e4;
  color: #263646;
  border: 1px solid black;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s;
  margin-right: 10px;
}

.category-btn:hover {
  background-color: #c2d8fa;
}


</style>
