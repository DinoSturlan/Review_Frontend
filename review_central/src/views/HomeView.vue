<template>
  <div class="vertical-lines">
   

  </div>
</template>



<style scoped>

body, html {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}





.vertical-lines {
  position: relative;
  min-height: 100vh;
}

.vertical-lines::before,
.vertical-lines::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 3px;
  background-color: #263646;
}

.vertical-lines::before {
  left: 15%;
}

.vertical-lines::after {
  right: 15%;
}


</style>

