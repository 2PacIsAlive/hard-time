
import {
  befriendGuardsProject,
  digProject,
  arrangeAGetaway,
} from '../escapeProjects'

export const crabsClaw: Jail = {
  name: 'crabs claw',
  escapeProjects: [
    befriendGuardsProject({
      maxRequiredCorrectAnswers: 60,
      minTimeSeconds: 30,
    }),
  ],
}
