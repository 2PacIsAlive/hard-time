<script setup lang="ts">
import { computed, onUnmounted, ref, watch, onActivated, Ref } from 'vue'
import { useStore } from '../store'
import { storeToRefs } from 'pinia'
import { useSound } from '@vueuse/sound'
// import sfx from '../assets/sfx.mp3'
import { NButton, NSlider, NSpace, NLayout, useMessage } from 'naive-ui'
import { galaxy } from '../store/maps'
// @ts-ignore
import Planets from './Planets.vue'
import planets from  './planets.json'
// @ts-ignore
import PlanetDescription from './PlanetDescription.vue'
import { earth, kepler443b } from '../store/worlds'
import Escape_Task_Fail from '../assets/Escape_Task_Fail.mp3'
import spaceship_rip from '../assets/spaceship_rip.mp3'

const store = useStore()
const message = useMessage()
// const { money } = storeToRefs(store)
const escapeTaskFailSound = useSound(Escape_Task_Fail)
const switchPlanetSound = useSound(spaceship_rip, {
  volume: 0.2
})

const hoveredPlanet = ref({})

let coloredMap = galaxy
const planetsCopy = JSON.parse(JSON.stringify(planets))
for (let i=0; i<store.planetsAvailable; i++) {
  const oldLength = coloredMap.length
  const color = i in store.worlds ? planetsCopy[i].color : 'grey'
  coloredMap = coloredMap.substring(0, planetsCopy[i].loc) 
    + coloredSpace('*', color, `planetDetails(${i})`, `planet-${i}`) 
    + coloredMap.substring(planetsCopy[i].loc + 1)
  const lengthDelta = coloredMap.length - oldLength
  for (let ii=0; ii<planetsCopy.length; ii++) {
    if (planetsCopy[ii].loc > planetsCopy[i].loc) {
      planetsCopy[ii].loc += lengthDelta
    }
  } 
}

// const playbackRate = ref(1)
// const { play, sound } = useSound(sfx, { 
//   sprite: {
//     // star: [0, 600],
//     // portal: [1000, 400],
//     nextMap: [2000, 4000],
//     // death: [7000, 6000],
//   },
//   playbackRate,
// })

function coloredSpace(char: string, color: string, onClickFn: string, id: string): string {
  return `<span id="${id}" style="color: ${color}">${char}</span>`
}

function handleClick(e: any) {
  if (e.target.id) {
    const planetId = e.target.id.split('-')[1]
    if (planetId in store.worlds) {
      if (planetId !== store.currentWorld) {
        switchPlanetSound.play()
        store.currentWorld = planetId
      }
    } else {
      escapeTaskFailSound.play() // TODO different sound?
      message.error(`can't reach ${planets[planetId]['Object\n'].toLowerCase()}`)
    }
  }
}

function handleMouseover(e: any) {
  if (e.target.id) {
    const planetId = e.target.id.split('-')[1]
    hoveredPlanet.value = planets[planetId]
    // console.log(planets[planetId])
  } else {
    // hoveredPlanet.value = {}
  }
}

function getStyle(planet: any) {
  return `color: ${planet.color}`
}
</script>

<template>
  <div id="space">
    <p>you are on <span :style="getStyle(planets[store.currentWorld])">{{ planets[store.currentWorld]['Object\n'].toLowerCase() }}</span></p>
    <pre v-html="coloredMap" @click="handleClick" @mouseover="handleMouseover" @mouseleave="handleMouseover"></pre>
    <!-- <planets @click="handleClick" @mouseover="handleMouseover" @mouseleave="handleMouseover" /> -->
    <planet-description :planet="hoveredPlanet" v-if="'loc' in hoveredPlanet">
    </planet-description>
  </div>
</template>

<style scoped>
pre {
  line-height: 1; 
  cursor: pointer;
}
#space {
  text-align: center; 
}
</style>
