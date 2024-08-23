<template>
  <div class="captcha-container">
    <h1 style="display: flex; justify-content: center; align-items: center;">TEXT CAPTCHA {{ numberOfTries }}</h1>
    <h2 style="display: flex; justify-content: center; align-items: center; margin-top: 40px; margin-bottom: 40px;">Enter the text below</h2>
    <canvas ref="captchaCanvas" :width="canvasWidth" :height="canvasHeight"></canvas>
   
    <form @submit.prevent="checkCaptcha">
      <input v-model="userInput" placeholder="Enter CAPTCHA" />
      
      <div class="captcha-button-container">
      <button @click="verifyCaptcha" class="captcha-button">Verify</button>
      
      
      </div>
    </form>
    <p v-if="message">{{ message }}</p>
    <img v-if="showGif" :src="gifUrl" alt="Alert GIF" class="alert-gif" />
  </div>
</template>

<script>
 import axios from 'axios';
 import { mapActions , mapState, mapGetters} from 'vuex';
 import successGif from '../../assets/images/verification_success.gif'; // Path to your success GIF
 import failureGif from '../../assets/images/verification_failure.gif';
 export default {
  data() {
    return {
      captchaText: '',
      userInput: '',
      canvasWidth: 200,
      canvasHeight: 80,
      numberOfTries: 0,
      timerSpent: 0,
      message: '',
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
      fonts: [
        "Patrick Hand", 
        "Shadows Into Light",
        "Indie Flower",
        "Gloria Hallelujah"
      ],
    };
  },
  beforeMount() {
    this.entryTime = new Date(); // Record the entry time
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
    ...mapActions(['updateTextPageTimeSpent','updateTextPageNumberOfAttempts','incrementAttempts_text']),
      
      saveTheTime() {
      this.updateTextPageTimeSpent(this.timerSpent);
      this.updateTextPageNumberOfAttempts(this.numberOfTries);
    },
      startTimer() {
      this.timer = setInterval(() => {
        this.timerSpent = Math.floor((new Date() - this.entryTime) / 1000);
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.timer);
    },
    getRandomText() {
      const words = ["apple", "orange", "banana", "grape", "peach"];
      return words[Math.floor(Math.random() * words.length)];
    },
    drawCaptchaText(ctx, text) {
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      ctx.font = `30px '${this.getRandomFont()}'`;
      ctx.fillStyle = this.getRandomColor();
      const startX = 20;
      const startY = 50;

      // Draw each letter with a slight random position to simulate the e-z gimphy effect
      for (let i = 0; i < text.length; i++) {
        const offsetX = Math.random() * 5 - 2.5; // random offset between -2.5 and 2.5
        const offsetY = Math.random() * 5 - 2.5; // random offset between -2.5 and 2.5
        ctx.fillText(text[i], startX + i * 30 + offsetX, startY + offsetY);
      }

      this.addNoise(ctx);
    },
    getRandomFont() {
      return this.fonts[Math.floor(Math.random() * this.fonts.length)];
    },
    getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    addNoise(ctx) {
      for (let i = 0; i < 100; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * this.canvasWidth, Math.random() * this.canvasHeight, 1, 0, Math.PI * 2);
        ctx.fillStyle = this.getRandomColor();
        ctx.fill();
      }
    },
    generateCaptcha() {
      this.captchaText = this.getRandomText();
      const canvas = this.$refs.captchaCanvas;
      const ctx = canvas.getContext('2d');
      this.drawCaptchaText(ctx, this.captchaText);
      this.message = '';
      this.userInput = '';
    },
    checkCaptcha() {
      if (this.userInput.toLowerCase() === this.captchaText.toLowerCase()) {
        this.gifUrl = successGif; // Set the success GIF
        this.showGif = true;
        this.showSuccess = true;
        this.saveTheTime(); 

        setTimeout(() => {
          this.showGif = false;
        this.$router.push('/TextCaptcha4');
        }, 3000);
      } else {
          this.gifUrl = failureGif; // Set the failure GIF
        this.showGif = true; 
        this.generateCaptcha();
        this.userInput = "";

        setTimeout(() => {
          this.showGif = false; // Hide the GIF after 3 seconds
        }, 3000);
        }
      this.numberOfTries++;
        //this.incrementAttempts_text();
          if (this.numberOfTries >= 5) {
            this.$router.push('/TextCaptcha4');
          }
    }
  },
  mounted() {
    this.generateCaptcha();
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&family=Shadows+Into+Light&family=Indie+Flower&family=Gloria+Hallelujah&display=swap');

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
.alert-gif {
  position: fixed;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  z-index: 1000;
  border-radius: 10px;
}
.captcha-text {
    font-size: 50px;
    margin-bottom: 20px;
    margin-top: 50px;
  }
  
  .captcha-input {
    padding: 10px;
    margin-bottom: 20px;
    font-size: 16px;
  }
  .captcha-button-container 
  {
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
  

canvas {
  border: 5px solid #ccc;
  margin-bottom: 10px;
  background-color: #fffcfc;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
}

input {
  margin-bottom: 10px;
  padding: 5px;
}



p {
  margin-top: 10px;
  font-size: 16px;
  color: #ff0000;
}
</style>
