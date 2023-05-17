import { createRouter, createWebHistory } from 'vue-router';
import PopularesSongs from '../views/PopularesSongs.vue';
import MusicList from '../views/MusicList.vue';
import FavoritesSongs from '../views/FavoritesSongs.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: MusicList },
        { path: '/populares-songs', component: PopularesSongs },
        { path: '/favorites', component: FavoritesSongs },
    ],
  })

  export default router;