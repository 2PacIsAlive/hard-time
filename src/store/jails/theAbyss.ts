import {
  befriendGuardsProject,
  digProject,
  studyPrisonSchematics,
  defendYourCell,
} from '../escapeProjects'

export const theAbyss: Jail = {
  name: 'the abyss',
  escapeProjects: [
    befriendGuardsProject({
      maxRequiredCorrectAnswers: 100,
      minTimeSeconds: 40,
    }),
    studyPrisonSchematics({
      tiles: 7,
      minDelay: 175,
      maxSequenceLength: 9
    }),
    defendYourCell({
      attackers: 6,
      timeBetweenAttacksMs: 750,
      attackerSpeedMs: 220,
    }),
    digProject({
      maxRequiredClicks: 70,
      minTimeSeconds: 20,
    }),
  ],
}
