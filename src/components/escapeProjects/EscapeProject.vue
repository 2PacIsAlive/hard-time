<script setup lang="ts">
  import { useStore } from '../../store'
  import { EscapeProject } from '../../store/jails'
  import { NSpace, NAlert, NButton } from 'naive-ui'
  // @ts-ignore
  import BefriendGuards from './BefriendGuards.vue'
  // @ts-ignore
  import GameError from '../GameError.vue'

  const store = useStore()

  function finish () {
    store.jails[store.currentJail].escapeProjects
      .find((e: EscapeProject ) => e.name === store.escapeProject.name)
      // TODO only mark complete if actually complete
      .complete = true
    store.escapeProject = false
  }
</script>

<template>
  <n-space align="center" justify="center" vertical size="large">
    <p>you are attempting to <span style="color: red">{{ store.escapeProject.name }}</span></p>
    <befriend-guards v-if="store.escapeProject.name === 'befriend the guards'"/>
    <template v-else>
      <game-error msg="unknown escape project type" />
      <n-button @click="finish()">finish</n-button>
    </template>
  </n-space>
</template>

<style scoped>

</style>