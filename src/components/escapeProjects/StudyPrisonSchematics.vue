<script setup lang="ts">
  import { ref, onUnmounted, computed, Ref } from 'vue'
  import { useStore } from '../../store'
  import { NSpace, NInput, NIcon, NProgress, NPopover, NButton, useMessage, NGrid, NGi } from 'naive-ui'
  import { useSound } from '@vueuse/sound'
  // import Escape_Task_Fail from '../../assets/Escape_Task_Fail.mp3'
  // import Escape_Task_Success from '../../assets/Escape_Task_Success.mp3'
  import REQ_Attempt_Fail from '../../assets/REQ_Attempt_Fail.mp3'
  import REQ_Attempt_Success from '../../assets/REQ_Attempt_Success.mp3'
  import niceColors from './niceColors'
  import Color from 'color'
  import SOPHIE_fx_55 from '../../assets/sound_tile.wav'

  const store = useStore(),
    message = useMessage(),
    reqAttemptFailSound = useSound(REQ_Attempt_Fail),
    reqAttemptSuccessSound = useSound(REQ_Attempt_Success),    
    // escapeTaskFailSound = useSound(Escape_Task_Fail),
    // escapeTaskSuccessSound = useSound(Escape_Task_Success),
    tileSoundPlaybackRate = ref(1),
    tileSound = useSound(SOPHIE_fx_55, {
      playbackRate: tileSoundPlaybackRate
    }),
    waitingForSubmission = ref(false),
    currentSequencePos = ref(0),
    submission = ref(""),
    started = ref(false),
    submissions: Ref<string[]> = ref([]),
    correctAnswers = ref(0),
    timeElapsed = ref(0),
    timeLimit = computed(() =>
      (store.escapeProject.settings.minTimeSeconds || 10) +
      (store.stats['street cred'] * .5)
    ),
    timeRemainingPercentage = computed(() => 
      100 - (timeElapsed.value / timeLimit.value) * 100
    ),
    timeRemainingFormatted = computed(() => 
      `${(timeLimit.value - timeElapsed.value).toFixed(0)}s`
    ),
    requiredCorrectAnswers = computed(() => 
      Math.max(1, 
      Math.floor(store.escapeProject.settings.maxRequiredCorrectAnswers - 
      (store.stats['street cred'] * .1)))
    ),
    jail = computed(() => {
      const world = store.worlds[store.currentWorld]
      const city = world.cities[world.currentCity]
      return city.jails[city.currentJail]
    }),
    tiles: Ref<Tile[]> = ref([]),
    sequence: Ref<number[]> = ref([])

  for (let t=0; t<store.escapeProject.settings.tiles; t++) {
    tiles.value.push({
      color: randomColor(),
      playing: false,
    })
  }

  function finish (complete: boolean) {
    if (complete) reqAttemptSuccessSound.play()
    else reqAttemptFailSound.play()
    if (jail.value) {
      const eProj = jail.value
        .escapeProjects
        .find((e: EscapeProject ) => e.name === store.escapeProject.name)
      if (eProj) eProj.complete = complete
    }
    store.escapeProject = false  
  }

  function msToTime (ms: number) {
    const seconds = (ms / 1000),
      minutes = (ms / (1000 * 60)),
      hours = (ms / (1000 * 60 * 60)),
      days = (ms / (1000 * 60 * 60 * 24))
    if (seconds < 60) return seconds.toFixed(1) + " seconds"
    else if (minutes < 60) return minutes.toFixed(1) + " minutes"
    else if (hours < 24) return hours.toFixed(1) + " hours"
    else return days.toFixed(1) + " days"
  }

  function randomColor(): Color {
    const color = Color(niceColors[Math.floor(Math.random() * niceColors.length)])
    return color.isLight() ? color.darken(0.7) : color
  }

  function getSequenceLength() {
    return Math.max(2, store.escapeProject.settings.maxSequenceLength -
      (store.stats.dexterity * .1))
  }

  function getDelay() {
    return Math.min(1500, store.escapeProject.settings.minDelay +
      store.stats.dexterity * 1.75)
  }

  async function playTile (t: number): Promise<void> {
    tileSoundPlaybackRate.value = 1 + (t * 0.25)
    tileSound.play()
    tiles.value[t].playing = true
    return new Promise(resolve => 
      setTimeout(function () {
        tiles.value[t].playing = false
        resolve()
      }, getDelay())
    )
  }

  async function playTune () {
    const sequenceLength = getSequenceLength()
    sequence.value = []
    for (let t=0; t<sequenceLength; t++) {
      const nextTileIndex = Math.floor(Math.random() * tiles.value.length)
      sequence.value.push(nextTileIndex)
      await playTile(nextTileIndex)
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    waitingForSubmission.value = true
  }

  function submitTile(t: number) {
    if (waitingForSubmission.value) {
      playTile(t)
      if (t === sequence.value[currentSequencePos.value++]) {
        if (currentSequencePos.value === sequence.value.length) {
          finish(true)
        }
      } else {
        finish(false)
      }
    }
  }

  function start () {
    started.value = true
    playTune()
  }

  function getStyle(tile: Tile){
    let style = waitingForSubmission.value
      ? 'cursor: pointer;'
      : 'cursor: auto;' // TODO use wait instead?
    return tile.playing 
      ? style + ` background-color: ${tile.color.rotate(10).lighten(0.66).hex()};` 
      : style + ` background-color: ${tile.color.hex()};`
  }
</script>

<template>
  <p style="text-align: center;"><span style="color: red;">pay attention</span>, repeat after me</p>
  <div class="flex-grid">
    <div 
      v-for="tile, i in tiles"
      @click="submitTile(i)"
      :id="`tile-${i}`"
      :style="getStyle(tile)"
      class="col"  
      :key="i" />
  </div>
  <n-button block style="text-align: center; margin-top: 20px;" v-if="!started" @click="start()">start</n-button>
  <!-- <p style="text-align: center;">correct responses: {{ correctAnswers }} /   
    <n-popover placement="right" trigger="hover">
      <template #trigger>
        <span>{{ requiredCorrectAnswers }}</span>
      </template>
      max(1, floor({{ store.escapeProject.settings.maxRequiredCorrectAnswers }} - street cred * .1))
    </n-popover>
  </p> -->

</template>

<style scoped>
.flex-grid {
  display: flex;
  flex-wrap: wrap;
}
.col {
  height: 100px;
  width: 100px;
  flex: 1;
}

/* @media (max-width: 400px) {
  .flex-grid {
    display: block;
  }
} */
</style>