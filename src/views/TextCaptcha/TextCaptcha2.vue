<!-- src/components/Captcha.vue -->
<template>
  <div class="captcha-container">
    <h1 style="display: flex; justify-content: center; align-items: center; height: 20vh; ">TEXT CAPTCHA {{ numberOfTries }}</h1>
    <h2 style="display: flex; justify-content: center; align-items: center; margin-top: 20px; margin-bottom: 40px;">Enter the text below</h2>
    
    <canvas ref="captchaCanvas" class="captcha-canvas"></canvas>
    <input type="text" v-model="userInput" placeholder="Enter CAPTCHA" />
    
    <div class="captcha-button-container">
      <button @click="verifyCaptcha" class="captcha-button">Verify</button>
      
     
      </div>
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
  methods: 
  {
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
      
      
    generateCaptcha() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let text = '';
      for (let i = 0; i < 6; i++) {
        text += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      this.captchaText = text;
      this.drawCaptcha(text);
    },
    drawCaptcha(text) {
      const canvas = this.$refs.captchaCanvas;
      const ctx = canvas.getContext('2d');
      canvas.width = 150;
      canvas.height = 50;

      // Background
      ctx.fillStyle = '#f3f3f3';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Text
      ctx.font = '30px Arial';
      ctx.fillStyle = '#000';
      ctx.setTransform(1, -0.12, 0.3, 1, 0, 0); // Skew transformation
      ctx.fillText(text, 10, 35);

      // Noise
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.strokeStyle = '#000';
        ctx.stroke();
      }
    },
    verifyCaptcha() {
      if (this.userInput === this.captchaText) {
        this.gifUrl = successGif; // Set the success GIF
        this.showGif = true;
        this.showSuccess = true;
        this.saveTheTime(); 

        setTimeout(() => {
          this.showGif = false;
        this.$router.push('/TextCaptcha3');

        }, 3000);
      } else{
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
            this.$router.push('/TextCaptcha3');
          }
    }
  }
};
</script>

<style scoped>
.alert-gif {
  position: fixed;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 600px;
  z-index: 1000;
  border-radius: 10px;
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

.captcha-canvas {
  border: 5px solid #ccc;
  margin-bottom: 10px;
  margin: 50px;
  width: 300px;
  height: 80px;
  text-align: center;
  font-size: 50px;
  color: #000;
}
input {
  margin-bottom: 10px;
  padding: 5px;
  font-size: 16px;
}
button {
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
}
.captcha-button-container 
  {
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
