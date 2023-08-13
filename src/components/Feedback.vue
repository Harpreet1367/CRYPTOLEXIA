<script setup>
import {useCounterStore} from '../stores/counter'


const counter = useCounterStore();

const props = defineProps({
    status: Boolean
})

</script>

<template>
  <div class="feedback-container">
    <div >
        <div class="feedback-content-right" v-if="status">
          Congrats!
          <p> your score:  {{ counter.count }}</p>
        </div>
        <div class="feedback-content-wrong" v-else>
            Wrong answer
            <p> your score:  {{ counter.count }}</p>
        </div>
       
    </div>
  </div>
</template>

<style scoped>
.feedback-container {
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Adjust as needed */
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.304);
}

.feedback-content-right {
  /* Additional styling for the centered content */
  border: 3px double #28ABE3;
  padding: 70px 120px;
  background-color: white;
  font-size: 30px;
  text-align: center;
}
.feedback-content-wrong {
  /* Additional styling for the centered content */
  border: 3px double #e33828;
  padding: 70px 120px;
  background-color: white;
  font-size: 30px;
  text-align: center;
}
</style>