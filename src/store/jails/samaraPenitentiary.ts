
import {
  befriendGuardsProject,
  digProject,
  arrangeAGetaway,
} from '../escapeProjects'

export const samaraPenitentiary: Prison = {
  name: 'samara penitentiary',
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
