
export interface EscapeProject {
  name: string
  result: string
  complete: boolean
  settings: any
}

function escapeProject (name: string, result: string, settings: any): EscapeProject {
  return {
    name, result, settings,
    complete: false
  }
}

export interface BefriendGuardsSettings {
  maxRequiredCorrectAnswers: number
  minTimeSeconds: number
}

function befriendGuardsProject(settings: BefriendGuardsSettings) {
  return escapeProject('befriend the guards', 
    'you made friends on the inside',
    settings
  )
}

export interface DigProjectSettings {

}

function digProject(settings: DigProjectSettings) {
  return escapeProject('dig a tunnel', 
    'you dug a few holes', 
    settings
  )
}

export interface ArrangeGetawaySettings {

}

function arrangeAGetaway(settings: ArrangeGetawaySettings) {
  return escapeProject('arrange a getaway',
    'you made some calls',
    settings
  )
}

export default [{
  name: 'california state prison',
  escapeProjects: [
    befriendGuardsProject({
      maxRequiredCorrectAnswers: 5,
      minTimeSeconds: 15,
    }),
    digProject({

    }),
    arrangeAGetaway({

    }),
  ],
}]