import {
  befriendGuardsProject,
  digProject,
  arrangeAGetaway,
} from '../escapeProjects'

export const penitenciariaDeSantiago: Jail = {
  name: 'penitenciaría de santiago',
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
}
