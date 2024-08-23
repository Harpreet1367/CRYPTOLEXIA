<template>
  <div class="captcha-container">
    <h1 style="display: flex; justify-content: center; align-items: center; height: 20vh;">AUDIO CAPTCHA {{ numberOfTries }}</h1>
    <h2 style="display: flex; justify-content: center; align-items: center; margin-bottom: 25px;">Listen the Audio and type the code that you hear</h2>
    <div class="captcha-image">
      
    </div>
    <div class="help1-contianer">
    <div @click="playAudio" class="clickable">
      <img  class="level1" :src=imagesUrl />
      <audio ref="audioElement" controls style="display: none">
        <source :src="audioSrc" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
    </div>
    <div class="level1-contianer"><input
      type="text"
      v-model="userInput"
      placeholder="Enter the code you see and hear"
    /></div>

    <div class="captcha-button-container">
    <button @click="verifyCaptcha" class="captcha-button">Verify</button>
   
    
    <img v-if="showGif" :src="gifUrl" alt="Alert GIF" class="alert-gif" />
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions , mapState, mapGetters} from 'vuex';
import audioImage from "../../assets/images/audio-img.png" ;
import successGif from '../../assets/images/verification_success.gif'; // Path to your success GIF
import failureGif from '../../assets/images/verification_failure.gif';
export default {
  data() {
    return {
      audioSrc: '', // To be generated
      userInput: '',
      captchaCode: '',
      width: 200,
      height: 100,
      rotate: this.getRandomInt(-20, 20),
      fontSize: 48,
      fill: '#000',
      numberOfTries: 0,
      timerSpent: 0,
      imagesUrl: audioImage,
      showSuccess: false,
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
    this.captchaCode = this.generateCaptchaCode();
  },
  computed: {
    ...mapGetters(['getShuffledCaptchaPages']),
    ...mapState({
      attempts: (state) => state.captchaAttempts_text,
    }),
  },
  methods: {
    ...mapActions(['updateAudioPageTimeSpent','updateAudioPageNumberOfAttempts','incrementAttempts_text']),
    
    saveTheTime() {
      this.updateAudioPageTimeSpent(this.timerSpent);
      this.updateAudioPageNumberOfAttempts(this.numberOfTries);
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.timerSpent = Math.floor((new Date() - this.entryTime) / 1000);
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.timer);
    }, 
    generateCaptchaCode() {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    },
    refreshCaptchaCode() {
      this.captchaCode = this.generateCaptchaCode();  
    },
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    svgTextStyle() {
      return {
        fontFamily: 'monospace',
        fontWeight: 'bold',
        filter: 'url(#wavy)', // Applying a distortion filter (to be defined)
      };
    },
    playAudio() {
      const utterance = new SpeechSynthesisUtterance(this.captchaCode);
      utterance.lang = 'en-US';
      utterance.rate = 0.4;
      speechSynthesis.speak(utterance);
      // Generate audio URL (pseudo, for simplicity, needs real implementation for actual audio file)
      //this.audioSrc = URL.createObjectURL(new Blob([utterance], { type: 'audio/mp3' }));
    },
    verifyCaptcha() {
      if (this.userInput.toUpperCase() === this.captchaCode) {
        this.gifUrl = successGif; // Set the success GIF
        this.showGif = true;
        this.saveTheTime();
        setTimeout(() => {
          this.showGif = false;
       
       
        this.$router.push('/AudioCaptcha4');
      }, 3000);
      
      } else {
        // CAPTCHA failed, you can handle this case accordingly
        this.gifUrl = failureGif; // Set the failure GIF
        this.showGif = true; 
        this.refreshCaptchaCode();
        this.userInput = "";

        setTimeout(() => {
          this.showGif = false; // Hide the GIF after 3 seconds
        }, 3000);

        this.numberOfTries++;
        if (this.numberOfTries >= 5) 
        {
          this.$router.push('/AudioCaptcha4');
        }
    }
  },

  },
};
</script>

<style scoped>
.alert-gif {
  position: fixed;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  z-index: 1000;
  border-radius: 10px;
}
.captcha-container {
 
 gap: 10px;
 background-color: #a8e685;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 height: 100vh;
 font-size: 130%;
 font-family: 'OpenDyslexic', Arial, sans-serif;
 }
 .captcha-button-container {
   width: auto;
   display: flex;
   justify-content: center;
   gap: 10px;
 }
 .help1-contianer {
  text-align: center;
      margin-top: 50px;
      
      justify-content: center;
      align-items: center;
      display: flex;
 }

 
 .text3d {
   font-size: 60px;
   color: #333;
   text-shadow:
     1px 1px 0 #aaa,
     2px 2px 0 #aaa,
     3px 3px 0 #aaa,
     4px 4px 0 #aaa,
     5px 5px 0 #aaa,
     6px 6px 0 #aaa,
     7px 7px 0 #aaa,
     8px 8px 0 #aaa,
     9px 9px 0 #aaa,
     10px 10px 0 #aaa;
 }
 
 .math-audio-captcha input {
   padding: 8px;
   font-size: 16px;
   width: 200px;
 }
 
 .captcha-button:hover {
    background-color: #0056b3;
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
 .level1-contianer 
  {
   margin: 10px;
  display: flex;
  justify-content: space-around;
  
 
  height: 40px;
  width: 40px;
 
 
  }
  .level1 {
width: 50px;
height: 50px;
display: flex;
margin: auto;
}
 
</style>
