<template>
  <div class="help-page">
    <h1 class="help1">HINT</h1>
    <p class="Para">
      A Caesar cipher is a simple method of encoding messages. Caesar ciphers
      use a substitution method where letters in the alphabet are shifted by
      some fixed number of spaces to yield an encoding alphabet. A Caesar cipher
      with a shift of 1 would encode an A as a B, an M as an N, and a Z as an A,
      and so on.
    </p>

    <div class="help1-contianer">
      <div @click="playAudio" class="clickable">
        <img  class="level1" src="../../assets/images/audio-img.png" />
        <audio ref="audioElement" controls style="display: none">
          <source :src="audioSrc" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>

      <div>
        <RouterLink to="/Level1Q1">
          <img class="level1" src="../../assets/images/back-img.png" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<script setup>

import { ref } from "vue";

/* Audio */

const audioSrc = ref("./src/assets/audio/HL1Q1A1.mp3"); // Replace with the actual path to your audio file
const audioElement = ref(null);

const playAudio = () => {
  // Check if the audio is already playing, if not, play it
  if (audioElement.value.paused) {
    audioElement.value.play();
  }
};

/* Audio */
</script>
<style scoped >
.help-page {
  background-color: rgb(168, 230, 133);
  min-height: 100vh;
}
.help1-contianer {
  flex-grow: 1;
  max-width: 20%;
  margin: 0 auto;
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.help1 {
  text-align: center;

  font-size: 70px;
}
.Para {
  text-align: center;
  font-size: 40px;
  border: 1px solid black;
  padding: 10px;
  width: 800px;
  height: 500px;
  margin: 0 auto;
  margin-top: 20px;
}
.level1 {
  width: 100px;
  height: 100px;
}
.main {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>