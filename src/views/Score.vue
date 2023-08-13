<script setup>
import {useCounterStore} from '../stores/counter'
import { RouterLink } from 'vue-router'

const counter = useCounterStore();

</script>

<template>
 
  <div class="score-page">
    <img class="student-image" src="../assets/images/cartoon-student.png" alt="student-img">
    <h1 class="score"> Your score: {{ counter.count }}</h1>
    <RouterLink to="/">
        <button class="play-again">Play again !</button>
    </RouterLink>
   
  </div>

  
  
</template>

<style scoped>
.score-page {
  background-color: rgb(168, 230, 133);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.score{
    font-size: 72px;
    padding-top: 0px ;
}

.play-again {
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
</style>