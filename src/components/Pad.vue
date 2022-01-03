<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from '../store'
// @ts-ignore
import * as numberformat from 'swarm-numberformat'
import { Decimal } from 'decimal.js'
import { incrementors } from './incrementors'

const backend = { backend: 'decimal.js', Decimal: Decimal }
import { NButton, NIcon, useLoadingBar, NSpace, NCard, NGrid, NGi, NStatistic, NRow, NCol, NDivider } from 'naive-ui'
import { LogoBitcoin, EarOutline, CarOutline, CarSportOutline, RocketOutline, PeopleOutline, BarbellOutline, SparklesOutline, DiceOutline } from '@vicons/ionicons5'

const store = useStore(),
  loadingBar = useLoadingBar(),
  loadingBegForCredits = ref(false),
  loadingLoiter = ref(false),
  formattedMoney = computed(() =>
    `₿${numberformat.format(store.money, backend)}`
  ),
  formattedPay = computed(() =>
    `₿${store.pay}`
  )

// async function increment (): Promise<void> {
//   store.count = await incrementors[incrementType.value](store.count as Decimal)
// }

// function addAutomators (): void {
//   for (let i=0; i<automatorsToAdd.value; i++) {
//     store.automators.push(incrementors[incrementType.value])
//   }
// }

async function begForCredits(): Promise<void> {
  loadingBegForCredits.value = true
  loadingBar.start()
  await new Promise(resolve => setTimeout(resolve, store.workDuration))
  store.money = Decimal.add(store.money, store.pay)
  store.pay = incrementors[store.payIncrementType](store.pay as Decimal)
  store.workDuration = store.workDuration - 100
  loadingBegForCredits.value = false
  loadingBar.finish()
}

async function loiter(): Promise<void> {
  loadingLoiter.value = true
  loadingBar.start()
  await new Promise(resolve => setTimeout(resolve, 3000))
  store.stats['street cred'] += 1
  loadingLoiter.value = false
  loadingBar.finish()
}

function buyCar(): void {
  store.money -= store.carCost
  store.posessions.car = store.cars.shift()
  store.carCost *= 100
  store.menuOptions[1].disabled = false
}

function buySpaceship(): void {
  store.money -= store.spaceshipCost
  store.posessions.spaceship = "millenium falcon"
  store.menuOptions[3].disabled = false
}

function clearAutomators (): void {
  store.automators = []
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
      <n-grid x-gap="120" :cols="3">
        <n-gi span="1">
          <n-divider>posessions</n-divider>
          <n-statistic v-if="'car' in store.posessions" label="car" :value="store.posessions['car']">
            <template #prefix>
              <n-icon>
                <car-outline />
              </n-icon>
            </template>
          </n-statistic>
        </n-gi>
        <n-gi span="1">
          <n-divider>actions</n-divider>
          <n-row>
            <n-button class="centered-button" :loading="loadingLoiter" :disabled="loadingLoiter" @click="loiter()">
              <template #icon>
                <n-icon>
                  <ear-outline />
                </n-icon>
              </template>
              loiter (+1 street cred)
            </n-button> 
          </n-row>
          <n-row>
            <!-- <n-button v-if="store.cars.length > 0 && store.money >= 100" :disabled="store.carCost > store.money" @click="buyCar"> -->
            <n-button class="centered-button" @click="buyCar">
              <template #icon>
                <n-icon>
                  <car-outline v-if="store.carCost <= 500" />
                  <car-sport-outline v-else />
                </n-icon>
              </template>
              buy a new car (-₿{{ store.carCost }})
            </n-button> 
          </n-row>
          <n-row>
            <n-button v-if="store.money >= 500000" :disabled="store.spaceshipCost > store.money" @click="buySpaceship">
              <template #icon>
                <n-icon>
                  <rocket-outline />
                </n-icon>
              </template>
              buy a spaceship (-${{ store.spaceshipCost }})
            </n-button>
          </n-row>
        </n-gi>
        <n-gi span="1">
          <n-divider>stats</n-divider>
          <n-row align-items="center" justify-content="center">
            <n-col :span="12">
              <n-statistic label="street cred" :value="store.stats['street cred']">
                <template #prefix>
                  <n-icon>
                    <people-outline />
                  </n-icon>
                </template>
              </n-statistic>
            </n-col>
            <n-col :span="12">
              <n-statistic label="strength" :value="store.stats['strength']">
                <template #prefix>
                  <n-icon>
                    <barbell-outline />
                  </n-icon>
                </template>
              </n-statistic>            
            </n-col>
            <n-col :span="12">
              <n-statistic label="dexterity" :value="store.stats['dexterity']">
                <template #prefix>
                  <n-icon>
                    <sparkles-outline />
                  </n-icon>
                </template>
              </n-statistic>
            </n-col>
            <n-col :span="12">
              <n-statistic label="luck" :value="store.stats['luck']">
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
