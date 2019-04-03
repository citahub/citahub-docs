const path = require('path')
const fs = require('fs')

const patches = ['docusaurus/lib/server/generate.js']

patches.forEach(patch => {
  fs.readFile(path.join(__dirname, '../patches/', patch), (err, data) => {
    if (err) {
      console.error(err.message)
    }
    fs.writeFile(path.join(__dirname, '../node_modules/', patch), data, () => {
      console.log('patch finished')
    })
  })
})
