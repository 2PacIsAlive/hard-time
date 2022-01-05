<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '../store'
import { NIcon, NStatistic, NPopover } from 'naive-ui'
import { CarOutline, CarSportOutline, RocketOutline, FastFoodOutline, AirplaneOutline } from '@vicons/ionicons5'

const store = useStore(),
  carIsCheap = computed(() =>
    store.possessions.car.cost <= 0.000005
  )

defineProps<{ 
  possession: string,
  about: string,
  plural: boolean,
}>()

</script>

<template>
  <n-popover 
    v-if="possession in store.possessions"
    placement="top-start"
    trigger="hover"
  >
    <template #trigger>
      <n-statistic 
        :label="plural 
          ? `${possession}s` 
          : possession" 
        :value="plural 
          ? store.possessions[possession] 
          : store.possessions[possession].name"
      >
        <template #prefix>
          <n-icon>
            <template v-if="possession === 'car'">
              <car-outline v-if="carIsCheap" />
              <car-sport-outline v-else />
            </template>
            <fast-food-outline v-else-if="possession === 'donut shop'" />
            <airplane-outline v-else-if="possession === 'plane'" />
            <rocket-outline v-else-if="possession === 'spaceship'" />
          </n-icon>
        </template>
      </n-statistic>
    </template>
    <div v-html="about" />
  </n-popover>
</template>

<style scoped>

</style>