<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '../store'
import { NIcon, NStatistic, NPopover } from 'naive-ui'
import { CarOutline, CarSportOutline, RocketOutline, FastFoodOutline, AirplaneOutline } from '@vicons/ionicons5'

const store = useStore(),
  carIsCheap = computed(() =>
    store.posessions.car.cost <= 0.000005
  )

defineProps<{ 
  posession: string,
  about: string,
  plural: boolean,
}>()

</script>

<template>
  <n-popover 
    v-if="posession in store.posessions"
    placement="top-start"
    trigger="hover"
  >
    <template #trigger>
      <n-statistic 
        :label="plural 
          ? `${posession}s` 
          : posession" 
        :value="plural 
          ? store.posessions[posession] 
          : store.posessions[posession].name"
      >
        <template #prefix>
          <n-icon>
            <template v-if="posession === 'car'">
              <car-outline v-if="carIsCheap" />
              <car-sport-outline v-else />
            </template>
            <fast-food-outline v-else-if="posession === 'donut shop'" />
            <airplane-outline v-else-if="posession === 'plane'" />
            <rocket-outline v-else-if="posession === 'spaceship'" />
          </n-icon>
        </template>
      </n-statistic>
    </template>
    <div v-html="about" />
  </n-popover>
</template>

<style scoped>

</style>