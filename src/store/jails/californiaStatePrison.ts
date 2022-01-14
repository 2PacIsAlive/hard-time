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
      minTimeSeconds: 30,
    }),
    studyPrisonSchematics({
      tiles: 6,
      minDelay: 350,
      maxSequenceLength: 5
    }),
    defendYourCell({
      attackers: 4,
      timeBetweenAttacksMs: 1250,
      attackerSpeedMs: 250,
    }),
    digProject({
      maxRequiredClicks: 5,
      minTimeSeconds: 20,
    }),
  ],
}
