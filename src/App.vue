<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// @ts-ignore
import Game from './components/Game.vue'
// @ts-ignore
import AppFooter from './components/AppFooter.vue'
// @ts-ignore
import ImportModal from './components/ImportModal.vue'
// @ts-ignore
import SettingsModal from './components/SettingsModal.vue'
// @ts-ignore
import LoreModal from './components/LoreModal.vue'
import { useStore } from './store'
import { darkTheme, NConfigProvider, GlobalThemeOverrides, NLoadingBarProvider, NThemeEditor, NGlobalStyle, NMessageProvider } from 'naive-ui'

const store = useStore(),
  themeOverrides: GlobalThemeOverrides = {
    "common": {
      "primaryColor": "#E31E33FF",
      "primaryColorHover": "#D32D3FFF",
      "primaryColorPressed": "#B40D1FFF",
      "primaryColorSuppl": "#ED142BFF"
    }
  }

</script>

<template>
<n-theme-editor>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
    <n-loading-bar-provider>
      <n-message-provider placement="top-right">
        <div class="app">
          <div id="content-wrap">
            <Game />
          </div>
          <app-footer />
          <import-modal />
          <settings-modal />
          <lore-modal />
        </div>
      </n-message-provider>
    </n-loading-bar-provider>
    <n-global-style />
  </n-config-provider>
  </n-theme-editor>
</template>

<style>
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#app {
  font-family: Inconsolata;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  height: 100vh;
}

.n-popover, .n-card, .n-message {
  font-family: Inconsolata;
}

#content-wrap {
  flex: 1
}
</style>
