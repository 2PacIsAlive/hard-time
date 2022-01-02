<script setup lang="ts">
import { useStore } from '../store'
import { useMessage } from 'naive-ui'

const store = useStore(),
  message = useMessage()

function saveGame () {
  store.save()
  message.info('game saved')
}
</script>

<template>
  <footer v-if="store.gameStarted" id="footer">
    <span id="saveddisplay" v-if="store.displaySaved">saved </span>
    <span>lag: {{ store.lag.toFixed(0) }}ms </span>
    <span id="reset" @click="store.reset()">reset </span>
    <span id="save" @click="saveGame()">save </span>
  </footer>
</template>

<style scoped>
  #footer {
    position: absolute;
    bottom: 8px;
    right: 16px;
    font-size: 18px;
  }
</style>
