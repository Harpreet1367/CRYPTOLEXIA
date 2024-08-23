<template>
  <div class="captcha-container">
    <h1 style="display: flex; justify-content: center; align-items: center;">TEXT CAPTCHA {{ numberOfTries }}</h1>
    <h2 style="display: flex; justify-content: center; align-items: center; margin-top: 20px; margin-bottom: 20px;">Enter the text below</h2>
    <div class="captcha-image">
      <div class="text-gimphy">
        {{ captchaText }}
      </div>
    </div>
    <input
      type="text"
      v-model="userInput"
      placeholder="Enter the text you see"
    />
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
 export default
 {
  data() {
    return {
      userInput: '',
      captchaText: '',
      numberOfTries: 0,
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
    this.generateCaptchaText();
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
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      this.captchaText = result;
    },
    verifyCaptcha() {
      if (this.userInput.toUpperCase() === this.captchaText) {
        this.gifUrl = successGif; // Set the success GIF
        this.showGif = true;
        this.showSuccess = true;
        this.saveTheTime(); 

        setTimeout(() => {
          this.showGif = false;
        this.$router.push('/TextCaptcha5');
        }, 3000);
      } else {
          this.gifUrl = failureGif; // Set the failure GIF
        this.showGif = true; 
        this.generateCaptchaText();
        this.userInput = "";

        setTimeout(() => {
          this.showGif = false; // Hide the GIF after 3 seconds
        }, 3000);
        }
      this.numberOfTries++;
        //this.incrementAttempts_text();
          if (this.numberOfTries >= 5) {
            this.$router.push('/TextCaptcha5');
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

.captcha-image {
  margin-bottom: 10px;
}

.text-gimphy {
  font-size: 48px;
  margin: 50px;
  color: #333;
  font-size: 60px;
  text-shadow:
    2px 2px 0 #aaa,
    3px 3px 0 #999,
    4px 4px 0 #888,
    5px 5px 0 #777,
    6px 6px 0 #666,
    7px 7px 0 #555,
    8px 8px 0 #444,
    9px 9px 0 #333,
    10px 10px 0 #222;
  animation: gimphy 1.5s infinite;
}

@keyframes gimphy {
  0%, 100% {
    transform: skewX(0deg);
  }
  25% {
    transform: skewX(5deg);
  }
  50% {
    transform: skewX(-5deg);
  }
  75% {
    transform: skewX(5deg);
  }
}

.gimphy-text-captcha input {
  padding: 8px;
  font-size: 16px;
  width: 200px;
}

.gimphy-text-captcha button {
  padding: 8px 16px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

.gimphy-text-captcha button:hover {
  background-color: #45a049;
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
