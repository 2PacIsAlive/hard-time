interface EscapeProject {
  name: string
  result: string
  complete: boolean
  settings: any
}

interface BefriendGuardsSettings {
  maxRequiredCorrectAnswers: number
  minTimeSeconds: number
}

interface DigProjectSettings {

}

interface ArrangeGetawaySettings {

}

interface BuildARaftSettings {

}

interface StudyPrisonSchematicsSettings {
  tiles: number
  minDelay: number
  maxSequenceLength: number
}

interface DefendYourCellSettings {
  attackers: number
  timeBetweenAttacksMs: number
  attackerSpeedMs: number
}

interface Tile {
  color: any // TODO why does Color not work?
  playing: boolean
}