<script setup lang="ts">
import { useStore } from '../store'
import { NModal, NCard, NButton, NInput, NSlider, NSwitch, NGrid, NGi, NRow } from 'naive-ui'

const store = useStore()

</script>

<template>
  <n-modal v-model:show="store.showSettingsModal">
    <n-card style="width: 400px;" title="settings:" :bordered="false" hoverable size="large">
      <n-grid x-gap="40" :cols="2">
        <n-gi span="1">
          <!-- <div class="row">
            music volume:
            <n-slider 
              v-model:value="store.settings.musicVolume" 
              :max="1"
              :min="0"
              :step="0.01"
              :disabled="!store.settings.musicEnabled"
            />
          </div>
          <div class="row">
            sfx volume:
            <n-slider 
              v-model:value="store.settings.sfxVolume" 
              :max="1"
              :min="0"
              :step="0.01"
              :disabled="!store.settings.sfxEnabled"
            />
          </div> -->
          <div class="row">
            autosave interval (seconds):
            <n-slider 
              v-model:value="store.settings.autosaveInterval" 
              :max="60"
              :min="3"
              :step="1"
              :disabled="!store.settings.autosaveEnabled"
            />
          </div>
        </n-gi>
        <n-gi>
          <div class="row">
            music:
            <n-switch v-model:value="store.settings.musicEnabled" :round="false" />
            <!-- {{store.settings.musicEnabled ? 'enabled' : 'disabled' }} -->
          </div>
          <div class="row">
            sfx:
            <n-switch v-model:value="store.settings.sfxEnabled" :round="false" />
            <!-- {{store.settings.sfxEnabled ? 'enabled' : 'disabled' }} -->
          </div>
          <div class="row">
            autosave:
            <n-switch v-model:value="store.settings.autosaveEnabled" :round="false" />
            <!-- {{store.settings.autosaveEnabled ? 'enabled' : 'disabled' }} -->
          </div>
          <div class="row">
            cheats:  
            <n-switch v-model:value="store.settings.cheatsEnabled" :round="false" />
            <!-- {{store.settings.cheatsEnabled ? 'enabled' : 'disabled' }} -->
          </div>
        </n-gi>
      </n-grid>
      <template #footer>
        <n-button style="margin-right: 10px;" @click="store.showSettingsModal = false">
          close
        </n-button>
      </template>
    </n-card>
  </n-modal>
</template>

<style scoped>
.row {
  margin-bottom: 10px;
}
</style>
