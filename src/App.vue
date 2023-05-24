<template>
  <router-view v-slot="{ Component, route }">
    <Header />
    <MusicPlayer />
    <Transition :enter-active-class="route.meta.enterClass + ''" :leave-active-class="route.meta.leaveClass + ''">
      <div :key="route.fullPath" class="absolute w-full">
        <component :is="Component" :key="route.path" />
      </div>
    </Transition>

  </router-view>
</template>

<script lang="ts">
import Header from './components/Header.vue';
import MusicPlayer from './components/MusicPlayer.vue';
export default {
  components: {
    Header,
    MusicPlayer
  },
  setup() {
    return {}
  }

}
</script>