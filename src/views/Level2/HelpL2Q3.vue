<template>
  <div class="help-page">
    <h1 class="help1">HINT</h1>

    <div class="Para">
      <h3 class="head"><b>VIGENERE CIPHER</b></h3>

      <ol>
        <li>
           Use the plaintext and the key letter to select a row and a column
          in the Vigenere table.
        </li>
        <li> For Eg. Plaintext: WATER Key:SMILE.</li>
        <li> Here number of alphabets of both key and plaintext are same.</li>
        <li>
           So see first alphabet of plaintext and key i.e. In row W and in
          column S on Vigenere Table.
        </li>
        <li> W and S intersect at P.</li>
        <li> So Ciphertext of W becomes P and so on.</li>
      </ol>
    </div>

    <div class="help1-contianer">
      <div @click="playAudio" class="clickable">
        <Image imgSrc="src/assets/images/audio-img.png" />
        <audio ref="audioElement" controls style="display: none">
          <source :src="audioSrc" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>

      <div>
        <RouterLink to="/Level2Q3">
          <img class="level1" src="../../assets/images/back-img.png" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<script setup>
import Image from "../../components/Image.vue";
import { ref } from "vue";

/* Audio */

const audioSrc = ref("./src/assets/audio/HL2Q3A3.mp3"); // Replace with the actual path to your audio file
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
.head
{
  text-align: center;
  margin-bottom: 20px;
  margin-top: 40px;
}
.help1 {
  text-align: center;
  font-size: 70px;
}
.Para {
  text-align: justify;
  font-size: 25px;
  border: 1px solid black;
  padding: 10px;
  width: 1050px;
  height: 500px;
  margin: 0 auto;
  margin-top: 30px;
}
.Para ol{
  margin-left: 40px;
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