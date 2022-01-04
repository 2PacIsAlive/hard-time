<script setup lang="ts">
import { useStore } from '../store'
import { NModal, NCard, NButton, NInput, NSlider } from 'naive-ui'

const store = useStore()

</script>

<template>
  <n-modal v-model:show="store.showSettingsModal">
    <n-card style="width: 600px;" title="settings:" :bordered="false" hoverable size="large">
      music volume
      <n-slider 
        v-model:value="store.settings.musicVolume" 
        :max="1"
        :min="0"
        :step="0.01"
      />
      <template #footer>
        <n-button style="margin-right: 10px;" @click="store.showSettingsModal = false">
          close
        </n-button>
      </template>
    </n-card>
  </n-modal>
</template>

<style scoped>

</style>
