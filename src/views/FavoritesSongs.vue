<template>
    <div>
        <MusicList />
    </div>
</template>

<script lang="ts">
import MusicList from '../components/MusicList.vue';

import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    MusicList,
  },
  setup(){
    return {

    }
  }
  
});


</script>