<template>
    <svg
    id="menuI"
    ref="menuIcon"
    @click="clickPath"
     xmlns="http://www.w3.org/2000/svg" 
     fill="none" 
     viewBox="0 0 24 24" 
     stroke-width="1.5" 
     stroke="currentColor"
     class="w-10 h-6 z-20">
        <path ref="path1" stroke-linecap="round" 
        stroke-linejoin="round" 
        :d="iconPath1">
        </path>
        <path ref="path2" stroke-linecap="round" 
        stroke-linejoin="round" 
        :d="iconPath2">
        </path>
        <path ref="path3" stroke-linecap="round" 
        stroke-linejoin="round" 
        :d="iconPath3">
        </path>
    </svg>
</template>
<script lang="ts" setup>
  import { gsap } from 'gsap';
  import { ref } from 'vue';
  const iconPath1 = ref("M 18 6 L 0 6");
  const iconPath2 = ref("M 10 13 L 0 13");
  const iconPath3 = ref("M 18 20 L 0 20");
  const path1 = ref<SVGPathElement | null>(null);
  const path2 = ref<SVGPathElement | null>(null);
  const path3 = ref<SVGPathElement | null>(null);
  const makeClick = ref(false);
  function clickPath(){
    makeClick.value = !makeClick.value;
    
    if(makeClick.value){
      gsap.to(path1.value, {duration: 0.3, attr: { d: "M 18 2 L 2 20" } })
      gsap.to(path2.value, {duration: 0.3, attr: { d: "" } })
      gsap.to(path3.value, {duration: 0.3, attr: { d: "M 20 20 L 0 6" } })
    }
    else{
      gsap.to(path1.value, {duration: 0.3, attr: { d: "M 18 6 L 0 6" } })
      gsap.to(path2.value, {duration: 0.3, attr: { d: "M 10 13 L 0 13" } })
      gsap.to(path3.value, {duration: 0.3, attr: { d: "M 18 20 L 0 20" } })
      
    }
    console.log("makeClick: ", makeClick.value);
}


</script>