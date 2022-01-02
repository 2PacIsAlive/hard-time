
export interface EscapeProject {
  name: string
  result: string
  complete: boolean
}

function escapeProject (name: string, result: string): EscapeProject {
  return {
    name, result, complete: false
  }
}

function befriendGuardsProject() {
  return escapeProject('befriend the guards', 
    'you made friends on the inside'
  )
}

function digProject() {
  return escapeProject('dig a tunnel', 
    'you dug a few holes'
  )
}

export default [{
  name: 'california state prison',
  escapeProjects: [
    befriendGuardsProject(),
    digProject(),
  ],
}]