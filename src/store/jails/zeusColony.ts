import {
  defendYourCell,
  digProject,
} from '../escapeProjects'

export const zeusColony: Jail = {
  name: 'zeus colony',
  escapeProjects: [
    defendYourCell({
      attackers: 6,
      timeBetweenAttacksMs: 1000,
      attackerSpeedMs: 350,
    }),
    digProject({
      maxRequiredClicks: 39,
      minTimeSeconds: 29,
    }),
  ],
}