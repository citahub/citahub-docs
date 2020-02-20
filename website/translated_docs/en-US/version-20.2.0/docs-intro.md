---
id: version-20.2.0-welcome
title: CITAHub Docs Overview
sidebar_label: CITAHub Docs Overview
original_id: welcome
---

CITAHub 提供了一套完整的开源的区块链解决方案，CITA 作为底层区块链内核；围绕 CITA， 提供了开源的工具链 CITA Toolchain 来完善基础设施，以方便运营方，开发者以及终端用户能够快速使用，跟 CITA 直接进行数据交互的有 CITA SDK， CITA CLI。官方在 CITA SDK 基础上构建了 4 个工具：ReBirth、CITA IDE、CITA Truffle Box、CITA Web Debugger。此外还提供 3 个针对特定业务需求和开发场景的工具：Microscope、Cyton Wallet、CITA CLI。另外还有一个 [first-forever-demo](https://github.com/citahub/first-forever-demo)，通过开发或运行此 demo，能够熟悉 CITA Toolchain 的大部分子工具，并基本掌握在 CITA 上开发 DApp 的操作流程。

![](assets/first-page.jpg)

## CITA | 区块链内核

[![](https://img.shields.io/badge/CITA-Documents-green.svg)](https://docs.citahub.com/zh-CN/cita/cita-intro) [![](https://img.shields.io/badge/CITA-GitHub-lightgrey.svg)](https://github.com/citahub/cita/)

CITA 将一个区块链节点的共识、网络、计算、RPC 等功能进行了微服务化拆分，每一个微服务又可以有多个实例，最终这些实例共同完成一个节点的记账功能。这样，我们将区块链性能的扩展问题转化成了节点的扩展问题，当性能不足时，插入一台服务器，分担节点的工作压力即可。同时，我们将共识机制、底层逻辑进行了深度优化，例如采用Rust语言架构所有代码等。最终实现了目前**开源可实证**区块链系统的顶级性能。这是一组实测数据：由4核8G云主机构成的CITA的性能可达到每秒2900笔简单交易；32核64G云主机组成的CITA的性能则超过了每秒1.5万笔简单交易。采用集群构建节点性能将会更高，因此 CITA 的性能已经足以应付绝大多数应用场景。

## CITA Toolchain | CITA 工具链

### CITA CLI

[![](https://img.shields.io/badge/CITA_CLI-GitHub-lightgrey.svg)](https://github.com/citahub/cita-cli)

CITA CLI 是在开发中调试 CITA 的命令行工具。

### 多平台 SDK | 软件开发工具包

[![](https://img.shields.io/badge/CITA_SDK(JavaScript)-GitHub-lightgrey.svg)](https://github.com/citahub/cita-sdk-js) [![](https://img.shields.io/badge/CITA_SDK(Java)-GitHub-lightgrey.svg)](https://github.com/citahub/cita-sdk-java) [![](https://img.shields.io/badge/CITA_SDK(Swift)-GitHub-lightgrey.svg)](https://github.com/citahub/cita-sdk-swift) [![](https://img.shields.io/badge/CITA_SDK(Ruby)-GitHub-lightgrey.svg)](https://github.com/citahub/cita-sdk-ruby) [![](https://img.shields.io/badge/CITA_SDK(Rust)-GitHub-lightgrey.svg)](https://github.com/citahub/cita-common/tree/develop/cita-web3)

CITA SDK 是 Toolchain 的核心，它将 CITA 上重复繁琐的操作进行封装，暴露简单的接口给开发者，开发者可借助此SDK构建应用，分为不同语言版本：JavaScript SDK、Java SDK、Ruby SDK、Swift SDK、Rust SDK。

### ReBirth | 区块缓存服务器

[![](https://img.shields.io/badge/ReBirth-GitHub-lightgrey.svg)](https://github.com/citahub/re-birth/)

ReBirth 是针对 CITA 提供的区块链缓存服务器，能够满足检索区块，提供 ERC20 交易列表等业务功能需求。

### CITA IDE | Solidity 合约编辑器

[![](https://img.shields.io/badge/CITA_IDE-GitHub-lightgrey.svg)](https://github.com/citahub/cita-ide)

CITA IDE 是基于 Ethereum 的 Solidity 编辑器进行修改，适配 CITA，是面向 CITA 的智能合约编辑器。

### CITA Truffle Box | DApp 开发平台

[![](https://img.shields.io/badge/Truffle_Box-GitHub-lightgrey.svg)](https://github.com/citahub/cita-truffle-box)

CITA Truffle Box 是基于 Truffle Box 定制的适配 CITA 的 DApp 全能开发框架，在 CITA 上开发 DApp 的体验和在 Ethereum 上比较一致。

### CITA Web Debugger

[![](https://img.shields.io/badge/Web_Debugger-GitHub-lightgrey.svg)](https://github.com/citahub/cita-sdk-js/tree/develop/packages/cita-web-debugger)

CITA Web Debugger 是一个基于 Chrome 浏览器的插件，用于 DApp 调试。

### Cyton Wallet | DApp 钱包

[![](https://img.shields.io/badge/Cyton(Android)-GitHub-lightgrey.svg)](https://github.com/citahub/cyton-android) [![](https://img.shields.io/badge/Cyton(iOS)-GitHub-lightgrey.svg)](https://github.com/citahub/cyton-ios)

Cyton Wallet 分为 Android 版和 iOS 版，提供账户管理功能，Token 管理及转账功能，内置 DApp 浏览器功能，开发者可基于 Cyton Wallet 进行二次开发构建区块链钱包。

### Microscope | 区块链浏览器

[![](https://img.shields.io/badge/Microscope-GitHub-lightgrey.svg)](https://github.com/citahub/microscope/)

Microscope 区块链浏览器，可用于查询所有 CITA 链上信息，并支持基于 CITA 的多链，可通过在元数据面板中切换目标链。

## 资源列表

- [精华文章](https://mp.weixin.qq.com/mp/homepage?__biz=MzI4ODk4ODYxMg==&hid=7)
- [技术论坛](https://talk.citahub.com/)


