import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
 
  function increment() {
    count.value += 10
  }
  function decrement() {
    count.value -= 10
    if(count.value < 0){
      count.value = 0
    }
  }

  return { count, increment, decrement }
})
