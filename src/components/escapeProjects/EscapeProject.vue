<script setup lang="ts">
  import { computed } from 'vue'
  import { useStore } from '../../store'
  import { NSpace, NAlert, NButton } from 'naive-ui'
  // @ts-ignore
  import BefriendGuards from './BefriendGuards.vue'
  // @ts-ignore
  import DigATunnel from './DigATunnel.vue'
  // @ts-ignore
  import StudyPrisonSchematics from './StudyPrisonSchematics.vue'
  // @ts-ignore
  import GameError from '../GameError.vue'
  // @ts-ignore
  import DefendYourCell from './DefendYourCell.vue'

  const store = useStore(),
    jail = computed(() => {
    const world = store.worlds[store.currentWorld]
    const city = world.cities[world.currentCity]
    return city.jails[city.currentJail]
    })

  function finish () {
    const eProj = jail.value
      .escapeProjects
      .find((e: EscapeProject ) => e.name === store.escapeProject.name)
    if (eProj) eProj.complete = true
    store.escapeProject = false
  }
</script>

<template>
  <n-space align="center" justify="center" vertical size="small">
    <p>you are attempting to <span style="color: red">{{ store.escapeProject.name }}</span></p>
    <befriend-guards v-if="store.escapeProject.name === 'befriend the guards'" />
    <dig-a-tunnel v-if="store.escapeProject.name === 'dig a tunnel'"/>
    <study-prison-schematics v-else-if="store.escapeProject.name === 'study prison schematics'" />
    <defend-your-cell v-else-if="store.escapeProject.name === 'defend your cell'" />
    <template v-else>
      <game-error msg="unknown escape project type" />
      <n-button @click="finish()">finish</n-button>
    </template>
  </n-space>
</template>

<style scoped>

</style>