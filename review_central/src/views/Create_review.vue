<template>
  <div class="centered-container-create">
    <div class="centered-content-create">
      <div>
        <div class="about-container">
          <h1>Create Review</h1>
          <div class="line-thick"></div>

          <div class="image-placeholder">
            <p>Add image</p>
          </div>

          <div class="description-container">
            <label for="description" class="description-label">Description: </label>
            <textarea
              id="description"
              class="description-textbox"
              placeholder="Description*"
            ></textarea>
          </div>

          <button type="submit" class="btn btn-primary" style="background-color: #8298e4; border-color: #8298e4; margin-top: 30px; border: 1px solid black;">Post</button>

        </div>
      </div>
    </div>
  </div>
</template>


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
