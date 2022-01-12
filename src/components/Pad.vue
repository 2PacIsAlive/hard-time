<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { useStore } from '../store'
import { NButton, NIcon, useLoadingBar, NSpace, NCard, NGrid, NGi, NStatistic, NRow, NCol, NDivider, NPopover, useMessage } from 'naive-ui'
import { LogoBitcoin, DiceOutline, EarOutline, CarOutline, CarSportOutline, RocketOutline, FastFoodOutline, AirplaneOutline } from '@vicons/ionicons5'
// @ts-ignore
import Possession from './Possession.vue'
// @ts-ignore
import StatDescription from './StatDescription.vue'
import * as stats from '../store/stats'
import { KONAMI_CODE } from './cheats/konamiCode'
import Cash_Register from '../assets/Cash_Register.mp3'
import Airplane_Ding from '../assets/airplane_ding.mp3'
import spaceship_wooo from '../assets/spaceship_wooo.mp3'
import car_beep from '../assets/car_beep.mp3'
import { useSound } from '@vueuse/sound'

const store = useStore(),
  message = useMessage(),
  loadingBar = useLoadingBar(),
  currentKonamiPos = ref(0),
  loadingBegForCredits = ref(false),
  loadingLoiter = ref(false),
  formattedMoney = computed(() =>
    `₿${store.money.toFixed(8)}`
  ),
  formattedPay = computed(() =>
    `₿${store.pay}`
  ),
  formattedDonutShopAbout = computed(() =>
    `${store.donutShop.output * store.possessions['donut shop']} ₿/s<br />
    ${store.donutShop.aiSpeedReduction * 100 }% cop speed reduction`
  ),
  cashRegisterSound = useSound(Cash_Register),
  airplaneDingSound = useSound(Airplane_Ding),
  spaceshipWoooSound = useSound(spaceship_wooo),
  carBeepSound = useSound(car_beep)

async function begForCredits(): Promise<void> {
  loadingBegForCredits.value = true
  loadingBar.start()
  await new Promise(resolve => setTimeout(resolve, store.workDuration))
  store.money += store.pay
  store.pay = store.pay + 1
  store.workDuration = store.workDuration - 100
  loadingBegForCredits.value = false
  loadingBar.finish()
}

const loiterTriggers: {[trigger: number]: LoiterTrigger} = {
  1: {
    effect: () => {
      store.lore = 'you got in a fight. you lost'
      store.showLoreModal = true
    }
  },
  2: {
    effect: () => {
      store.lore = 'you met some punks hanging around, they bought you a donut'
      store.showLoreModal = true
    }
  },
  5: {
    effect: () => {
      store.menuOptions[1].disabled = false
      store.lore = 'you found someone\'s gym pass'
      store.showLoreModal = true
    }
  },
  6: {
    effect: () => {
      const wonFight = store.stats.strength >= 1
      if (wonFight) store.money += 0.00000050
      store.lore = `you got in a fight. you ${wonFight ? 'won' : 'lost'}`
      store.showLoreModal = true    }
  },
  8: {
    effect: () => {
      store.lore = 'you found a crypto wallet on the sidewalk'
      store.money = 0.00000125
      store.gambleEnabled = true
      store.showLoreModal = true
    }
  },
  10: {
    effect: () => {
      const wonFight = store.stats.strength >= 20
      if (wonFight) store.money += 0.00000500
      store.lore = `you got in a fight. you ${wonFight ? 'won' : 'lost'}`
      store.showLoreModal = true
    }
  },
  12: {
    effect: () => {
      store.lore = 'you ran into mike, the donut shop owner. he likes the cut of your jib',
      store.showLoreModal = true
    }
  },
  13: {
    effect: () => {
      store.lore = 'you helped mike with some chores around his shop, he gave you some money'
      store.money += 0.00000500
      store.showLoreModal = true
    }
  },
  17: {
    effect: () => {
      store.lore = 'you ran into mike, he\'s closing the shop' 
      store.showLoreModal = true
    }
  },
  20: {
    effect: () => {
      const wonFight = store.stats.strength >= 40
      if (wonFight) store.money += 0.00001000
      store.lore = `you got in a fight. you ${wonFight ? 'won' : 'lost'}`
      store.showLoreModal = true
    }
  },
  24: {
    effect: () => {
      store.lore = 'you found another crypto wallet'
      store.money += 0.00020000
      store.showLoreModal = true
    }
  },
  30: {
    effect: () => {
      const wonFight = store.stats.strength >= 60
      if (wonFight) store.money += 0.00001000
      store.lore = `you got in a fight. you ${wonFight ? 'won' : 'lost'}`
      store.showLoreModal = true
    }
  },
  33: {
    effect: () => {
      store.lore = 'the streets seem quiet these days'
      store.showLoreModal = true
    }
  },
  40: {
    effect: () => {
      const wonFight = store.stats.strength >= 80
      if (wonFight) store.money += 0.00006000
      store.lore = `you got in a fight. you ${wonFight ? 'won' : 'lost'}`
      store.showLoreModal = true
    }
  },
  47: {
    effect: () => {
      store.lore = 'the streets seem mad quiet these days'
      store.showLoreModal = true
    }
  },
  100: {
    effect: () => {
      store.lore = 'you found another crypto wallet'
      store.money += 0.001
      store.showLoreModal = true
    }
  },
}

async function loiter(): Promise<void> {
  store.loiterCount += 1
  loadingLoiter.value = true
  loadingBar.start()
  await new Promise(resolve => setTimeout(resolve, store.loiterDuration))
  if (store.loiterCount in loiterTriggers) {
    loiterTriggers[store.loiterCount].effect()
  }
  store.loiterDuration -= store.stats['street cred'] * 2
  store.stats['street cred'] += 1
  loadingLoiter.value = false
  loadingBar.finish()
}

function buyCar(): void {
  carBeepSound.play()
  if (store.cars.length > 0) {
    store.possessions.car = store.cars.shift()
    store.money -= store.possessions.car.cost
    store.menuOptions[2].disabled = false
  }
}

function buyDonutShop(): void {
  cashRegisterSound.play()
  store.money -= store.donutShop.cost
  store.possessions['donut shop'] = true
  store.donutShop.cost *= 1.75
  store.menuOptions[3].disabled = false
}

function buyPlane(): void {
  airplaneDingSound.play()
  if (store.planes.length > 0) {
    store.possessions.plane = store.planes.shift()
    store.money -= store.possessions.plane.cost
    store.menuOptions[4].disabled = false
  }
}

function buySpaceship(): void {
  spaceshipWoooSound.play()
  if (store.spaceships.length > 0) {
    store.possessions.spaceship = store.spaceships.shift()
    store.money -= store.possessions.spaceship.cost
    store.menuOptions[5].disabled = false
  }
}

function gamble () {
  store.stats.luck += 1
  const gambleAmount = store.money / 10
  if (Math.random() < .43 + (store.stats.luck / 10000)) {
    store.money += gambleAmount
    message.success(`you won ${gambleAmount.toFixed(8)}`)
  } else {
    store.money -= gambleAmount
    message.error(`you lost ${gambleAmount.toFixed(8)}`)
  }
}


function konamiCodeListener(event: any) {
  if (store.settings.cheatsEnabled) {
    if (event.key === KONAMI_CODE[currentKonamiPos.value++]) {
      if (currentKonamiPos.value === KONAMI_CODE.length) {
        message.success('you cheated')
        store.money += 100
        store.stats['street cred'] += 100
        store.stats.strength += 100
        store.stats.dexterity += 100
        store.stats.luck += 100
        currentKonamiPos.value = 0
      }
    } else {
        currentKonamiPos.value = 0
    }
  }
}

document.addEventListener('keydown', konamiCodeListener)
onUnmounted(() => {
	document.removeEventListener('keydown', konamiCodeListener)
})
</script>

<template>
  <div id="pad">
    <h1 v-if="store.money > 0" style="text-align: center;">{{ formattedMoney }}</h1>
    <div class="flex-grid">
      <div class="col">
        <n-divider>stats</n-divider>
        <div class="unbreakable-flex-grid">
          <div v-for="stat in stats" :key="stat.name" class="col">
            <stat-description :stat="stat" />
          </div>
        </div>
      </div>
      <div class="col">
        <n-divider>actions</n-divider>
        <n-row>
          <n-button style="padding: 0%;" block class="centered-button" :loading="loadingLoiter" :disabled="loadingLoiter" @click="loiter()">
            <template #icon>
              <n-icon>
                <ear-outline />
              </n-icon>
            </template>
            loiter (+1 street cred)
          </n-button> 
        </n-row>
        <n-row>
          <n-button v-if="store.gambleEnabled" style="padding: 0%;" block class="centered-button" :disabled="store.money <= 0.00000001" @click="gamble()">
            <template #icon>
              <n-icon>
                <dice-outline />
              </n-icon>
            </template>
            gamble (+/- ₿{{ (store.money / 10).toFixed(8) }})
          </n-button> 
        </n-row>
        <n-row v-if="store.cars.length > 0 && store.money >= store.cars[0].cost / 10">
          <n-button block class="centered-button" :disabled="store.cars[0].cost > store.money" @click="buyCar">
            <template #icon>
              <n-icon>
                <car-outline v-if="store.cars[0].cost <= 0.000005" />
                <car-sport-outline v-else />
              </n-icon>
            </template>
            buy a new car (-₿{{ store.cars[0].cost.toFixed(8) }})
          </n-button> 
        </n-row>
        <n-row v-if="store.money >= store.donutShop.cost / 10">
          <n-button block class="centered-button" :disabled="store.donutShop.cost > store.money" @click="buyDonutShop">
            <template #icon>
              <n-icon>
                <fast-food-outline />
              </n-icon>
            </template>
            open a donut shop (-₿{{ store.donutShop.cost.toFixed(8) }})
          </n-button> 
        </n-row>
        <n-row v-if="store.planes.length > 0 && store.money >= store.planes[0].cost / 10">
          <n-button block class="centered-button" :disabled="store.planes[0].cost > store.money" @click="buyPlane">
            <template #icon>
              <n-icon>
                <airplane-outline />
              </n-icon>
            </template>
            buy a plane (-₿{{ store.planes[0].cost.toFixed(8) }})
          </n-button> 
        </n-row>
        <n-row v-if="store.spaceships.length > 0 && store.money >= store.spaceships[0].cost / 10">
          <n-button block class="centered-button" :disabled="store.spaceships[0].cost > store.money" @click="buySpaceship">
            <template #icon>
              <n-icon>
                <rocket-outline />
              </n-icon>
            </template>
            buy a spaceship (-₿{{ store.spaceships[0].cost.toFixed(8) }})
          </n-button>
        </n-row>
      </div>
      <div class="col" v-if="Object.keys(store.possessions).length > 0">
        <n-divider>possessions</n-divider>
        <possession possession="car" about="allows you to access the streets" :plural="false" />
        <possession possession="donut shop" about="slow down the cops and earn some dough on the side" :plural="false" />
        <possession possession="plane" about="allows you to access the skies" :plural="false" />
        <possession possession="spaceship" about="allows you to access the stars" :plural="false" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.centered-button {
  margin: 0 auto;
  margin-bottom: 10px;
}

.unbreakable-flex-grid {
  display: flex;
  flex-wrap: wrap;
}

.flex-grid {
  display: flex;
  flex-wrap: wrap;
}

.col {
  margin-left: 20px;
  margin-right: 20px;
  width: 90%;
  flex: 1;
}

@media (max-width: 690px) {
  .flex-grid {
    display: block;
  }
}
</style>
