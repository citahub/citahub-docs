---
id: welcome
title: CITAHub Docs Overview
sidebar_label: CITAHub Docs Overview
---
我们提供了一套完整的开源的区块链解决方案，CITA 作为底层区块链内核；围绕 CITA, 我们提供了一系列开源的工具链来完善基础设施，以方便运营方，开发者以及终端用户能够快速应用起来，包括：Dapp 钱包 Cyton，区块链浏览器 Microscope，区块缓存服务器 ReBirth，多平台SDK 等。

![](assets/first-page.jpg)

## CITA | Blockchain Kernel

[![](https://img.shields.io/badge/CITA-Documents-green.svg)](https://docs.citahub.com/zh-CN/cita/cita-intro) [![](https://img.shields.io/badge/CITA-GitHub-lightgrey.svg)](https://github.com/cryptape/cita/)

CITA 将一个区块链节点的共识、网络、计算、RPC 等功能进行了微服务化拆分，每一个微服务又可以有多个实例，最终这些实例共同完成一个节点的记账功能。这样，我们将区块链性能的扩展问题转化成了节点的扩展问题，当性能不足时，插入一台服务器，分担节点的工作压力即可。同时，我们将共识机制、底层逻辑进行了深度优化，例如采用Rust语言架构所有代码等。最终实现了目前**开源可实证**区块链系统的顶级性能。这是一组实测数据：由4核8G云主机构成的AppChain的性能可达到每秒2900笔简单交易；32核64G云主机组成的AppChain的性能则超过了每秒1.5万笔简单交易。采用集群构建节点性能将会更高，因此 CITA 的性能已经足以应付绝大多数应用场景。

## CITA toolchain | CITA Toolchain

### Cyton | DApp Wallet

[![](https://img.shields.io/badge/Cyton(Android)-Documents-green.svg)](https://github.com/cryptape/cyton-android) [![](https://img.shields.io/badge/Cyton(Android)-GitHub-lightgrey.svg)](https://github.com/cryptape/cyton-android)

[![](https://img.shields.io/badge/Cyton(iOS)-Documents-green.svg)](https://github.com/cryptape/cyton-ios) [![](https://img.shields.io/badge/Cyton(iOS)-GitHub-lightgrey.svg)](https://github.com/cryptape/cyton-ios)

Cyton provides a real-world portal for users to access the blockchain world. Cyton，on the one hand， helps users manager their private key，various types of digital assets, private property rights and private data. More importantly, as a DAPP operating platform, it can support to run Dapp inside of it.

设想一个区块链游戏开发者，他只需要完成智能合约的核心开发和 DApp 的访问网站开发即可，复杂的私钥管理和数字资产管理业务都由开源的 Cyton 接管。用户只需要输入 DApp 的 URL 甚至扫码即可访问 DApp 并完成游戏操作。开发者也可以利用流行的支付服务整合到操作页面中，例如使用微信充值购买区块链上的游戏道具。而第三方开发者也可以制作新的 DApp（游戏副本等）与原DApp在智能合约层面交互、实现去中心化协作，共同为用户创造价值。

Cyton operators or DAPP developers can also choose to refactor Cyton code to provide users with more professional and targeted services. It is believed that this will greatly reduce the developer's threshold, but also reduce the user's learning difficulties.

### Microscope | Blockchain Browser

[![](https://img.shields.io/badge/Microscope-Documents-green.svg)](https://github.com/cryptape/microscope/) [![](https://img.shields.io/badge/Microscope-GitHub-lightgrey.svg)](https://github.com/cryptape/microscope/)

Microscope is a full-featured blockchain browser platform. With Microscope you can access data of blocks, transactions, account (including contracts) on any specified chains build by CITA, as well as call contract methods and view chain's real-time performance index. A cache server is also provided for caching blockchain data. It can be easily deployed to cache data from any specified chains for application usage.

Microscope 还具有数字资产访问、结构化数据展示等功能。我们提供了一个链上 KV 数据自动转换为本地关系型数据的中间件 ReBirth，以方便 DApp 的开发。开发者可以通过中间件快速索引业务数据，为用户提供更加友好的服务。

### Rebirth | Blockchain Data Cache Server

[![](https://img.shields.io/badge/ReBirth-Documents-green.svg)](https://github.com/cryptape/rebirth) [![](https://img.shields.io/badge/ReBirth-GitHub-lightgrey.svg)](https://github.com/cryptape/re-birth/)

Rebirth is a server-side component that provides blockchain data caching services. It provides the data caching and query services required for microscope and Cyton, which can speed up the query service, and enhance the software usage experience.

### Multi-platform SDK | Software Development Kit

[![](https://img.shields.io/badge/CITA_SDK(Swift)-GitHub-lightgrey.svg)](https://github.com/cryptape/cita-sdk-swift) [![](https://img.shields.io/badge/CITA_SDK(Swift)-Documents-green.svg)](https://github.com/cryptape/cita-sdk-swift)

[![](https://img.shields.io/badge/CITA_SDK(Ruby)-GitHub-lightgrey.svg)](https://github.com/cryptape/cita-sdk-ruby) [![](https://img.shields.io/badge/CITA_SDK(Ruby)-Documents-green.svg)](https://github.com/cryptape/cita-sdk-ruby)

[![](https://img.shields.io/badge/CITA_SDK(Java)-GitHub-lightgrey.svg)](https://github.com/cryptape/cita-sdk-java) [![](https://img.shields.io/badge/CITA_SDK(Java)-Documents-green.svg)](https://github.com/cryptape/cita-sdk-java)

[![](https://img.shields.io/badge/CITA_SDK(JavaScript)-GitHub-lightgrey.svg)](https://github.com/cryptape/cita-sdk-js) [![](https://img.shields.io/badge/CITA_SDK(JavaScript)-Documents-green.svg)](https://github.com/cryptape/cita-sdk-js)

考虑到签名、报文拼装，abi调用等复杂操作，区块链操作对于绝大多数开发者来说都有不小的难度。为此，我们提供了多平台SDK进一步降低开发门槛。目前正在维护的开源SDK包括 JavaScript、Java、Ruby、Swift 等多个版本，方便开发者使用。用户也可以同时使用以太坊的web3 SDK，使得同一个 DApp 前端同时支持以太坊网络和 CITA 网络的业务操作。

### CITA Truffle Box | DApp Development Framework

[![](https://img.shields.io/badge/Truffle_Box-Documents-green.svg)](https://github.com/cryptape/appchain-truffle-box) [![](https://img.shields.io/badge/Truffle_Box-GitHub-lightgrey.svg)](https://github.com/cryptape/appchain-truffle-box)

This truffle box is customized for you to work with CITA. You can use this box to develop DApps on CITA.

### CITA IDE | CITA Solidity IDE

[![](https://img.shields.io/badge/Truffle_Box-Documents-green.svg)](https://github.com/cryptape/appchain-ide) [![](https://img.shields.io/badge/Truffle_Box-GitHub-lightgrey.svg)](https://github.com/cryptape/appchain-ide)

The CITA IDE is an IDE for Solidity dApp developers, developed based on Remix.