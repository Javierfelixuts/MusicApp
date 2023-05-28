<template>
    <div>
        <MusicList :musicList="musicList"/>
    </div>
</template>
<script lang="ts">
import MusicList from '../components/MusicList.vue';
import { useMusicList } from '../stores/musicList';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: "PopularesSongs",
    components: {
        MusicList
    },
    setup() {
        const music = useMusicList();
        const musicList = ref(music.getPopularMusicList());
        music.$subscribe((mutation, state) => {
            console.log("mutation: ", mutation);
            musicList.value = state.musicPopularSongs
        })
        return {
            musicList
        }
    }
})
</script>