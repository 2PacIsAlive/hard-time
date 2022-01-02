<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// @ts-ignore
import Game from './components/Game.vue'
// @ts-ignore
import AppFooter from './components/AppFooter.vue'
import { useStore } from './store'
import { darkTheme, NConfigProvider, GlobalThemeOverrides, NLoadingBarProvider, NThemeEditor, NGlobalStyle, NModal, NButton, NCard, NMessageProvider, useMessage } from 'naive-ui'

const store = useStore(),
  // message = useMessage(),
  themeOverrides: GlobalThemeOverrides = {
    "common": {
      "primaryColor": "#E31E33FF",
      "primaryColorHover": "#D32D3FFF",
      "primaryColorPressed": "#B40D1FFF",
      "primaryColorSuppl": "#ED142BFF"
    }
  }
function saveGame () {
  store.save()
  // TODO why doesn't message work here :(
  // message.info('game saved')
  console.log('saved')
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
          <n-modal :show="store.showDeathModal">
            <n-card style="width: 300px;" title="you died" :bordered="false" size="small">
              <template #footer>
                <n-button @click="store.showDeathModal = false">respawn</n-button>
              </template>
            </n-card>
          </n-modal>
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
  /* align-items: center; */
  /* justify-content: center; */
  height: 100vh;
}

#content-wrap {
  flex: 1
}

#saveddisplay {
  color: green;
}

.button-with-margin {
  margin-left:10px;
}

#reset {
  text-align: right;
  color: red;
}
#reset:hover {
  cursor: pointer;
  color: rgb(85, 20, 20);
}
#save {
  text-align: right;
  color: green;
}
#save:hover {
  cursor: pointer;
  color: rgb(13, 77, 13);

}
</style>
