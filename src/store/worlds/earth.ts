import * as maps from '../maps'
import * as jails from '../jails'

export const earth: World = {
  name: 'earth',
  map: `
               ,_   .  ._. _.  .
           , _-\\','|~\\~      ~/      ;-'_   _-'     ,;_;_,    ~~-
  /~~-\\_/-'~'--' \\~~| ',    ,'      /  / ~|-_\\_/~/~      ~~--~~~~'--_
  /              ,/'-/~ '\\ ,' _  , '|,'|~                   ._/-, /~
  ~/-'~\\_,       '-,| '|. '   ~  ,\\ /'~      m         /    /_  /~
.-~      '|        '',\\~|\\       _\\~     ,_  ,               /|
          '\\        /'~          |_/~\\\\,-,~  \\ "         ,_,/ |
           | c     /            ._-~'\\_ _~|              \\ ) /
            \\   __-\\           '/      ~ |\\  \\_          /  ~
  .,         '\\ |,  ~-_      - |          \\\\_' ~|  /\\  \\~ ,
               ~-_'  _;       '\\           '-,   \\,' /\\/  |
                 '\\_,~'\\_       \\_ _,       /'    '  |, /|'
                   /     \\_       ~ |      /         \\  ~'; -,_.
                   |  r    ~\\        |    |  ,        '-_, ,; ~ ~\\
                   \\,      /        \\    / /|            ,-, ,   -,
                     |    ,/          |  |' |/          ,-   ~ \\   '.
                    ,|   ,/           \\ ,/              \\       |
                    /    |             ~                 -~~-, /   _
                    |  ,-'                                    ~    /
                    / ,'                                      ~
                    ',|  ~
                      ~'`,
  cities: {
    'california': {
      slug: 'c',
      maps: [
        maps.earth1,
        maps.earth2,
        maps.earth3,
      ],
      prisons: [
        jails.californiaStatePrison,
        jails.alcatraz,
      ]
    },
    'rio de janeiro': {
      slug: 'b',
      maps: [
        maps.earth4,
        maps.earth5,
        maps.earth6,
      ],
      prisons: [
        jails.sanPedroPrison,
        jails.penitenciariaDeSantiago,
      ]
    }, 
    'moscow': {
      slug: 'm',
      maps: [
        maps.earth7,
        maps.earth8,
        maps.earth9,
      ],
      prisons: [
        jails.blackDolphinPrison,
        jails.butyrkaPrison,
      ]
    }
  }                    
}
