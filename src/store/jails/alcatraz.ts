import {
  befriendGuardsProject,
  digProject,
  buildARaft,
} from '../escapeProjects'

export const alcatraz: Jail = {
  name: 'alcatraz',
  escapeProjects: [
    befriendGuardsProject({
      maxRequiredCorrectAnswers: 8,
      minTimeSeconds: 20,
    }),
    digProject({

    }),
    buildARaft({

    }),
  ],
}