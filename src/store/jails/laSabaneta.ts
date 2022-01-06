import {
  befriendGuardsProject,
  digProject,
  arrangeAGetaway,
} from '../escapeProjects'

export const laSabaneta: Prison = {
  name: 'la sabaneta',
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
