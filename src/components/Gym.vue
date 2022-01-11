<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from '../store'
import { NButton, NIcon, useLoadingBar, NSpace, NTooltip } from 'naive-ui'
import { CashOutline, CarOutline, CarSportOutline, BarbellSharp } from '@vicons/ionicons5'
// @ts-ignore
import StatDescription from './StatDescription.vue'
import { Strength } from '../store/stats'

const store = useStore(),
  loadingBar = useLoadingBar(),
  loadingWorkout = ref(false)

function countOccurrences (arr: number[], val: number) {
  return arr.reduce((a, v) => (v === val ? a + 1 : a), 0)
}

function updateExerciseEfficacies() {
  for (let i=0; i<store.gym.exercises.length; i++) {
    if (store.gym.tracker.includes(i)) {
      const occurances = countOccurrences(store.gym.tracker, i)
      store.gym.exercises[i].currentEfficacy = Math.max(1, store.gym.exercises[i].defaultEfficacy - occurances)
    } else {
      store.gym.exercises[i].currentEfficacy = store.gym.exercises[i].defaultEfficacy
    }
  }
}

async function workout(exercise: Exercise, exerciseIndex: number): Promise<void> {
  loadingWorkout.value = true
  loadingBar.start()
  await new Promise(resolve => setTimeout(resolve, exercise.duration))
  store.stats.strength += exercise.currentEfficacy
  store.gym.exercises[exerciseIndex].duration -= store.strength * 2
  if (store.gym.tracker.length >= 10) store.gym.tracker.shift()
  store.gym.tracker.push(exerciseIndex)
  updateExerciseEfficacies()
  loadingWorkout.value = false
  loadingBar.finish()
}
</script>

<template>
  <div>
    <p style="text-align: center">
      <stat-description :stat="Strength" />
    </p>
    <div class="flex-grid">
      <div class="col">

      </div>
      <div class="col">
        <p v-for="exercise, i in store.gym.exercises" :key="exercise.name">
          <n-button block :loading="loadingWorkout" :disabled="loadingWorkout" @click="workout(exercise, i)">
            {{ exercise.name }} (+{{ exercise.currentEfficacy }} strength)
          </n-button> 
        </p>
      </div>
      <div class="col">

      </div>
    </div>
  </div>
</template>

<style scoped>
.flex-grid {
  display: flex;
  flex-wrap: wrap;
}

.col {
  margin-left: 20px;
  margin-right: 20px;
  flex: 1;
}
</style>
