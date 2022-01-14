
import {
  befriendGuardsProject,
  digProject,
  arrangeAGetaway,
} from '../escapeProjects'

export const samaraPenitentiary: Jail = {
  name: 'samara penitentiary',
  escapeProjects: [
    befriendGuardsProject({
      maxRequiredCorrectAnswers: 40,
      minTimeSeconds: 20,
    }),
  ],
}
