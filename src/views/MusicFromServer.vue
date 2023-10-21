<template>
    <div>
        <MusicListFromServer :musicList="musicList" />
    </div>
</template>
 
<script lang="ts">
import MusicListFromServer from '../components/MusicListFromServer.vue';
import axios from 'axios';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'MusicFromServer',
    components: {
        MusicListFromServer,
    },
    setup() {
        const musicList = ref([])
        getSongs();
        // API for get requests 


        async function getSongs() {
            try {
                const response = await axios.get('http://127.0.0.1:2222/api/songs/');
                musicList.value = response.data;
            } catch (error) {
                console.error(error);
            }
        }


        return { musicList }
    }
});

</script>