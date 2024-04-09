<template>
    <div>
        <img class="object-cover h-28 w-28 m-2 cursor-pointer" :src="album.image" alt="" srcset="">
        <h6 class="text-xs hidden">Carlos Rivera - "El Rey"</h6>
    </div>
</template>

<script  lang="ts">
export default {
    name: "Album",
    props:{
        album:{
            name: String,
            image: String,

        }
    },
    setup(props){
        console.log(props.album.image);
        return {
            name: "hey"
        }
    }
}

</script>