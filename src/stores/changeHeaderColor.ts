import { defineStore } from 'pinia'
import { ref } from 'vue';
export const useChangeHeaderColor = defineStore('changeHeaderColor', {
  state(){
    const currentColor = ref("ffsff");
    return {currentColor}
  }
  // could also be defined as
  // state: () => ({ count: 0 })
  /* actions: {
    increment() {
      this.count++
    },
  }, */
})