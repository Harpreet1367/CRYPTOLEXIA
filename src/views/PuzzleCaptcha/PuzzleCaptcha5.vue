<template>
  <div class="match-key-captcha">
    <h1 style="display: flex; justify-content: center; align-items: center; height: 15vh;">
      PUZZLE CAPTCHA {{ numberOfTries }}
    </h1>
    <h2 style="display: flex; justify-content: center; align-items: center; margin-bottom: 20px;">
      Open the lock with the key
    </h2>

    <div class="captcha-container">
      <div
        class="lock"
        :style="{ left: `${lock.left}px`, top: `${lock.top}px` }"
        v-for="(lock, index) in locks"
        :key="index"
        @click="moveKeyToLock(lock)"
      >
        {{ lock.id === matchedLock.id ? '🔒' : '🔓' }}
      </div>
      <div
        class="key"
        :style="{ left: `${keyPosition.left}px`, top: `${keyPosition.top}px` }"
        @click="selectKey"
      >
        🔑
      </div>
    </div>

    <div class="captcha-button-container">
      <button class="captcha-button" @click="checkMatch">Submit</button>
    </div>
    <img v-if="showGif" :src="gifUrl" alt="Alert GIF" class="alert-gif" />
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapActions, mapGetters } from 'vuex';
import successGif from '../../assets/images/verification_success.gif'; // Path to your success GIF
import failureGif from '../../assets/images/verification_failure.gif';

export default {
  data() {
    return {
      keyPosition: { left: 10, top: 200 },
      keySelected: false,
      numberOfTries: 0,
      timerSpent: 0,
      showGif: false,
      gifUrl: '',
      locks: [
        { id: 1, left: 100, top: 50 },
        { id: 2, left: 200, top: 50 },
        { id: 3, left: 300, top: 50 },
      ],
      matchedLock: { id: 2, left: 200, top: 50 }, // Set this to the correct lock position
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
    selectKey() {
      this.keySelected = true; // Set the key as selected
    },
    moveKeyToLock(lock) {
      if (this.keySelected) {
        this.keyPosition.left = lock.left;
        this.keyPosition.top = lock.top;
        this.keySelected = false; // Reset after moving
      }
    },
    checkMatch() {
      const threshold = 10; // Adjust this value based on difficulty
      if (
        Math.abs(this.keyPosition.left - this.matchedLock.left) < threshold &&
        Math.abs(this.keyPosition.top - this.matchedLock.top) < threshold
      ) {
        this.gifUrl = successGif;
        this.showGif = true;
        this.isDragging = true;
        this.saveTheTime();
        setTimeout(() => {
          this.showGif = false;
          this.$router.push('/Rotatingform');
        }, 3000);
        
        
      } else{
        this.gifUrl = failureGif; // Set the failure GIF
        this.showGif = true;
      }
      this.numberOfTries++;
      setTimeout(() => {
          this.showGif = false; // Hide the GIF after 3 seconds
        }, 3000);
        //this.incrementAttempts_text();
          if (this.numberOfTries >= 5) {
            this.$router.push('/Rotatingform');
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

.match-key-captcha {
  text-align: center;
  background-color: #a8e685;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 130%;
  margin-top: auto;
  font-family: 'OpenDyslexic', Arial, sans-serif;
}

.captcha-container {
  position: relative;
  width: 90%;
  max-width: 400px;
  height: 300px;
  margin: 40px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  background-image: url('../../assets/images/key.jpg');
}

.lock, .key {
  position: absolute;
  font-size: 45px;
  cursor: pointer;
}

@media (max-width: 600px) {
  .captcha-container {
    width: 100%;
    height: auto;
  }
}
</style>
