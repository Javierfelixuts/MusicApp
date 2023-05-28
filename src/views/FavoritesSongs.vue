<template>
    <div>
        <MusicList :musicList="musicList"/>
    </div>
    <div v-if="musicList.length <= 0" class="text-center">
      No favorite songs
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
            musicList.value = state.musicFavoriteSongs
    })
   
    return {
      musicList
    }
  }
  
});


</script>