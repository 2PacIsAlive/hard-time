
export interface EscapeProject {
  name: string
  complete: boolean
}

export class EscapeProject {
  constructor(name: string) {
    this.name = name
    this.complete = false
  }

  effect () {
    this.complete = true
  }
}

export default [{
  name: 'california state prison',
  escapeProjects: [
    new EscapeProject('befriend the guards'),
  ],
}]