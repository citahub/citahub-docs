const fs = require('fs')
const path = require('path')
const collect = {
  "localized-strings": {
    "docs": {},
    "categories": {
      "Getting Started": "Getting Started",
      "Configuration": "Configuration",
      "System Management": "System Management",
      "JSON-RPC": "JSON-RPC",
      "System Contract Interface": "System Contract Interface",
      "Architecture": "Architecture",
      "Protocol Upgrade": "Protocol Upgrade",
      "Reference": "Reference",
      "Protocol-upgrade": "Protocol Upgrade"
    }
  },
}

const handleItems = (items, versioned) => {
  const targetsOfGroup = items.filter(item => typeof item === 'object').map(item => item.ids).reduce((a, c) => [...a, ...c], [])
  const targetsOfSingle = items.filter(item => typeof item === 'string')
  const targets = [...targetsOfGroup, ...targetsOfSingle]
  return targets.map((target, i) => {
    const p = (versioned ? '../versioned_docs/' : '../../docs/') + target.replace('-cita', '/cita') + '.md'
    const doc = fs.readFile(path.join(__dirname, p),
      (err, data) => {
        if (err) {
          // console.warn(err)
        } else {
          let title = ''
          const match = data.toString().match(/\ntitle(\s|\S)*?\n/)
          if (match) {
            title = match[0]
            collect["localized-strings"].docs[target] = {
              title: title.slice(8, -1)
            }
          }
        }
      })
  })
}


const versioned_sidebars = fs.readdirSync(path.join(__dirname, '../versioned_sidebars/'))
const addTitleToSpecifiedVer = (v, idx) => {
  fs.readFile(path.join(__dirname, '../versioned_sidebars/' + v), (err, data) => {
    if (err) {
      console.warn(err)
    } else {
      const ver_sidebar = JSON.parse(data.toString())
      const field = v.slice(0, -1 * 'sidebars.json'.length) + 'docs'
      const items = ver_sidebar[field].CITA
      handleItems(items, true)
    }
  })
}

versioned_sidebars.forEach(addTitleToSpecifiedVer)
fs.readFile(path.join(__dirname, '../sidebars.json'), (err, data) => {
  if (err) {
    console.warn(err)
  } else {
    const sidebar = JSON.parse(data.toString())
    handleItems(sidebar.docs.CITA, false)
  }
})

// temp
setTimeout(() => {
  fs.writeFile(path.resolve(__dirname, './custom-translation-strings.json'), Buffer.from(JSON.stringify(collect, null, 2)), () => {
    console.log('finished')
  })
}, 10000)
