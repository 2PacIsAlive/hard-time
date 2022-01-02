<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '../store'
import { NModal, NCard, NButton, useMessage } from 'naive-ui'

const store = useStore(),
  message = useMessage()

function copyToClipboard () {
  navigator.clipboard.writeText(store.exportString)
  message.info("copied")
}
</script>

<template>
  <n-modal :show="store.showExportModal">
    <n-card style="width: 600px;" title="stash your save file:" :bordered="false" hoverable size="large">
      <pre><code>{{ store.exportString }}</code></pre>
      <template #footer>
        <n-button style="margin-right: 10px;" @click="store.showExportModal = false">close</n-button>
        <n-button @click="copyToClipboard()">copy</n-button>
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
