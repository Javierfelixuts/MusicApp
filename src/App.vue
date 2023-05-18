<template>
  <router-view v-slot="{ Component, route }">
    <Header />
  <MusicPlayer />
    
    <Transition 
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @leave="onLeave"
      :css="false"
      >
      
      <div :key="route.fullPath" >
        <component :is="Component" :key="route.path" />
      </div>
    </Transition>
    
  </router-view>

</template>

<script lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import gsap from 'gsap'
import Header from './components/Header.vue';
import MusicPlayer from './components/MusicPlayer.vue';
export default {
  components:{
    Header,
    MusicPlayer
  },
  setup(){
    const router = useRoute();
    const oldRoute = ref("");
    const currentRoute = ref("");
    const timeline = gsap.timeline();
    const onBeforeEnter = (el:any) => {
      gsap.to(el, {
        xPercent: 0,
        duration: 0.5,
        y: 1000
      });
    }
    const onEnter = (el:any, done:any) => {
      gsap.to(el,{
        //delay: 1.5,
        duration: 1,
        opacity: 1,
        y: 0,
        onComplete: done,
      })
    }
    const onLeave = (el:any, done:any) => {
      gsap.to(el, {
        //delay: 1.5, //duration between transitions
        duration: .5,
        opacity: 0.5,
        x: 2800,
        onComplete: done
      })
    }

  
    return {
      onLeave,
      onEnter,
      onBeforeEnter
    }
  }
  
}
</script>
<style>
.page{
position: absolute;
}
</style>
