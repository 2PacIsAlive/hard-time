<script setup lang="ts">
  import { NPopover, NStatistic, NIcon } from 'naive-ui'
  import { PeopleOutline, BarbellOutline, SparklesOutline, DiceOutline } from '@vicons/ionicons5'
  import { useStore } from '../store'

  defineProps<{ stat: Stat }>()

  const store = useStore()
</script>

<template>
  <n-popover placement="top-start" trigger="hover">
    <template #trigger>
      <n-statistic :label="stat.name" :value="store.stats[stat.name].toFixed(0)">
        <template #prefix>
          <n-icon>
            <people-outline v-if="stat.name === 'street cred'" />
            <barbell-outline v-else-if="stat.name === 'strength'" />
            <sparkles-outline v-else-if="stat.name === 'dexterity'" />
            <dice-outline v-else-if="stat.name === 'luck'" />
          </n-icon>
        </template>
      </n-statistic>
    </template>
    <strong style="color: red;">{{ stat.description }}</strong><br/>
    impacts the following escape projects:<br/>
    <template v-for="impact, i in stat.impacts" :key="i">
      -{{ impact }}<br />
    </template>
  </n-popover>
</template>