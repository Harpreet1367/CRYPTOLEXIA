
<template>
  <div class="captcha-container">
    <h1 style="display: flex; justify-content: center; align-items: center; height: 20vh;">AUDIO CAPTCHA {{ numberOfTries }}</h1>
    <h2 style="display: flex; justify-content: center; align-items: center; ">Listen to the audio and type what you hear</h2>
    <div class="help1-contianer">
    <div @click="playAudio" class="clickable">
      <img  class="level1" :src=imagesUrl />
      <audio ref="audioElement" controls style="display: none">
        <source :src="audioSrc" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
    <div class="level1-contianer">
    <input type="text" v-model="userInput" placeholder="Type what you hear">
    </div>
    <div class="captcha-button-container">

    <button @click="checkAnswer" class="captcha-button" >Submit</button>
    
   
    
    </div>
    <img v-if="showGif" :src="gifUrl" alt="Alert GIF" class="alert-gif" />
  
  </div>
  
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions , mapState, mapGetters} from 'vuex';
import successGif from '../../assets/images/verification_success.gif'; // Path to your success GIF
import failureGif from '../../assets/images/verification_failure.gif';
import audioImage from "../../assets/images/audio-img.png" ;

export default {
  
  data() {
    return {
      audioSrc: '', // Path to your audio file
      userInput: "",
      correctAnswer: "a56br", // Set the expected answer here
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
async mounted() {
  this.audioSrc = await this.getAudio();
},
computed: {
    ...mapGetters(['getShuffledCaptchaPages']),
    ...mapState({
      attempts: (state) => state.captchaAttempts_text,
    }),
  },
  methods:{
    ...mapActions(['updateAudioPageTimeSpent','updateAudioPageNumberOfAttempts','incrementAttempts_text']),
   
  
    async getAudio() {
    let number = this.getRandomInt(1, 5);  
    //const audio = await import(`../assets/audio/captcha_audio_${number}.mp3`); 
    return new URL(`../../assets/audio/Captcha.mp3`, import.meta.url).href;
    //return audio.default;
  },
  async changeAudioSrc() {
    this.audioSrc = await this.getAudio();
  },
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
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
    checkAnswer() {
      if (this.userInput.toLowerCase() === this.correctAnswer.toLowerCase()) {
       
        this.gifUrl = successGif; // Set the success GIF
        this.showGif = true;
        this.showSuccess = true;
        this.saveTheTime(); 

        setTimeout(() => {
          this.showGif = false;
        this.$router.push('/AudioCaptcha2');// Optionally, you can also emit an event or call a method to notify parent component
      } , 3000);
      } else {
        // CAPTCHA failed, you can handle this case accordingly
        this.gifUrl = failureGif; // Set the failure GIF
        this.showGif = true; 
       
        this.userInput = "";

        setTimeout(() => {
          this.showGif = false; // Hide the GIF after 3 seconds
        }, 3000);
        this.numberOfTries++;
        if (this.numberOfTries >= 5) 
        {
          this.$router.push('/AudioCaptcha2');
        }
      }
    },
    playAudio() {
      this.$refs.audioElement.play();
    }
  },
  watch: {
    audioSrc() {
      this.$refs.audioElement.load();
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
.level1 {
width: 50px;
height: 50px;
display: flex;
margin: auto;
gap: 10px;
margin-top: 50px;
margin-bottom: 50px;
}
.success-message {
  margin-top: 10px;
  padding: 5px;
  background-color: #5cb85c;
  color: #fff;
  border-radius: 3px;
}
.captcha-button-container {
  width: auto;
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

 .level1-contianer 
 {
 margin: auto;
 display: flex;
 justify-content: space-around;
 align-items: center;
 margin-top: 10%;
 height: 40px;
 width: 40px;

 }
 .captcha-container
{
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
.clickable{
  cursor: pointer;
}
.help1-contianer {
  text-align: center;
      margin-top: 50px;
      
      justify-content: center;
      align-items: center;
      height: 50vh;
}
</style>