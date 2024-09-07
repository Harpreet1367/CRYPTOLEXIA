<template>
  <div class="captcha-container">
    <h1 style="display: flex; justify-content: center; align-items: center;">TEXT CAPTCHA {{ numberOfTries }}</h1>
    <h2 style="display: flex; justify-content: center; align-items: center; margin-top: 20px; margin-bottom: 20px;">Enter the text below</h2>

    <canvas ref="captchaCanvas" width="300" height="100"></canvas>

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
  name: 'Chess3DCaptcha',
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
    this.refreshCaptcha();
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
    generateCaptchaText() {
      // Generate a random string for CAPTCHA
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    },
    refreshCaptcha() {
      this.captchaText = this.generateCaptchaText();
      this.drawCaptcha();
      this.userInput = '';
    },
    drawCaptcha() {
      const canvas = this.$refs.captchaCanvas;
      const ctx = canvas.getContext('2d');
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // Draw chessboard background
      this.drawChessboardBackground(ctx, width, height);

      // Draw 3D text with distortion
      this.draw3DText(ctx, width, height);
    },
    drawChessboardBackground(ctx, width, height) {
      const blockSize = 25; // Size of each square on the chessboard
      for (let x = 0; x < width; x += blockSize) {
        for (let y = 0; y < height; y += blockSize) {
          ctx.fillStyle = (x / blockSize + y / blockSize) % 2 === 0 ? '#000' : '#fff';
          ctx.fillRect(x, y, blockSize, blockSize);
        }
      }
    },
    draw3DText(ctx, width, height) {
    const chars = this.captchaText.split('');
    ctx.font = 'bold 48px Arial';
    ctx.textBaseline = 'middle';
    const spacing = 45; // Adjusted spacing for 3D effect
    const depth = 6; // Depth of 3D effect

    chars.forEach((char, index) => {
        const x = spacing * index + 25;
        const y = height / 2;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.random() * 0.5 - 0.25); // Rotate more heavily
        ctx.transform(1, Math.random() * 0.5 - 0.25, Math.random() * 0.5 - 0.25, 1, 0, 0); // Stronger skew

        // Draw the shadow (3D effect)
        for (let i = depth; i > 0; i--) {
            ctx.fillStyle = `rgba(0, 0, 0, ${1 - i / (depth + 1)})`;
            ctx.fillText(char, i, i);
        }

        // Set text color to alternate between black and white
        const textColor = index % 2 === 0 ? '#000000' : '#FFFFFF';
        ctx.fillStyle = textColor;
        ctx.fillText(char, 0, 0);

        ctx.restore();
    });

    // Adding additional obfuscation lines
    
},

    getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    verifyCaptcha() {
      if (this.userInput === this.captchaText) {
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
        this.refreshCaptcha();
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

  input {
  padding: 5px;
  font-size: 16px;
  width: 150px;
  margin-right: 5px;
}
canvas {
  margin-bottom: 10px;
  border: 1px solid #ccc;
  background-color: #ffffff;
}


</style>
