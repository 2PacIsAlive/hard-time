import {
  befriendGuardsProject,
  digProject,
  arrangeAGetaway,
} from '../escapeProjects'

export const thePanopticon: Jail = {
  name: 'the panopticon',
  escapeProjects: [
    befriendGuardsProject({
      maxRequiredCorrectAnswers: 100,
      minTimeSeconds: 30,
    }),
    digProject({
      maxRequiredClicks: 75,
      minTimeSeconds: 60,
    }),
  ],
}
