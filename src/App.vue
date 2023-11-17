<template>

  <router-view v-slot="{ Component, route }">
    <Header v-if="route.path !== '/'" />
    
    <MusicPlayer v-if="$route.meta.show" />
    <Transition 
    :enter-active-class="route.meta.enterClass + ''" 
    :leave-active-class="route.meta.leaveClass + ''">
    <div :key="route.fullPath" class="absolute w-full" :class="route.meta.from">
      <component :is="Component" :key="route.path" />
    </div>
  </Transition>
  </router-view>
</template>

<script lang="ts">
import Header from './components/Header.vue';
import MusicPlayer from './components/MusicPlayer.vue';
import { useSongsServerStore } from './stores/musicServerStore';
export default {
  components: {
    Header,
    MusicPlayer
  },
  setup() {
    const musicL = useSongsServerStore();
      musicL.fetchSongs();
    return {
      
    }
  }
}
</script>