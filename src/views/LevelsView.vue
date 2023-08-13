<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
    <div>
      <div class="level-contianer">
        <h1>CLICK ON THE EACH TO LEVEL TO WIN THE GAME</h1>
        <div class="first-level">
          <RouterLink to="/Level1Q1">
              <img class="level-img" src="../assets/images/1l.jpg" />
          </RouterLink>
        </div>
  
        <div class="second-level">
          <RouterLink to="/Level2Q1">
              <img class="level-img" src="../assets/images/2l.png" />
          </RouterLink>
        </div>
  
        <div class="third-level">
          <RouterLink to="/Level3Q1">
              <img class="level-img" src="../assets/images/8110783.png" />
          </RouterLink>
        </div>
      </div>
    </div>
  </template>
 
  <style scoped>
  .level-contianer{
      max-width: 90%;
      margin: 0 auto;
      max-height: 100vh;
      
  }
  .level-contianer h1{
      text-align: center;
      padding-top: 20px;
  }
  .level-img {
    width: 250px;
  }
  
  .second-level {
    display: flex;
    justify-content: center;
  }
  .third-level {
    display: flex;
    justify-content: end;
  }
  </style>