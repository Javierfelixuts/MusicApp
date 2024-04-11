<template>
<div class="h-screen">

  <router-view v-slot="{ Component, route }">
    <Header v-if="route.path !== '/'" />
    
    <div id="main" :class="{ 'grid gridCols1 sm:grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-5': true }"
        class="main mb-12 mb:mb-80">
        <div class="col-start-1 col-end-5 overflow-y-scroll h-4/5">
          <Transition 
            :enter-active-class="route.meta.enterClass + ''" 
            :leave-active-class="route.meta.leaveClass + ''">
              <div :key="route.fullPath" class="absolute w-full" :class="route.meta.from">
                <component :is="Component" :key="route.path" />
              </div>
          </Transition>
        </div>
  </div>

</router-view>
</div>

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