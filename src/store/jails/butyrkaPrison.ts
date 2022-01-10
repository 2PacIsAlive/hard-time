import {
  befriendGuardsProject,
  digProject,
  arrangeAGetaway,
} from '../escapeProjects'

export const butyrkaPrison: Jail = {
  name: 'butyrka prison',
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
