import { defineStore } from 'pinia'
import defaultCars from './cars'
import defaultPlanes from './planes'
import defaultSpaceships from './spaceships'
import defaultMenu from './menu'
import { earth } from './worlds'

const saveKey = 'hard-time-savefile'

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
      world: savedState?.world as World || earth,
      currentCity: savedState?.currentCity || 'los angeles',
      currentPrison: savedState?.currentPrison || 0,
      currentMap: savedState?.currentMap || 0,
      jailtime: savedState?.jailtime || 1000 * 60 * 5,
      timeServed: savedState?.timeServed || 0,
      sentenceStarted: savedState?.sentenceStarted || undefined,
      currentJail: savedState?.currentJail || 0,
      money: savedState?.money || 100000,
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
      loiterDuration: savedState?.loiterDuration || 3000,
      possessions: savedState?.possessions || {},
      workDuration: savedState?.workDuration || 3000,
      lag: 0,
      displaySaved: false,
      stars: savedState?.stars || 0,
      aiStars: savedState?.aiStars || 0,
      deaths: savedState?.deaths || 0,
      openScreen: savedState?.openScreen || 'the pad',
      menuOptions: savedState?.menuOptions || defaultMenu,
      showDeathModal: savedState?.showDeathModal || false,
      playerAutoSkill: savedState?.playerAutoSkill || 0,
      planetsAvailable: savedState?.planetsAvailable || 60,
      currentPlanet: savedState?.currentPlanet || 0,
      escapeProject: savedState?.escapeProject || false,
      donutShop: savedState?.donutShop || {
        cost: 0.00015, // 15k$ if btc 100m
        output: 0.000000050, // 5$ if btc 100m
        aiSpeedReduction: 4.5,
      },
      stats: savedState?.stats || {
        'street cred': 0,
        strength: 0,
        dexterity: 0,
        luck: 0,
      },
      starMoney: savedState?.starMoney || 0.0000032,
      aiMovementRoutineStarted: false,
      playerMovementRoutineStarted: false,
      starSpawnerStarted: false,
      showImportModal: false,
      showSettingsModal: false,
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
        world: this.world,
        currentCity: this.currentCity,
        currentPrison: this.currentPrison,
        currentMap: this.currentMap,
        jailtime: this.jailtime,
        timeServed: this.timeServed,
        sentenceStarted: this.sentenceStarted,
        currentJail: this.currentJail,
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
        possessions: this.possessions,
        stars: this.stars,
        aiStars: this.stars,
        deaths: this.deaths,
        openScreen: this.openScreen,
        menuOptions: this.menuOptions,
        showDeathModal: this.showDeathModal,
        playerAutoSkill: this.playerAutoSkill,
        planetsAvailable: this.planetsAvailable,
        currentPlanet: this.currentPlanet,
        escapeProject: this.escapeProject,
        donutShop: this.donutShop,
        stats: this.stats,
        starMoney: this.starMoney,
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