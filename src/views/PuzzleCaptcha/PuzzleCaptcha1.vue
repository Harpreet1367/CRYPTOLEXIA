<template>
  <div class="captcha-container">
    <!-- Existing content -->
    <h1 style="display: flex; justify-content: center; align-items: center; height: 20vh;">
      PUZZLE CAPTCHA {{ numberOfTries }}
    </h1>
    <h2 style="display: flex; justify-content: center; align-items: center; margin-top: 10px; margin-bottom: 40px;">
      ROTATE THE IMAGE TO ENTER THE CAPTCHA
    </h2>
    
    <div class="captcha-image-container">
      <img class="captcha-image1" @click="rotateImage(20)" :src="imageUrl2"/>
      <img :src="images" :style="rotatedStyle" class="captcha-image" @click="rotateImage" />
      <img class="captcha-image1" @click="rotateImage(-20)" :src="imageUrl3"/>
    </div>
    <div class="captcha-button-container">
      <button @click="validateCaptcha" class="captcha-button">Verify</button>
    </div>

    <!-- Alert GIF -->
    <img v-if="showGif" :src="gifUrl" alt="Alert GIF" class="alert-gif" />
  </div>
</template>


<script>
import axios from 'axios';
import { mapActions, mapState, mapGetters } from 'vuex';
import successGif from '../../assets/images/verification_success.gif'; // Path to your success GIF
import failureGif from '../../assets/images/verification_failure.gif'; // Path to your failure GIF

import url1 from "../../assets/images/dog1.jpg";
import url2 from "../../assets/images/1left.png";
import url3 from "../../assets/images/2right.png";

export default {
  data() {
    return {
      imageUrl: url1,
      imageUrl2: url2,
      imageUrl3: url3,
      rotationAngle: 180,
      numberOfTries: 0,
      timerSpent: 0,
      images: '',
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
    this.entryTime = new Date(); // Record the entry time
    this.startTimer();
  },
  beforeDestroy() {
    this.stopTimer();
  },
  async mounted() {
    this.images = await this.getImage();
  },
  computed: {
    ...mapGetters(['getShuffledCaptchaPages']),
    ...mapState({
      attempts: (state) => state.captchaAttempts_text,
    }),
  },
  methods: {
    ...mapActions(['updatePuzzlePageTimeSpent', 'updatePuzzlePageNumberOfAttempts', 'incrementAttempts_text']),
    async getImage() {
      let number = this.getRandomInt(38, 49);
      const image = await import(`../../assets/images/captcha_img_${number}.png`);
      return image.default;
    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    async changeImage() {
      this.images = await this.getImage();
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
    rotateImage(deg) {
      this.rotationAngle += deg; // Rotate by 90 degrees
    },
    async validateCaptcha() {
      if (this.rotationAngle === 0 || this.rotationAngle === 360) {
        this.gifUrl = successGif; // Set the success GIF
        this.showGif = true; // Show the GIF
        await this.changeImage(); // Change the image as per your logic
        this.saveTheTime(); // Save time if needed
        
        setTimeout(() => {
          this.showGif = false; // Hide the GIF after 3 seconds
          this.$router.push('/PuzzleCaptcha2'); // Redirect after successful verification
        }, 6000);
      } else {
        this.gifUrl = failureGif; // Set the failure GIF
        this.showGif = true; // Show the GIF

        this.rotationAngle = 180; // Reset rotation angle
        this.numberOfTries++; // Increment the number of tries
        this.incrementAttempts_text(); // Increment attempts
        await this.changeImage(); // Change the image as per your logic

        setTimeout(() => {
          this.showGif = false; // Hide the GIF after 3 seconds
        }, 6000);

        if (this.numberOfTries >= 5) {
          this.$router.push('/PuzzleCaptcha2'); // Redirect after 5 failed attempts
        }
      }
    },
  },
  computed: {
    rotatedStyle() {
      return {
        transform: `rotate(${this.rotationAngle}deg)`,
      };
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
.captcha-image1 {
  transition: transform 0.5s ease-in-out;
  width: 100px;
  height: 100px;
  margin-bottom: 100px;
  margin-top: 80px;
}

.captcha-container {
  text-align: center;
  background-color: #a8e685;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font: 1em cosmic sans;
  font-size: 130%;
  margin-top: auto;
  font-family: 'OpenDyslexic', Arial, sans-serif;
}

.captcha-image-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 100px;
  height: 200px;
  margin-bottom: 100px;
  margin-top: 50px;
}

.captcha-button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
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
