<template>
    <div>
        <MusicList />

    </div>
</template>
<script lang="ts">
import MusicList from '../components/MusicList.vue';

export default {
    name: "PopularesSongs",
    components: {
        MusicList
    },
    setup() {
        const sayHello = "Hello"
        return {
            sayHello
        }
    }
}
</script>