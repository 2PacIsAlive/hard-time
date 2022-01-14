<script setup lang="ts">
  import { computed, onUnmounted, ref, watch, onActivated, Ref } from 'vue'
  import { useStore } from '../../store'
  import { NSpace, NInput, NButton, NIcon, NProgress, NPopover, useMessage, NUl } from 'naive-ui'
  import { PencilOutline, PeopleOutline } from '@vicons/ionicons5'
  import { useSound } from '@vueuse/sound'
  import Escape_Task_Fail from '../../assets/Escape_Task_Fail.mp3'
  import Escape_Task_Success from '../../assets/Escape_Task_Success.mp3'
  import REQ_Attempt_Fail from '../../assets/REQ_Attempt_Fail.mp3'
  import REQ_Attempt_Success from '../../assets/REQ_Attempt_Success.mp3'
  import shovel_dirt from '../../assets/shovel_dirt.mp3'
  import shovel_ping from '../../assets/shovel_ping.mp3'
  
  const store = useStore(),
    message = useMessage(),
    reqAttemptFailSound = useSound(REQ_Attempt_Fail),
    AttemptDirtDigSound = useSound(shovel_dirt),
    AttemptConcDigSound = useSound(shovel_ping),
    reqAttemptSuccessSound = useSound(REQ_Attempt_Success),    
    escapeTaskFailSound = useSound(Escape_Task_Fail),
    escapeTaskSuccessSound = useSound(Escape_Task_Success),
    timeFormatToggle = ref(true),
    started = ref(false),
    timeElapsed = ref(0),
    timeLimit = computed(() =>
      (store.escapeProject.settings.minTimeSeconds || 10) +
      (store.stats['strength'] * .5)
    ),
    timeRemainingPercentage = computed(() => 
      100 - (timeElapsed.value / timeLimit.value) * 100
    ),
    timeRemainingFormatted = computed(() => 
      `${(timeLimit.value - timeElapsed.value).toFixed(0)}s`
    ),
    requiredClicks = computed(() => 
      Math.max(1, 
      Math.floor(store.escapeProject.settings.maxRequiredClicks - 
      (store.stats['strength'] * .1)))
    ),
    jail = computed(() => {
      console.log(store.currentWorld)
      const world = store.worlds[store.currentWorld]
      console.log(world.currentCity)
      const city = world.cities[world.currentCity]
      console.log(city.currentJail)
      return city.jails[city.currentJail]
    })

  function finish (complete: boolean) {
    if (complete) reqAttemptSuccessSound.play()
    else reqAttemptFailSound.play()
    clickCount = 0;
    store.themeOverrides.common.bodyColor = "#101014"
    console.log(clickCount)
    clearInterval(timer)
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

  let rand = 0;
  function isRedLight(){
    //0 luck means 50% of the time guards are distracted/
    if (rand <= .5+(store.stats.luck/1000)){
      //distracted
      isRed.value = false
    }
    else{
      isRed.value = true
    }
    if (started.value === false){
      isRed.value = false
    }
    return isRed;
  }

  //Handle the click of the Dig button
  let clickCount = 0
  function handleClick() {
    started.value = true
    clickCount = clickCount+1;
    changeBgColor();
    console.log(clickCount);
    if(isRed.value == true){
      finish(false);
    }
    else if (clickCount >= requiredClicks.value){
       removeEventListener("click", handleClick);
       finish(true);
    }
  }

  let isRed=ref(false);
  const timer = setInterval(() => {
    if (started.value == false) console.log("haven't started")
    else if (timeElapsed.value >= timeLimit.value) finish(false)
    else (timeElapsed.value += 1)
      rand = Math.random()
      isRedLight()
  }, 1000)

  let bgR = 16
  let bgG = 16
  let bgB = 20
  let bgO = 1;
  function changeBgColor() {
      let clickPercentDone = ((clickCount/requiredClicks.value)*100)
      //for the first 20% go from org color to grey
      if (clickPercentDone <= 20){
       AttemptConcDigSound.play()
       bgR += 50/(.2*requiredClicks.value);
       bgG += 50/(.2*requiredClicks.value);
       bgB += 50/(.2*requiredClicks.value); 
      }
      //for next 50% go to brown
      //else if (clickPercentDone > 20 && clickPercentDone < 80) {
      else{
       AttemptDirtDigSound.play()  
       bgR -= (bgR-58)/(.8*requiredClicks.value); 
       bgG -= (bgG-34)/(.8*requiredClicks.value); 
       bgB -= (bgB-1)/(.8*requiredClicks.value); 
      }
      //for the last clicks go to white
      // else {
      //  bgO -= .1
      //  //(.3*requiredClicks.value)*.1;
      // }
      //#915D2FFF
      let bgC = "rgba("+bgR+","+bgG+","+bgB+","+bgO+")"
      console.log(bgC)
      store.themeOverrides.common.bodyColor = bgC;
  } 

</script>

<template>
  <div>
  <n-space align="center" justify="center" vertical size="large">
    <p>i'll keep watch. the guards are:</p>
    <p><span :style="`font-size:large;color:${isRed?'red':'green'};`">{{isRed?"WATCHING":"distracted"}}</span></p> 
  </n-space>
  <n-button block style="text-align: center; margin-top: 20px;" @click="handleClick()">dig</n-button>
  <n-space align="center" justify="center" vertical size="large">
    <p>
      <n-popover placement="right" trigger="hover">
        <template #trigger>
        </template>
        max(1, floor({{ store.escapeProject.settings.maxRequiredCorrectAnswers }} - strength * .1))
      </n-popover>
    </p>
    <n-popover v-if="started" placement="right" trigger="hover">
      <template #trigger>
        <n-progress color="#D32D3FFF" type="circle" :percentage="timeRemainingPercentage">
          <span style="text-align: center;">{{ timeRemainingFormatted }}</span>
        </n-progress>      
      </template>
      {{ store.escapeProject.settings.minTimeSeconds }} + strength * .5
    </n-popover>

    <!-- <span style="font-variant-numeric: tabular-nums">
      <n-countdown :on-finish="finish(false)" :duration="timeLimit" />
    </span> -->
  </n-space>
  </div>

</template>

<style scoped>
</style>