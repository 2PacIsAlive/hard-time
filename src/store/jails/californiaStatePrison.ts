import {
  befriendGuardsProject,
  digProject,
  arrangeAGetaway,
} from '../escapeProjects'

export const californiaStatePrison: Jail = {
  name: 'california state prison',
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
