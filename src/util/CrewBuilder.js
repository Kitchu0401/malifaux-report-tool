const Symbols = {
  FACTION   : Symbol('Faction'),
  CREW_NAME : Symbol('CrewName'),
  LEADER    : Symbol('Leader'),
  MODEL     : Symbol('Model'),
  UPGRADE   : Symbol('Upgrade')
}

function getType (row, index) {
  switch (index) {
    case 0:   return Symbols.FACTION
    case 1:   return Symbols.CREW_NAME
    case 2:   return Symbols.LEADER
    default:  return /^[a-zA-Z]/g.test(row) ? Symbols.MODEL : Symbols.UPGRADE
  }
}

function getValue (row, index) {
  try {
    switch (index) {
      case 0:   return /Faction\:([\w\W]*)/g.exec(row)[1].trim()
      case 1:   return /Crew Name\:([\w\W]*) [0-9]*ss/g.exec(row)[1].trim()
      case 2:   return /Leader\:([\w\W]*)- Cache/g.exec(row)[1].trim()
      default:  return /([\w\W]*) [0-9]*ss/g.exec(row)[1].trim()
      // default:  
      //   let executed = /([ a-zA-Z]*)([0-9]*)ss/g.exec(row)
      //   return {
      //     name: executed[1] ? executed[1] : '',
      //     cost: !isNaN(executed[2]) ? executed[2] : null
      //   }
    }
  } catch (e) {
    console.error(`Error during processing [${row}]`)
    console.error(e)
    return row
  }
}

// TODO: Temporal function
function addActions () {
  return [
    {
      name: 'Attack',
      type: 'Common',
      target: ['Opponent'],
      result: 'Damage'
    },
    {
      name: 'Charge',
      type: 'Common',
      target: ['Opponent'],
      result: 'Damage'
    },
    {
      name: 'Walk',
      type: 'Common',
      target: []
    },
    {
      name: 'Interact',
      type: 'Common',
      target: ['Friendly', 'Opponent']
    },
    {
      name: 'Defensive',
      type: 'Common',
      target: []
    },
    {
      name: 'Focus',
      type: 'Common',
      target: []
    }
  ]
}

// function process (source) {
//   return new Promise((resolve, reject) => {
//     // Parse crew string
//     let crew = source.trim().split('\n').reduce((result, row, index) => {
//       let type = getType(row, index)
//       let value = getValue(row, index)
//    
//       if (type === Symbols.FACTION) {
//         result.faction = value
//       } else if (type === Symbols.CREW_NAME) {
//         result.crewName = value
//       } else if (type === Symbols.LEADER) {
//         result.leader = value
//         result.modelList = result.modelList ? result.modelList : []
//         result.modelList.push(generate({ name: value }))
//       } else if (type === Symbols.MODEL) {
//         result.modelList = result.modelList ? result.modelList : []
//         result.modelList.push(generate({ name: value }))
//       } else if (type === Symbols.UPGRADE) {
//         result.modelList[result.modelList.length - 1].upgrades.push({ name: value })
//       }
//    
//       return result
//     }, {})
//
//     // Get registered model information
//     axios.post('/list', crew.modelList)
//       .then(result => resolve(result))
//       .catch(error => console.error(error))
//   })
// }

// async function parse (source) {
//   source.crew_thisside = await process(source.crew_thisside)
//   source.crew_opponent = await process(source.crew_opponent)
// 
//   return source
// }

function generate (source) {
  return {
    name: source.name,
    upgrades: [],
    actions: addActions()
  }
}

function parse (source) {
  return source.trim().split('\n').reduce((result, row, index) => {
    let type = getType(row, index)
    let value = getValue(row, index)
  
    if (type === Symbols.FACTION) {
      result.faction = value
    } else if (type === Symbols.CREW_NAME) {
      result.crewName = value
    } else if (type === Symbols.LEADER) {
      result.leader = value
      result.modelList = result.modelList ? result.modelList : []
      result.modelList.push(generate({ name: value }))
    } else if (type === Symbols.MODEL) {
      result.modelList = result.modelList ? result.modelList : []
      result.modelList.push(generate({ name: value }))
    } else if (type === Symbols.UPGRADE) {
      result.modelList[result.modelList.length - 1].upgrades.push({ name: value })
    }
  
    return result
  }, {})
}

export default { generate, parse }
