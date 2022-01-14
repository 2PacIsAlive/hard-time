export function escapeProject (name: string, result: string, 
  settings: BefriendGuardsSettings 
  | DigProjectSettings 
  | ArrangeGetawaySettings 
  | StudyPrisonSchematicsSettings 
  | DefendYourCellSettings
  ): EscapeProject {
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
    'you dug a tunnel', 
    settings
  )
}

export function arrangeAGetaway(settings: ArrangeGetawaySettings) {
  return escapeProject('arrange a getaway',
    'you made some calls',
    settings
  )
}

export function studyPrisonSchematics(settings: StudyPrisonSchematicsSettings) {
  return escapeProject('study prison schematics',
    'you studied the blueprints',
    settings
  )
}

export function defendYourCell(settings: DefendYourCellSettings) {
  return escapeProject('defend your cell',
    'you protected ya neck',
    settings
  )
}
