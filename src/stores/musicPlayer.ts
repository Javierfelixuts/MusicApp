import { defineStore } from 'pinia'
import { Song } from '../types/Song';
export const useMusicPlayer = defineStore('musicPlayer', {
  
  state: () => {
    return { isOpen: false, id: 0, song: {} as Song }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  /* actions: {
    increment() {
      this.count++
    },
  }, */
})