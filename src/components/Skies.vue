<script setup lang="ts">
import { computed, onUnmounted, ref, watch, onActivated, Ref } from 'vue'
import { useStore } from '../store'
import { storeToRefs } from 'pinia'
import { useSound } from '@vueuse/sound'
import sfx from '../assets/sfx.mp3'
import { NButton, NSlider, NSpace, NLayout } from 'naive-ui'
import { galaxy } from '../store/maps'
import planets from  './planets.json'
// @ts-ignore
import CityDescription from './CityDescription.vue'

const store = useStore()
const { money } = storeToRefs(store)

const hoveredCity = ref("")

const coloredMap = computed(() => {
  const w = store.currentWorld
  let colored = store.worlds[w].map
  for (const [name, city] of Object.entries(store.worlds[w].cities)) {
    const location = colored.indexOf(city.slug)
    colored = colored.substring(0, location) + coloredSpace(city.slug, city.color, `planetDetails(${name})`, `city-${name}`) + colored.substring(location + 1)
  }
  return colored
})

const playbackRate = ref(1)
const { play, sound } = useSound(sfx, { 
  sprite: {
    // star: [0, 600],
    // portal: [1000, 400],
    nextMap: [2000, 4000],
    // death: [7000, 6000],
  },
  playbackRate,
})

function coloredSpace(char: string, color: string, onClickFn: string, id: string): string {
  return `<span id="${id}" style="color: ${color}">${char}</span>`
}

function handleClick(e: any) {
  if (e.target.id) {
    const cityId = e.target.id.split('-')[1]
    store.worlds[store.currentWorld]
      .currentCity = cityId
  }
}

function handleMouseover(e: any) {
  if (e.target.id) {
    const cityName = e.target.id.split('-')[1]
    hoveredCity.value = cityName
  } else {
    // hoveredCity.value = ""
  }
}

function getCurrentCityStyle() {
  const world = store.worlds[store.currentWorld]
  const city = world.cities[world.currentCity]
  return `color: ${city?.color || 'white'}`
}
</script>

<template>
  <div id="skies">
    <p>you are in <span :style="getCurrentCityStyle()">{{ store.worlds[store.currentWorld].currentCity }}</span></p>
    <pre v-html="coloredMap" @click="handleClick" @mouseover="handleMouseover" @mouseleave="handleMouseover"></pre>
    <city-description :city="store.worlds[store.currentWorld].cities[hoveredCity]" :name="hoveredCity" v-if="hoveredCity">
      {{ hoveredCity }}
    </city-description>
  </div>
</template>

<style scoped>
pre {
  line-height: 1; 
  cursor: pointer;
}
#skies {
  /* TODO lol */
  margin-left: 25%; 
}
</style>
