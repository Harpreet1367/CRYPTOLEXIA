<template>
  <div class="slider-captcha">
    <h1 style="display: flex; justify-content: center; align-items: center; height: 20vh;">PUZZLE CAPTCHA {{ numberOfTries }}</h1>
    <h2 style="display: flex; justify-content: center; align-items: center;margin-bottom: 20px;">Drag the slider to complete the puzzle</h2>
    <div class="captcha-container">
      <img :src="puzzleImage" alt="Puzzle" class="captcha-image" />
      <div
        class="puzzle-piece"
        :style="{
          left: `${puzzlePieceX}px`,
          top: `-3px`,
          backgroundImage: `url(${puzzlePiece})`,
        }"
      ></div>
      <div
        class="puzzle-slot"
        :style="{ left: `185px`, top: `-5px` }"
      ></div>
    </div>
    <div class="slider-container">
      <div class="slider">
        <div class="slider-bar" :style="{ width: `${sliderWidth}px` }"></div>
        <div
          class="slider-button"
          :style="{ left: `${sliderWidth}px` }"
          @mousedown="startDrag"
          @touchstart="startDrag"
        ></div>
      </div>
      <div class="slider-text" v-if="!verified && !error">Drag the slider to complete the puzzle</div>
      <div class="slider-text success" v-if="verified">Verified</div>
      <div class="slider-text error" v-if="error">Incorrect, try again</div>
    </div>
    <div class="captcha-button-container">
      
      
      
      </div>
      <img v-if="showGif" :src="gifUrl" alt="Alert GIF" class="alert-gif" />
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions , mapState, mapGetters} from 'vuex';
import puzzleImage from '../../assets/images/puzzle_image.jpg';
import puzzlePiece from '../../assets/images/puzzle_piece.jpg';
import successGif from '../../assets/images/verification_success.gif'; // Path to your success GIF
import failureGif from '../../assets/images/verification_failure.gif';
export default {
  data() {
    return {
      isDragging: false,
      startX: 0,
      sliderWidth: 0,
      maxSliderWidth: 250, // Maximum slider width in pixels
      puzzlePieceX: 0,
      puzzlePieceY: 45, // Y position of the puzzle piece
      puzzleImage, // Path to the main puzzle image
      puzzlePiece, // Path to the puzzle piece image
      pieceWidth: 40, // Width of the puzzle piece
      targetPosition: 180, // Target position to align the piece
      threshold: 10, // Tolerance for verification in pixels
      verified: false,
      error: false,
      timerSpent: 0,
      numberOfTries: 0,
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
  
  computed: {
    ...mapGetters(['getShuffledCaptchaPages']),
    ...mapState({
      attempts: (state) => state.captchaAttempts_text,
    }),
  },
  methods: {
    ...mapActions(['updatePuzzlePageTimeSpent','updatePuzzlePageNumberOfAttempts','incrementAttempts_text']),

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
    startDrag(event) {
      if (this.verified) return;
      this.isDragging = true;
      this.startX = event.clientX || event.touches[0].clientX;
      document.addEventListener('mousemove', this.onDrag);
      document.addEventListener('touchmove', this.onDrag);
      document.addEventListener('mouseup', this.stopDrag);
      document.addEventListener('touchend', this.stopDrag);
    },
    onDrag(event) {
      if (!this.isDragging) return;
      const currentX = event.clientX || event.touches[0].clientX;
      const moveX = currentX - this.startX;
      if (moveX >= 0 && moveX <= this.maxSliderWidth) {
        this.sliderWidth = moveX;
        this.puzzlePieceX = moveX;
      }
    },
    stopDrag() {
      if (!this.isDragging) return;
      this.isDragging = false;
      document.removeEventListener('mousemove', this.onDrag);
      document.removeEventListener('touchmove', this.onDrag);
      document.removeEventListener('mouseup', this.stopDrag);
      document.removeEventListener('touchend', this.stopDrag);
      this.verifyPosition();
    },
    verifyPosition() {
      if (Math.abs(this.puzzlePieceX - this.targetPosition) <= this.threshold) {
        this.gifUrl = successGif; // Set the success GIF
        this.showGif = true;
        this.saveTheTime();
        this.error = false;
        setTimeout(() => {
        this.showGif = false; 
        this.$router.push('/PuzzleCaptcha3');
        }, 3000);
      } else {
        this.gifUrl = failureGif; // Set the failure GIF
        this.showGif = true; 
        this.resetPuzzle();
      }
      this.numberOfTries++;
      setTimeout(() => {
          this.showGif = false; // Hide the GIF after 3 seconds
        }, 6000);
        //this.incrementAttempts_text();
          if (this.numberOfTries >= 5) {
            this.$router.push('/PuzzleCaptcha3');
          }
    },
    resetPuzzle() {
      setTimeout(() => {
        this.sliderWidth = 0;
        this.puzzlePieceX = 0;
        this.error = false;
      }, 1000);
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
.slider-captcha {
  background-color: #a8e685;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 70vh;
    font-size: 130%;
    font-family: 'OpenDyslexic', Arial, sans-serif;
}
.captcha-container {
  position: relative;
  width: 300px;
  height: 150px;
  margin-bottom: 20px;
}
.captcha-image {
  width: 300px;
  height: 200px;
  object-fit: cover;
  margin-bottom: 50px;
}
.puzzle-piece {
  position: absolute;
  width: 48px; /* Width of the puzzle piece */
  height: 48px; /* Height of the puzzle piece */
  background-color: transparent;
  border: 2px solid #4caf50;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  background-size: cover; /* Adjust background size to fit the piece */
  transition: left 0.3s;
}
.puzzle-slot {
  position: absolute;
  width: 50px; /* Width of the puzzle slot */
  height: 50px; /* Height of the puzzle slot */
  border: 2px dashed #ccc;
  border-radius: 5px;
  top: 30px; /* Vertical position of the slot */
}
.slider-container {
  width: 300px;
}
.slider {
  position: relative;
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: #f7f7f7;
  overflow: hidden;
  margin-bottom: 10px;
}
.slider-bar {
  position: absolute;
  height: 100%;
  background-color: green;
  transition: width 0.3s;
}

.slider-button {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: green;
  cursor: pointer;
  transition: left 0.3s;
}
.slider-text {
  font-size: 14px;
  color: #666;
  text-align: center;
}
.slider-text.success {
  color: #4caf50;
}
.slider-text.error {
  color: #ff0000;
}
</style>
