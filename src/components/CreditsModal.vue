<script setup lang="ts">
import { useStore } from '../store'
import { NModal, NCard, NButton } from 'naive-ui'

const store = useStore()
</script>

<template>
  <n-modal v-model:show="store.showCreditsModal">
    <n-card style="width: 600px;" title="" :bordered="false" hoverable size="large">
      <p>
        developed by @infinitestack, @guppy, @ROFLobster, @Bo, and @vonHubl <br/>
        for <a target="_blank" rel="noopener noreferrer" href="https://itch.io/jam/new-years-incremental-game-jam">new years igj 2022</a>
      </p>
      <p>original sfx and soundtrack by @vonHubl, @ROFLobster, and @infinitestack</p>
      <p>special thanks to frank lantz</p>
      <template #footer>
        <n-button style="margin-right: 10px;" @click="store.showCreditsModal = false">
          close
        </n-button>
      </template>
    </n-card>
  </n-modal>
</template>

<style scoped>
p {
  text-align: center;
}
a {
  color: rgb(211, 43, 113);
}
</style>
