import * as maps from '../maps'
import * as jails from '../jails'

export const kepler443b: World = {
  name: 'kepler-443b',
  map: `           ██████████████████████████████████████████████████████████           
       ╚░╚╚╚ⁿ╙╙╙╙░╙╙╚╙▀▀▀▀███████████████████████████████████╙╙╚▀▀▀▀▀▀███       
    ....................^"└└╙╙▀████╣███▀▀▀██████████████╙▀▀╙░..^^^"""ⁿ└",,^"    
   ..........╙.........,,;▐▄▄#╜▀▀╙╙╙╚╩└"^"└╙╚╙╙ⁿ└╚▀╙└└╙≈╓,.~.................   
  ...................-▀╙╙╙╙└~  f  ..............~.,~....-╙δ#░╙":..............  
 .................... .     . ......-,-............".. ..ⁿ.└.  ... ............ 
..................-....... ."~^^~"-.^................~-.........    ."..........
.............  .......  ..^............................~.~..........--"-........
.........,...-........."............................''''.''''''',^,.^,~"~,~.''''
''''''''''.)#ε.''  ''''^''.'''''''''''..'''''''''''''''.''''''.'  ''"' '.-''''''
'''''''╓╓φ╩░["-.-----,..-''''''''''.. '''' '''''''''''''.'''''.' '''''.'',.','''
'''''╓░╠φφ░φ░░░--""-""'''.'''''''''''''.,' ''''''''''''''',''.''''."'   .'''''''
'''''^"╙▒░░░░░░"ⁿ-'.'''. ''~''''''''''''Φ▄▒'''''''''''''''''''''.."'''''''''''''
'''''''.╚░ⁿⁿⁿ-"~' '' p    .''''''''''''''└~'''''','"φφ╦ε''.'''..''''''''''''''''
''''''''^:""--.''' ''     '.-.'''''''''''''''''''-..φ░░░╚ε  .''.''''''''''''''''
''''''''''.''.'ⁿ╔.       '''''''''''''''''''''''..;φ░░░░░▒. ..=^~.''''''''''''''
 '''''''''''''.▄╗▒φ░.-... '''''''''''''''''''''.'»░░░░░^"└'.'''i ,''''''''''''' 
  '''''''''''''└└└╙▒░""''.'''''''''''''''''''''''"░░░-.'''''~",.''''''''''''''  
   ''''''''''''''',░.-'''.'''''''''''''''''.,-░░-,;]░;-''''''''''''''''''''''   
    ''''''''''''''''''''''''''''''''''''';╓▄▄║███████▄α-'''.''''''''''''''''    
       ░;░░Q╓░╓▄░»,,-»---;;░░╓░╓;░░░--,,;]██████████▓██▄░;░;≥░░;;;░;╓,-,,       
           ▀▀▀▀▀▀╝═ªªª╝╝▀▀▀▀▀▀▀▀▀▀▀╝╝▀▀▀═ª▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀╝▀▀▀▀▀▀▀▀▀╩▀`,
  cities: {
    'istala': {
      color: '#EDFB52',
      slug: 'i',
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
    'porto ganoli': {
      color: '#4f8af0',
      slug: 'p',
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
    'fort krastos': {
      color: '#e010eb',
      slug: 'f',
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
