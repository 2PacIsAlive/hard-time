import {
  befriendGuardsProject,
  studyPrisonSchematics,
} from '../escapeProjects'

export const theMenagerie: Jail = {
  name: 'the menagerie',
  escapeProjects: [
    befriendGuardsProject({
      maxRequiredCorrectAnswers: 50,
      minTimeSeconds: 12,
    }),
    studyPrisonSchematics({
      tiles: 5,
      minDelay: 150,
      maxSequenceLength: 10
    }),
  ],
}