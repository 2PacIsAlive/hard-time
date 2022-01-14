import {
  befriendGuardsProject,
  digProject,
  studyPrisonSchematics,
  defendYourCell,
} from '../escapeProjects'

export const dysonsContainment: Jail = {
  name: 'dysons containment',
  escapeProjects: [
    befriendGuardsProject({
      maxRequiredCorrectAnswers: 125,
      minTimeSeconds: 40,
    }),
    studyPrisonSchematics({
      tiles: 7,
      minDelay: 120,
      maxSequenceLength: 8
    }),
    defendYourCell({
      attackers: 4,
      timeBetweenAttacksMs: 1250,
      attackerSpeedMs: 175,
    }),
    digProject({
      maxRequiredClicks: 80,
      minTimeSeconds: 66,
    }),
  ],
}
