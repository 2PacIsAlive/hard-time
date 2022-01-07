<script setup lang="ts">
  import { ref, onUnmounted, computed, Ref } from 'vue'
  import { useStore } from '../../store'
  import { NSpace, NInput, NIcon, NProgress, NPopover, useMessage } from 'naive-ui'
  import { PencilOutline, PeopleOutline } from '@vicons/ionicons5'
  import Sentiment from 'sentiment'
  import { useSound } from '@vueuse/sound'
  import Escape_Task_Fail from '../../assets/Escape_Task_Fail.mp3'
  import Escape_Task_Success from '../../assets/Escape_Task_Success.mp3'
  import REQ_Attempt_Fail from '../../assets/REQ_Attempt_Fail.mp3'
  import REQ_Attempt_Success from '../../assets/REQ_Attempt_Success.mp3'

  const store = useStore(),
    message = useMessage(),
    reqAttemptFailSound = useSound(REQ_Attempt_Fail),
    reqAttemptSuccessSound = useSound(REQ_Attempt_Success),    
    escapeTaskFailSound = useSound(Escape_Task_Fail),
    escapeTaskSuccessSound = useSound(Escape_Task_Success),
    sentiment = new Sentiment(),
    niceToggle = ref(true),
    submission = ref(""),
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
    })

  function finish (complete: boolean) {
    if (complete) reqAttemptSuccessSound.play()
    else reqAttemptFailSound.play()
    clearInterval(timer)
    if (jail.value) {
      const eProj = jail.value
        .escapeProjects
        .find((e: EscapeProject ) => e.name === store.escapeProject.name)
      if (eProj) eProj.complete = complete
    }
    store.escapeProject = false  
  }

  function submit () {
    let correct = false
    if (submission.value) {
      if (submissions.value.includes(submission.value)) {
        message.error('you said that already')
      } else {
        submissions.value.push(submission.value)
        const analysis = sentiment.analyze(submission.value)
        if (analysis.score > 0) {
          if (niceToggle.value) correct = true
        }
        else if (analysis.score < 0) {
          if (!niceToggle.value) correct = true
        }
      }
    }
    if (correct) {
      escapeTaskSuccessSound.play()
      correctAnswers.value += 1
      if (correctAnswers.value >= requiredCorrectAnswers.value) 
        finish(true)
    } else {
      escapeTaskFailSound.play()
      correctAnswers.value -= 1
    }
    if (Math.random() > .5) niceToggle.value = !niceToggle.value
    submission.value = ""
  }

  function doCommand(e: any) {
    if (e.keyCode === 13) submit()
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

  document.addEventListener('keydown', doCommand)
  onUnmounted(() => {
    document.removeEventListener('keydown', doCommand)
  })

  const timer = setInterval(() => {
    if (timeElapsed.value >= timeLimit.value) finish(false)
    else timeElapsed.value += 1
  }, 1000)
</script>

<template>
  <n-space align="center" justify="center" vertical size="large">
    <p>say something <span style="color: green;" v-if="niceToggle">nice</span><span style="color: red;" v-else>mean</span></p>
    <n-input autofocus v-model:value="submission" round placeholder="" >
      <!-- <template #suffix>
        <n-icon>
          <pencil-outline />
        </n-icon>
      </template> -->
    </n-input>
    <p>correct responses: {{ correctAnswers }} /   
      <n-popover placement="right" trigger="hover">
        <template #trigger>
          <span>{{ requiredCorrectAnswers }}</span>
        </template>
        max(1, floor({{ store.escapeProject.settings.maxRequiredCorrectAnswers }} - street cred * .1))
      </n-popover>
    </p>
    <n-popover placement="right" trigger="hover">
      <template #trigger>
        <n-progress color="#D32D3FFF" type="circle" :percentage="timeRemainingPercentage">
          <span style="text-align: center;">{{ timeRemainingFormatted }}</span>
        </n-progress>      
      </template>
      {{ store.escapeProject.settings.minTimeSeconds }} + street cred * .5
    </n-popover>

    <!-- <span style="font-variant-numeric: tabular-nums">
      <n-countdown :on-finish="finish(false)" :duration="timeLimit" />
    </span> -->
  </n-space>

</template>

<style scoped>

</style>