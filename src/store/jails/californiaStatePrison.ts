import {
  befriendGuardsProject,
  digProject,
  arrangeAGetaway,
  studyPrisonSchematics,
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
    digProject({
      maxRequiredClicks: 10,
      minTimeSeconds: 10,
    }),
  ],
}
