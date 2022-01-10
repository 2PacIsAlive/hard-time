<script setup lang="ts">
import { useStore } from '../store'
import { NModal, NCard, NButton } from 'naive-ui'

const store = useStore()
</script>

<template>
  <n-modal v-model:show="store.showLoreModal">
    <n-card style="width: 600px;" title="" :bordered="false" hoverable size="large">
      <p v-html="store.lore" />
      <template #footer>
        <n-button style="margin-right: 10px;" @click="store.showLoreModal = false">
          close
        </n-button>
      </template>
    </n-card>
  </n-modal>
</template>

<style scoped>

</style>
