import { defineStore } from 'pinia'
import defaultCars from './cars'
import defaultPlanes from './planes'
import defaultSpaceships from './spaceships'
import defaultMenu from './menu'
import { earth, kepler443b } from './worlds'
import { marketingProjects } from './marketing'
import { exercises } from './exercises'

const saveKey = 'hard-time-savefile-v0'

function getWorld(name: string) {
  // TODO
  return earth
}

export const useStore = defineStore('main', {
  // arrow function recommended for full type inference
  state: () => {
    const localStorageSave = localStorage.getItem(saveKey)
    const savedState = localStorageSave 
      ? JSON.parse(localStorageSave)
      : undefined
    // all these properties will have their type inferred automatically
    return {
      themeOverrides:  {
        "common": {
          "bodyColor": "#101014",
          "primaryColor": "#E31E33FF",
          "primaryColorHover": "#D32D3FFF",
          "primaryColorPressed": "#B40D1FFF",
          "primaryColorSuppl": "#ED142BFF"
        }
      },
      gameStarted: savedState?.gameStarted || false,
      settings: savedState?.settings || {
        musicVolume: 1,
        sfxVolume: 1,
        autosaveInterval: 20,
        musicEnabled: true,
        sfxEnabled: true,
        autosaveEnabled: true,
        cheatsEnabled: false,
      },
      inJail: savedState !== undefined && savedState.inJail === false ? false : true,
      worlds: savedState?.worlds as { [worldIndex: number]: World } || {
        36: earth, 
        30: kepler443b,
      },
      currentWorld: savedState?.currentWorld || 36,
      jailtime: savedState?.jailtime || 1000 * 60 * 5,
      timeServed: savedState?.timeServed || 0,
      sentenceStarted: savedState?.sentenceStarted || undefined,
      money: savedState?.money || 0,
      lastMoney: savedState?.lastMoney || 0,
      pay: savedState?.pay || 0.00000001,
      payIncrementType: savedState?.payIncrementType || 'sqrt',
      carCost: savedState?.carCost || 0.000005,
      spaceshipCost: savedState?.spaceshipCost || 1000000,
      cars: savedState?.cars || defaultCars,
      planes: savedState?.planes || defaultPlanes,
      spaceships: savedState?.spaceships || defaultSpaceships,
      strength: savedState?.strength || 0,
      gainz: savedState?.gainz || 1,
      workoutDuration: savedState?.workoutDuration || 3000,
      loiterDuration: savedState?.loiterDuration || 2000,
      loiterCount: savedState?.loiterCount as number || 0,
      possessions: savedState?.possessions || {},
      workDuration: savedState?.workDuration || 3000,
      lag: 0,
      stars: savedState?.stars || 0,
      aiStars: savedState?.aiStars || 0,
      deaths: savedState?.deaths || 0,
      openScreen: savedState?.openScreen || 'the pad',
      menuOptions: savedState?.menuOptions || defaultMenu,
      playerAutoSkill: savedState?.playerAutoSkill || 0,
      planetsAvailable: savedState?.planetsAvailable || 60,
      escapeProject: savedState?.escapeProject || false,
      donutShop: savedState?.donutShop || {
        cost: 0.00015,
        margin: 0.000000050,
        aiSpeedReduction: 4.5,
        marketingLevel: 1,
        marketingEffectiveness: 1,
        demandBoost: 1,
        donutsSold: 0, 
        unsold: 0,
        income: 0,
        demand: 1,
        marketingProjects,
        autoDonutMakers: 0,
        autoDonutMakerLevel: 1,
        autoDonutMakerCost: 0.0005,
        incomeTracker: [],
        avgRev: 0,
        avgSales: 0,
      },
      gym: savedState?.gym || {
        exercises,
        tracker: [],
      },
      stats: savedState?.stats || {
        'street cred': 0,
        strength: 0,
        dexterity: 0,
        luck: 0,
      },
      starMoney: savedState?.starMoney || 0.0000032,
      gambleEnabled: savedState?.gambleEnabled || false,
      aiMovementRoutineStarted: false,
      playerMovementRoutineStarted: false,
      starSpawnerStarted: false,
      showImportModal: false,
      showSettingsModal: false,
      showLoreModal: false,
      showCreditsModal: false,
      lore: "",
      exportString: "",
      importString: "",
    }
  },
  actions: {
    buildSave (encoded: boolean) {
      const saveString = JSON.stringify({
        gameStarted: this.gameStarted,
        settings: this.settings,
        inJail: this.inJail,
        worlds: this.worlds,
        currentWorld: this.currentWorld,
        jailtime: this.jailtime,
        timeServed: this.timeServed,
        sentenceStarted: this.sentenceStarted,
        money: this.money,
        lastMoney: this.lastMoney,
        pay: this.pay,
        payIncrementType: this.payIncrementType,
        carCost: this.carCost,
        spaceshipCost: this.spaceshipCost,
        cars: this.cars,
        planes: this.planes,
        spaceships: this.spaceships,
        strength: this.strength,
        gainz: this.gainz,
        workoutDuration: this.workoutDuration,
        loiterDuration: this.loiterDuration,
        loiterCount: this.loiterCount,
        possessions: this.possessions,
        stars: this.stars,
        aiStars: this.stars,
        deaths: this.deaths,
        openScreen: this.openScreen,
        menuOptions: this.menuOptions,
        playerAutoSkill: this.playerAutoSkill,
        planetsAvailable: this.planetsAvailable,
        escapeProject: this.escapeProject,
        donutShop: this.donutShop,
        stats: this.stats,
        starMoney: this.starMoney,
        gym: this.gym,
        gambleEnabled: this.gambleEnabled,
      })
      return encoded
        ? btoa(unescape(encodeURIComponent(saveString)))
        : saveString
    },
    save () {
      localStorage.setItem(saveKey, this.buildSave(false))
    },
    decodeImport () {
      return decodeURIComponent(escape(window.atob(this.importString)))
    },
    importSave () {
      localStorage.setItem(saveKey, this.decodeImport())
      this.$reset()
    },
    reset () {
      localStorage.removeItem(saveKey)
      this.$reset()
    },
  },
})