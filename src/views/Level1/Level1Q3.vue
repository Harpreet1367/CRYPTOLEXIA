<template>
  <div class="level1-page">
    <h1 class="level1-title">CAESER CIPHER</h1>
    <h3 class="level1-subtitle">
      QUES:3 Plaintext: YOU ARE BEAUTIFUL.Key: 6 Ciphertext: …………….?
    </h3>
    <div class="coding-image">
      <img class="" src="../../assets/images/tab2_mod26-encodings.webp" />
    </div>

    <div class="answer-container">
      <h3>Write your answer here :</h3>
      <input v-model="inputAnswer" type="text" class="input-answer"> 
      <button class="btn-submit" @click="CheckAnswer">Click</button>
    </div>
    <div class="level1-contianer">
      <div>
        <RouterLink to="/HelpL1Q3">
          <Image imgSrc="src/assets/images/HELP.png" />
        </RouterLink>
      </div>

      <div @click="playAudio" class="clickable">
        <Image imgSrc="src/assets/images/audio.jpg" />
        <audio ref="audioElement" controls style="display: none">
          <source :src="audioSrc" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <div>
        <RouterLink to="/">
          <Image imgSrc="src/assets/images/HOME.jpg" />
        </RouterLink>
      </div>

      <div>
        <RouterLink to="/levels">
          <Image imgSrc="src/assets/images/next.jpg" />
        </RouterLink>
      </div>
    </div>
    <Feedback v-if="showFeedbackComponent" :status="feedbackStatus" />
  </div>
</template>
<script setup>
import Feedback from "../../components/Feedback.vue";
import Image from "../../components/Image.vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCounterStore } from "../../stores/counter";

const route = useRoute();
const router = useRouter();
const counter = useCounterStore();


const inputAnswer = ref("");

const CheckAnswer = () => {
  if (inputAnswer.value == "EUA GXK") {
    rightAnswer();
  } else {
    wrongAnswer();
  }
};

const showFeedbackComponent = ref(false);
const feedbackStatus = ref(false);

const rightAnswer = () => {
  feedbackStatus.value = true;
  counter.increment();
  showFeedback();
};

const wrongAnswer = () => {
  feedbackStatus.value = false;
  counter.decrement();
  showFeedback();
};

const showFeedback = () => {
  showFeedbackComponent.value = true;

  setTimeout(() => {
    navigateToNextPage();
  }, 3000); // 3000 milliseconds (3 seconds)
};

const navigateToNextPage = () => {
  router.push("/Levels");
};







/* Audio */

const audioSrc = ref("./src/assets/audio/song5.mp3"); // Replace with the actual path to your audio file
const audioElement = ref(null);

const playAudio = () => {
  // Check if the audio is already playing, if not, play it
  if (audioElement.value.paused) {
    audioElement.value.play();
  }
};

/* Audio */
</script>
<style scoped>
.level1-page {
  background-color: rgb(168, 230, 133);
  min-height: 100vh;
}
.level1-title {
  text-align: center;
  font-size: 62px;
  padding-top: 20px;
}
.level1-subtitle {
  text-align: center;
  font-size: 62px;
  margin-top: 60px;
}
.btn-container {
  width: 60%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
}
.btn {
  border: 2px solid white;
  border-radius: 50%;
  font-size: 30px;
  padding: 7px 30px;
}
.level1-contianer {
  max-width: 90%;
  margin: 0 auto;
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.coding-image {
  display: flex;
  align-items: center;
  justify-content: center;
}

.answer-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px ;
}
.answer-container .input-answer{
  padding: 10px;
  width: 300px;
  margin: 10px 0;
  font-size: 30px;
}
.answer-container h3{
    font-size: 30px;
  }
  .answer-container .btn-submit{
    padding: 10px 20px;
    width: 100px;
    font-size: 25px;
    color: white;
    background-color:#0ea6e3 ;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .answer-container .btn-submit:hover{
    background-color:#1a9acc ;
  
  }

</style>