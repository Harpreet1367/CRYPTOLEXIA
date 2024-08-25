<template>
  <div class="username-page">
    <h1>Enter Your Details</h1>
    <form @submit.prevent="submitDetails">
      <input
        type="text"
        v-model="username"
        placeholder="Username"
        required
      />
      <select v-model="gender" required>
        <option value="" disabled>Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <select v-model="School" required>
        <option value="" disabled>Select School Name</option>
        <option value="M.G.N Public School">M.G.N Public School</option>
        <option value="G.T.B Public School">G.T.B Public School</option>
        <option value="Army Public School">Army Public School</option>
        <option value="Sacred Heart Public School">Sacred Heart Public School</option>
        <option value="Kohinoor International School">Kohinoor International School</option>
        <option value="other">Other</option>
      </select>

      <button type="submit">Submit</button>
     
    </form>
    <img  v-if="showGif" :src="Url" alt="Alert GIF" class="alert-gif" /> 
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
import successGif from '../../assets/images/verification_success.gif'; // Path to your success GIF
import failureGif from '../../assets/images/verification_failure.gif';
export default {
  data() {
    return {
      showGif: false,
      Url: successGif,
      username: '', 
      gender: '',
      School: '',
      submitted: false
    };
  },
  methods: {
    ...mapActions(['updateUsername', 'shuffleCaptchaPages', 'setCurrentPage']),
    shufflePages() {
      this.shuffleCaptchaPages();
    },
    saveUsername() {
      this.updateUsername(this.username);
    },
    async submitDetails() {
      try {
        this.submitted = true;
        const response = await axios.post('https://captchalexia.preetkaur19.com/api/username', {
          username: this.username,
          gender: this.gender,
          School: this.School
        });

        this.gifUrl = successGif; // Set the success GIF
        this.showGif = true;

        this.saveUsername();
        this.setCurrentPage();

        setTimeout(() => {
          this.showGif = false;
        this.$router.push({ name: this.getShuffledCaptchaPages[this.getcurrentpage] });
        }, 5000);

       
        this.username = '';
        this.gender = '';
        this.School = '';
        console.log("Submitted details:", {
          username: this.username,
          gender: this.gender,
          School: this.School
        });
         //alert('Feedback submitted successfully!');
      } catch (error) {
        alert('Error submitting form. Please try again.');
        console.error("Error submitting details:", error);
      }
    }
  },
  computed: {
    ...mapGetters(['getShuffledCaptchaPages', 'getcurrentpage']),
  },
  created() {
    this.shuffleCaptchaPages();
  }
};
</script>

<style scoped>
.alert-gif {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  z-index: 1000;
  border-radius: 20px;
 
}
.username-page {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.username-page h1 {
  margin-bottom: 20px;
  color: #333333;
  font-size: 30px;
  font-weight: 600;
}
.username-page form {
  display: flex;
  flex-direction: column;
}
.username-page input,
.username-page select {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 300px;
}
.username-page button {
  padding: 12px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  transition: background-color 0.3s;
  width: 200px;
}
.username-page button:hover {
  background-color: #0056b3;
}
.username-page router-link button {
  margin-top: 10px;
}
</style>
