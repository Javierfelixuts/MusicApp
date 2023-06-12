<template>

    <div id="menuRight" class="text-white p-2 absolute w-1/2 h-full bg-slate-100 z-20 rounded-sm right-0 top-20">
        <h1 class="text-black">Configuración</h1>
        <div class="flex items-center">
            <p class="text-black text-xs">Cambiar color</p>
            <InputColor />
        </div>
</div>

</template>
<script lang="ts">
import InputColor from './InputColor.vue';
export default {
    name: "MenuBar",
    components: {
    InputColor,
},
}
</script>