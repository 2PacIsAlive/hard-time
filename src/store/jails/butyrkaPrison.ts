import {
  befriendGuardsProject,
  digProject,
  defendYourCell,
} from '../escapeProjects'

export const butyrkaPrison: Jail = {
  name: 'butyrka prison',
  escapeProjects: [
    befriendGuardsProject({
      maxRequiredCorrectAnswers: 25,
      minTimeSeconds: 10,
    }),
    digProject({
      maxRequiredClicks: 10,
      minTimeSeconds: 10,
    }),
    defendYourCell({
      attackers: 5,
      timeBetweenAttacksMs: 5000,
      attackerSpeedMs: 400,
    }),
  ],
}
