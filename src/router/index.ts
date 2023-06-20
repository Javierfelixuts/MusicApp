import { createRouter, createWebHistory } from 'vue-router';
import PopularesSongs from '../views/PopularesSongs.vue';
import MusicList from '../views/MusicList.vue';
import FavoritesSongs from '../views/FavoritesSongs.vue';
import UploadUrlYouTube from '../views/UploadUrlYouTube.vue';
import { ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

const nameRoute = ref("");
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/', component: MusicList, 
            meta:
            {
                show: true,
                nameRoute: nameRoute.value,
                enterClass: "animate__animated animate__bounceInLeft",
                leaveClass: "animate__animated animate__bounceOutRight"
            }
        },
        {
            path: '/populares-songs', component: PopularesSongs,
            meta: {
                show: true,
                nameRoute: nameRoute.value,
                enterClass: "animate__animated animate__bounceInLeft",
                leaveClass: "animate__animated animate__bounceOutRight"
            }
        },
        { path: '/favorites', component: FavoritesSongs, 
            meta: {
                show: true,
                nameRoute: nameRoute.value,
                enterClass: "animate__animated animate__bounceInLeft",
                leaveClass: "animate__animated animate__bounceOutRight"
            }
        },
        {
            path: '/upload-url-youtube',
            component: UploadUrlYouTube,
            
        }
    ],
})



/* router.beforeEach((to, from, next) => {
    nameRoute.value = from.fullPath;
   console.log("to: ", to);
   console.log("from: ", from);
   next()
  }) */

export default router;