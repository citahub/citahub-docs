const fs = require('fs')
const path = require('path')
const collect = {
  "localized-strings": {
    "docs": {},
    "categories": {
      "Configuration": "Configuration",
      "System Management": "System Management",
      "JSON-RPC": "JSON-RPC",
      "System Contract Interface": "System Contract Interface",
      "Architecture": "Architecture",
      "Protocol Upgrade": "Protocol Upgrade",
      "Reference": "Reference"
    }
  },
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
      const targets = items.filter(item => typeof item === 'object').map(item => item.ids).reduce((a, c) => [...a, ...c], [])
      targets.map((target, i) => {
        const p = '../versioned_docs/' + target.replace('-cita', '/cita') + '.md'
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
  })
}

versioned_sidebars.forEach(addTitleToSpecifiedVer)

// temp 
setTimeout(() => {
  fs.writeFile(path.resolve(__dirname, './custom-translation-strings.json'), Buffer.from(JSON.stringify(collect, null, 2)), () => {
    console.log('finished')
  })
}, 10000)
