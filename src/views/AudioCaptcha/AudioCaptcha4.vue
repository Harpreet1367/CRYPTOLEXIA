

  <template>
  <div class="captcha-container">
    <h1 style="display: flex; justify-content: center; align-items: center; height: 20vh;">AUDIO CAPTCHA {{ numberOfTries }}</h1>
    <h2>Listen to the audio and select which animal voice you hear</h2>
    <div class="help1-container">
      <div @click="playAudio" class="clickable">
        <img class="level1" :src=imagesUrl />
        <audio ref="audioElement" controls style="display: none">
          <source :src="audioSrc" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <div class="level1-container">
        <!-- Dropdown List -->
        <select v-model="userInput" @change="handleSelectChange" class="dropdown">
          <option class="option" v-for="option in options" :key="option.value" :value="option.value">{{ option.text }}</option>
        </select>
      </div>
      
      <div class="captcha-button-container">
        <button @click="checkAnswer" class="captcha-button">Submit</button>
      </div>
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
      correctAnswer: ['Bee','Cat','Cow', 'Dogs', 'Donkey', 'Elephant', 'Hen'], // here make it as the order of sounds ...
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
      options: [
       
        { value: 'Bee', text: 'Bee' },
        { value: 'Donkey', text: 'Donkey' },
        { value: 'Dogs', text: 'Dogs' },
        { value: 'Cat', text: 'Cat' },
        { value: 'Hen', text: 'Hen' },
        { value: 'Cow', text: 'Cow' },
        { value: 'Elephant', text: 'Elephant' }
      ]

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
    let number = this.getRandomInt(6, 12);  
    const audio = await import(`../../assets/audio/captcha_audio_${number}.mp3`); 
    this.correctIndex = number-6;
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
    checkAnswer() {
      if (this.userInput.toLowerCase() === this.correctAnswer[this.correctIndex].toLowerCase()) {
       
        this.gifUrl = successGif; // Set the success GIF
        this.showGif = true;
        this.saveTheTime();
        setTimeout(() => {
          this.showGif = false;
        
        
        this.$router.push('/AudioCaptcha5');
      }, 3000);// Optionally, you can also emit an event or call a method to notify parent component
      } else {
        // CAPTCHA failed, you can handle this case accordingly
        this.gifUrl = failureGif; // Set the failure GIF
        this.showGif = true; 
        this.changeAudioSrc();
        this.userInput = "";

        setTimeout(() => {
          this.showGif = false; // Hide the GIF after 3 seconds
        }, 3000);

        this.numberOfTries++;
        if (this.numberOfTries >= 5) 
        {
          this.$router.push('/AudioCaptcha5');
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
font-size: 130%;
font-family: 'OpenDyslexic', Arial, sans-serif;
}
.clickable{
  cursor: pointer;
}
.dropdown {
  width: 200px;
  height: 38px;
  }
  .option{
    font-size: 21px;
    font-weight: 400;
  }
</style>