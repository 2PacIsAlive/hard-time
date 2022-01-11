<script setup lang="ts">
  import { ref, onUnmounted, computed, Ref } from 'vue'
  import { useStore } from '../../store'
  import { useSound } from '@vueuse/sound'
  import Escape_Task_Fail from '../../assets/Escape_Task_Fail.mp3'
  import Escape_Task_Success from '../../assets/Escape_Task_Success.mp3'
  import REQ_Attempt_Fail from '../../assets/REQ_Attempt_Fail.mp3'
  import REQ_Attempt_Success from '../../assets/REQ_Attempt_Success.mp3'
  import defendYourCell from '../../store/maps/defendYourCell'

  const store = useStore(),
    reqAttemptFailSound = useSound(REQ_Attempt_Fail),
    reqAttemptSuccessSound = useSound(REQ_Attempt_Success),    
    escapeTaskFailSound = useSound(Escape_Task_Fail),
    escapeTaskSuccessSound = useSound(Escape_Task_Success),
    jail = computed(() => {
      const world = store.worlds[store.currentWorld]
      const city = world.cities[world.currentCity]
      return city.jails[city.currentJail]
    }),
    coloredMap = computed(() => 
      map.value.current
        .replace(/\@/g, coloredSpace(player, '#36AD6AFF'))
        .replace(/\./g, coloredSpace(rock, 'rgb(120, 141, 145)'))
        .replace(/\^/g, coloredSpace(enemy, '#B8D634'))
    ),
    width = computed(() => 
      map.value.current.split('\n')[0].length
    ),
    playerLocation = computed(() => 
      map.value.current.indexOf(player)
    ),
    timeBetweenAttacksMs = computed(() => 
      store.escapeProject?.settings?.timeBetweenAttacksMs || 1000
    ),
    attackers = computed(() => 
      store.escapeProject?.settings?.attackers || 10
    ),
    attackerSpeedMs = computed(() => 
      store.escapeProject?.settings?.attackerSpeedMs || 100
    ),
    kills = ref(0)

  const map: Ref<GameMap> = ref(defendYourCell)

  const player = '@'
  const enemy = '^'
  const rock = '.'
  const rockThrowDelay = 50

  const directionKeys: any = {
    'a': 'L', '%': 'L',
    'd': 'R', '\'': 'R'
  }

  function doCommand(e: any) {
    if (e.keyCode === 32) throwRock()
    else {
      const direction = directionKeys[String.fromCharCode(e.keyCode).toLowerCase()]
      if (direction) {
        let { current, next, nextChar } = findNextMove(player, direction)
        doMovePlayer(current, next, nextChar)
      }
    }
  }

  function isLegalMove (char: string): boolean {
    return !(['│','┌','┐','└','┘','─','┤','├','┴','┬','\n','!']
      .includes(char))
  }

  function doMovePlayer (current: number, next: number, nextChar: string): void {
    if (isLegalMove(nextChar)) {
      moveEntity(player, current, next)    
    }
  }

  function setSpace (char: string, location: number): void {
    const mapCopy = map.value.current
    map.value.current = mapCopy.substring(0, location) + char + mapCopy.substring(location + 1)
  }

  function moveEntity (entity: string, current: number, next: number): void {
    setSpace(entity, next)
    setSpace(' ', current) 
  }

  function findNextMove (entity: string, direction: string) {
    const current: number = map.value.current.indexOf(entity)
    let next: number = current
    if (direction === 'L')
      next = current - 1
    else if (direction === 'R')
      next = current + 1
    const nextChar = map.value.current[next]
    return { current, next, nextChar }
  }

  function coloredSpace(char: string, color: string): string {
    return `<span style="color: ${color}">${char}</span>`
  }

  function finish (complete: boolean) {
    if (complete) reqAttemptSuccessSound.play()
    else reqAttemptFailSound.play()
    clearInterval(rockInterval)
    clearInterval(prisonerSpawnInterval)
    clearInterval(prisonerMovementInterval)
    clearInterval(checkIfItBrokeInterval)
    if (jail.value) {
      const eProj = jail.value
        .escapeProjects
        .find((e: EscapeProject ) => e.name === store.escapeProject.name)
      if (eProj) eProj.complete = complete
    }
    map.value.current = map.value.default
    store.escapeProject = false  
  }

  function throwRock () {
    setSpace(rock, playerLocation.value - width.value - 1)
  }

  document.addEventListener('keydown', doCommand)
  onUnmounted(() => {
    document.removeEventListener('keydown', doCommand)
    clearInterval(rockInterval)
    clearInterval(prisonerSpawnInterval)
    clearInterval(prisonerMovementInterval)
    clearInterval(checkIfItBrokeInterval)
  })

  function getAllIndexes(char: string) {
    return map.value.current
      .split('')
      .reduce(function(a: number[], e: string, i: number) {
        if (e === char) a.push(i)
        return a
      }, [])
  }

  const rockInterval = setInterval(() => {
    getAllIndexes(rock)
      .forEach(i => {
        setSpace(' ', i)
        const nextSpace = i - width.value - 1
        if (nextSpace > width.value) {
          if (map.value.current[nextSpace] === enemy) {
            escapeTaskSuccessSound.play()
            kills.value += 1
            if (kills.value === attackers.value) finish(true)
          }
          setSpace(rock, nextSpace)
        }
      })
  }, rockThrowDelay)

  let spawns = 0
  const prisonerSpawnInterval = setInterval(() => {
    if (spawns < attackers.value) {
      const randomStart = Math.floor(Math.random() * (width.value-2)) + 2
      setSpace('^', randomStart + width.value)
      spawns += 1
    } else {
      clearInterval(prisonerSpawnInterval)
    }
  }, timeBetweenAttacksMs.value)

  const prisonerMovementInterval = setInterval(() => {
    getAllIndexes(enemy)
      .forEach(i => {
        setSpace(' ', i)
        const nextSpace = i + width.value + 1
        if (nextSpace > map.value.current.length - width.value
        || map.value.current[nextSpace] === player) {
          finish(false)
        } else {
          setSpace(enemy, nextSpace)
        }
      })
  }, attackerSpeedMs.value)

  const checkIfItBrokeInterval = setInterval(() => {
    if (spawns >= attackers.value && map.value.current.indexOf(enemy) === -1) {
      finish(true)
    }
  }, 1000)
</script>

<template>
  <p style="text-align: center;">don't let the <span style="color: #B8D634;">deranged prisoners</span> get to your cell</p>
  <pre v-html="coloredMap"></pre>
  <p style="text-align: center;">press spacebar to throw <span style="color: rgb(120, 141, 145);">rocks</span></p>
  <!-- <p>kills: {{ kills }}</p> -->
</template>

<style scoped>
pre {
  text-align: center;
  line-height: 1; 
}
</style>