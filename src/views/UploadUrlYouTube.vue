<template>
    <div class="w-full bg-red-500 h-40 flex items-center justify-around flex-col text-white">
        <div>
            
        </div>
        <div>
            <h1 class="text-xl">Music App</h1>
            <p>Ingrese una URL válida de YouTube</p>
        </div>
    </div>
    <div class="text-center -mt-5">
        <input v-model="inputUrlYT" class="focus:outline-none focus:ring focus:ring-violet-300 w-11/12 md:6/12 p-2 rounded-md border border-indigo-500" 
        type="text" placeholder="http://">
    </div>
    <div class="text-center mt-5">
        <button
        @click="sendToApi" 
        class="text-white rounded w-5/12 md:6/12 bg-red-500 p-3 hover:bg-red-700">Enviar</button>
    </div>

    <div
        v-if="isLoading"
        class="absolute top-0 w-full h-screen flex items-center justify-center"
    >

        <atom-spinner
        class="text-center"
        :animation-duration="1000"
        :size="160"
        :color="'#ff1d5e'"
        />
    </div>

</template>
<script lang="ts">
import {AtomSpinner} from 'epic-spinners'
import { ref } from 'vue';
export default {
    name: 'UploadUrlYouTube',
    components: {
      AtomSpinner
    },
    setup(){
        const inputUrlYT = ref("");
        const isLoading = ref(false);

        

        const sendToApi = () => {
            if(inputUrlYT.value == ""){
                alert("el texto no puede estar vacío");
                return;
            }
            isLoading.value = !isLoading.value;
            setTimeout(() => {
                isLoading.value = !isLoading.value;
            }, 4000);
        }
        return {
            isLoading,
            inputUrlYT,
            sendToApi
        }
    }
}
</script>