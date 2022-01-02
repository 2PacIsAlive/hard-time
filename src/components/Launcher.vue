<script setup lang="ts">
import { useStore } from '../store'
import { NSpace, NButton } from 'naive-ui'
import { useSound } from '@vueuse/sound'
import sfx from '../assets/sfx.mp3'

const store = useStore()

const playbackRate = 1
const { play, sound } = useSound(sfx, { 
  sprite: {
    nextMap: [2000, 4000],
  },
  playbackRate
})

function startGame() {
  // @ts-ignore
  play({id: 'nextMap'})
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
</style>