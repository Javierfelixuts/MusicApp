import { defineStore } from 'pinia'

export const useControls = defineStore('controls', {
  state: () => {
    return { isGrid: false, }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  /* actions: {
    increment() {
      this.count++
    },
  }, */
})