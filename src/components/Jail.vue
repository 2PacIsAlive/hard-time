<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from '../store'
import { useLoadingBar, NSpace, NButton } from 'naive-ui'

const store = useStore(),
  loadingBar = useLoadingBar(),
  timeFormatToggle = ref(true),
  formattedSentenceTime = computed(() => {
    const timeLeftToServe = msToTime(store.jailtime - store.timeServed),
      percentageServed = ((store.timeServed/store.jailtime) * 100).toFixed(0)
    return timeFormatToggle.value
    ? `you have ${timeLeftToServe} of your sentence left to serve`
    : 'you have served ' + msToTime(store.timeServed) + ', ' + percentageServed + '% of your sentence'
  }),
  jail = computed(() => 
    store.world.cities[store.currentCity].prisons[store.currentPrison]
  ),
  escapeDisabled = computed(() =>
    jail.value
      .escapeProjects
      .filter((eReq: EscapeProject) => !eReq.complete)
      .length > 0

  )

function msToTime (ms: number) {
  const seconds = (ms / 1000),
    minutes = (ms / (1000 * 60)),
    hours = (ms / (1000 * 60 * 60)),
    days = (ms / (1000 * 60 * 60 * 24))
  if (seconds < 60) return seconds.toFixed(4) + " seconds"
  else if (minutes < 60) return minutes.toFixed(4) + " minutes"
  else if (hours < 24) return hours.toFixed(4) + " hours"
  else return days.toFixed(4) + " days"
}

function leaveJail () {
  clearInterval(fullSentence)
  loadingBar.finish()
  for (let eProj of jail.value?.escapeProjects || []) {
    eProj.complete = false
  }
  store.inJail = false
  store.escapeProject = false
  store.timeServed = 0
  store.sentenceStarted = undefined
  store.save()
}

function launchEscapeProject (eProj: EscapeProject) {
  store.escapeProject = eProj
  // eProj.complete = true
}

if (!store.sentenceStarted) store.sentenceStarted = new Date().getTime()
loadingBar.start()

const fullSentence = setInterval(() => {
  store.timeServed = new Date().getTime() - store.sentenceStarted
  if (store.timeServed >= store.jailtime)
    leaveJail()
}, 1)
</script>

<template>
  <n-space align="center" justify="center" vertical size="large">
    <p>you are doing <strong>hard time</strong> in <span style="color: red">{{ jail?.name }}</span></p>
    <p id="sentencetime" @click="timeFormatToggle = !timeFormatToggle">{{ formattedSentenceTime }}</p>
    <template
      v-for="escapeProject in jail?.escapeProjects"
      :key="escapeProject.name"
    >
      <n-button
        v-if="!escapeProject.complete"
        @click="launchEscapeProject(escapeProject)"
      >
        {{ escapeProject.name }}
      </n-button>
      <p v-else><span style="color: green;">{{ escapeProject.result }}</span></p>
    </template>
    <n-button
      @click="leaveJail()" 
      :disabled="escapeDisabled"
    >
      escape
    </n-button>
  </n-space>
</template>

<style scoped>
#sentencetime {
  cursor: pointer;
}
</style>