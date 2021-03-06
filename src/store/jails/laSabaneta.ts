import {
  befriendGuardsProject,
  digProject,
} from '../escapeProjects'

export const laSabaneta: Jail = {
  name: 'la sabaneta',
  escapeProjects: [
    befriendGuardsProject({
      maxRequiredCorrectAnswers: 10,
      minTimeSeconds: 30,
    }),
    digProject({
      maxRequiredClicks: 16,
      minTimeSeconds: 16,
    }),
  ],
}
