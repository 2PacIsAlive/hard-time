
import {
  befriendGuardsProject,
  digProject,
  arrangeAGetaway,
} from '../escapeProjects'

export const samaraPenitentiary: Jail = {
  name: 'samara penitentiary',
  escapeProjects: [
    befriendGuardsProject({
      maxRequiredCorrectAnswers: 5,
      minTimeSeconds: 15,
    }),
    digProject({
      maxRequiredClicks: 10,
      minTimeSeconds: 10,
    }),
    arrangeAGetaway({

    }),
  ],
}
