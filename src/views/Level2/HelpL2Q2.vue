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
        <li> For Eg. Plaintext: HELLO Key:BYE.</li>
        <li>
           First make key alphabets same as plaintext so key become BYEBY.
        </li>
        <li> Now Plaintext: HELLO and Key: BYEBY.</li>
        <li>
           So see first alphabet of plaintext and key i.e. In row H and in
          column B on Vigenere Table.
        </li>
        <li> H and B intersect at I and so on.</li>
        <li> So, Ciphertext H becomes I.</li>
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
        <RouterLink to="/Level2Q2">
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

const audioSrc = ref("./src/assets/audio/HL2Q2A2.mp3"); // Replace with the actual path to your audio file
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