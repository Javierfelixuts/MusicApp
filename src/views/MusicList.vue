<template>
  <div id="main" :class="{ 'grid gridCols1 sm:grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-5': true }"
        class="main mb-12 mb:mb-80">
      <div class="col-start-1 col-end-5 overflow-y-scroll h-4/5">
          <MusicList :musicList="musicServerList"  />
      </div>
    <div class="col-start-5 col-end-13 mx-3">
        <div >
            <!-- Reproductor -->
           <!--  <MusicPlayer  /> -->
        </div>
    </div>
  </div>
 </template>
 
 <script lang="ts">
 import MusicList from '../components/MusicList.vue';
import MusicPlayer from '../components/MusicPlayer.vue';
 import { useMusicList } from '../stores/musicList';
 import { useSongsServerStore } from '../stores/musicServerStore';
 import axios from 'axios';
 import { defineComponent, onMounted, ref } from 'vue';
 
 export default defineComponent({
   components: {
    MusicList,
    MusicPlayer
},
   setup(){
    const music = useMusicList();
    const musicList = ref(music.musicListState);
    const musicServer = useSongsServerStore();
    const musicServerList = ref();
    onMounted(async () => {
      await musicServer.fetchSongs();
      musicServerList.value = musicServer.songs;
      console.log("songs: ", musicServerList.value)
    });
    music.$subscribe((mutation, state) => {
      musicList.value = state.musicListState
    })


    return {musicList, musicServerList}
   }
 });
 
 </script>