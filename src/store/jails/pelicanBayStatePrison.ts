import {
  befriendGuardsProject,
  digProject,
  buildARaft,
} from '../escapeProjects'

export const pelicanBayStatePrison: Prison = {
  name: 'pelican bay state prison',
  escapeProjects: [
    befriendGuardsProject({
      maxRequiredCorrectAnswers: 8,
      minTimeSeconds: 20,
    }),
    digProject({

    }),
    buildARaft({

    }),
  ],
}