<template>
    <div class="w-full bg-red-500 h-40 flex items-center justify-around flex-col text-white" :style="{'background-color': colorHeader}">
        <div 
            class="ml-12 self-start cursor-pointer"
            @click="goBack">
            <BackArrowPage  />
        </div>
        <div>
            <h1 class="text-xl">Music App</h1>
            <p>Ingrese una URL válida de YouTube</p>
        </div>
    </div>
    <div class="text-center -mt-5">
        <input v-model="inputUrlYT" class="focus:outline-none focus:ring focus:ring-violet-300 w-11/12 md:6/12 p-2 rounded-md border border-indigo-500" 
        type="text" placeholder="https://www.youtube.com/watch?v=cip0cudMOeI">
    </div>
    <div class="text-center mt-5">
        <button
        @click="sendToApi" 
        :style="{'background-color': colorHeader}"
        class="text-white rounded w-5/12 md:6/12 bg-red-500 p-3 hover:bg-red-700"
        
        >Enviar</button>
    </div>

    <div
        v-if="isLoading"
        class="absolute top-0 w-full h-screen flex items-center justify-center"
    >

        <atom-spinner
        class="text-center"
        :animation-duration="1000"
        :size="160"
        :color="colorHeader"
        />
    </div>

</template>
<script lang="ts">
import {AtomSpinner} from 'epic-spinners';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import BackArrowPage from '../components/icons/BackArrowPage.vue';
import { useChangeHeaderColor } from '../stores/changeHeaderColor';
import { useMusicPlayer } from '../stores/musicPlayer';
import axios from 'axios';


export default {
    name: 'UploadUrlYouTube',
    components: {
      AtomSpinner,
      BackArrowPage
    },
    setup(){
        const endpoint = 'http://127.0.0.1:2222/api/songs/info/'
        console.log("endpoint: ", endpoint);
        console.log("endpoint 2: ", import.meta.env.MUSIC_DB);

        const useChangeColor = useChangeHeaderColor();
        const router = useRouter();
        const inputUrlYT = ref("");
        const isLoading = ref(false);
        const colorHeader = ref(localStorage.getItem("currentColor") || "" );

        onMounted(() => {
            useMusicPlayer().$patch({
                isOpen: false
            })
        })
        useChangeColor.$subscribe((mutation, state) => {
            colorHeader.value = state.currentColor;
        })
        const sendToApi = async () => {
            if(inputUrlYT.value == ""){
                alert("el texto no puede estar vacío");
                return;
            }
            isLoading.value = !isLoading.value;
            try {
            const response = await axios.get(endpoint + '?videoLink=' + inputUrlYT.value);
                console.log(response);
                isLoading.value = false;
            } catch (error) {
                    isLoading.value = false;
                    console.error(error);
                }
            }
        const goBack = () => {
            router.go(-1);
        }
        return {
            isLoading,
            inputUrlYT,
            colorHeader,
            goBack,
            sendToApi
        }
    }
}
</script>