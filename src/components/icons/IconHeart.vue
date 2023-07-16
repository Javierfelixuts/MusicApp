<template>
    <svg
    class="cursor-pointer hover:drop-shadow-lg"
    @click="fillHeart" 
        width="8mm" height="8mm" viewBox="0 0 23.962452 21.528046" version="1.1" id="svg5"
        xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
        xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg">
        
        <defs id="defs2" />
        <g inkscape:label="Capa 1" inkscape:groupmode="layer" id="layer1" transform="translate(-37.436833,-153.40504)">
            <path 
                id="rect2627"
                style="font-variation-settings:normal;opacity:1;fill-opacity:1;stroke:#000000;stroke-width:0.132113;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:stroke markers fill;stop-color:#000000;stop-opacity:1"
                d="m 39.547094,155.47936 a 6.9817379,6.856486 0 0 0 9e-5,9.69657 6.9817379,6.856486 0 0 0 0.07451,0.0678 l 9.799086,9.62331 9.868245,-9.69122 a 6.9817379,6.856486 0 0 0 0,-9.69648 6.9817379,6.856486 0 0 0 -9.871016,-0.003 6.9817379,6.856486 0 0 0 -9.870926,0.003 z"
                inkscape:export-filename="heartSvg.svg" inkscape:export-xdpi="96" inkscape:export-ydpi="96"
                :fill="fillIcon"
                
                />
        </g>
    </svg>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useMusicList } from '../../stores/musicList';
import { useChangeHeaderColor } from '../../stores/changeHeaderColor';
import { User } from '../../classes/User';

export default defineComponent({
    name: "IconHeart",
    props: {
        songId: {
            type: Number,
            default: 1
        },
        isFavorite: {
            type: Object,
            default: {}
        }
    },
    setup(props) {
        const music = useMusicList();
        const useChangeColor = useChangeHeaderColor();
        const user = new User()
        const colorHeader = ref("#ff8888")
        if(localStorage.getItem("currentColor")){
            colorHeader.value = localStorage.getItem("currentColor") || '';
        }
        useChangeColor.$subscribe((mutation, state) => {
            colorHeader.value = state.currentColor;
            if(fillIcon.value !== "none"){
                fillIcon.value = state.currentColor;
            }
        })

        const fillIcon = ref("none");
        if(props.isFavorite.favorite){
            fillIcon.value = colorHeader.value
        }
        const fillHeart = () => {
            
            if(fillIcon.value == "none"){
                fillIcon.value = colorHeader.value
                music.setMyFavoriteMusicList(props.songId, true)
                user.setMyFavoriteMusicList(props.songId)
            }
            else{
                fillIcon.value = "none"
                music.setMyFavoriteMusicList(props.songId, false)
            }
        }
        return {
            fillIcon,
            fillHeart
        }
    }
})
</script>