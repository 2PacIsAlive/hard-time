<script setup lang="ts">
 import { NAlert } from 'naive-ui'
 
 defineProps<{ msg: any }>()
</script>

<template>
  <n-alert title="oops" type="error">
    {{ msg }}
  </n-alert>
</template>