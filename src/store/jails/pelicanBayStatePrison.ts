import {
  defendYourCell,
  digProject,
} from '../escapeProjects'

export const pelicanBayStatePrison: Jail = {
  name: 'pelican bay state prison',
  escapeProjects: [
    defendYourCell({
      attackers: 5,
      timeBetweenAttacksMs: 2000,
      attackerSpeedMs: 300,
    }),
    digProject({
      maxRequiredClicks: 10,
      minTimeSeconds: 10,
    }),
  ],
}