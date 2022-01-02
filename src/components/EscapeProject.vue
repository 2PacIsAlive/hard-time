<script setup lang="ts">
  import { useStore } from '../store'
  import { NSpace } from 'naive-ui'

  const store = useStore()
</script>

<template>
  <n-space align="center" justify="center" vertical size="large">
    <button @click="store.escapeProject.effect()">doit</button>
  </n-space>
</template>

<style scoped>

</style>