import {
  befriendGuardsProject,
  digProject,
  studyPrisonSchematics,
  defendYourCell,
} from '../escapeProjects'

export const grongorBayPrison: Jail = {
  name: 'grongor bay prison',
  escapeProjects: [
    befriendGuardsProject({
      maxRequiredCorrectAnswers: 50,
      minTimeSeconds: 20,
    }),
    studyPrisonSchematics({
      tiles: 6,
      minDelay: 325,
      maxSequenceLength: 8
    }),
    defendYourCell({
      attackers: 6,
      timeBetweenAttacksMs: 1250,
      attackerSpeedMs: 200,
    }),
    digProject({
      maxRequiredClicks: 5,
      minTimeSeconds: 20,
    }),
  ],
}
