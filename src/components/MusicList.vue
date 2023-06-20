<template>
    <div id="main" :class="{ 'grid gridCols1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10': controls.isGrid }"
        class="main mb-12 mt-12 mb:mb-80">
        <div v-for="song in musicList"
            class="card bg-white m-3 p-2  flex justify-between items-center rounded-md shadow-lg">
            <div 
                @click="openSong(song, song.id)"
                class="header-detail flex"
            >
                <img class="h-10"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRINNDU_NLAhLUoEohUZVKmeffls-BagE6xYw&usqp=CAU"
                    alt="icon music">
                <div class="ml-5">
                    <p class="title text-md text-cyan-700 break-all" :style="{'color': colorHeader}">{{ song.songName }}</p>
                    <p class="description text-xs text-slate-400 break-all">{{ song.artist }}</p>
                    <p class="description text-xs text-slate-400 break-all">{{ intToTime(song.duration) }}</p>
                </div>
            </div>
            <div class="menu flex">
                <IconHeart 
                    :key="render"
                    :songId="song.id"
                    :isFavorite="song"/>
                
                <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="rotate-90 w-4 h-4">
                    <path fill-rule="evenodd"
                        d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                        clip-rule="evenodd" />
                </svg> -->
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useMusicPlayer } from '../stores/musicPlayer';
import { useMusicList } from '../stores/musicList';
import { useControls } from '../stores/controls';
import { Song } from '../types/MusicListType';
import IconHeart from './icons/IconHeart.vue';
import { useChangeHeaderColor } from '../stores/changeHeaderColor';

export default {
    name: 'MusicPlayer',
    components:{
        IconHeart
    },
    props: {
        musicList: {
            type: Array<Song>,
            default: [],
            required: false,
        }
    },
    setup(props) {
        const render = ref(0);
        const player = useMusicPlayer();
        const music = useMusicList();
        const controls = useControls();
        const useChangeColor = useChangeHeaderColor();

        const colorHeader = ref(localStorage.getItem("currentColor") || '');

        controls.$subscribe((mutation, state) => {
            console.log("controls: ", { mutation, state })
        })
        useChangeColor.$subscribe((mutation, state) => {
            colorHeader.value = state.currentColor;
        })
        music.$subscribe((mutation, state) => {
            if(music.getOneOfMyFavoriteSongs(player.id)){
                render.value = 1;
            }else{
                render.value = 2;
            }
            //render.value = music.getOneOfMyFavoriteSongs(player.id);
        })


        const openSong = (song: Song, id: number) => {
            player.$patch({
                isOpen: true,
                id,
            });
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
        function formatTime(number: number) {
            if (number < 10) {
                return '0' + number
            } else {
                return number
            }
        }

        return {
            render,
            controls,
            colorHeader,
            openSong,
            intToTime,
        }
    }
}
</script>

<style></style>