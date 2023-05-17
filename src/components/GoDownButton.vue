<template>
    <!-- Icon Arrow Down -->
    <div @click="goBottom()"  class="w-full flex pb-5 backdrop-opacity-25 bg-gradient-to-t from-slate-200 to-bg-transparent justify-center fixed bottom-0 z-40">
        <div class="arrow p-4 text-sm text-white rounded-full bg-purple-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3">
                <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clip-rule="evenodd" />
              </svg>
        </div>
    </div>
  </template>
  
  <script lang="ts">
  import { onMounted, nextTick } from 'vue';
  import { useMusicPlayer } from '../stores/musicPlayer';
  
  export default {
      name: 'GoDownButton',
      setup(){
        const player = useMusicPlayer();

        onMounted(() => {
          let scroll = window.screen;
          console.log("scroll: ", scroll)
        })
        const goBottom = () => {
            window.scroll({ top: 9000, behavior: 'smooth' });
        }
        const goUp = () => {
            window.scroll({ top: 0, behavior: 'smooth' });
        }
        player.$subscribe(async (mutation, state) => {

          await nextTick();
          if(state.isOpen){
            goBottom()
          }
          console.log("player from gotToDown: ", mutation ,state);
        });


        

        
  
          return {
            goBottom,
            goUp
          }
      }
  }
  </script>
  
  <style>

  </style>