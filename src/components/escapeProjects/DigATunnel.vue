<script setup lang="ts">
  import { ref, onUnmounted, computed, Ref } from 'vue'
  import { useStore } from '../../store'
  import { NSpace, NInput, NButton, NIcon, NProgress, NPopover, useMessage, NUl } from 'naive-ui'
  import { PencilOutline, PeopleOutline } from '@vicons/ionicons5'
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
    requiredClicks = computed(() => 
      Math.max(1, 
      Math.floor(store.escapeProject.settings.maxRequiredClicks - 
      (store.stats['street cred'] * .1)))
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


  //Handle the click of the Dig button
  let clickCount = 0
  function handleClick() {
    //TODO: Could have it slow you down to be "quiet". If you click too fast you get kicked out. 
    //Maybe you click the overlay object, it's too fast? 
    overlayOn()
    clickCount = clickCount+1;
    console.log(clickCount);
    if (clickCount >= requiredClicks.value){
       removeEventListener("click", handleClick);
       finish(true);
    }
  }
  const timer = setInterval(() => {
    if (timeElapsed.value >= timeLimit.value) finish(false)
    else timeElapsed.value += 1
  }, 1000)


  //Style of the block of color that flashes as you approach daylight
  let overlayR = 0
  let overlayG = 0
  let overlayB = 0
  function overlayOn() {
      //TODO: There's gotta be an easier way to do this
      overlayR += Math.round((clickCount/requiredClicks.value) * 255);
      overlayG += Math.round((clickCount/requiredClicks.value) * 255);
      overlayB += Math.round((clickCount/requiredClicks.value) * 255); 
      let overlayOpacity = (clickCount/requiredClicks.value) * 1;
      //TODO: what a mess
      let overlayColor = "rgb("+overlayR+","+overlayG+","+overlayB+")"
      store.themeOverrides.common.bodyColor = overlayColor;
      console.log(overlayColor);
      //TODO why are these errors?
      //document.getElementById("overlay").style.display = "block"
      //document.getElementById("overlay").style.backgroundColor = overlayColor
      //setTimeout(() => overlayOff(), 100);
  } 

  //Quickly remove the block of color from the screen. 
  // function overlayOff() {
  //   if(document.getElementById("overlay")){
  //     document.getElementById("overlay").style.display = "none";
  //   }
  // }

</script>

<template>
  <!-- <div id="overlay" @click="on()"></div> -->
  <!-- <div style="background-color:rgb(21, 255, 0)"> -->
  <!-- <n-button @click="on()">Dig!</n-button> -->
  <div>
  <n-button block style="text-align: center; margin-top: 20px;" @click="handleClick()">Dig!</n-button>
  <n-space align="center" justify="center" vertical size="large">
    <p>
      <n-popover placement="right" trigger="hover">
        <template #trigger>
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
  </div>

</template>

<style scoped>
</style>