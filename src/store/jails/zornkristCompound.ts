import {
  befriendGuardsProject,
  digProject,
  defendYourCell,
} from '../escapeProjects'

export const zornkristCompound: Jail = {
  name: 'zornkrist compound',
  escapeProjects: [
    befriendGuardsProject({
      maxRequiredCorrectAnswers: 50,
      minTimeSeconds: 10,
    }),
    digProject({
      maxRequiredClicks: 45,
      minTimeSeconds: 37,
    }),
    defendYourCell({
      attackers: 5,
      timeBetweenAttacksMs: 1000,
      attackerSpeedMs: 200,
    }),
  ],
}
