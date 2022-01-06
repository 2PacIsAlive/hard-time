<script setup lang="ts">
import { PlanetOutline } from '@vicons/ionicons5'
import { NThing, NAvatar, NIcon} from 'naive-ui'

defineProps<{ planet: any }>()

function display(info: string) {
  return (info === '—' || info === '—\n' || info === '\n' || info === '') ? '?' : info
}
</script>

<template>
  <n-thing id="planetdescription">
    <template #avatar>
      <!-- <n-avatar> -->
        <n-icon size="75" :color="planet.color">
          <planet-outline />
        </n-icon>
      <!-- </n-avatar> -->
    </template>
    <template #header> {{ planet['Object\n'].toLowerCase() }} </template>
    <!-- <template #header-extra>
      visited
    </template> -->
    <template #description>
      <div style="text-align: left;">
        star type: {{planet['Star type\n']}}<br />
        mass (M⊕): {{display(planet['Mass (M⊕)\n'])}}<br />
        radius (R⊕): {{display(planet['Radius (R⊕)\n'])}}<br />
        density (g/cm3): {{display(planet['Density (g/cm3)\n'])}}<br />
        flux (F⊕): {{display(planet['Flux (F⊕)\n'])}}<br />
        teq (K): {{display(planet['Teq (K)\n'])}}<br />
        period (days): {{display(planet['Period (days)\n'])}}<br />
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