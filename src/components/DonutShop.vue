<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { useStore } from '../store'
import { NButton, NPopover, useMessage } from 'naive-ui'
import { KONAMI_CODE } from './cheats/konamiCode'

const store = useStore(),
  message = useMessage(),
  currentKonamiPos = ref(0)

function konamiCodeListener(event: any) {
  if (store.settings.cheatsEnabled) {
    if (event.key === KONAMI_CODE[currentKonamiPos.value++]) {
      if (currentKonamiPos.value === KONAMI_CODE.length) {
        message.success('you cheated')
        currentKonamiPos.value = 0
      }
    } else {
        currentKonamiPos.value = 0
    }
  }
}

function makeDonut() {
  store.donutShop.unsold += 1
}

function lowerPrice() {
  store.donutShop.margin -= 0.000000001
}

function raisePrice() {
  store.donutShop.margin += 0.000000001
}

function buyMarketing () {
  const marketingProj = store.donutShop.marketingProjects.shift()
  store.donutShop.marketingLevel += 1
  store.money -= marketingProj.cost
  message.success(marketingProj.successMessage)
}

function buyAutoDonutMaker () {
  store.money -= store.donutShop.autoDonutMakerCost
  store.donutShop.autoDonutMakers += 1
}

document.addEventListener('keydown', konamiCodeListener)
onUnmounted(() => {
	document.removeEventListener('keydown', konamiCodeListener)
})
</script>

<template>
  <div id="pad">
    <h1 style="text-align: center;">donuts sold: {{ store.donutShop.donutsSold }}</h1>
    <h3 style="text-align: center;">shop income: ₿{{ store.donutShop.income.toFixed(9) }} <small>({{ store.donutShop.avgRev.toFixed(9) }} ₿/s)</small></h3>
    <!-- <h3 style="text-align: center;">₿/s: {{ store.donutShop.avgRev.toFixed(9) }}</h3> -->
    <n-popover placement="top" trigger="hover">
      <template #trigger>
        <p style="text-align: center; color: red;">cop speed reduction: {{ store.donutShop.aiSpeedReduction.toFixed(4) }}x</p>
      </template>
      the bigger your inventory, the slower the cops
    </n-popover>
    <!-- <h3 style="text-align: center;">donuts/s: {{ store.donutShop.avgSales.toFixed(0) }}</h3> -->
    <div class="flex-grid">
      <div class="skinny-col"/>
      <div class="col">
        <p>
          <n-button block @click="makeDonut()">make a donut</n-button>
        </p>
        <div class="flex-grid">
          <n-button :disabled="store.donutShop.margin <= 0.000000001" @click="lowerPrice()" block class="naked-col">lower the price</n-button>
          <n-button @click="raisePrice()" block class="naked-col">raise the price</n-button>
        </div>
        <p v-if="store.donutShop.marketingProjects.length > 0">
          <n-button block @disabled="store.money < store.donutShop.marketingProjects[0].cost" @click="buyMarketing()">{{ store.donutShop.marketingProjects[0].name }} (₿{{ store.donutShop.marketingProjects[0].cost.toFixed(9) }})</n-button>
        </p>
        <p>
          <n-button block @disabled="store.money < store.donutShop.autoDonutMakerCost" @click="buyAutoDonutMaker()">buy an auto donut maker (₿{{ store.donutShop.autoDonutMakerCost }})</n-button>
        </p>
      </div>
      <div class="col">
        <p>price per donut: ₿{{ store.donutShop.margin.toFixed(9) }}</p>
        <p>inventory: {{ store.donutShop.unsold }}</p>
        <p>public demand: {{ store.donutShop.demand.toFixed(0) }}%</p>
        <p>marketing level: {{ store.donutShop.marketingLevel }}</p>
        <p></p>
        <p>auto donut makers: {{ store.donutShop.autoDonutMakers }}</p>
      </div>
      <div class="skinny-col"/>
    </div>
  </div>
</template>

<style scoped>
.flex-grid {
  display: flex;
  flex-wrap: wrap;
}

.naked-col {
  flex: 1;
}

.col {
  margin-left: 20px;
  margin-right: 10px;
  width: 90%;
  flex: 1;
}

.skinny-col {
  width: 30%;
  flex: 1;
}

@media (max-width: 690) {
  .flex-grid {
    display: block;
  }
}
</style>
