import {
  befriendGuardsProject,
  digProject,
  arrangeAGetaway,
} from '../escapeProjects'

export const sanPedroPrison: Jail = {
  name: 'san pedro prison',
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
