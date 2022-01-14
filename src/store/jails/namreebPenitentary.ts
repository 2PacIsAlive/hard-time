import {
  befriendGuardsProject,
  digProject,
  arrangeAGetaway,
} from '../escapeProjects'

export const namreebPenitentary: Jail = {
  name: 'namreeb penitentary',
  escapeProjects: [
    digProject({
      maxRequiredClicks: 40,
      minTimeSeconds: 30,
    }),
  ],
}
