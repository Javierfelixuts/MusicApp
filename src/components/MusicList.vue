<template>
        <div v-for="song in musicList"
            class="card bg-white m-3 p-2 cursor-pointer flex justify-between items-center rounded-md shadow-lg">
            <div class="flex justify-between items-center w-full">
                <div class="header-detail flex items-center w-full" @click="openSong(song, song.id)">
                    <div class="bg-red-500 h-full p-2 rounded hover:drop-shadow-lg cursor-pointer"
                        :style="{ 'background-color': colorHeader }">
                        <MusicIcon />
                    </div>
                    <div class="ml-5">
                        <p class="title text-md text-cyan-700 break-all" :style="{ 'color': colorHeader }">{{ song.name }}
                        </p>
                        <p class="description text-xs text-sky-950 break-all">{{ song.author }}</p>
                        <p class="description text-xs text-sky-950 break-all">{{ song.duration_string }}</p>
                    </div>
                </div>
                <div  class="menu flex">
                    <IconHeart :key="render" :songId="song.id" :isFavorite="song" />

                </div>
            </div>
            </div>
    <div v-if="openPlayer" style="height: 305px;">

    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useMusicPlayer } from '../stores/musicPlayer';
import { useMusicList } from '../stores/musicList';
import { useControls } from '../stores/controls';
import { Song } from '../types/Song';
import IconHeart from './icons/IconHeart.vue';
import MusicIcon from './icons/MusicIcon.vue';
import { useChangeHeaderColor } from '../stores/changeHeaderColor';
import MusicPlayer from './MusicPlayer.vue';

export default {
    name: 'MusicPlayer',
    components: {
    IconHeart,
    MusicIcon,
    MusicPlayer
},
    props: {
        musicList: Array<any>
    },
    setup(props) {
        const render = ref(0);
        const openPlayer = ref(false);
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
            if (music.getOneOfMyFavoriteSongs(player.id)) {
                render.value = 1;
            } else {
                render.value = 2;
            }
            //render.value = music.getOneOfMyFavoriteSongs(player.id);
        })


        const openSong = async (song: Song, id: number) => {
            player.$patch({
                isOpen: true,
                id,
                song
            });
            console.log({song, id})
            const response = await fetch('http://127.0.0.1:2222/api/songs/show/' + id);
            const data = await response.json();
            console.log("data", data);
            openPlayer.value = true;
            
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
            openPlayer,
            colorHeader,
            openSong,
            intToTime,
        }
    }
}
</script>

<style></style>../types/Song