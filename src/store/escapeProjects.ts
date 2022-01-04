export function escapeProject (name: string, result: string, settings: any): EscapeProject {
  return {
    name, result, settings,
    complete: false
  }
}

export function befriendGuardsProject(settings: BefriendGuardsSettings) {
  return escapeProject('befriend the guards', 
    'you made friends on the inside',
    settings
  )
}

export function digProject(settings: DigProjectSettings) {
  return escapeProject('dig a tunnel', 
    'you dug a few holes', 
    settings
  )
}

export function arrangeAGetaway(settings: ArrangeGetawaySettings) {
  return escapeProject('arrange a getaway',
    'you made some calls',
    settings
  )
}

export function buildARaft(settings: BuildARaftSettings) {
  return escapeProject('build a raft',
    'you built a raft, hope it floats',
    settings
  )
}
