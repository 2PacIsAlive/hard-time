interface City {
  slug: string
  color: string
  maps: GameMap[]
  jails: Jail[]
  currentMap: number
  currentJail: number
  difficulty: string
  difficultyColor: string
}

interface World {
  name: string
  map: string
  cities: {
    [name: string]: City
  }
  currentCity: string
}