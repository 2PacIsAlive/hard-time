<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '../store'
import { NModal, NCard, NButton, NInput, useMessage, useLoadingBar } from 'naive-ui'

const store = useStore(),
  message = useMessage(),
  loadingBar = useLoadingBar()

function importSave () {
  try {
    store.importSave()
    message.success('save imported')
    // TODO smarter way to do this? save loading in store?
    // close loading bar if it was running
    loadingBar.finish()
    store.importString = ""
  } catch (err) {
    message.error('import failed')
  }
}
</script>

<template>
  <n-modal :show="store.showImportModal">
    <n-card style="width: 600px;" title="import a save file:" :bordered="false" hoverable size="large">
      <n-input v-model:value="store.importString" type="textarea" placeholder="paste save file here" />
      <template #footer>
        <n-button style="margin-right: 10px;" @click="store.showImportModal = false">
          close
        </n-button>
        <n-button @click="importSave()">import</n-button>
      </template>
    </n-card>
  </n-modal>
</template>

<style scoped>
  /* https://css-tricks.com/snippets/css/make-pre-text-wrap/ */
  pre {
    white-space: pre-wrap;       /* css-3 */
    white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
    white-space: -pre-wrap;      /* Opera 4-6 */
    white-space: -o-pre-wrap;    /* Opera 7 */
    word-wrap: break-word;       /* Internet Explorer 5.5+ */
  }
</style>
