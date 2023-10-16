<template>
    <div>
        <MusicList :musicList="musicList"  />
    </div>
 </template>
 
 <script lang="ts">
 import MusicList from '../components/MusicList.vue';
 import { useMusicList } from '../stores/musicList';

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

    // API for get requests 
    let fetchRes = fetch( 
    "http://127.0.0.1:2222/api/songs"); 
    // fetchRes is the promise to resolve 
    // it by using.then() method 
    fetchRes.then(res => 
        res.json()).then(d => { 
            console.log(d) 
        }) 

 /*    async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
} */
    return {musicList}
   }
 });
 
 </script>