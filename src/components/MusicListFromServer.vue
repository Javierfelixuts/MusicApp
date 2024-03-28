<template>
<h2>Songs</h2>
    <div id="main" :class="{ 'grid gridCols1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5': controls.isGrid }"
        class="main mb-12 mt-12 mb:mb-80">
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
                        <!-- <p class="description text-xs text-sky-950 break-all">{{ intToTime(song.author) }}</p> -->
                    </div>
                </div>
                <div  class="menu flex">
                    <IconHeart :key="render" :songId="song.id" :isFavorite="song" />

                </div>
            </div>
        </div>


    </div>

    <PlayerServer v-if="canOpenPlayer" :urlSong="urlSong"/>
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
import PlayerServer from './PlayerServer.vue';
import { useChangeHeaderColor } from '../stores/changeHeaderColor';

export default {
    name: 'MusicPlayer',
    components: {
        IconHeart,
        MusicIcon,
        PlayerServer,
    },
    props: {
        musicList: {
            type: Array<any>,
            default: [],
            required: false,
        }
    },
    setup(props) {
        const urlSong = ref('');
        const canOpenPlayer = ref(false);
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


        const openSong = (song: any, id: number) => {
            canOpenPlayer.value = true; 
            urlSong.value = song.mp3_path;
            openPlayer.value = true;
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
            openPlayer,
            colorHeader,
            urlSong,
            canOpenPlayer,
            openSong,
            intToTime,
        }
    }
}
</script>
../types/Song