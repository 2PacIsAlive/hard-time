interface City {
  slug: string,
  maps: GameMap[],
  prisons: Prison[],
}

interface World {
  name: string,
  map: string,
  cities: {
    [name: string]: City
  },
}