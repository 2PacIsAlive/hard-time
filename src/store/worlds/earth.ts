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
           | l     /            ._-~'\\_ _~|              \\ ) /
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
    'rio de janeiro': {
      color: '#8338ec',
      slug: 'r',
      maps: [
        maps.earth4,
        maps.earth5,
        maps.earth6,
      ],
      prisons: [
        jails.sanPedroPrison,
        jails.penitenciariaDeSantiago,
        jails.laSabaneta,
      ]
    },
    'los angeles': {
      color: '#ff006e',
      slug: 'l',
      maps: [
        maps.earth1,
        maps.earth2,
        maps.earth3,
      ],
      prisons: [
        jails.californiaStatePrison,
        jails.pelicanBayStatePrison,
        jails.alcatraz,
      ]
    }, 
    'moscow': {
      color: '#ffbe0b',
      slug: 'm',
      maps: [
        maps.earth7,
        maps.earth8,
        maps.earth9,
      ],
      prisons: [
        jails.blackDolphinPrison,
        jails.samaraPenitentiary,
        jails.butyrkaPrison,
      ]
    },
  }                    
}
