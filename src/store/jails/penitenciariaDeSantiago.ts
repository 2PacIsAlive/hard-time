import {
  befriendGuardsProject,
  digProject,
  arrangeAGetaway,
} from '../escapeProjects'

export const penitenciariaDeSantiago: Jail = {
  name: 'penitenciarĂ­a de santiago',
  escapeProjects: [
    befriendGuardsProject({
      maxRequiredCorrectAnswers: 10,
      minTimeSeconds: 30,
    }),
    digProject({
      maxRequiredClicks: 20,
      minTimeSeconds: 20,
    }),
  ],
}
