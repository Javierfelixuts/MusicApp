<template>
    <div>
        <MusicList :musicList="musicList"  />
    </div>
 </template>
 
 <script lang="ts">
 import MusicList from '../components/MusicList.vue';
 import { useMusicList } from '../stores/musicList';
 import axios from 'axios';
 import { defineComponent, ref } from 'vue';
 
 export default defineComponent({
   components: {
     MusicList,
   },
   setup(){
    const music = useMusicList();
    const musicList = ref(music.musicListState);

    music.$subscribe((mutation, state) => {
      musicList.value = state.musicListState
    })


    return {musicList}
   }
 });
 
 </script>