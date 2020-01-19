---
id: version-0.18-welcome
title: Overview
original_id: welcome
---

我们提供了一套完整的开源的区块链解决方案，CITA 作为底层区块链内核；围绕 CITA, 我们提供了一系列开源的工具链来完善基础设施，以方便运营方，开发者以及终端用户能够快速应用起来，包括：Dapp 钱包 Cyton，区块链浏览器 Microscope，区块缓存服务器 ReBirth，多平台 SDK 等。

![](assets/first-page.jpg)

## CITA | 区块链内核

[![](https://img.shields.io/badge/CITA-Documents-green.svg)](https://docs.citahub.com/zh-CN/cita/cita-intro) [![](https://img.shields.io/badge/CITA-GitHub-lightgrey.svg)](https://github.com/citahub/cita/)

CITA 将一个区块链节点的共识、网络、计算、RPC 等功能进行了微服务化拆分，每一个微服务又可以有多个实例，最终这些实例共同完成一个节点的记账功能。这样，我们将区块链性能的扩展问题转化成了节点的扩展问题，当性能不足时，插入一台服务器，分担节点的工作压力即可。同时，我们将共识机制、底层逻辑进行了深度优化，例如采用 Rust 语言架构所有代码等。最终实现了目前**开源可实证**区块链系统的顶级性能。这是一组实测数据：由 4 核 8G 云主机构成的 CITA 的性能可达到每秒 2900 笔简单交易；32 核 64G 云主机组成的 CITA 的性能则超过了每秒 1.5 万笔简单交易。采用集群构建节点性能将会更高，因此 CITA 的性能已经足以应付绝大多数应用场景。

## CITA Toolchain | CITA 工具链

### Cyton | DApp 钱包

[![](https://img.shields.io/badge/Cyton(Android)-Documents-green.svg)](https://github.com/citahub/cyton-android) [![](https://img.shields.io/badge/Cyton(Android)-GitHub-lightgrey.svg)](https://github.com/citahub/cyton-android)

[![](https://img.shields.io/badge/Cyton(iOS)-Documents-green.svg)](https://github.com/citahub/cyton-ios) [![](https://img.shields.io/badge/Cyton(iOS)-GitHub-lightgrey.svg)](https://github.com/citahub/cyton-ios)

Cyton 提供了现实世界的用户访问区块链世界的入口。Cyton 一方面是 CITA（也兼容以太坊）上用户私钥和各类数字资产、私有产权和私有数据的管理工具，更重要的，它作为一个 DApp 的运行平台，可以允许各种区块链应用以小程序的方式在用户终端直接运行。

设想一个区块链游戏开发者，他只需要完成智能合约的核心开发和 DApp 的访问网站开发即可，复杂的私钥管理和数字资产管理业务都由开源的 Cyton 接管。用户只需要输入 DApp 的 URL 甚至扫码即可访问 DApp 并完成游戏操作。开发者也可以利用流行的支付服务整合到操作页面中，例如使用微信充值购买区块链上的游戏道具。而第三方开发者也可以制作新的 DApp（游戏副本等）与原 DApp 在智能合约层面交互、实现去中心化协作，共同为用户创造价值。

Cyton 的运营者或者 DApp 开发者也可以选择重构开源的 Cyton 代码，为用户提供更加专业和针对性的服务。相信这将大大降低开发者的门槛，也降低用户的学习难度。

### Microscope | 区块链浏览器

[![](https://img.shields.io/badge/Microscope-Documents-green.svg)](https://github.com/citahub/microscope/) [![](https://img.shields.io/badge/Microscope-GitHub-lightgrey.svg)](https://github.com/citahub/microscope/)

Microscope 的目标是打造一个类似 etherscan 的区块链数据访问平台。它提供对区块数据、交易数据、账号地址数据以及智能合约的访问等必备功能。Microscope 支持多链访问，只要给出对应链的 RPC 服务地址，即可接入这条区块链并提供数据浏览服务。运营方可以部署一个自己的专用浏览器，也可以将访问接口提供给其他浏览器。

未来 Microscope 将增加数字资产访问、结构化数据展示等功能。对应地，我们将提供一个链上 KV 数据自动转换为本地关系型数据的中间件，以方便 DApp 的开发。开发者可以通过中间件快速索引业务数据，为用户提供更加友好的服务。

### ReBirth | 区块缓存服务器

[![](https://img.shields.io/badge/ReBirth-Documents-green.svg)](https://github.com/citahub/rebirth) [![](https://img.shields.io/badge/ReBirth-GitHub-lightgrey.svg)](https://github.com/citahub/re-birth/)

ReBirth 是一个提供区块链数据缓存服务的服务器端组件。它通过在服务器本地缓存 链上的数据，为 Microscope 和 Cyton 提供所需的数据缓存和查询服务，加快查询区块数据的速度，提升软件的使用体验。

### 多平台 SDK | 软件开发工具包

[![](https://img.shields.io/badge/CITA_SDK(Swift)-GitHub-lightgrey.svg)](https://github.com/citahub/cita-sdk-swift) [![](https://img.shields.io/badge/CITA_SDK(Swift)-Documents-green.svg)](https://github.com/citahub/cita-sdk-swift)

[![](https://img.shields.io/badge/CITA_SDK(Ruby)-GitHub-lightgrey.svg)](https://github.com/citahub/cita-sdk-ruby) [![](https://img.shields.io/badge/CITA_SDK(Ruby)-Documents-green.svg)](https://github.com/citahub/cita-sdk-ruby)

[![](https://img.shields.io/badge/CITA_SDK(Java)-GitHub-lightgrey.svg)](https://github.com/citahub/cita-sdk-java) [![](https://img.shields.io/badge/CITA_SDK(Java)-Documents-green.svg)](https://github.com/citahub/cita-sdk-java)

[![](https://img.shields.io/badge/CITA_SDK(JavaScript)-GitHub-lightgrey.svg)](https://github.com/citahub/cita-sdk-js) [![](https://img.shields.io/badge/CITA_SDK(JavaScript)-Documents-green.svg)](https://github.com/citahub/cita-sdk-js)

考虑到签名、报文拼装，abi 调用等复杂操作，区块链操作对于绝大多数开发者来说都有不小的难度。为此，我们提供了多平台 SDK 进一步降低开发门槛。目前正在维护的开源 SDK 包括 JavaScript、Java、Ruby、Swift 等多个版本，方便开发者使用。用户也可以同时使用以太坊的 web3 SDK，使得同一个 DApp 前端同时支持以太坊网络和 CITA 网络的业务操作。

### CITA Truffle Box | DApp 开发框架

[![](https://img.shields.io/badge/Truffle_Box-Documents-green.svg)](https://github.com/citahub/cita-truffle-box) [![](https://img.shields.io/badge/Truffle_Box-GitHub-lightgrey.svg)](https://github.com/citahub/cita-truffle-box)

CITA Truffle Box 可以使开发者借助 Truffle 完成 CITA 上的 DApp 开发.

### CITA IDE | Solidity 合约编辑器

[![](https://img.shields.io/badge/Truffle_Box-Documents-green.svg)](https://github.com/citahub/cita-ide) [![](https://img.shields.io/badge/Truffle_Box-GitHub-lightgrey.svg)](https://github.com/citahub/cita-ide)

CITA IDE 是一个基于浏览器的合约编辑器，是基于 Remix 开发的。
