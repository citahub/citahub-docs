const fs = require('fs')
const path = require('path')
const collect = {
  "localized-strings": {
    "docs": {
      "version-0.20.2-cita/system-management/user": {
        "title": "User Management"
      },
      "version-0.20.2-cita/system-management/quota": {
        "title": "Quota Management"
      },
      "version-0.20.2-cita/system-management/price": {
        "title": "Quota Price Management"
      },
      "version-0.20.2-cita/system-management/log": {
        "title": "Log Management"
      },
      "version-0.20.2-cita/system-management/snapshot": {
        "title": "Snapshot"
      },
      "version-0.20.2-cita/system-management/amend": {
        "title": "Amend"
      },
      "version-0.20.2-cita/system-management/fee-back": {
        "title": "Fee Back"
      },
      "version-0.20.2-cita/system-management/version": {
        "title": "Version Management"
      },
      "version-0.20.2-cita/system-management/auto-exec": {
        "title": "Auto Execution"
      },
      "version-0.20.2-cita/rpc-guide/rpc-error-code": {
        "title": "JSON RPC Error Code"
      },
      "version-0.20.2-cita/system-contract-interface/system-interface": {
        "title": "System Configuration Contract Interface"
      },
      "version-0.20.2-cita/system-contract-interface/node": {
        "title": "Consensus Node Management Contract Interface"
      },
      "version-0.20.2-cita/system-contract-interface/auth": {
        "title": "Auth Management Contract Interface"
      },
      "version-0.20.2-cita/system-contract-interface/permission": {
        "title": "Permission Contract Interface"
      },
      "version-0.20.2-cita/system-contract-interface/role-auth": {
        "title": "Role Auth Contract Interface"
      },
      "version-0.20.2-cita/system-contract-interface/role-management": {
        "title": "Role Management Contract Interface"
      },
      "version-0.20.2-cita/system-contract-interface/role": {
        "title": "Role Contract Interface"
      },
      "version-0.20.2-cita/system-contract-interface/group-management": {
        "title": "Group Management Contract Interface"
      },
      "version-0.20.2-cita/system-contract-interface/group": {
        "title": "Group Contract Interface"
      },
      "version-0.20.2-cita/system-contract-interface/quota-manager": {
        "title": "Quota Management Contract Interface"
      },
      "version-0.20.2-cita/system-contract-interface/all-groups": {
        "title": "All-Group Contract Interface"
      },
      "version-0.20.2-cita/system-contract-interface/batch": {
        "title": "Batch Transactions Contract Interface"
      },
      "version-0.20.2-cita/system-contract-interface/quota-price": {
        "title": "Quota Price Management Contract Interface"
      },
      "version-0.20.2-cita/system-contract-interface/emergency-brake": {
        "title": "Emergency Brake Contract Interface"
      },
      "version-0.20.2-cita/system-contract-interface/admin": {
        "title": "Admin Contract Interface"
      },
      "version-0.20.2-cita/system-contract-interface/auto-exec": {
        "title": "Auto Execution Contract Interface"
      },
      "version-0.20.2-cita/architecture/components": {
        "title": "System Components"
      },
      "version-0.20.2-cita/architecture/consensus": {
        "title": "Consensus"
      },
      "version-0.20.2-cita/architecture/transaction-process": {
        "title": "Transaction Process"
      },
      "version-0.20.2-cita/architecture/view": {
        "title": "View"
      },
      "version-0.20.2-cita/reference/addresses": {
        "title": "Reserved System Addresses"
      },
      "version-0.20.2-cita/reference/glossary": {
        "title": "Glossary"
      },
      "version-0.20.2-toolchain/cli/cli-intro": {
        "title": "CLI Introduction"
      },
      "version-0.20.2-toolchain/sdk/cita-javascript-sdk": {
        "title": "CITA JavaScript SDK"
      },
      "version-0.20.2-toolchain/sdk/cita-java-sdk": {
        "title": "CITA Java SDK"
      },
      "version-0.20.2-toolchain/sdk/cita-swift-sdk": {
        "title": "CITA Swift SDK"
      },
      "version-0.20.2-toolchain/sdk/cita-ruby-sdk": {
        "title": "CITA Ruby SDK"
      },
      "version-0.20.2-toolchain/rebirth/rebirth-intro": {
        "title": "ReBirth Introduction"
      },
      "version-0.20.2-toolchain/cyton/cyton-intro": {
        "title": "Cyton Introduction"
      },
      "version-0.20.2-toolchain/microscope/microscope-intro": {
        "title": "Microscope Introduction"
      },
      "version-0.20.2-toolchain/ide/ide-intro": {
        "title": "CITA IDE Introduction"
      },
      "version-0.20.2-toolchain/truffle-box/truffle-box-intro": {
        "title": "CITA Truffle Box Introduction"
      },
    },
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
    const p = (versioned ? '../versioned_docs/' : '../../docs/') + target.replace(/(\d)\-/, '$1/') + '.md'
    fs.readFile(path.join(__dirname, p),
      (err, data) => {
        if (err) {
          console.warn(err)
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
      Object.values(ver_sidebar[field]).forEach((items, idx) => {
        handleItems(items, true)
      })
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
