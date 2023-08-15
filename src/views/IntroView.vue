<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="game-intro">
    <img class="student-image" src="../assets/images/cartoon-student.png" alt="student-img">
    <h1>CRYPTOLEXIA</h1>
    <RouterLink to="/levels">
      <button>Start Game</button>
    </RouterLink>
  </div>
</template>

<style scoped>
.game-intro {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #a8e685;

}
.game-intro h1 {
  font-size: 4rem;
}
.game-intro button {
  font-size: 2rem;
  padding: 1rem 2rem;
  margin-top: 2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: #0ea6e3;
  color: #fff;
}

.student-image{
  width: 300px;
}

/* #85cbe6 */
</style>