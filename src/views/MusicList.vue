<template>
    <div>
        <MusicList :musicList="musicServerList"  />
    </div>
 </template>
 
 <script lang="ts">
 import MusicList from '../components/MusicList.vue';
 import { useMusicList } from '../stores/musicList';
 import { useSongsServerStore } from '../stores/musicServerStore';
 import axios from 'axios';
 import { defineComponent, onMounted, ref } from 'vue';
 
 export default defineComponent({
   components: {
     MusicList,
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