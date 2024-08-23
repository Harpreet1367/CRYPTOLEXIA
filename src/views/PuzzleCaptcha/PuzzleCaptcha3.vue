<template>

  <div class="captcha-container1">
    <h1 style="display: flex; justify-content: center; align-items: center; height: 20vh;">PUZZLE CAPTCHA {{ numberOfTries }}</h1>
    <h2 style="display: flex; justify-content: center; align-items: center;">Click on the Image of Triangle</h2>
    <div class="captcha-container">
      <div class="image-grid">
        <img
          v-for="(image, index) in images"
          :key="index"
          :src="image.url"
          :class="{ selected: selectedImages.includes(index) }"
          @click="toggleSelection(index)"
        />
      </div>
    </div>
    <div class="captcha-button-container">
      
      <button @click="verifyCaptcha" class="captcha-button">Verify</button>
     
    </div>
    <img v-if="showGif" :src="gifUrl" alt="Alert GIF" class="alert-gif" />
  </div>


</template>

<script>

import axios from 'axios';
import { mapState, mapActions, mapGetters } from 'vuex';

import url1 from "../../assets/images/Puzzle4.jpeg";
import url2 from "../../assets/images/PuzzleCircle1.jpeg";
import url3 from "../../assets/images/Puzzlealphabet.jpeg";
import url4 from "../../assets/images/PuzzlePyramid.jpeg";
import url5 from "../../assets/images/PuzzleCube.jpeg";
import url6 from "../../assets/images/PuzzleRectangle.jpeg";
import url7 from "../../assets/images/PuzzleHeart.jpeg";
import url8 from "../../assets/images/PuzzleCylinder.jpeg";
import url9 from "../../assets/images/PuzzleSquare.jpeg";
import successGif from '../../assets/images/verification_success.gif'; // Path to your success GIF
import failureGif from '../../assets/images/verification_failure.gif';
export default {
  data() {
    return {
      images: [
        { url: url1 },
        { url: url2 },
        { url: url3 },
        { url: url4 },
        { url: url5 },
        { url: url6 },
        { url: url7 },
        { url: url8 },
        { url: url9 },
      ],
      selectedImages: [],
      numberOfTries: 0,
      userInput: '',
      captchaVerified: false,
      timerSpent: 0,
      clickedtoVerification: false,
      showGif: false,
      gifUrl: '',
    
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    gifUrl: {
      type: String,
      required: true,
    },
  },
    };
  },
  beforeMount() {
    this.entryTime = new Date();
    this.startTimer();
  },
  beforeDestroy() {
    this.stopTimer();
  },
  mounted() {
    this.generateCaptcha();
  },
  computed: {
    ...mapGetters(['getShuffledCaptchaPages']),
    ...mapState({
      attempts: (state) => state.captchaAttempts_text,
    }),
  },
  methods: {
    ...mapActions(['updatePuzzlePageTimeSpent', 'updatePuzzlePageNumberOfAttempts', 'incrementAttempts_text']),
    generateCaptcha() {
      // Generate the CAPTCHA challenge
    },
    saveTheTime() {
      this.updatePuzzlePageTimeSpent(this.timerSpent);
      this.updatePuzzlePageNumberOfAttempts(this.numberOfTries);
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.timerSpent = Math.floor((new Date() - this.entryTime) / 1000);
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.timer);
    },
    toggleSelection(index) {
      const selectedIndex = this.selectedImages.indexOf(index);
      if (selectedIndex === -1) {
        this.selectedImages.push(index);
      } else {
        this.selectedImages.splice(selectedIndex, 1);
      }
    },
    verifyCaptcha() {
      this.clickedtoVerification = true;
      let rightIndex = [3, 8];
      let arraysAreEqual = JSON.stringify(rightIndex.sort()) === JSON.stringify(this.selectedImages.sort());
      if (arraysAreEqual) {
        this.captchaVerified = true;
        this.saveTheTime();
        this.gifUrl = successGif; // Set the success GIF
        this.showGif = true; 
        setTimeout(() => {
          this.showGif = false;
        this.$router.push('/PuzzleCaptcha4');
      }, 6000);
      } else {
        this.gifUrl = failureGif; // Set the failure GIF
        this.showGif = true;
        this.userInput = '';
      }
      this.numberOfTries++;
      setTimeout(() => {
          this.showGif = false; // Hide the GIF after 3 seconds
        }, 6000);
      if (this.numberOfTries >= 5) {
        this.$router.push('/PuzzleCaptcha4');
      }
    },
  },
};
</script>


<style scoped>
.alert-gif {
  position: fixed;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  z-index: 1000;
  border-radius: 10px;
}
.captcha-container1 {
  background-color: #a8e685;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 130%;
  font-family: 'OpenDyslexic', Arial, sans-serif;
}

.captcha-container {
  text-align: center;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

.image-grid {
  width: 400px; /* Increase the container size to accommodate larger images */
  height: 400px; /* Increase the container size to accommodate larger images */
  position: relative;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-grid img {
  width: 100px; /* Increase the width of the images */
  height: 100px; /* Increase the height of the images */
  border: 5px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  transform: translate(-50%, -50%);
}

.image-grid img.selected {
  border-color: blue;
}

/* Adjust the positioning of each image to fit the larger size */
.image-grid img:nth-child(1) { top: 20%; left: 20%; }
.image-grid img:nth-child(2) { top: 20%; left: 50%; }
.image-grid img:nth-child(3) { top: 20%; left: 80%; }
.image-grid img:nth-child(4) { top: 50%; left: 20%; }
.image-grid img:nth-child(5) { top: 50%; left: 50%; } /* Center image */
.image-grid img:nth-child(6) { top: 50%; left: 80%; }
.image-grid img:nth-child(7) { top: 80%; left: 20%; }
.image-grid img:nth-child(8) { top: 80%; left: 50%; }
.image-grid img:nth-child(9) { top: 80%; left: 80%; }

.captcha-button-container {
  width: auto;
  display: flex;
  justify-content: center;
  gap: 100px;
}

.captcha-button {
  font-size: 1rem;
  padding: 1rem 2rem;
  margin-top: 2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: #0ea6e3;
  color: #fff;
}

.captcha-button:hover {
  background-color: #0056b3;
}
</style>


  
