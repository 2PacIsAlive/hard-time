<script setup lang="ts">
import { BusinessOutline } from '@vicons/ionicons5'
import { NThing, NAvatar, NIcon } from 'naive-ui'

defineProps<{ city: City, name: string }>()

</script>

<template>
  <n-thing id="citydescription">
    <template #avatar>
      <!-- <n-avatar> -->
        <n-icon size="75" :color="city.color">
          <business-outline />
        </n-icon>
      <!-- </n-avatar> -->
    </template>
    <template #header> {{ name }} </template>
    <!-- <template #header-extra>
      visited
    </template> -->
    <template #description>
      <div style="text-align: left;">
        <template v-for="jail in city.jails" :key="jail.name">
          {{ jail.name }}<br />
        </template>
      </div>
    </template>
  </n-thing>
</template>

<style scoped>
#citydescription {
  /* TODO: how to center properly? */
  width: 36%;
  margin: auto;
}
</style>