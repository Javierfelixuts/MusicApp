<template>
    <div id="menuRight" class="text-white p-2 absolute w-1/2 h-full bg-slate-100 z-20 rounded-sm right-0 top-20">
        <h1 class="text-black">Configuración</h1>
        <div class="flex items-center">
            <p class="text-black text-xs">Cambiar color</p>
            <InputColor />
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
export default {
    name: "MenuBar",
    components: {
        InputColor,
        NextPageArrow,
    },
    setup(){
        const router = useRouter();
        const local = new LocalStorageManager();

        const logOut = () => {
            local.removeItem("auth");
            router.push({path: '/'});
        }
        return {
            logOut
        }
    }
}
</script>