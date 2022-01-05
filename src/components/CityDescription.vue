<script setup lang="ts">
import { BusinessOutline } from '@vicons/ionicons5'
import { NThing, NAvatar, NIcon } from 'naive-ui'

defineProps<{ city: City, name: string }>()

</script>

<template>
  <n-thing id="planetdescription">
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
        prisons:<br />
        <template v-for="prison in city.prisons" :key="prison.name">
          {{ prison.name }}<br />
        </template>
      </div>
    </template>
  </n-thing>
</template>

<style scoped>
#planetdescription {
  /* TODO: how to center properly? */
  width: 26%;
  margin: auto;
}
</style>