<template>
  <div id="main" :class="{ 'grid gridCols1 sm:grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-5': true }"
    class="main mb-12 mb:mb-80">
    <div class="col-start-1 col-end-5 overflow-y-scroll h-full">
      <MusicList :musicList="musicServerList" />
    </div>
    <div class="col-start-5 col-end-13 mx-3">
      <h3>Albums</h3>
      <div v-if="albums.length > 0" class="flex flex-wrap justify-between items-center">
        <div v-for="album in albums">
          <Album @emit-album-id="getAlbumIdFromEmit" :album="album" />
        </div>
      </div>
      <div v-else>
        Loading...
      </div>
      <MusicPlayer v-if="$route.meta.show" />
    </div>
  </div>
</template>

<script lang="ts">
import MusicList from '../components/MusicList.vue';
import MusicPlayer from '../components/MusicPlayer.vue';
import { useMusicList } from '../stores/musicList';
import { useSongsServerStore } from '../stores/musicServerStore';
import Album from '../components/Album.vue';
import axios from 'axios';
import { defineComponent, onMounted, ref } from 'vue';
import.meta.env.MUSIC_DB
export default defineComponent({
  components: {
    MusicList,
    MusicPlayer,
    Album,
  },
  setup() {
    const music = useMusicList();
    const musicList = ref(music.musicListState);
    const musicServer = useSongsServerStore();
    const musicServerList = ref([]);
    const albums = ref([]);

    async function getAlbumIdFromEmit(id: number){

       try {
        const response = await axios.get(`${import.meta.env.VITE_MUSIC_DB}albums/${id}`);

        console.log("emitido: ", response.data.album_songs);
        musicServerList.value = response.data.album_songs
      } catch (error) {
        console.error(error)
      }
      
    }
    onMounted(async () => {
      await musicServer.fetchSongs();
      await getAlbums();
      musicServerList.value = musicServer.songs;
      console.log("songs: ", musicServerList.value)
    });

    async function getAlbums() {
      try {
        const response = await axios.get(import.meta.env.VITE_MUSIC_DB + "albums");
        albums.value = response.data;

        console.log({ response });
      } catch (error) {
        console.error(error)
      }
    }
    music.$subscribe((mutation, state) => {
      musicList.value = state.musicListState
    })


    return { musicList, musicServerList, albums, getAlbumIdFromEmit }
  }
});

</script>