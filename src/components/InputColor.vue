<template>
    <div class="cp_wrapper">
        <input @input="getCurrentColor"  v-model="colorHeader" type="color" name="" id="">
    </div>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue';
import { useChangeHeaderColor } from '../stores/changeHeaderColor';

export default defineComponent({
    name: 'InputColor',
    setup() {
        const colorHeader = ref("#ff8888")
        if(localStorage.getItem("currentColor")){
            colorHeader.value = localStorage.getItem("currentColor") || '';
        }
        const changeColor = useChangeHeaderColor();
        const getCurrentColor = () => {
            localStorage.setItem("currentColor", colorHeader.value);
            changeColor.$patch({
                currentColor: colorHeader.value
            });
        }
        return {
            colorHeader,
            getCurrentColor
        }
    }
})
</script>
<style scoped>
input[type='color'] {
    border: 1px;
    padding: 0;
    width: 150%;
    height: 210%;
    margin: -26%;
}

.cp_wrapper {
    overflow: hidden;
    width: 1em;
    height: 1em;
    /* optional formatting below here */
    border-radius: 50%;
    box-shadow: 1px 1px 3px 0px grey;
    margin: 1em;
}
</style>