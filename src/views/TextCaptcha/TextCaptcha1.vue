<template>
    <div class="captcha-container1">
      <h1 style="display: flex; justify-content: center; align-items: center; height: 20vh; ">TEXT CAPTCHA {{ numberOfTries }}</h1>
    <h2 style="display: flex; justify-content: center; align-items: center;">Enter the text in Red Color</h2>
    <div class="captcha-container">  
    <p class="captcha-text">{{ captchaText }}</p>
      
    <input type="text" v-model="userInput" placeholder="Enter Captcha" class="captcha-input">
    </div>  
    <div class="captcha-button-container">
      <button @click="verifyCaptcha" class="captcha-button">Verify</button>
      
      </div>
      <div v-if="showFeedback">

        <p v-if="captchaVerified" class="success-message">Captcha Verified!</p>
        
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
        showFeedback: false,
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
      async generateCaptcha() {
       const data = await axios.get('https://cryptolexia.ahmedghaleb.com/api/random-captcha');
        console.log(data.data);
        this.captchaText = data.data.captcha_text;
        console.log(this.captchaText);
        this.showFeedback = false;
        // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        // let captcha = '';
        // for (let i = 0; i < 6; i++) {
        //   captcha += characters.charAt(Math.floor(Math.random() * characters.length));
        // }

        // this.captchaText = captcha;
      },
      verifyCaptcha() {
        this.showFeedback = true;
        if (this.userInput === this.captchaText) 
       
        {
          this.gifUrl = successGif; // Set the success GIF
        this.showGif = true;
        this.showSuccess = true;
        this.saveTheTime(); 

        setTimeout(() => {
          this.showGif = false;
          this.$router.push('/TextCaptcha2');
        }, 3000);
          
        } 
        else 
        {
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
            this.$router.push('/TextCaptcha2');
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
  max-width: 500px;
  z-index: 1000;
  border-radius: 10px;
}
  .captcha-container1 
  {
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
  .captcha-container
   {
      text-align: center;
      margin-top: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 30vh;
      margin-bottom: 10px;
      
    }
  
  .captcha-text {
    font-size: 50px;
    margin-bottom: 20px;
    margin-top: 5px;
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
    gap: 100px;
    width: auto;
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
  
  .success-message {
    color: green;
  }
  
  .error-message {
    color: red;
  }
  </style>