<template>
    <div>
        <MusicList :musicList="musicList"/>
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
    const musicList = ref(music.getMyFavoriteMusicList())
    music.$subscribe((mutation, state) => {
            console.log("mutation ", mutation);
            musicList.value = state.musicListState;
            console.log("musicList: ", musicList.value)
        })
    return {
      musicList
    }
  }
  
});


</script>