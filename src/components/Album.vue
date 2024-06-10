<template>
    <div :key="album.id" @click="getAlbumId(album.id)">
        <img class="object-cover h-28 w-28 m-2 cursor-pointer" :src="album.image" alt="" srcset="">
        <h6 class="text-xs">{{ album.name }}</h6>
    </div>
</template>

<script  lang="ts">
import { Album } from '../types/Album';

export default {
    name: "Album",
    props:{
        album:{
            type: Object as () => Album,
            required: true,

        },
    },
    setup( props, context){
        function getAlbumId(id: number){
            context.emit('emitAlbumId', id);
            console.log("id: ", id);
        }
        return {
            getAlbumId,
        }
    }
}

</script>