<script setup lang="ts">
import { useStore } from '../store'
import { NSpace, NButton } from 'naive-ui'
const store = useStore()

function startGame() {
  store.gameStarted = true
}
</script>

<template>
  <n-space align="center" justify="center" vertical size="large">
    <p>they will never stop chasing us</p>
    <n-button @click="startGame()" quaternary type="primary">serve undue time</n-button>
  </n-space>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
pre {
  line-height: 1; 
  /* text-align: center;  */
}
</style>