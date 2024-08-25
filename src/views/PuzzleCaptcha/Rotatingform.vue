<template>
  <div class="feedback-form">
    <h2>FEEDBACK FORM</h2>
    <h3>{{ totalTextPageTimeSpent }}</h3>
    <br/>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="Challenge">
          How challenging do you find this Captcha?
          <span class="required-asterisk">*</span>
        </label>
        <select id="Challenge" v-model="formData.Challenge" :class="{ 'is-invalid': errors.Challenge }">
          <option disabled value="">Please select one</option>
          <option v-for="Challenge in ratings" :key="Challenge" :value="Challenge">{{ Challenge }}</option>
        </select>
        <div v-if="errors.Challenge" class="error-message">{{ errors.Challenge }}</div>
      </div>

      <div class="form-group">
        <label for="EmotionalResponse">
          How you feel while solving this Captcha?
          <span class="required-asterisk">*</span>
        </label>
        <select id="EmotionalResponse" v-model="formData.EmotionalResponse" :class="{ 'is-invalid': errors.EmotionalResponse }">
          <option disabled value="">Please select one</option>
          <option v-for="EmotionalResponse in Emotional" :key="EmotionalResponse" :value="EmotionalResponse">{{ EmotionalResponse }}</option>
        </select>
        <div v-if="errors.EmotionalResponse" class="error-message">{{ errors.EmotionalResponse }}</div>
      </div>
    
      <div class="form-group">
        <label for="SatisfactionLevel">
          Satisfaction Level
          <span class="required-asterisk">*</span>
        </label>
        <select id="SatisfactionLevel" v-model="formData.SatisfactionLevel" :class="{ 'is-invalid': errors.SatisfactionLevel }">
          <option disabled value="">Please select one</option>
          <option v-for="SatisfactionLevel in Satisfaction" :key="SatisfactionLevel" :value="SatisfactionLevel">{{ SatisfactionLevel }}</option>
        </select>
        <div v-if="errors.SatisfactionLevel" class="error-message">{{ errors.SatisfactionLevel }}</div>
      </div>

      <div class="form-group">
        <label for="comments">Suggestions
          <span class="required-asterisk">*</span>
        </label>
        <textarea
          id="comments"
          v-model="formData.comments"
          rows="5"
        ></textarea>
      </div>
      
      <button type="submit">Submit</button>
     
    </form>
    <img v-if="showGif" :src="gifUrl" alt="Alert GIF" class="alert-gif" />
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import axios from 'axios';
import successGif from '../../assets/images/verification_success.gif'; // Path to your success GIF
import failureGif from '../../assets/images/verification_failure.gif';

export default {
  name: 'FeedbackForm',
  
  data() {
    return {
      showGif: false,
      Url: successGif,
      formData: {
        Challenge: '',
        EmotionalResponse: '',
        SatisfactionLevel: '',
        comments: '',
        numberOfAttempts: '',
        timeSpent: this.timeSpent
      },
      errors: {},
      ratings: ['1. Very Hard', '2. Hard', '3. Moderate', '4. Easy', '5. Very Easy'],
      Emotional: ['1. Confident', '2. Overwhelmed', '3. Stressed', '4. Anxious', '5. Depressed'],
      Satisfaction: ['1. Very Satisfied', '2. Satisfied', '3. Neutral', '4. Unsatisfied', '5. Very Unsatisfied'],
    };
  },
  methods: {
    ...mapActions(['visitPage', 'setCurrentPage']),
    async handleSubmit() {
      if (this.validateForm()) {
        try {
          console.log('Submitted Feedback:', this.formData);
          await axios.post('https://captchalexia.preetkaur19.com/api/captcha4', {
            username: this.username,
            time_spent: this.totalPuzzlePageTimeSpent,
            number_of_attempts: this.totalPuzzlePageNumberOfAttempts,
            Challenge: this.formData.Challenge,
            EmotionalResponse: this.formData.EmotionalResponse,
            SatisfactionLevel: this.formData.SatisfactionLevel,
            comment: this.formData.comments
          });

          this.gifUrl = successGif; // Set the success GIF
          this.showGif = true;

          this.resetForm();
          this.visitNextPage();
          setTimeout(() => {
          this.showGif = false;
          this.$router.push({ name: this.getShuffledCaptchaPages[this.getcurrentpage] });
          }, 3000);

//alert('Feedback submitted successfully!');
        } catch (error) {
          alert('Error submitting feedback. Please try again.');
          console.error("Error submitting feedback:", error);
        }
      } else {
        alert('Please fill in all required fields.');
      }
    },
    validateForm() {
      this.errors = {};
      
      if (!this.formData.Challenge) {
        this.errors.Challenge = 'Challenge rating is required.';
      }
      
      if (!this.formData.EmotionalResponse) {
        this.errors.EmotionalResponse = 'Emotional response is required.';
      }
      
      if (!this.formData.SatisfactionLevel) {
        this.errors.SatisfactionLevel = 'Satisfaction level is required.';
      }
      if (!this.formData.comments) {
        this.errors.comments = 'Suggestions level is required.';
      }
      return Object.keys(this.errors).length === 0;
    },
    visitNextPage() {
      this.visitPage('PuzzleCap1');
      this.setCurrentPage();
    },
    resetForm() {
      this.formData = {
        Challenge: '',
        EmotionalResponse: '',
        SatisfactionLevel: '',
        comments: ''
      };
    },
  },
  computed: {
    ...mapState({
      totalPuzzlePageTimeSpent: state => state.PuzzlePageTimeSpent,
      totalPuzzlePageNumberOfAttempts: state => state.PuzzlePageNumberOfAttempts,
    }),
    ...mapGetters(['getUsername', 'getShuffledCaptchaPages', 'getVisitedPages', 'getcurrentpage']),

    username() {
      return this.getUsername;
    },
    numberOfAttempt() {
      return this.getCaptchaAttempts_text;
    },
    timeSpent() {
      return this.totalPuzzlePageTimeSpent;
    }
  }
};
</script>

<style scoped>
.alert-gif {
  position: fixed;
  top: 45%;
  left: 50%;
  bottom: 70%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  z-index: 1000;
  border-radius: 10px;
}
.feedback-form {
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: 20px;
  background-color: white;
  font-size: 20px;
  width: 600px;
}
.form-group {
  margin-bottom: 15px;
  width: 400px;
  text-align: left;
  font-size: 20px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
  width: 500px;
}
.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  font-size: 15px;
}
button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  margin: 8px;
  width: 200px;
  font-size: 20px;
}
button:hover {
  background-color: #38a372;
}
.required-asterisk {
  color: red;
}
.is-invalid {
  border-color: red;
}
.error-message {
  color: red;
  font-size: 14px;
}
</style>
