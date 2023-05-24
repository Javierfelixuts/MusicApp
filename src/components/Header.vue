<template>
    <header class="bg-gradient-to-b from-indigo-600 to-blue-500 mb-6"> <!-- fixed top-0 z-40 -->
        <div class="text-white flex justify-between">
            <div class="flex">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" aria-hidden="true" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z">
                        </path>
                    </svg>
                </div>
                <div class="ml-3">Music App</div>
            </div>
            <div class="bg-red-500" @click="openMenuBar()">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5">
                    </path>
                </svg>
            </div>
        </div>
        <div class="text-white mt-5 text-xs flex justify-around">
            <div>
                <router-link to="/">
                    <button> Home</button>
                    <div></div>
                </router-link>
            </div>
            <div>
                <router-link to="/favorites">
                    <button>Favoritos</button>
                    <div></div>
                </router-link>
            </div>

            <div>
                <router-link to="/populares-songs">
                    <button> Populares</button>
                    <div></div>
                </router-link>
            </div>
        </div>

        <div class="search mt-3">
            <label class="relative block">
                <span class="sr-only">Search</span>
                <span class="absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"></path>
                    </svg>
                </span>
                <input v-model="query" @input="searchSongHandler(query)" id="searchSong"
                    class="shadow-lg placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-full py-2 pl-7 pr-9 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                    placeholder="Search..." type="text" name="search">
            </label>
        </div>
    </header>
    <Controls />
</template>

<script lang="ts">
import { ref, toRaw } from 'vue';
import { useMusicList } from '../stores/musicList';
import Controls from './Controls.vue';
import { Song } from '../types/MusicListType';
export default {
    name: 'Header',
    components: { Controls },
    emits: ["openopenMenuBar"],
    setup() {
        const musicStore = useMusicList();
        const query = ref("");
        //const cloneMusicList = window.structuredClone(toRaw(musicStore.musicListState));

        const openMenuBar = () => {
            alert("open menu");
        }
        const searchSongHandler = (query: string) => {
            musicStore.filterList(query);
        }

        return {
            query,
            openMenuBar,
            searchSongHandler
        }
    }
}
</script>

<style>
header {
    padding: 20px;
    width: 100%;
    height: 120px;
    background: rgb(0, 174, 255);
    border-bottom-left-radius: 14%;
    border-bottom-right-radius: 14%;
}

a.router-link-active>div {
    width: 100%;
    height: 1px;
    background-color: rgb(242, 255, 240);
}
</style>