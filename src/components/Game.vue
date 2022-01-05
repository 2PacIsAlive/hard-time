<script setup lang="ts">
import { h, ref } from 'vue'
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
import { NIcon, NSpace, NSwitch, NLayout, NLayoutSider, NMenu, useMessage } from 'naive-ui'
import { HomeOutline, CaretDownOutline, SkullOutline, SubwayOutline, StorefrontOutline, BarbellOutline, StarOutline, EarthOutline, FastFoodOutline } from '@vicons/ionicons5'

const store = useStore(),
  collapsed = ref(true),
  message = useMessage(),
  saveInterval = 20000

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
  store.save()
  message.info('game saved')
}

function saveGameIntermittently(): void {
  setInterval(saveGame, saveInterval)
} 

async function gameLoop() {
  while (1==1) {
    store.lastMoney = store.money
    if (store.posessions['donut shop']) {
      store.money += store.posessions['donut shop'] * store.donutShop.output
    }
    // TODO do we really want to cap this at 1s?
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
}

measureLag()
saveGameIntermittently()
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
        <Space class="game-screen" v-else-if="store.openScreen === 'the stars'" />
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

.med-game-screen {
  margin-top: 15%;
}
</style>
