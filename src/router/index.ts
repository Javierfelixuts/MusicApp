import { createRouter, createWebHistory } from 'vue-router';
import PopularesSongs from '../views/PopularesSongs.vue';
import MusicList from '../views/MusicList.vue';
import FavoritesSongs from '../views/FavoritesSongs.vue';
import UploadUrlYouTube from '../views/UploadUrlYouTube.vue';
import LoginApp from '../views/LoginApp.vue';
import { ref } from 'vue';
import UserLogin from '../classes/UserLogin';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { LocalStorageManager } from '../classes/LocalStorageManager';

const nameRoute = ref("");
const isAuth = ref(false);
const local = new LocalStorageManager();

console.log("auth: ", local.getItem("auth"))
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Login', 
            component: LoginApp,
        },
        {
            path: '/home', 
            name: 'Home', 
            component: MusicList,
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


router.beforeEach(async (to, from) => {
    console.log("isAuth: ", isAuth.value);
    if(local.getItem("auth")){
        isAuth.value =  local.getItem("auth");
    }
    if(typeof isAuth.value == 'boolean' && to.name == 'Login'){
        return { path: 'home'}
    }
    if (
       typeof isAuth.value == 'object' &&
      // ❗️ Avoid an infinite redirect
      to.name !== 'Login'
    ) {
      // redirect the user to the login page
      return { name: 'Login' }
    }
  })
/* router.beforeEach((to, from, next) => {
    nameRoute.value = from.fullPath;
   console.log("to: ", to);
   console.log("from: ", from);
   next()
  }) */

export default router;