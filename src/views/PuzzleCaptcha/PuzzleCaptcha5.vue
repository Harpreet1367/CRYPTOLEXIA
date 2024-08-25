<template>
  <div class="match-key-captcha">
    <h1 style="display: flex; justify-content: center; align-items: center; height: 20vh;">PUZZLE CAPTCHA {{ numberOfTries }}</h1>
    <h2 style="display: flex; justify-content: center; align-items: center; margin-top: 10px; margin-bottom: 40px;">Open the lock with the key</h2>

    <div class="captcha-container">
      <!-- Locks -->
      <div
        v-for="lock in locks"
        :key="lock.id"
        :class="['lock', { selected: selectedLock === lock.id }]" 
        :style="{ left: `${lock.left}px`, top: `${lock.top}px` }"
        @click="selectLock(lock)"
      >
        🔒
      </div>
      <!-- Key -->
      <div
        :class="['key', { selected: selectedKey }]" 
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
import successGif from '../../assets/images/verification_success.gif';
import failureGif from '../../assets/images/verification_failure.gif';

export default {
  data() {
    return {
      keyPosition: { left: 10, top: 200 },
      selectedKey: false,
      selectedLock: null,
      numberOfTries: 0,
      showGif: false,
      gifUrl: '',
      locks: [
        { id: 1, left: 100, top: 50 },
        { id: 2, left: 200, top: 50 },
        { id: 3, left: 300, top: 50 },
      ],
      correctLockId: 2, // Assuming lock with id 2 is the correct one
    };
  },
  methods: {
    selectKey() {
      this.selectedKey = true;
      this.selectedLock = null; // Reset lock selection when key is selected
    },

    selectLock(lock) {
      if (this.selectedKey) {
        this.selectedLock = lock.id;
      }
    },

    checkMatch() {
      if (this.selectedKey && this.selectedLock === this.correctLockId) {
        this.gifUrl = successGif;
        this.showGif = true;
        setTimeout(() => {
          this.showGif = false;
          this.$router.push('/Rotatingform');
        }, 3000);
      } else {
        this.gifUrl = failureGif;
        this.showGif = true;
      }
      this.numberOfTries++;
      setTimeout(() => {
        this.showGif = false;
      }, 6000);
      if (this.numberOfTries >= 5) {
        this.$router.push('/Rotatingform');
      }
    },
  },
};
</script>

<style scoped>
.match-key-captcha {
  text-align: center;
  background-color: #a8e685;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 130%;
  font-family: 'OpenDyslexic', Arial, sans-serif;
}

.captcha-container {
  position: relative;
  width: 90%;
  max-width: 400px;
  height: 300px;
  margin: 20px auto;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  background-image: url('../../assets/images/key.jpg');
}

.lock, .key {
  position: absolute;
  font-size: 45px;
  cursor: pointer;
  transition: border 0.2s;
}

.selected {
  border: 2px solid #ff9800; /* Orange border when selected */
  border-radius: 5px; /* Optional: rounded corners */
}

.alert-gif {
  position: fixed;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  z-index: 1000;
  border-radius: 10px;
}
</style>
