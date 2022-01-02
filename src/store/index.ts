import { defineStore } from 'pinia'
import { Decimal } from 'decimal.js'
import { Incrementor, incrementors } from '../components/incrementors'
import { firstMap } from './maps'
import jails from './jails'

const defaultMenu = [
  {
    label: 'the pad',
    key: 'the pad',
    disabled: false,
  }, {
    label: 'the streets',
    key: 'the streets',
    disabled: true
  }, {
    label: 'the gym',
    key: 'the gym',
    disabled: true
  }, {
    label: 'the stars',
    key: 'the stars',
    disabled: true
  }
]

const defaultCars = ['1993 Ford Aspire', '2020 Subaru BRZ', 'Lamborghini Aventador']

export const useStore = defineStore('main', {
  // arrow function recommended for full type inference
  state: () => {
    const localStorageSave = localStorage.getItem('savev4')
    const savedState = localStorageSave 
      ? JSON.parse(localStorageSave)
      : undefined
    // all these properties will have their type inferred automatically
    return {
      gameStarted: savedState?.gameStarted || false,
      inJail: savedState !== undefined && savedState.inJail === false ? false : true,
      jailtime: savedState?.jailtime || 1000 * 60,
      timeServed: savedState?.timeServed || 0,
      sentenceStarted: savedState?.sentenceStarted || undefined,
      jails: savedState?.jails || jails,
      currentJail: savedState?.currentJail || 0,
      money: savedState?.money || new Decimal(0),
      lastMoney: savedState?.lastMoney || new Decimal(0),
      pay: savedState?.pay || new Decimal(100),
      payIncrementType: savedState?.payIncrementType || 'sqrt',
      carCost: savedState?.carCost || 500,
      spaceshipCost: savedState?.spaceshipCost || 1000000,
      cars: savedState?.cars || defaultCars,
      strength: savedState?.strength || 0,
      gainz: savedState?.gainz || 1,
      workoutDuration: savedState?.workoutDuration || 3000,
      posessions: savedState?.posessions || {},
      workDuration: savedState?.workDuration || 3000,
      automators: savedState?.automators 
        ? savedState.automators.map((a: string) =>
            incrementors[a] as Incrementor
          )
        : <Incrementor[]> [],
      lag: 0,
      displaySaved: false,
      map: savedState?.map || firstMap,
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
      aiMovementRoutineStarted: false,
      playerMovementRoutineStarted: false,
      starSpawnerStarted: false,
    }
  },
  actions: {
    save () {
      localStorage.setItem('savev4', JSON.stringify({
        gameStarted: this.gameStarted,
        inJail: this.inJail,
        jailtime: this.jailtime,
        timeServed: this.timeServed,
        sentenceStarted: this.sentenceStarted,
        jails: this.jails,
        currentJail: this.currentJail,
        money: this.money,
        lastMoney: this.lastMoney,
        pay: this.pay,
        payIncrementType: this.payIncrementType,
        carCost: this.carCost,
        spaceshipCost: this.spaceshipCost,
        cars: this.cars,
        strength: this.strength,
        gainz: this.gainz,
        workoutDuration: this.workoutDuration,
        posessions: this.posessions,
        automators: this.automators
          .map((a: Incrementor) => a.name),
        map: this.map,
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
      }))
    },
    reset () {
      localStorage.removeItem('savev4')
      this.$reset()
    },
  },
})