// src/store.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    username: '',
    captchaAttempts_text: 0,
    captcha_pages:['ImageCap1','TextCap1','PuzzleCap1','AudioCap1'],
    shuffled_captcha_pages: [],
    currentpage:-1,
    visited_pages: [], // New state to keep track of visited pages
    end_page: 'end', // The end page route
    ImagePageTimeSpent: 0,
    ImagePageNumberOfAttempts: 0,  ///for Image where are the others 
    TextPageTimeSpent: 0,
    TextPageNumberOfAttempts: 0,  //for Image
    AudioPageTimeSpent: 0,
    AudioPageNumberOfAttempts: 0,  //for Image
    PuzzlePageTimeSpent: 0, 
    PuzzlePageNumberOfAttempts: 0 //for Image
  },
  mutations: {
    SET_SHUFFLED_CAPTCHA_PAGES(state, shuffledPages) {
      state.shuffled_captcha_pages = shuffledPages;
    },
    ADD_VISITED_PAGE(state, page) {
      if (!state.visited_pages.includes(page)) {
        state.visited_pages.push(page);
      }
    },
    SET_CURRENT_PAGE(state, page) {
      state.currentpage += 1;
    },
    setUsername(state, username) {
      state.username = username;
    },
    incrementAttempts_text(state) {
      state.captchaAttempts_text += 1;
    },
    SET_IMAGE_PAGE_TIME_SPENT(state, payload) {  //for Image
      state.ImagePageTimeSpent += payload;
    },
    SET_IMAGE_PAGE_NUMBER_OF_ATTEMPTS(state, payload) {  //for Image
      state.ImagePageNumberOfAttempts += payload;
    },
    SET_TEXT_PAGE_TIME_SPENT(state, payload) {  //for Image
      state.TextPageTimeSpent += payload;
    },
    SET_TEXT_PAGE_NUMBER_OF_ATTEMPTS(state, payload) {  //for Image
      state.TextPageNumberOfAttempts += payload;
    },
    SET_AUDIO_PAGE_TIME_SPENT(state, payload) {  //for Image
      state.AudioPageTimeSpent += payload;
    },
    SET_AUDIO_PAGE_NUMBER_OF_ATTEMPTS(state, payload) {  //for Image
      state.AudioPageNumberOfAttempts += payload;
    },
    SET_PUZZLE_PAGE_TIME_SPENT(state, payload) {  //for Image
      state.PuzzlePageTimeSpent += payload;
    },
    SET_PUZZLE_PAGE_NUMBER_OF_ATTEMPTS(state, payload) {  //for Image
      state.PuzzlePageNumberOfAttempts += payload;
    },
  },
  actions: {
    
    shuffleCaptchaPages({ commit, state }) {
      const shuffledPages = [...state.captcha_pages];
      for (let i = shuffledPages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledPages[i], shuffledPages[j]] = [shuffledPages[j], shuffledPages[i]];
      }
      shuffledPages.push(state.end_page);
      commit('SET_SHUFFLED_CAPTCHA_PAGES', shuffledPages);
    },
    visitPage({ commit, state }, page) {
      commit('ADD_VISITED_PAGE', page);
      //if (state.visited_pages.length === state.captcha_pages.length) {
        // All pages visited, navigate to end page
       // this.$router.push({ name: state.end_page });
      //}
    },

    setCurrentPage({ commit }, page) {
      commit('SET_CURRENT_PAGE', page);
    },

    updateUsername({ commit }, username) {
      commit('setUsername', username);
    },
    incrementAttempts_text({ commit }) {
      commit('incrementAttempts_text');
    },
    updateImagePageTimeSpent({ commit }, time) { //for Image
      commit('SET_IMAGE_PAGE_TIME_SPENT', time);
    },
    updateImagePageNumberOfAttempts({ commit }, Num) { //for Image
      commit('SET_IMAGE_PAGE_NUMBER_OF_ATTEMPTS', Num);
    },
    updateTextPageTimeSpent({ commit }, time) { //for Image
      commit('SET_TEXT_PAGE_TIME_SPENT', time);
    },
    updateTextPageNumberOfAttempts({ commit }, Num) { //for Image
      commit('SET_TEXT_PAGE_NUMBER_OF_ATTEMPTS', Num);
    },
    updateAudioPageTimeSpent({ commit }, time) { //for Image
      commit('SET_AUDIO_PAGE_TIME_SPENT', time);
    },
    updateAudioPageNumberOfAttempts({ commit }, Num) { //for Image
      commit('SET_AUDIO_PAGE_NUMBER_OF_ATTEMPTS', Num);
    },
    updatePuzzlePageTimeSpent({ commit }, time) { //for Image
      commit('SET_PUZZLE_PAGE_TIME_SPENT', time);
    },
    updatePuzzlePageNumberOfAttempts({ commit }, Num) { //for Image
      commit('SET_PUZZLE_PAGE_NUMBER_OF_ATTEMPTS', Num);
    },
  },
  getters: {
    getUsername: state => state.username,
    getCaptchaAttempts_text: (state) => state.captchaAttempts_text,
    getShuffledCaptchaPages: state => state.shuffled_captcha_pages,
    getVisitedPages: state => state.visited_pages,
    allPagesVisited: state => state.visited_pages.length === state.captcha_pages.length,
    getcurrentpage: state => state.currentpage
  }
});
