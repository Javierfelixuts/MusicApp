<template>
    <div id="reproductor" class="w-full z-10" style="position: fixed; bottom: 0">
        <div class="flex items-center justify-center bg-red-lightest">
            <div class="bg-white shadow-lg rounded-lg z-10 w-full">
                <div class="flex" style="padding-top: 20px;">
                    <img class="hidden object-contain h-48 w-96 rounded md:block ml-5" src="https://tailwindcss.com/img/card-top.jpg" alt="Album Pic">
                    <img class="block md:hidden rounded ml-3 mt-3" style="height: 50px;" src="https://tailwindcss.com/img/card-top.jpg" alt="Album Pic">
                    <div class="w-full px-4 py-1">
                        
                        <div class="flex justify-between">
                            <div class="text-red-lighter">
                                <IconHeart 
                                :key="render"
                                :songId="currentSongId"
                                />
                            </div>
                        </div>
                        <div class="flex justify-between items-center mt-2">
                           
                            
                            
                            <div @click="pause" v-if="!canPlay" id="pause_song"
                                class="text-white p-4 rounded-full bg-rose-500 shadow-lg cursor-pointer"
                               :style="{'background-color': colorHeader}">
                                <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20">
                                    <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
                                </svg>
                            </div>
                            <div @click="play" v-if="!canPause" id="play_song"
                                class="text-white p-4 rounded-full bg-rose-500 shadow-lg cursor-pointer"
                               :style="{'background-color': colorHeader}">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="w-8 h-8">
                                    <path fill-rule="evenodd"
                                        d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                                        clip-rule="evenodd" />
                                </svg>

                            </div>
                            
                            <div id="loop_song" @click="loopSong()" :style="colorStorage" class="text-slate-900 p-2 rounded cursor-pointer">
                                <svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20">
                                    <path
                                        d="M5 4a2 2 0 0 0-2 2v6H0l4 4 4-4H5V6h7l2-2H5zm10 4h-3l4-4 4 4h-3v6a2 2 0 0 1-2 2H6l2-2h7V8z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mx-8 py-4">
                    <div class="flex justify-between text-sm text-grey-darker">
                        <p ref="currentTimeLabel" id="currentime">0:00</p>
                        <p ref="durationSongLabel" id="durationSong">0.00</p>
                    </div>
                    <div class="mt-1">
                        <input
                        @change="changeProgresBarPlayer"
                        @input="updateProgessBarPlayer"
                        class="w-full in-range:border-green-500" type="range" min="0" max="100" 
                        :value="progresBarPlayer" id="progressBar"
                        
                         />

                        <!-- <div id="containerTimeline" class="flex items-center h-1 bg-grey-dark rounded-full">
                          <div id="timeline" class="w-0 h-1 bg-red-500 rounded-l-lg  relative" style="width: 100%;"></div>
                          <div id="timelineBall" class="w-4 h-4 bg-pink-400 rounded-full shadow"></div>
                      </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive, ref } from 'vue';

import IconHeart from './icons/IconHeart.vue';
import { useChangeHeaderColor } from '../stores/changeHeaderColor';

export default defineComponent({
    name: 'PlayerServer',
    components: {
        IconHeart
    },
    props: ['urlSong'],
    setup(props) {
        const render = ref(0);
        const progresBarPlayer = ref<null | number>(0);
        const dragInputRangeProgress = ref(false);

        //console.log("player: ", player); runtime-core.esm-bundler.js:40 [Vue warn]: The `compilerOptions` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, `compilerOptions` must be passed to `@vue/compiler-dom` in the build setup instead.
        const audioPlayer =  ref<HTMLAudioElement | null>(null);
        const canPlay = ref(false);
        const canPause = ref(true);
        const currentSong  = ref();
        const currentSongId = ref(0);
        const currentTimeLabel = ref<HTMLParagraphElement | null>(null);
        const durationSongLabel = ref<HTMLParagraphElement | null>(null);
        const loop = ref(false);

        const colorStorage = reactive({backgroundColor: 'initial', color: 'black'})
        const colorHeader = ref(localStorage.getItem("currentColor") || '');
        const useChangeColor = useChangeHeaderColor();

        const songUrl = ref(props.urlSong);
        
        function changeProgresBarPlayer(event: any){
            console.log(event.target.value);
            
                if(audioPlayer.value !== null && event.target !== null){
                let duration = audioPlayer.value?.duration || 1;
                const percentage = (Number(event.target?.value) / 100) * duration;
                audioPlayer.value.currentTime = percentage;
                if(!canPlay){
                    audioPlayer.value.play();
                }
            }
            dragInputRangeProgress.value = false;
            
        }

        function updateProgessBarPlayer(event: any){
            dragInputRangeProgress.value = true;
            console.log("event: ", event); 
            console.log("dragInputRangeProgress: ", dragInputRangeProgress.value); 
        }
        onMounted(() => {
            audioPlayer.value = new Audio(props.urlSong);
            console.log("audioPlayer: ", audioPlayer);
            audioPlayer.value.ontimeupdate = function(){
                let duration = audioPlayer.value?.duration || 1;

                let currentTime = audioPlayer.value?.currentTime || 1;

                const percentage = (currentTime / duration) * 100;
                if(dragInputRangeProgress.value){
                    progresBarPlayer.value = null;

                }
                else{
                    progresBarPlayer.value = percentage;
                }
                if(currentTimeLabel.value != null && durationSongLabel.value != null){
                    currentTimeLabel.value.innerText = intToTime(Math.floor(currentTime)).toString();
                    durationSongLabel.value.innerText = intToTime(Math.floor(duration)).toString();
                }
            }

        });

        onUnmounted(() => {
            audioPlayer.value?.pause();
        });

        useChangeColor.$subscribe((mutation, state) => {
            if(audioPlayer.value != null){
                
                colorHeader.value = state.currentColor;
                if(audioPlayer.value.loop){
                    colorStorage.backgroundColor = state.currentColor;
                }
            }
        })

       

       

        const pause = () => {
            canPlay.value = true;
            canPause.value = false;
            audioPlayer.value?.pause();

        }
        const play = () => {
            canPause.value = true;
            canPlay.value = false;
            //console.log(audio.src);
            audioPlayer.value?.play();
        }
        const loopSong = () => { 
            loop.value = !loop.value
            if(audioPlayer.value?.loop != null){
                audioPlayer.value.loop = loop.value;
                setColor(loop.value)
            }
        }
        function setColor(putColor = false){
            if(putColor){
                if(localStorage.getItem("currentColor") != null){
                    let color = localStorage.getItem("currentColor") || '';
                    colorStorage.backgroundColor = color;
                    colorStorage.color = 'white';
                }   
            }else{
                colorStorage.backgroundColor = 'initial';
                colorStorage.color = 'black';
            }
            
        }

      
        function intToTime(int: number) {
            // Obtener el número de horas
            const hours = Math.floor(int / 3600);
        
            // Obtener el número de minutos
            const minutes = Math.floor((int % 3600) / 60);
        
            // Obtener el número de segundos
            const seconds = int % 60;
        
            // Devolver el tiempo en el formato HH:MM:SS
            return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
        }
        function formatTime(number: number){
            if(number < 10){
                return '0' + number
            }else{
                return number
            }
        }

        

        return {
            canPlay,
            currentSongId,
            canPause,
            currentTimeLabel,
            durationSongLabel,
            progresBarPlayer,
            colorStorage,
            render,
            colorHeader,
            play,
            pause,
            loopSong,
            changeProgresBarPlayer,
            updateProgessBarPlayer,
        }
    }
})
</script>

<style>
input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  height: 5px;
  border-radius: 10px;
  background-color: v-bind(colorHeader);
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background-color: #fff;
  filter: saturate(0.5);
  border-radius: 50%;
  border: 3px solid v-bind(colorHeader);
  outline: black;
  cursor: pointer;
}
</style>