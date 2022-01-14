import {
  befriendGuardsProject,
  digProject,
  studyPrisonSchematics,
  defendYourCell,
} from '../escapeProjects'

export const sanPedroPrison: Jail = {
  name: 'san pedro prison',
  escapeProjects: [
    befriendGuardsProject({
      maxRequiredCorrectAnswers: 10,
      minTimeSeconds: 30,
    }),
    studyPrisonSchematics({
      tiles: 4,
      minDelay: 275,
      maxSequenceLength: 4
    }),
    defendYourCell({
      attackers: 6,
      timeBetweenAttacksMs: 1000,
      attackerSpeedMs: 250,
    }),
    digProject({
      maxRequiredClicks: 20,
      minTimeSeconds: 20,
    }),
  ],
}
