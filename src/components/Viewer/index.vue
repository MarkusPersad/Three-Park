<script setup lang="ts">
defineOptions({
    name:'Viewer',
})
import {TresCanvas} from '@tresjs/core'
import {OrbitControls,Sky} from '@tresjs/cientos'
import Model from '../Model/index.vue'
import { Vector3 } from 'three';
</script>
<template>
<TresCanvas :window-size="true"
:preset="'realistic'"
:tone-mapping-exposure="0.25"
>
    <TresPerspectiveCamera :position="new Vector3(0,0,200)" :look-at="[0,0,0]"/>
    <OrbitControls
    :enable-pan="true"
    :enable-zoom="true"/>
    <TresAmbientLight :intensity="2"/>
    <TresDirectionalLight :intensity="1"/>
    <Sky/>
    <Suspense>
        <Model :path="'city.glb'" :scale="2"/>
    </Suspense>
</TresCanvas>
</template>
<style scoped>
</style>