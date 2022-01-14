import {
  befriendGuardsProject,
  studyPrisonSchematics,
} from '../escapeProjects'

export const alcatraz: Jail = {
  name: 'alcatraz',
  escapeProjects: [
    befriendGuardsProject({
      maxRequiredCorrectAnswers: 8,
      minTimeSeconds: 30,
    }),
    studyPrisonSchematics({
      tiles: 7,
      minDelay: 350,
      maxSequenceLength: 4
    }),
  ],
}