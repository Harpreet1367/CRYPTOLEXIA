<template>
  <div class="captcha-container">
    <h1 style="display: flex; justify-content: center; align-items: center; height: 20vh;">AUDIO CAPTCHA {{ numberOfTries }}</h1>
    <h2>Enter the result of the math problem</h2>
    <div class="captcha-image">
      <div class="text3d">
        {{ mathProblem }}
      </div>
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
    <div class="level1-contianer">

    <input
      type="text"
      v-model="userInput"
      placeholder="Enter the result of the math problem"
    />
  </div>
    <div class="captcha-button-container">
    <button @click="verifyCaptcha" class="captcha-button">Verify</button>
   
    
  </div>
  <img v-if="showGif" :src="gifUrl" alt="Alert GIF" class="alert-gif" />
  
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
      mathProblem: '',
      mathAnswer: 0,// Set the expected answer here
      showSuccess: false,
      numberOfTries: 0,
      timerSpent: 0,
      imagesUrl: audioImage,
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
    this.generateMathProblem();
    
  },
  computed: {
    ...mapGetters(['getShuffledCaptchaPages']),
    ...mapState({
      attempts: (state) => state.captchaAttempts_text,
    }),
  },
  methods: 
  {
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
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    generateMathProblem() {
      const num1 = this.getRandomInt(1, 10);
      const num2 = this.getRandomInt(1, 10);
      this.mathProblem = `${num1} + ${num2}`;
      this.mathAnswer = num1 + num2;
    },
    playAudio() {
      const utterance = new SpeechSynthesisUtterance(this.mathProblem);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
      // Generate audio URL (pseudo, for simplicity, needs real implementation for actual audio file)
      //this.audioSrc = URL.createObjectURL(new Blob([utterance], { type: 'audio/mp3' }));
    },
    verifyCaptcha() {
      if (parseInt(this.userInput) === this.mathAnswer) {
        this.gifUrl = successGif; // Set the success GIF
        this.showGif = true;
        this.showSuccess = true;
        this.saveTheTime();

        setTimeout(() => {
          this.showGif = false;
        this.$router.push('/AudioCaptcha3');
        }, 3000);
      } else {
        // CAPTCHA failed, you can handle this case accordingly
        this.gifUrl = failureGif; // Set the failure GIF
        this.showGif = true; 
        this.generateMathProblem();

        this.userInput = '';

        setTimeout(() => {
          this.showGif = false; // Hide the GIF after 3 seconds
        }, 3000);
        
        this.numberOfTries++;
        if (this.numberOfTries >= 5) 
        {
          this.$router.push('/AudioCaptcha3');
        }
    }
  },
  },
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

.captcha-image {
  margin-bottom: 20px;
  margin-top: 50px;
}
.level1 {
width: 50px;
height: 50px;
display: flex;
margin: auto;
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

</style>
