<template>
  <div class="captcha-container">
    <h1 style="display: flex; justify-content: center; align-items: center; height: 20vh; ">AUDIO CAPTCHA {{ numberOfTries }}</h1>
    <h2 style="display: flex; justify-content: center; align-items: center; margin-top: 20px; margin-bottom: 40px;">Click on the color you hear</h2>
    

    
  
    <div @click="playAudio" class="clickable">
        <img class="level1" :src=imagesUrl />
        <audio ref="audioElement" controls style="display: none">
          <source :src="audioSrc" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    

  <div class="level1-contianer">
    <button @click="checkAnswer('blue')" :class="'captcha-button1' + (userInput === 'blue' ? ' active' : '') " ></button>
    <button @click="checkAnswer('green')" :class="'captcha-button2' + (userInput === 'green' ? ' active' : '')" ></button>
    <button @click="checkAnswer('gray')" :class="'captcha-button3' + (userInput === 'gray' ? ' active' : '')" ></button>
    <button @click="checkAnswer('black')" :class="'captcha-button4' + (userInput === 'black' ? ' active' : '')" ></button>
  </div>
  <div class="captcha-button-container">
    <button @click="validateCaptcha" class="captcha-button" >Submit</button>
    
   

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
      audioSrc: '', // Path to your audio file
      userInput: '',
      correctAnswer: ['blue','green','gray', 'black'], // here make it as the order of sounds ...
      correctIndex: 0, // Set the expected answer here
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
    let number = this.getRandomInt(13, 16);  // from the number of aduio files 
    const audio = await import(`../../assets/audio/captcha_audio_${number}.mp3`); 
    this.correctIndex = number - 13; 
    //return new URL(`../../assets/audio/Captcha.mp3`, import.meta.url).href;
    return audio.default;
  },
  async refreshCaptchaCode() {
      this.captchaCode = await this.getAudio();  
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
    checkAnswer(color) {
      this.userInput = color;
    },
    validateCaptcha() {
      if (this.userInput.toLowerCase() === this.correctAnswer[this.correctIndex].toLowerCase()) {
        this.gifUrl = successGif; // Set the success GIF
        this.showGif = true;
        this.saveTheTime();
        setTimeout(() => {
          this.showGif = false;
     
        
        this.$router.push('/audioform');
      }, 3000);// Optionally, you can also emit an event or call a method to notify parent component
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
          this.$router.push('/audioform');
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
  top: 70%;
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
margin-bottom: 10px;
margin-top: 20px;

}
.level1:hover{
  cursor: pointer;
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
.captcha-button1 {
font-size: 1rem;
padding: 1rem 2rem;
margin-top: 2rem;
border: none;
border-radius: 5px;
cursor: pointer;
transition: all 0.2s ease-in-out;
background-color: darkblue;
color: #fff;
margin: 10px;
}
.captcha-button2 {
font-size: 1rem;
padding: 1rem 2rem;
margin-top: 2rem;
border: none;
border-radius: 5px;
cursor: pointer;
transition: all 0.2s ease-in-out;
background-color: darkgreen;
color: #fff;
margin: 10px;
}
.captcha-button3 {
font-size: 1rem;
padding: 1rem 2rem;
margin-top: 2rem;
border: none;
border-radius: 5px;
cursor: pointer;
transition: all 0.2s ease-in-out;
background-color: darkgray;
color: #fff;
margin: 10px;
}
.captcha-button4 {
font-size: 1rem;
padding: 1rem 2rem;
margin-top: 2rem;
border: none;
border-radius: 5px;
cursor: pointer;
transition: all 0.2s ease-in-out;
background-color: black;
color: #fff;
margin: 10px;
}
.captcha-button:hover {
   background-color: #0056b3;
 }

 .level1-contianer 
 {

 display: flex;
 justify-content: space-around;
 align-items: center;
 margin-top: 50px;
 margin-bottom: 20px;
 

 }
 .captcha-container
{
background-color: #a8e685;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 100vh;
font-size: 130%;
font-family: 'OpenDyslexic', Arial, sans-serif;
}
.clickable{
  cursor: pointer;
}
.captcha-image {
  margin-bottom: 10px;
  margin: 50px;
  width: 300px;
  height: 80px;
  text-align: center;
  font-size: 50px;
  
}
.active{
  border: 4px solid rgb(250, 181, 6);
}
</style>
