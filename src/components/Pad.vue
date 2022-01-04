<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from '../store'
import { NButton, NIcon, useLoadingBar, NSpace, NCard, NGrid, NGi, NStatistic, NRow, NCol, NDivider, NPopover } from 'naive-ui'
import { LogoBitcoin, EarOutline, CarOutline, CarSportOutline, RocketOutline, PeopleOutline, BarbellOutline, SparklesOutline, DiceOutline, FastFoodOutline, AirplaneOutline } from '@vicons/ionicons5'

const store = useStore(),
  loadingBar = useLoadingBar(),
  loadingBegForCredits = ref(false),
  loadingLoiter = ref(false),
  formattedMoney = computed(() =>
    `₿${store.money}`
  ),
  formattedPay = computed(() =>
    `₿${store.pay}`
  )

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

async function loiter(): Promise<void> {
  loadingLoiter.value = true
  loadingBar.start()
  await new Promise(resolve => setTimeout(resolve, store.loiterDuration))
  store.loiterDuration -= store.stats['street cred'] * 50
  store.stats['street cred'] += 1
  loadingLoiter.value = false
  loadingBar.finish()
}

function buyCar(): void {
  if (store.cars.length > 0) {
    store.posessions.car = store.cars.shift()
    store.money -= store.posessions.car.cost
    store.menuOptions[1].disabled = false
  }
}

function buyDonutShop(): void {
  store.money -= store.donutShop.cost
  if (store.posessions['donut shop'])
    store.posessions['donut shop'] += 1
  else store.posessions['donut shop'] = 1
  store.donutShop.cost *= 1.75
  store.menuOptions[3].disabled = false
}

function buyPlane(): void {
  if (store.planes.length > 0) {
    store.posessions.plane = store.planes.shift()
    store.money -= store.posessions.plane.cost
    store.menuOptions[4].disabled = false
  }
}

function buySpaceship(): void {
  if (store.spaceships.length > 0) {
    store.posessions.spaceship = store.spaceships.shift()
    store.money -= store.posessions.spaceship.cost
    store.menuOptions[5].disabled = false
  }
}
</script>

<template>
  <div id="pad">
    <n-space align="center" justify="center" vertical size="large">
      <h1>{{ formattedMoney }}</h1>
      <!-- <n-button :loading="loadingBegForCredits" :disabled="loadingBegForCredits" @click="begForCredits">
        <template #icon>
          <n-icon>
            <logo-bitcoin />
          </n-icon>
        </template>
        beg for sats (+{{ formattedPay }})
      </n-button>  -->
      <n-grid x-gap="40" :cols="3">
        <n-gi span="1">
          <n-divider>posessions</n-divider>
          <n-popover v-if="'car' in store.posessions" placement="top-start" trigger="hover">
            <template #trigger>
              <n-statistic label="car" :value="store.posessions['car'].name">
                <template #prefix>
                  <n-icon>
                    <car-outline />
                  </n-icon>
                </template>
              </n-statistic>
            </template>
            allows you to access the streets
          </n-popover>
          <n-popover v-if="'donut shop' in store.posessions" placement="top-start" trigger="hover">
            <template #trigger>
              <n-statistic label="donut shops" :value="store.posessions['donut shop']">
                <template #prefix>
                  <n-icon>
                    <fast-food-outline />
                  </n-icon>
                </template>
              </n-statistic>
            </template>
            {{ store.donutShop.output * store.posessions['donut shop'] }} ₿/s<br />{{ store.donutShop.aiSpeedReduction * 100 }}% cop speed reduction
          </n-popover>
          <n-popover v-if="'plane' in store.posessions" placement="top-start" trigger="hover">
            <template #trigger>
              <n-statistic label="plane" :value="store.posessions['plane'].name">
                <template #prefix>
                  <n-icon>
                    <airplane-outline />
                  </n-icon>
                </template>
              </n-statistic>
            </template>
            allows you to access the skies
          </n-popover>
          <n-popover v-if="'spaceship' in store.posessions" placement="top-start" trigger="hover">
            <template #trigger>
              <n-statistic label="spaceship" :value="store.posessions['spaceship'].name">
                <template #prefix>
                  <n-icon>
                    <rocket-outline />
                  </n-icon>
                </template>
              </n-statistic>
            </template>
            allows you to access the stars
          </n-popover>
        </n-gi>
        <n-gi span="1">
          <n-divider>actions</n-divider>
          <n-row>
            <n-button block class="centered-button" :loading="loadingLoiter" :disabled="loadingLoiter" @click="loiter()">
              <template #icon>
                <n-icon>
                  <ear-outline />
                </n-icon>
              </template>
              loiter (+1 street cred)
            </n-button> 
          </n-row>
          <n-row v-if="store.cars.length > 0 && store.money >= store.cars[0].cost / 10">
            <n-button block class="centered-button" :disabled="store.cars[0].cost > store.money" @click="buyCar">
              <template #icon>
                <n-icon>
                  <car-outline v-if="store.carCost <= 500" />
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
              buy a spaceship (-${{ store.spaceships[0].cost.toFixed(8) }})
            </n-button>
          </n-row>
        </n-gi>
        <n-gi span="1">
          <n-divider>stats</n-divider>
          <n-row align-items="center" justify-content="center">
            <n-col :span="12">
              <n-statistic label="street cred" :value="store.stats['street cred'].toFixed(0)">
                <template #prefix>
                  <n-icon>
                    <people-outline />
                  </n-icon>
                </template>
              </n-statistic>
            </n-col>
            <n-col :span="12">
              <n-statistic label="strength" :value="store.stats['strength'].toFixed(0)">
                <template #prefix>
                  <n-icon>
                    <barbell-outline />
                  </n-icon>
                </template>
              </n-statistic>            
            </n-col>
            <n-col :span="12">
              <n-statistic label="dexterity" :value="store.stats['dexterity'].toFixed(0)">
                <template #prefix>
                  <n-icon>
                    <sparkles-outline />
                  </n-icon>
                </template>
              </n-statistic>
            </n-col>
            <n-col :span="12">
              <n-statistic label="luck" :value="store.stats['luck'].toFixed(0)">
                <template #prefix>
                  <n-icon>
                    <dice-outline />
                  </n-icon>
                </template>
              </n-statistic>            
            </n-col>
          </n-row>
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<style scoped>
.centered-button {
  margin: 0 auto;
  margin-bottom: 10px;
}
</style>
