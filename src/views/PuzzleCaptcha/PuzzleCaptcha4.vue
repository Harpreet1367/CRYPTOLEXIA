
<template>
  
  <div id="app">
    <h1 style="display: flex; justify-content: center; align-items: center; height: 20vh; ">PUZZLE CAPTCHA {{ numberOfTries }}</h1>
    <h2 style="display: flex; justify-content: center; align-items: center;">Please Shuffle the Puzzle</h2>
   
    <div class="puzzle-container">
      <div
        v-for="(piece, index) in pieces"
        :key="index"
        class="puzzle-piece"
        :style="getPieceStyle(index)"
        @click="rotatePiece(index)"
      ></div>
    </div>
    <div class="captcha-button-container">
    <button class="captcha-button" @click="checkSolution">Submit</button>
    
</div>
   <div class="result" v-if="resultMessage">{{ resultMessage }}</div>
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
      size: 3, 
      numberOfTries: 0,
      timerSpent: 0,// 3x3 puzzle
      pieces: Array.from({ length: 9 }, (_, index) => ({
        index,
        rotation: Math.floor(Math.random() * 4) * 90 // Random initial rotation
      })),
      correctOrientations: Array.from({ length: 9 }, () => 0), // Correct orientations are 0 degrees
      resultMessage: '',
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
    this.images = await this.getImage();
  },
  computed: {
    ...mapGetters(['getShuffledCaptchaPages']),
    ...mapState({
      attempts: (state) => state.captchaAttempts_text,
    }),
  },
  methods: {
    ...mapActions(['updatePuzzlePageTimeSpent','updatePuzzlePageNumberOfAttempts','incrementAttempts_text']),
    getPieceStyle(index) {
      const piece = this.pieces[index];
      const row = Math.floor(piece.index / this.size);
      const col = piece.index % this.size;
      return {
        width: `${100 / this.size}%`,
        height: `${100 / this.size}%`,
        backgroundImage: 'url(https://images.unsplash.com/photo-1560807707-8cc77767d783?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=800)', // Image of a puppy
        backgroundSize: '300px 300px',
        backgroundPosition: `-${col * 100}px -${row * 100}px`,
        transform: `rotate(${piece.rotation}deg)`,
        position: 'absolute',
        top: `${row * (100 / this.size)}%`,
        left: `${col * (100 / this.size)}%`,
        transition: 'transform 0.3s'
      };
    },
    rotatePiece(index) {
      this.pieces[index].rotation = (this.pieces[index].rotation + 90) % 360;
    },
    saveTheTime() {
      this.updatePuzzlePageTimeSpent(this.timerSpent);
      this.updatePuzzlePageNumberOfAttempts(this.numberOfTries);
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.timerSpent = Math.floor((new Date() - this.entryTime) / 1000);
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.timer);
    },

    checkSolution() {
      const isSolved = this.pieces.every(
        (piece, index) => piece.rotation === this.correctOrientations[index]
      );
      if(isSolved){
        this.gifUrl = successGif; // Set the success GIF
        this.showGif = true; 
        this.saveTheTime();
        setTimeout(() => {
          this.showGif = false;
        this.$router.push('/PuzzleCaptcha5');
        }, 3000);
      }
      else{
        this.gifUrl = failureGif; // Set the failure GIF
        this.showGif = true; 
      }
      //this.resultMessage = isSolved ? 'Captcha solved!' : 'Captcha not solved. Please try again.';
      //this.numberOfTries++;
          //this.incrementAttempts_text();
          this.numberOfTries++;
          setTimeout(() => {
          this.showGif = false; // Hide the GIF after 3 seconds
        }, 6000);
      if (this.numberOfTries >= 5) {
        this.$router.push('/PuzzleCaptcha5');
      }
    }
    
  }
};
</script>

<style>
.alert-gif {
  position: fixed;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  z-index: 1000;
  border-radius: 10px;
}
#app {
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
  .captcha-button-container 
  {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  .captcha-button:hover {
    background-color: #0056b3;
  }
.puzzle-container {
  position: relative;
  width: 300px;
  height: 300px;
  margin: 0 auto;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  text-align: center;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.puzzle-piece {
  position: absolute;
  cursor: pointer;
  box-sizing: border-box;
  border: 1px solid #ddd;
  background-color: #fff;
  transition: background-color 0.3s, transform 0.3s;
}

.puzzle-piece:hover {
  background-color: #e0e0e0;
}



.result {
  margin-top: 20px;
  font-size: 1.5em;
  color: green;
}
</style>
