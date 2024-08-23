<!-- src/components/CrossShadowCaptcha.vue -->
<template>
  <div class="captcha-container">
    <h1 style="display: flex; justify-content: center; align-items: center;">TEXT CAPTCHA {{ numberOfTries }}</h1>
    <h2 style="display: flex; justify-content: center; align-items: center; margin-top: 20px; margin-bottom: 20px;">Enter the text below</h2>

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
      canvas.width = 200;
      canvas.height = 70;

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = '#f3f3f3';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Text with shadow
      ctx.font = '30px Arial';
      ctx.fillStyle = '#000';
      ctx.shadowColor = '#555';
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;
      ctx.fillText(text, 20, 50);

      // Add cross lines
      this.drawCrossLines(ctx, canvas.width, canvas.height);
    },
    drawCrossLines(ctx, width, height) {
      ctx.strokeStyle = '#888';
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * width, 0);
        ctx.lineTo(Math.random() * width, height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, Math.random() * height);
        ctx.lineTo(width, Math.random() * height);
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
        this.$router.push('/Textform');
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
            this.$router.push('/Textform');
          }
    }
  }
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
.captcha-container {
  display: flex;
  flex-direction: column;
  align-items: center;
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
  border: 1px solid #ccc;
  margin-bottom: 10px;
  margin: 50px;
  width: 300px;
  height: 100px;
  text-align: center;
  font-size: 50px;
  color: #000;
}
.captcha-text {
    font-size: 50px;
    margin-bottom: 20px;
    margin-top: 50px;
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
