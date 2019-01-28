---
id: version-0.20-welcome
title: About CITA
original_id: welcome
---
We offer a open source blockchain solution, in which CITA as the blockchain kernel, and around CITA, we offer a whole set of open source toolchain to make infrastructure friendly for operators, developers and end users, including Dapp wallet Cyton, blockchain browser microscope, block cache server Rebirth, multi-platform SDK, etc.

![](assets/first-page.jpg)

## CITA | 区块链内核

[![](https://img.shields.io/badge/CITA-Documents-green.svg)](https://cryptape.github.io/cita/) [![](https://img.shields.io/badge/CITA-GitHub-lightgrey.svg)](https://github.com/cryptape/cita/)

CITA is a high performance kernel developed by Cryptape, commissioned by Nervos Foundation. CITA could be used to build a consortium permissioned blockchain or a public permissioned blockchain.

## CITA Toolchain | CITA 工具链

### Cyton | DApp 钱包

[![](https://img.shields.io/badge/Cyton(Android)-Documents-green.svg)](https://github.com/cryptape/cyton-android) [![](https://img.shields.io/badge/Cyton(Android)-GitHub-lightgrey.svg)](https://github.com/cryptape/cyton-android)

[![](https://img.shields.io/badge/Cyton(iOS)-Documents-green.svg)](https://github.com/cryptape/cyton-ios) [![](https://img.shields.io/badge/Cyton(iOS)-GitHub-lightgrey.svg)](https://github.com/cryptape/cyton-ios)

Cyton 提供了现实世界的用户访问区块链世界的入口。Cyton 一方面是 CITA（也兼容以太坊）上用户私钥和各类数字资产、私有产权和私有数据的管理工具，更重要的，它作为一个 DApp 的运行平台，可以允许各种区块链应用以小程序的方式在用户终端直接运行。

Imagining a blockchain game developer who only needs to complete the core development of smart contracts and website of Dapp, complex private key management and digital asset management business are taken over by open source Cyton. Users only need to enter the DApp URL or even sweep the code to access DAPP and complete the game operation. Developers can also use payment services to integrate into the action page, such as using WeChat recharge to purchase game props on the blockchain. Third-party developers can also create new DApp (game replicas, etc.) to interact with the original DApp at the smart contract level, to achieve decentralized collaboration, and work together for the value of users.

Cyton 的运营者或者 DApp 开发者也可以选择重构开源的 Cyton 代码，为用户提供更加专业和针对性的服务。相信这将大大降低开发者的门槛，也降低用户的学习难度。

### Microscope | 区块链浏览器

[![](https://img.shields.io/badge/Microscope-Documents-green.svg)](https://github.com/cryptape/microscope/) [![](https://img.shields.io/badge/Microscope-GitHub-lightgrey.svg)](https://github.com/cryptape/microscope/)

Microscope 的目标是打造一个类似 etherscan 的区块链数据访问平台。它提供对区块数据、交易数据、账号地址数据以及智能合约的访问等必备功能。Microscope 支持多链访问，只要给出对应链的 RPC 服务地址，即可接入这条区块链并提供数据浏览服务。运营方可以部署一个自己的专用浏览器，也可以将访问接口提供给其他浏览器。

未来 Microscope 将增加数字资产访问、结构化数据展示等功能。对应地，我们将提供一个链上 KV 数据自动转换为本地关系型数据的中间件，以方便 DApp 的开发。开发者可以通过中间件快速索引业务数据，为用户提供更加友好的服务。

### ReBirth | 区块缓存服务器

[![](https://img.shields.io/badge/ReBirth-Documents-green.svg)](https://github.com/cryptape/rebirth) [![](https://img.shields.io/badge/ReBirth-GitHub-lightgrey.svg)](https://github.com/cryptape/re-birth/)

ReBirth 是一个提供区块链数据缓存服务的服务器端组件。它通过在服务器本地缓存 链上的数据，为 Microscope 和 Cyton 提供所需的数据缓存和查询服务，加快查询区块数据的速度，提升软件的使用体验。

### 多平台 SDK | 软件开发工具包

[![](https://img.shields.io/badge/CITA_SDK(Swift)-GitHub-lightgrey.svg)](https://github.com/cryptape/cita-sdk-swift) [![](https://img.shields.io/badge/CITA_SDK(Swift)-Documents-green.svg)](https://github.com/cryptape/cita-sdk-swift)

[![](https://img.shields.io/badge/CITA_SDK(Ruby)-GitHub-lightgrey.svg)](https://github.com/cryptape/cita-sdk-ruby) [![](https://img.shields.io/badge/CITA_SDK(Ruby)-Documents-green.svg)](https://github.com/cryptape/cita-sdk-ruby)

[![](https://img.shields.io/badge/CITA_SDK(Java)-GitHub-lightgrey.svg)](https://github.com/cryptape/cita-sdk-java) [![](https://img.shields.io/badge/CITA_SDK(Java)-Documents-green.svg)](https://github.com/cryptape/cita-sdk-java)

[![](https://img.shields.io/badge/CITA_SDK(JavaScript)-GitHub-lightgrey.svg)](https://github.com/cryptape/cita-sdk-js) [![](https://img.shields.io/badge/CITA_SDK(JavaScript)-Documents-green.svg)](https://github.com/cryptape/cita-sdk-js)

Blockchain operations are difficult for the vast majority of developers, given complex operations such as signature, message assembly, and ABI calls. To this end, we provide a multi-platform SDK to further reduce the development threshold. The open source SDK, which is currently being maintained, includes JavaScript, Java, Ruby, and Swift. Users can also use the web3 SDK of the Ethereum at the same time, enabling the same DApp front end to support both the Ethereum network and the CITA network.

### CITA Truffle Box | DApp 开发框架

[![](https://img.shields.io/badge/Truffle_Box-Documents-green.svg)](https://github.com/cryptape/appchain-truffle-box) [![](https://img.shields.io/badge/Truffle_Box-GitHub-lightgrey.svg)](https://github.com/cryptape/appchain-truffle-box)

CITA Truffle Box 可以使开发者借助 Truffle 完成 CITA 上的 DApp 开发.

### CITA IDE | Solidity 合约编辑器

[![](https://img.shields.io/badge/Truffle_Box-Documents-green.svg)](https://github.com/cryptape/appchain-ide) [![](https://img.shields.io/badge/Truffle_Box-GitHub-lightgrey.svg)](https://github.com/cryptape/appchain-ide)

CITA IDE 是一个基于浏览器的合约编辑器，是基于 Remix 开发的。