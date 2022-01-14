<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch, onActivated, Ref } from 'vue'
import { useStore } from '../store'
import { storeToRefs } from 'pinia'
import { useSound } from '@vueuse/sound'
import sfx from '../assets/sfx.mp3'
import { NButton, NSlider, NSpace, NLayout } from 'naive-ui'

const store = useStore()
const { money } = storeToRefs(store)
const map = computed(() => {
  const world = store.worlds[store.currentWorld]
  const city = world.cities[world.currentCity]
  return city.maps[city.currentMap]
})
const coloredMap = computed(() => {
  return map.value.current
    // note: need to do this one first because "span" has a p in it lmao
    .replace(/\p/g, coloredSpace('p', '#09f8f6'))
    .replace(/\P/g, coloredSpace('P', '#09f8f6'))
    .replace(/\@/g, coloredSpace(player, '#36AD6AFF')) // TODO how to interpolate 
    .replace(/\C/g, coloredSpace(ai, 'red'))
    .replace(/\?/g, coloredSpace(exit, 'fuchsia'))
    .replace(/\¿/g, coloredSpace(entrance, 'fuchsia'))
    .replace(/\*/g, coloredSpace('*', '#b39700'))
    .replace(/\!/g, coloredSpace('!', 'orange'))
})
const width = computed(() => 
  map.value.current.split('\n')[0].length
)

const playbackRate = ref(1)
const { play, sound } = useSound(sfx, { 
  sprite: {
    star: [0, 600],
    portal: [1000, 400],
    nextMap: [2000, 4000],
    death: [7000, 6000],
  },
  playbackRate,
})

// const width = 59
// const height = 31

// const exitSpace = 1798
const exit = '?'
const entrance = '¿'
const loreTrigger = '!'

const player = '@'
// const playerDefaultLocation = 1172
const playerIllegalMoves: string[] = []
const autoSkillMarks = {
  0: 'lame',
  50: 'kinda lit',
  100: 'godmode'
}

const ai = 'C'
const aiRegex = /C/g
// const aiSpeed = ref(0)
const aiSearching = ref(true)
const aiExists = ref(true)
const aiIllegalMoves: string[] = [ 
  exit, entrance,
  'p', 'P'
]

const starSpawnInterval = 60000

let lastAiDirection = 'D'
const aiPath: Ref<number[]> = ref([])
const playerPath: Ref<number[]> = ref([])


onMounted(() => {
  document.addEventListener('keydown', doCommand)
  if (!store.aiMovementRoutineStarted) moveAi()
  // if (!store.starSpawnerStarted) spawnNewStarsIntermittently()
})

onUnmounted(() => {
  // TODO ai movement stops but star spawner continues in the background?
	document.removeEventListener('keydown', doCommand)
  // console.log("STOPPING STREET MOVEMENT ROUTINES")
  store.aiMovementRoutineStarted = false
  store.playerMovementRoutineStarted = false
})

const directionKeys: any = {
  'w': 'U', '&': 'U',
  'a': 'L', '%': 'L',
  's': 'D', '(': 'D',
  'd': 'R', '\'': 'R'
}

const directions: string[] = Object.values(directionKeys)

function coloredSpace(char: string, color: string): string {
  return `<span style="color: ${color}">${char}</span>`
}

function isLegalMove (char: string, extraIllegals: string[]): boolean {
  return !(['│','┌','┐','└','┘','─','┤','├','┴','┬','\n','!'].concat(extraIllegals)
    .includes(char))
}

function isValidMove(current: number, next: number): boolean {
  if (next === current+1
    || next === current-1
    || next === current-width.value-1
    || next === current+width.value+1) return true
  return false
}

function isPlayer (char: string): boolean {
  return char === player
}

function isStar (char: string): boolean {
  return char === '*'
}

function isPortal (char: string): boolean {
  return char?.toLowerCase() === 'p'
}

function isExit (char: string): boolean {
  return char === exit
}

function isEntrance (char: string): boolean {
  return char === entrance
}

function isLoreTrigger (char: string): boolean {
  return char === loreTrigger
}

// NOTE: P exit is to the left, p exit is to the right
function nextPortal (char: string): number {
  if (char === 'p') return map.value.current.indexOf('P') + 1
  else return map.value.current.indexOf('p') - 1
}

function setSpace (char: string, location: number): void {
  const mapCopy = map.value.current // this helps..? ai freaks out without it?
  map.value.current = mapCopy.substring(0, location) + char + mapCopy.substring(location + 1)
}

function moveEntity (entity: string, current: number, next: number, isJump: boolean): void {
  if (!isJump && !isValidMove(current, next)) {
    // console.warn(entity, 'attempted invalid move from', current, 'to', next)
  } else {
    setSpace(entity, next)
    setSpace(' ', current) 
  }
}

function findNextMove (entity: string, direction: string) {
  const current: number = map.value.current.indexOf(entity)
  let next: number = current
  if (direction === 'U')
    next = current - width.value - 1
  else if (direction === 'D')
    next = current + width.value + 1
  else if (direction === 'L')
    next = current - 1
  else if (direction === 'R')
    next = current + 1
  const nextChar = map.value.current[next]
  return { current, next, nextChar }
}

function doMovePlayer (current: number, next: number, nextChar: string): void {
  if (isLoreTrigger(nextChar)) {
    if (map.value.lore) {
      store.lore = map.value.lore
      store.showLoreModal = true
      if (map.value.loreEffect) { // holy hackathon batman
        if (map.value.loreEffect === 'increase dexterity by 1') {
          store.stats.dexterity += 1
        } else if (map.value.loreEffect === 'increase dexterity by 10') {
          store.stats.dexterity += 10
        } else if (map.value.loreEffect === 'increase dexterity by 100') {
          store.stats.dexterity += 100
        }
      }
    }
  }
  else if (isLegalMove(nextChar, playerIllegalMoves)) {
    if (isStar(nextChar)) {
      store.stars += 1
      store.money += store.starMoney
      // @ts-ignore
      play({id: 'star'})
      // if (playbackRate.value < 4) playbackRate.value += 0.001
    }
    let isJump = false
    if (isPortal(nextChar)) {
      isJump = true
      next = nextPortal(nextChar)
      // @ts-ignore
      play({id: 'portal'})
    }
    if (isExit(nextChar)) nextMap()
    else if (isEntrance(nextChar)) prevMap()
    else moveEntity(player, current, next, isJump)    
  }
}

// TODO what is e type
function doCommand(e: any) {
  const direction = directionKeys[String.fromCharCode(e.keyCode).toLowerCase()]
  if (direction) {
    let { current, next, nextChar } = findNextMove(player, direction)
    doMovePlayer(current, next, nextChar)
  }
}

function nextMap () {
  // @ts-ignore
  play({id: 'nextMap'})
  const world = store.worlds[store.currentWorld]
  const city = world.cities[world.currentCity]
  city.currentMap += 1
  city.currentJail += 1
  // store.map = secondMap
  aiExists.value = true
  if (!store.aiMovementRoutineStarted) moveAi()
}

function prevMap () {
  // @ts-ignore
  play({id: 'nextMap'})
  const world = store.worlds[store.currentWorld]
  const city = world.cities[world.currentCity]
  city.currentMap -= 1
  city.currentJail -= 1
  // store.map = secondMap
  aiExists.value = true
  if (!store.aiMovementRoutineStarted) moveAi()
}

// TODO this is super flawed, need to find a better way of doing this
function isAiPathAccurate (playerSpace: number) {
  if (aiPath.value.length < 1) return false
  else return true // Math.abs(playerSpace - aiPath.value[0]) <= 100
}

function findStars(aiSpace: number, playerSpace: number, avoidAi: boolean): number[] {
  const availableStars = []
  for(let i=0; i<map.value.current.length; i++) {
    if (map.value.current[i] === "*") {
      if (avoidAi && i >= aiSpace-100 && i <= aiSpace+100)
        continue
      else availableStars.push(i)
    }
  }
  return availableStars.sort(function(a, b) {
    return (Math.abs(a - playerSpace) < Math.abs(b - playerSpace) ? 1 : 1)
  })

}

async function movePlayer() {
  if (!store.playerMovementRoutineStarted) {
    // console.log('STARTING PLAYER MOVEMENT ROUTINE')
    store.playerMovementRoutineStarted = true
    while (store.playerMovementRoutineStarted) {
      const avoidAi = store.playerAutoSkill > 33 
      const aiSpace = map.value.current.indexOf(ai)
      const playerSpace = map.value.current.indexOf(player)
      // const stars = findStars(aiSpace, playerSpace, avoidAi)
      while (playerPath.value.length === 0) {
        await dijkstras(playerSpace, '*', 'player')
        if (playerPath.value.length === 0)
          await dijkstras(playerSpace, 'p', 'player')
        if (playerPath.value.length === 0)
          await dijkstras(playerSpace, 'P', 'player')
      }
      const next = playerPath.value.pop()
      if (next) {
        const nextChar = map.value.current[next]
        doMovePlayer(playerSpace, next, nextChar)
      }
      await new Promise(resolve => setTimeout(resolve, 100-store.playerAutoSkill))
    }
  }
}

async function moveAi() {
  // console.log('STARTING AI MOVEMENT ROUTINE')
  store.aiMovementRoutineStarted = true
  while (store.aiMovementRoutineStarted) {
    // aiPath.value.forEach((space, i) => {
    //   if (i !== aiPath.value.length-1 && store.map.current[space] === ' ') setSpace('.', space)
    // })
    if ((map.value.current.match(aiRegex)||[]).length > 1) {
      console.log('something bad happened', aiPath.value)
      aiPath.value = []
      setSpace(' ', map.value.current.indexOf(ai))
    }
    const aiSpace = map.value.current.indexOf(ai)
    const playerSpace = map.value.current.indexOf(player)
    if (aiSpace !== -1) {
      let current = aiSpace
      let next: number | undefined = current
      let nextChar
      if (isAiPathAccurate(playerSpace)) { // our path is good enough, let's take it without searching again
        next = aiPath.value.pop()
        if (next) nextChar = map.value.current[next]
      } else { // player has moved, need to find a new path
        aiSearching.value = true
        const foundPath = await dijkstras(aiSpace, playerSpace, 'ai')
        if (foundPath && aiPath.value.length > 0) {
          aiSearching.value = false
          next = aiPath.value.pop()
          if (next) nextChar = map.value.current[next]
        } else { // couldn't find a path to player
          let direction = lastAiDirection
          if (Math.random() > .8) { // most of the time, try to go the same direction as the last move
            direction = directions[Math.floor(Math.random() * directions.length)]
            lastAiDirection = direction
          }
          ({ current, next, nextChar } = findNextMove(ai, direction))
        }
      }
      if (nextChar && next) {
        if (isPlayer(nextChar)) {
          aiPath.value = []
          // @ts-ignore
          // play({id: 'death'})
          store.playerMovementRoutineStarted = false
          store.aiMovementRoutineStarted = false
          store.deaths += 1
          // store.menuOptions[2].disabled = false
          map.value.current = map.value.default
          // moveEntity(player, current, store.map.playerDefaultLocation, true)
          store.inJail = true
          store.openScreen = 'the pad'
          return
        }
        if (isValidMove(current, next)) {
          if (isLegalMove(nextChar, aiIllegalMoves)) {
            if (isStar(nextChar)) store.aiStars += 1
            moveEntity(ai, current, next, false)
          }
        } else {
          console.log('ai path got hosed, nuking from orbit')
          aiPath.value = []
        }
      }
      const donutShopSpeedReduction = store.possessions['donut shop'] 
        ? map.value.aiSpeed * store.donutShop.aiSpeedReduction
        : 0
      const aiMovementDelay = (100 - map.value.aiSpeed) + donutShopSpeedReduction
      await new Promise(resolve => setTimeout(resolve, aiMovementDelay))
    } else {
      aiExists.value = false
      store.aiMovementRoutineStarted = false
      return
      // spawnNewAi()
    }
  }
}

function randomSpace(): number {
    const min = Math.ceil(width.value + 1)
    const max = Math.floor(map.value.current.length - width.value - 1)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function spawnNewAi(): void {
  let foundAvailableSpace, space
  let attempts = 0
  while (!foundAvailableSpace && attempts < 1000) {
    space = randomSpace()
    if (map.value.current[space] === ' ') {
      setSpace(ai, space)
      foundAvailableSpace = true
    }
    attempts += 1
  } 
}

function spawnNewStar(): void {
  let foundAvailableSpace, space
  let attempts = 0
  while (!foundAvailableSpace && attempts < 1000) {
    space = randomSpace()
    if (map.value.current[space] === ' ') {
      setSpace('*', space)
      foundAvailableSpace = true
    }
    attempts += 1
  }
}

function spawnNewStarsIntermittently (): void {
  setInterval(spawnNewStar, starSpawnInterval)
}

function getLegalNeighbors (space: number, nodes: any[]): any[] {
  return [
    space + 1,
    space - 1,
    space - width.value - 1,
    space + width.value + 1
  ].filter(s => isLegalMove(map.value.current[s], []))
    .map(s => nodes.find(n => n.i === s))
}

// function hasUnexploredNodes (nodes: any[]) {
//   return nodes.find((node: any) => node.explored)
// }

function savePath (endingNode: any, aiOrPlayer: string): void {
  // console.log('ending node of path for', aiOrPlayer, endingNode)
  let currentNode = endingNode
  const path: any[] = []
  while (currentNode.parent !== null) {
    if (currentNode.char !== ai) {
      path.push(currentNode.i)
      currentNode = currentNode.parent
      // if (currentNode.char !== ai) {
      //   setSpace('!', currentNode.i)
      // }
    }
  }
  // gross..
  if (aiOrPlayer === 'ai') {
    // @ts-ignore
    aiPath.value = path
  } else {
    // console.log('saving player path', path)
    // @ts-ignore
    playerPath.value = path
  }
}

async function dijkstras (startingSpace: number, destinationSpace: number | string, aiOrPlayer: string): Promise<any> {
  const nodes = map.value.current.split('')
    .map((space: string, i: number) => {
      return {
        char: space,
        i: i,
        dist: i === startingSpace ? 0 : Number.MAX_VALUE,
        parent: null,
        explored: false,
      }
    })
  while (1==1) {
    const unexploredNodes = nodes.filter((node: any) => !node.explored)
    if (unexploredNodes.length === 0) {
      console.log('dijkstras failed')
      return false
    } else {
      unexploredNodes.sort((a: any, b: any) => a.dist > b.dist ? 1 : -1)
      const currentNode = unexploredNodes[0]
      currentNode.explored = true
      const reachedDestination = typeof destinationSpace === 'string' 
        ? map.value.current[currentNode.i] === destinationSpace
        : currentNode.i === destinationSpace
      if (reachedDestination) {
        // console.log('found path!')
        // console.log(currentNode)
        savePath(currentNode, aiOrPlayer)
        return true
      } else {
        const neighbors = getLegalNeighbors(currentNode.i, nodes)
        for (let n=0; n<neighbors.length; n++) {
          const neighborNode = neighbors[n]
          if (neighborNode) { // TODO why is this ever undefined? 
            const newDist = currentNode.dist + 1
            if (newDist < neighborNode.dist) {
              neighborNode.dist = newDist
              neighborNode.parent = currentNode
            }
          }
        }
      }
      await new Promise(resolve => setTimeout(resolve, 0))
    }
  }
}
</script>

<template>
  <div id="streets">
    <p v-if="aiExists && aiSearching">the <span style="color: red">cops</span> are looking for you</p>
    <p id="run" v-else-if="aiExists && !aiSearching">the<span style="color: red">cops</span> are out to get you... unless you get them first</p>
    <p v-else>you are safe for now</p>
    <pre v-html="coloredMap"></pre>
    <p>nab <span style="color: #b39700">stardust</span> to earn money</p>
    <p>use <span style="color: #09f8f6">portals</span> to access other parts of the map</p>
    <p>use arrow keys or wasd to move</p>
    <!-- auto-shred:
    <n-button @click="movePlayer()" v-if="!store.playerMovementRoutineStarted" tertiary type="primary">enable</n-button>
    <n-button @click="store.playerMovementRoutineStarted = false" v-else tertiary type="default">disable</n-button>
    <div v-if="store.playerMovementRoutineStarted" id="autoSkillSliderDiv">
      <n-slider v-model:value="store.playerAutoSkill" :marks="autoSkillMarks" step="mark" />
    </div> -->
  </div>
  <!-- <p>deaths: {{store.deaths}}</p>
  <p>stars: {{store.stars}}</p>
  <p>ai stars: {{store.aiStars}}</p>
  <p>
    ai speed:
    <n-slider
      :step="1"
      :format-tooltip="value => `${value}%`"
      v-model:value="aiSpeed"
    />
  </p> -->
</template>

<style scoped>
pre {
  line-height: 1; 
}
#streets {
  text-align: center; 
}
#run {
  color: red;
}
#autoSkillSliderDiv {
  /* display: inline-block; */
  margin: 0 auto;
  /* padding: 3px; */
  max-width: 33%;
}
</style>
