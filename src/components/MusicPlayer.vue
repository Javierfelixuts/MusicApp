<template>
    <div v-if="player.isOpen" id="reproductor" class="w-full mb-6">
        <div class="flex items-center justify-center bg-red-lightest">
            <div class="bg-white shadow-lg rounded-lg z-10" style="width: 45rem !important;">
                <div class="flex">
                    <div>
                        <img class="w-full rounded hidden md:block" src="https://tailwindcss.com/img/card-top.jpg"
                            alt="Album Pic">
                    </div>
                    <div class="w-full px-4 py-1">
                        <div class="flex justify-between">
                            <div>
                                <h3 id="title" class="text-2xl text-grey-darkest font-medium">{{
                                    music.musicListState[player.id]?.songName
                                }}</h3>
                                <p id="description" class="text-sm text-grey mt-1">{{
                                    music.musicListState[player.id]?.artist
                                }}</p>
                            </div>
                            <div class="text-red-lighter">
                                <svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20">
                                    <path
                                        d="M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z" />
                                </svg>
                            </div>
                        </div>
                        <div class="flex justify-between items-center mt-2">
                            <div onclick="randomSong()" class="text-grey-darker cursor-pointer">
                                <svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20">
                                    <path
                                        d="M6.59 12.83L4.4 15c-.58.58-1.59 1-2.4 1H0v-2h2c.29 0 .8-.2 1-.41l2.17-2.18 1.42 1.42zM16 4V1l4 4-4 4V6h-2c-.29 0-.8.2-1 .41l-2.17 2.18L9.4 7.17 11.6 5c.58-.58 1.59-1 2.41-1h2zm0 10v-3l4 4-4 4v-3h-2c-.82 0-1.83-.42-2.41-1l-8.6-8.59C2.8 6.21 2.3 6 2 6H0V4h2c.82 0 1.83.42 2.41 1l8.6 8.59c.2.2.7.41.99.41h2z" />
                                </svg>
                            </div>
                            <div @click="preSong()" class="text-grey-darker cursor-pointer">
                                <svg class="w-6 h-6 hover:w-9 hover:h-9" fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M4 5h3v10H4V5zm12 0v10l-9-5 9-5z" />
                                </svg>
                            </div>
                            <div @click="pause" v-if="!canPlay" id="pause_song"
                                class="text-white p-4 rounded-full bg-rose-500 shadow-lg cursor-pointer">
                                <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20">
                                    <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
                                </svg>
                            </div>
                            <div @click="play" v-if="!canPause" id="play_song"
                                class="text-white p-4 rounded-full bg-rose-500 shadow-lg cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="w-8 h-8">
                                    <path fill-rule="evenodd"
                                        d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                                        clip-rule="evenodd" />
                                </svg>

                            </div>
                            <div @click="nextSong()" class="text-grey-darker cursor-pointer">
                                <svg class="w-6 h-6 hover:w-9 hover:h-9" fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M13 5h3v10h-3V5zM4 5l9 5-9 5V5z" />
                                </svg>
                            </div>
                            <div id="loop_song" onclick="loop()" class="text-slate-900 p-2">
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
                        <p id="currentime">0:00</p>
                        <p id="durationSong">0.00</p>
                    </div>
                    <div class="mt-1">
                        <input
                        @change="changeProgresBarPlayer"
                         class="w-full" type="range" min="0" max="100" 
                         :value="progresBarPlayer" id="progressBar" />

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
import { onMounted, onUnmounted, ref } from 'vue';

import { useMusicPlayer } from '../stores/musicPlayer';
import { useMusicList } from '../stores/musicList';

export default {
    name: 'MusicPlayer',
    setup() {
        const music = useMusicList();
        const player = useMusicPlayer();
        const progresBarPlayer = ref(0);

        console.log("player: ", player);
        const audioPlayer =  ref<HTMLAudioElement | null>(null);
        const canPlay = ref(false);
        const canPause = ref(true);
        const currentSong  = ref();
        const currentSongId = ref(0);

        const songUrl = ref(new URL(music.musicListState[currentSongId.value]?.filePath, import.meta.url).href);
        
        function changeProgresBarPlayer(event: any){
            console.log(event.target.value);

            if(audioPlayer.value !== null && event.target !== null){
                let duration = audioPlayer.value?.duration || 1;
                let percentage = (Number(event.target?.value) / 100) * duration;
                
                audioPlayer.value.currentTime = percentage;
                audioPlayer.value.play();
            }
        }
        onMounted(() => {
            audioPlayer.value = new Audio(songUrl.value);
            audioPlayer.value.ontimeupdate = function(){
                let duration = audioPlayer.value?.duration || 1;
                let currentTime = audioPlayer.value?.currentTime || 1;

                let percentage = (currentTime / duration) * 100;
                progresBarPlayer.value = percentage
            }

        });

        onUnmounted(() => {
            audioPlayer.value?.pause();
        });

        player.$subscribe((mutation, state) => {
            canPause.value = true;
            console.log("mutation: ", { mutation, state });
            songUrl.value = new URL(music.musicListState[state.id]?.filePath, import.meta.url).href
            
            if(audioPlayer.value !== null){
                audioPlayer.value.src = songUrl.value;
                audioPlayer.value.play();
            }

            currentSong.value = state;
            /* if (audioPlayer.value) {
                audioPlayer.value?.src = songUrl;
                audioPlayer.play();
            } */
            // import { MutationType } from 'pinia'
            //mutation.type // 'direct' | 'patch object' | 'patch function'
            // same as cartStore.$id
            // mutation.storeId // 'cart'
            // only available with mutation.type === 'patch object'
            // mutation.payload // patch object passed to cartStore.$patch()

            // persist the whole state to the local storage whenever it changes
            //localStorage.setItem('cart', JSON.stringify(state))
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
            console.log("play");
            audioPlayer.value?.play();
        }

        const nextSong = () => {
            currentSong.value.id =  currentSong.value.id + 1;

            player.$patch({
                isOpen: true,
                id: currentSong.value.id,
            });
            songUrl.value =  new URL(music.musicListState[currentSong.value.id]?.filePath, import.meta.url).href
            if(audioPlayer.value !== null){
                audioPlayer.value.src = songUrl.value;
                audioPlayer.value.play();
            }

        }
        const preSong = () => {
            currentSong.value.id =  currentSong.value.id - 1;
            player.$patch({
                isOpen: true,
                id: currentSong.value.id
            });
            
            songUrl.value =  new URL(music.musicListState[currentSong.value.id]?.filePath, import.meta.url).href
            if(audioPlayer.value !== null){
                audioPlayer.value.src = songUrl.value;
                audioPlayer.value.play();
            }

        }

        return {
            player,
            music,
            canPlay,
            canPause,
            progresBarPlayer,
            play,
            pause,
            nextSong,
            preSong,
            changeProgresBarPlayer,
        }
    }
}
</script>

<style>

</style>