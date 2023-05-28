<template>
    <div class="bg-transparent text-white p-2 absolute w-1/2 h-50 bg-slate-100 z-10 rounded-sm right-0 top-20">
        <IconArrowRight/>
        <div class="flex items-center">
            <p class="text-black text-xs">Cambiar color</p>
            <InputColor />
        </div>
    </div>
</template>
<script lang="ts">
import InputColor from './InputColor.vue';
import IconArrowRight from './icons/IconArrowRight.vue';
export default {
    name: "MenuBar",
    components: {
    InputColor,
    IconArrowRight
},
}
</script>