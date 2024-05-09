<script setup lang="ts">

import {ModelProps} from '../../types'
import {onMounted} from 'vue'
import { useGLTF } from '@tresjs/cientos';


defineOptions({
    name:'Model',
});
const props = withDefaults(defineProps<ModelProps>(),{
    path:'',
})
const {scene,nodes} = await useGLTF(props.path,{draco:true});

onMounted( ()=>{
    console.log(scene);
    console.log(nodes);
    Object.values(nodes).forEach((node)=>{
      node.addEventListener('click',()=>{
        console.log('click');
      })
    })
})
</script>
<template>
  <primitive :object="scene" @click="console.log('click')" />
</template>
<style scoped>

</style>