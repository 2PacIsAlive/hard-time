<script setup lang="ts">
import { useStore } from '../store'
import { useMessage, useLoadingBar } from 'naive-ui'

const store = useStore(),
  message = useMessage(),
  loadingBar = useLoadingBar()

function saveGame () {
  store.save()
  message.info('game saved')
}

function resetGame () {
  loadingBar.finish()
  store.reset()
}

function exportSave () {
  store.exportString = store.buildSave(true)
  const blob = new Blob([store.exportString], { type: 'application/text' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `hard-time-savefile_${new Date().toISOString()}.txt`
  link.click()
  URL.revokeObjectURL(link.href)
  message.success('savefile exported')
}

function importSave () {
  store.showImportModal = true
}

function openSettings () {
  store.showSettingsModal = true
}
</script>

<template>
  <footer v-if="store.gameStarted" id="footer">
    <span>lag: {{ store.lag.toFixed(0) }}ms </span>
    <span id="cheater" v-if="store.settings.cheatsEnabled">cheater </span>
    <span class="footer-action" id="settings" @click="openSettings()">settings </span>
    <span class="footer-action" id="export" @click="exportSave()">export </span>
    <span class="footer-action" id="import" @click="importSave()">import </span>
    <span class="footer-action" id="reset" @click="resetGame()">reset </span>
    <span class="footer-action" id="save" @click="saveGame()">save </span>
  </footer>
</template>

<style scoped>
  #footer {
    position: absolute;
    bottom: 8px;
    right: 16px;
    font-size: 18px;
  }
  .footer-action {
    text-align: right;
  }
  .footer-action:hover {
    cursor: pointer;
  }
  #reset, #cheater {
    color: red;
  }
  #reset:hover {
    color: rgb(85, 20, 20);
  }
  #save {
    color: green;
  }
  #save:hover {
    color: rgb(13, 77, 13);
  }
  #export {
    color: rgb(43, 202, 162);
  }
  #export:hover {
    color: rgb(19, 100, 80);
  }
  #import {
    color: rgb(212, 196, 47);
  }
  #import:hover {
    color: rgb(134, 124, 26);
  }
  #settings {
    color: rgb(156, 66, 197);
  }
  #settings:hover {
    color: rgb(90, 23, 121);
  }
</style>
