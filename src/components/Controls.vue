<template>
    <!-- Controls order and filter list -->
    <div class="controls mb-6 flex justify-around text-xs">
        <div class="controls-order flex">
            <div @click="makeGrid()" id="iconGrid" 
            :class="[controls.isGrid ? 'text-black': 'text-slate-300']"
            class="cursor-pointer list-detail-icon mr-3 ">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                    <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clip-rule="evenodd" />
                  </svg>
                  
            </div>
            <div @click="makeList()" id="iconList" 
            :class="[controls.isGrid ? 'text-slate-300' : 'text-black']"
            class="cursor-pointer list-detail-icon ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
            </div>
        </div>
        <div class="filter flex items-center text-slate-500">
            <div class="mr-3 ">
                <p>FILTERS</p> 
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
        </div>
    </div>
  </template>
  
  <script lang="ts">
import { useControls } from '../stores/controls';
      
  export default {
      name: 'Controls',
      setup(){
        const controls = useControls()
          const makeGrid = () => {
            controls.$patch({
                isGrid: true,
            })
          }
          const makeList = () => {
            controls.$patch({
                isGrid: false,
            })
          }
          return {
            controls,
              makeGrid,
              makeList
          }
      }
  }
  </script>
  
  <style>

  </style>