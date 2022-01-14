import {
  befriendGuardsProject,
  digProject,
  studyPrisonSchematics,
  defendYourCell,
} from '../escapeProjects'

export const californiaStatePrison: Jail = {
  name: 'california state prison',
  escapeProjects: [
    befriendGuardsProject({
      maxRequiredCorrectAnswers: 5,
      minTimeSeconds: 15,
    }),
    studyPrisonSchematics({
      tiles: 6,
      minDelay: 350,
      maxSequenceLength: 5
    }),
    defendYourCell({
      attackers: 6,
      timeBetweenAttacksMs: 1000,
      attackerSpeedMs: 250,
    }),
    digProject({
      maxRequiredClicks: 10,
      minTimeSeconds: 10,
    }),
  ],
}
