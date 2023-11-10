import { defineStore } from 'pinia'
import { ref } from 'vue';
export const useSongsServerStore = defineStore('songsServerStore', {
  state(){
    const songs = ref([]);
    const songsServer = ref([]);
    const isSongFromServer= ref([]);
    const isSongFromServer= ref([]);
    
    const currentColor = ref("ffff");
    async function fetchSongs() {
        // Realiza una solicitud a tu API para obtener las canciones
        const response = await fetch('http://127.0.0.1:2222/api/songs/');
        const data = await response.json();
        console.log("data: ", data);
        songs.value = data; // Actualiza el estado con los datos de la API
    }

    return {currentColor, songs, fetchSongs}
  }
  // could also be defined as
  // state: () => ({ count: 0 })
  /* actions: {
    increment() {
      this.count++
    },
  }, */
})