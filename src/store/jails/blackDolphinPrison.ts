import {
  befriendGuardsProject,
  digProject,
  arrangeAGetaway,
} from '../escapeProjects'

export const blackDolphinPrison: Jail = {
  name: 'black dolphin prison',
  escapeProjects: [
    digProject({
      maxRequiredClicks: 30,
      minTimeSeconds: 30,
    }),
  ],
}
