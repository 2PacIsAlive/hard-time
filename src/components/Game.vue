<script setup lang="ts">
// lots of code in here adapted from https://www.decisionproblem.com/paperclips/main.js?v3
// thank you frank!

import { h, ref, watch, computed } from 'vue'
import { useStore } from '../store'
// @ts-ignore
import Launcher from './Launcher.vue'
// @ts-ignore
import Jail from './Jail.vue'
// @ts-ignore
import EscapeProject from './escapeProjects/EscapeProject.vue'
// @ts-ignore
import Streets from './Streets.vue'
// @ts-ignore
import Pad from './Pad.vue'
// @ts-ignore
import Gym from './Gym.vue'
// @ts-ignore
import Space from './Space.vue'
// @ts-ignore
import GameError from './GameError.vue'
// @ts-ignore
import Skies from './Skies.vue'
// @ts-ignore
import DonutShop from './DonutShop.vue'
import { NIcon, NSpace, NSwitch, NLayout, NLayoutSider, NMenu, useMessage } from 'naive-ui'
import { HomeOutline, CaretDownOutline, SkullOutline, SubwayOutline, StorefrontOutline, BarbellOutline, StarOutline, EarthOutline, FastFoodOutline } from '@vicons/ionicons5'
import { useSound } from '@vueuse/sound'
import hardTimeTitle from '../assets/hard-time-title.mp3'
import earthAsViewedFromTheMoon from '../assets/earth_as_viewed_from_the_moon_JAN2022_FOR_HARD_TIME_mastered_warm.mp3'
import murderMysteries from '../assets/murder-mysteries.mp3'
import twelvePacs from '../assets/twelvepacs_JULY2016_2019A.mp3'
import battojutsu2 from '../assets/battojutsu2.mp3'
import IMNOTAFRAIDOFGHOSTS from '../assets/IMNOTAFRAIDOFGHOSTS.mp3'
import lurkable from '../assets/lurkable.mp3'

const store = useStore(),
  collapsed = ref(true),
  message = useMessage(),
  autosaveInterval = computed(() => 
    store.settings.autosaveInterval
  ),
  jailLoop = useSound(hardTimeTitle, {
    // @ts-ignore
    loop: true
  }),
  starsLoop = useSound(earthAsViewedFromTheMoon, {
    // @ts-ignore
    loop: true
  }),
  streetsLoop = useSound(murderMysteries, {
    // @ts-ignore
    loop: true
  }),
  skiesLoop = useSound(twelvePacs, {
    // @ts-ignore
    loop: true
  }),
  padLoop = useSound(battojutsu2, {
    // @ts-ignore
    loop: true
  }),
  gymLoop = useSound(IMNOTAFRAIDOFGHOSTS, {
    // @ts-ignore
    loop: true
  }),
  shopLoop = useSound(lurkable, {
    // @ts-ignore
    loop: true
  })

function renderMenuLabel (option: any) {
  return option.disabled
    ? false
    : h('h3', { onClick: function () { openScreen(option.label) } }, option.label)
}

function renderMenuIcon (option: any) {
  let icon = HomeOutline
  if (option.key === 'the streets') icon = SkullOutline
  else if (option.key === 'the gym') icon = BarbellOutline
  else if (option.key === 'the stars') icon = StarOutline
  else if (option.key === 'the skies') icon = EarthOutline
  else if (option.key === 'the shop') icon = FastFoodOutline
  return option.disabled
    ? false
    : h(NIcon, { onClick: function () { openScreen(option.label) } }, { default: () => 
      // @ts-ignore
      h(icon, { onClick: function () { openScreen(option.label) } }) 
    }) 
}

function expandIcon () {
  return h(NIcon, null, { default: () => h(CaretDownOutline) })
}

function openScreen(tab: string): void {
  store.openScreen = tab
}

function measureLag(): void {
  const start = performance.now()
  setTimeout(() => {
    store.lag = performance.now() - start
    measureLag()
  })
}

function saveGame(): void {
  if (store.settings.autosaveEnabled) {
    store.save()
    message.info('game saved')
  }
}

function updateDemandCurve() {
  const marketing = (Math.pow(1.1,(store.donutShop.marketingLevel-1)))
  const demand = (((.000008/store.donutShop.margin) * marketing * store.donutShop.marketingEffectiveness) * store.donutShop.demandBoost)
  // demand = demand + ((demand/10)*prestigeU) // TODO use num worlds visited or something here?
  store.donutShop.demand = demand + (demand/10)
}

function calculateRev(){
  const incomeLastSecond = store.money - store.lastMoney
  store.donutShop.incomeTracker.push(incomeLastSecond)
  if (store.donutShop.incomeTracker.length > 5) {
    store.donutShop.incomeTracker.splice(0,1)
  }
  let sum = 0
  for (let i=0; i<store.donutShop.incomeTracker.length; i++){
    sum = sum + store.donutShop.incomeTracker[i]
  }
  const trueAvgRev = sum/store.donutShop.incomeTracker.length
  let chanceOfPurchase = store.donutShop.demand/100
  if (chanceOfPurchase > 1) chanceOfPurchase = 1
  if (store.donutShop.unsold < 1) chanceOfPurchase = 0
  let avgSales = chanceOfPurchase * (.7*Math.pow(store.donutShop.demand,1.15))*10
  let avgRev = chanceOfPurchase * (.7*Math.pow(store.donutShop.demand,1.15))*store.donutShop.margin*10
  if (store.donutShop.demand > store.donutShop.unsold){ 
    avgRev = trueAvgRev
    avgSales = avgRev/store.donutShop.margin
  } 
  store.donutShop.avgSales = avgSales
  store.donutShop.avgRev = avgRev
}

function sellDonuts(donutsDemanded: number): void {
  if (store.donutShop.unsold > 0) {
    if (donutsDemanded > store.donutShop.unsold){
      const transaction = store.donutShop.unsold * store.donutShop.margin
      store.money += transaction
      store.donutShop.income += transaction
      store.donutShop.donutsSold += store.donutShop.unsold
      store.donutShop.unsold = 0
    } else {
      const transaction = donutsDemanded * store.donutShop.margin
      store.money = (Math.floor((store.money + transaction)*100))/100
      store.donutShop.income += transaction
      store.donutShop.donutsSold += donutsDemanded
      store.donutShop.unsold = store.donutShop.unsold - donutsDemanded
    }
  } 
}

async function gameLoop() {
  while (1==1) {
    store.lastMoney = store.money
    if (store.possessions['donut shop']) {
      updateDemandCurve()
      store.donutShop.unsold += store.donutShop.autoDonutMakers * store.donutShop.autoDonutMakerLevel 
      store.donutShop.aiSpeedReduction = Math.min(10, Math.pow(1.2, store.donutShop.unsold * .001))
      if (store.donutShop.unsold > 0 && Math.random() < (store.donutShop.demand/100)){
        sellDonuts(Math.floor(.7 * Math.pow(store.donutShop.demand, 1.15)));
      }
      calculateRev()
    }
    // TODO do we really want to cap this at 1s?
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
}

let saveGameInterval = setInterval(saveGame, store.settings.autosaveInterval * 1000)
watch(autosaveInterval, () => {
  clearInterval(saveGameInterval)
  saveGameInterval = setInterval(saveGame, store.settings.autosaveInterval * 1000)
})

watch(() => store.gameStarted, (newGameStarted) => {
  if (newGameStarted) {
    if (!jailLoop.isPlaying.value) {
      jailLoop.play()
    }
  }
})

watch(() => store.inJail, (newInJail) => {
  if (newInJail) {
    starsLoop.stop()
    streetsLoop.stop()
    skiesLoop.stop()
    padLoop.stop()
    gymLoop.stop()
    shopLoop.stop()
    if (!jailLoop.isPlaying.value) {
      jailLoop.play()
    }
  } else {
    jailLoop.stop()
    if (!padLoop.isPlaying.value) {
      padLoop.play()
    }
  }
})

watch(() => store.openScreen, (newScreen) => {
  starsLoop.stop()
  streetsLoop.stop()
  skiesLoop.stop()
  padLoop.stop()
  gymLoop.stop()
  shopLoop.stop()
  if (!store.inJail) {
    if (newScreen === 'the pad') {
      if (!padLoop.isPlaying.value) {
        padLoop.play()
      }
    } else if (newScreen === 'the streets') {
      if (!streetsLoop.isPlaying.value) {
        streetsLoop.play()
      }
    } else if (newScreen === 'the skies') {
      if (!skiesLoop.isPlaying.value) {
        skiesLoop.play()
      }
    } else if (newScreen === 'the stars') {
      if (!starsLoop.isPlaying.value) {
        starsLoop.play()
      }
    } else if (newScreen === 'the gym') {
      if (!gymLoop.isPlaying.value) {
        gymLoop.play()
      }
    } else if (newScreen === 'the shop') {
      if (!shopLoop.isPlaying.value) {
        shopLoop.play()
      }
    }
  }
}) 

// if (store.inJail && !jailLoop.isPlaying.value) {
//   jailLoop.play()
// } else if (store.openScreen === 'the streets' && !streetsLoop.isPlaying.value) {
//   streetsLoop.play()
// } else if (store.openScreen === 'the skies' && !skiesLoop.isPlaying.value) {
//   skiesLoop.play()
// } else if (store.openScreen === 'the stars' && !starsLoop.isPlaying.value) {
//   starsLoop.play()
// }

measureLag()
gameLoop()
</script>

<template>
  <n-space vertical>
    <n-layout :has-sider="store.gameStarted && !store.inJail" position="absolute">
      <n-layout-sider
        v-if="store.gameStarted && !store.inJail"
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="190"
        :collapsed="collapsed"
        show-trigger="bar"
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <n-menu
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="store.menuOptions"
          :render-label="renderMenuLabel"
          :render-icon="renderMenuIcon"
          :expand-icon="expandIcon"
        />
      </n-layout-sider>
      <n-layout>
        <Launcher class="small-game-screen" v-if="!store.gameStarted" />
        <EscapeProject class="med-game-screen" v-else-if="store.escapeProject" />
        <Jail class="med-game-screen" v-else-if="store.inJail" />
        <Pad class="game-screen" v-else-if="store.openScreen === 'the pad'" />
        <Streets class="game-screen" v-else-if="store.openScreen === 'the streets'" />
        <Gym class="game-screen" v-else-if="store.openScreen === 'the gym'" />
        <Skies class="small-med-game-screen" v-else-if="store.openScreen === 'the skies'" />
        <Space class="game-screen" v-else-if="store.openScreen === 'the stars'" />
        <DonutShop class="small-med-game-screen" v-else-if="store.openScreen === 'the shop'" />
        <game-error v-else msg="unknown open screen" />
      </n-layout>
    </n-layout>
  </n-space>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.game-screen {
  margin-top: 3%;
}
.small-game-screen {
  margin-top: 20%;
}

.small-med-game-screen {
  margin-top: 8%;
}
.med-game-screen {
  margin-top: 15%;
}
</style>
