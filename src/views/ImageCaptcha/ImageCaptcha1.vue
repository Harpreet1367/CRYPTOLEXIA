<template>
  <div class="captcha-container1">
    <h1 style="display: flex; justify-content: center; align-items: center; height: 20vh;">GRID IMAGE CAPTCHA {{ numberOfTries }}</h1>
    <h2 style="display: flex; justify-content: center; align-items: center;">Select the Images of Cars</h2>
    <div class="captcha-container">
      <div class="image-grid">
        <img
          v-for="(image, index) in images"
          :key="index"
          :src="image.url"
          :class="{ selected: selectedImages.includes(index) }"
          @click="toggleSelection(index)"
        />
      </div>
    </div>
      <div class="captcha-button-container">
       
    <button @click="verifyCaptcha" class="captcha-button" >Verify</button>
    
  </div>
  <img v-if="showGif" :src="gifUrl" alt="Alert GIF" class="alert-gif" />
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapActions, mapGetters } from 'vuex';


import url1 from "../../assets/images/Car2.jpg";
import url2 from "../../assets/images/Road2.jpg";
import url3 from "../../assets/images/Bik1.jpg";
import url4 from "../../assets/images/Car1.jpg";
import url5 from "../../assets/images/Bik3.jpg";
import url6 from "../../assets/images/Road1.jpg";
import url7 from "../../assets/images/Car3.jpg";
import url8 from "../../assets/images/Road3.jpg";
import url9 from "../../assets/images/Car4.jpg";
import successGif from '../../assets/images/verification_success.gif'; // Path to your success GIF
import failureGif from '../../assets/images/verification_failure.gif';
export default {
 
  data() {
    return {
      images: [
        { url: url1 }, // Add your image URLs here
        { url: url2 },
        { url: url3 },
        { url: url4 },
        { url: url5 },
        { url: url6 },
        { url: url7 },
        { url: url8 },
        { url: url9 },
      ],
      selectedImages: [],
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
  methods: {
    ...mapActions(['updateImagePageTimeSpent','updateImagePageNumberOfAttempts','incrementAttempts_text']),
    generateCaptcha() {
      // Select a random subset of images as the CAPTCHA challenge
      /*this.selectedImages = [];
      const numImages = 3; // Number of images to select
      while (this.selectedImages.length < numImages) {
        const randomIndex = Math.floor(Math.random() * this.images.length);
        if (!this.selectedImages.includes(randomIndex)) {
          this.selectedImages.push(randomIndex);
        }
      }*/
    },
    saveTheTime() {
      this.updateImagePageTimeSpent(this.timerSpent);
      this.updateImagePageNumberOfAttempts(this.numberOfTries);

    },
    startTimer() {
      this.timer = setInterval(() => {
        this.timerSpent = Math.floor((new Date() - this.entryTime) / 1000);
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.timer);
    },
    toggleSelection(index) {
      const selectedIndex = this.selectedImages.indexOf(index);
      if (selectedIndex === -1) {
        this.selectedImages.push(index);
      } else {
        this.selectedImages.splice(selectedIndex, 1);
      }
    },
    verifyCaptcha() {

      // Replace this with your own logic to verify the user's selection against the CAPTCHA
      // For simplicity, we'll assume the user's selection matches the CAPTCHA for any image
      this.clickedtoVerification = true;
      let rightIndex = [0, 3, 6, 7, 8];

      let arraysAreEqual = JSON.stringify(rightIndex.sort()) === JSON.stringify(this.selectedImages.sort());

      if (arraysAreEqual) {
        this.gifUrl = successGif; // Set the success GIF
        this.showGif = true;
        this.showSuccess = true;
        this.saveTheTime(); 

        setTimeout(() => {
          this.showGif = false;
        this.$router.push('/ImageCaptcha2');
        }, 3000);

      } else {
        this.gifUrl = failureGif; // Set the failure GIF
        this.showGif = true; 
       
        this.userInput = "";

        setTimeout(() => {
          this.showGif = false; // Hide the GIF after 3 seconds
        }, 3000);
      }
      
      this.numberOfTries++;
          if (this.numberOfTries >= 5)
           {
            this.$router.push('/ImageCaptcha2');
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
.captcha-container1
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
.captcha-container
 {
    text-align: center;
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
    
  }
.image-grid {
  width: min-content;
  display: grid;
  grid-template-columns: repeat(
    3,
    1fr
  ); /* Adjust the number of columns as needed */
  gap: 4px; /* Adjust the gap between images as needed */
}

.image-grid img {
  width: 150px; /* Make images fill the grid cell */
  height: 100px;
  border: 5px solid #ccc;
  cursor: pointer;
}

.image-grid img.selected {
  border-color: blue; /* Style selected images differently */
}
.captcha-button-container {
   
  width: auto;
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