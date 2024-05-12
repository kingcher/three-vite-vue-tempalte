<!--
 * @Description: 
 * 
 * @Author: 贪玩的大橙子
 * @Date: 2024-04-18 14:42:06
 * @LastEditors: 贪玩的大橙子
 * @LastEditTime: 2024-05-12 09:55:24
 * @FilePath: index.vue
 * 
 * Copyright (c) 2024 by 贪玩的大橙子, All Rights Reserved. 
-->
<template>
  <div class="container" ref="container">
    <canvas class="canvas" ref="canvas" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { TWorld } from "@/TWorld";
import { Box } from "@/ThreeComponents/Box";
const container = ref();
const canvas = ref();
onMounted(() => {
  const world = new TWorld({
    canvas: canvas.value
  });
  const box = Box();
  world.addObject(box);
});
</script>

<style scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
@/TEngine/TWorld
