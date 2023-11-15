<template>
    <div id="menuRight" class="text-white p-2 absolute w-1/2 h-full bg-slate-100 z-20 rounded-sm right-0 top-20">
        <h1 class="text-black">Configuración</h1>
        <div class="flex items-center">
            <p class="text-black text-xs">Cambiar color</p>
            <InputColor />
            <InputColor />
        </div>
        <div class="flex items-center">
            <button @click="clearColor" class="p-2 bg-red-500 rounded text-xs">Resetear color</button>
        </div>
        <router-link to="/upload-url-youtube">
            <div class="text-black text-sm flex w-full items-center underline  hover:underline-offset-1 ">
                <h1>Upload song url</h1>
                <NextPageArrow />
            </div>
        </router-link>
        <router-link to="/">
            <div
            @click="logOut" 
            class="text-black text-sm flex w-full items-center underline  hover:underline-offset-1 ">
                <h1>Salir</h1>
                <NextPageArrow />
            </div>
        </router-link>
    </div>
</template>
<script lang="ts">
import { useRouter } from 'vue-router';
import InputColor from './InputColor.vue';
import NextPageArrow from './icons/NextPageArrow.vue';
import { LocalStorageManager } from '../classes/LocalStorageManager';
import { useChangeHeaderColor } from '../stores/changeHeaderColor';

export default {
    name: "MenuBar",
    components: {
        InputColor,
        NextPageArrow,
    },
    setup(){
        const router = useRouter();
        const local = new LocalStorageManager();
        const useChangeColor = useChangeHeaderColor();
        

        const clearColor = () => {
            if(localStorage.getItem("currentColor")){
                localStorage.removeItem("currentColor");
                useChangeColor.$patch({currentColor: ""})
            }
        }
        const logOut = () => {
            local.removeItem("auth");
            router.push({path: '/login'});
        }
        return {
            clearColor,
            logOut
        }
    }
}
</script>