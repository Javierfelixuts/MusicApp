import { defineStore } from 'pinia'
 
export const useMusicPlayer = defineStore('musicPlayer', {
  state: () => {
    return { isOpen: false, id: 0, }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  /* actions: {
    increment() {
      this.count++
    },
  }, */
})