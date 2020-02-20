---
title: Toolchain 简介
id: version-20.2.0-toolchain-intro
sidebar_label: Toolchain 简介
original_id: toolchain-intro
---

## 介绍

CITA Toolchain 作为 CITA 生态中的重要组成部分，目的是使开发者在使用 CITA 或基于 CITA 构建应用时更加方便。 跟 CITA 直接进行数据交互的有 CITA SDK、CITA CLI。CITA SDK 是 Toolchain 的核心，它将 CITA 上重复繁琐的操作进行封装，暴露简单的接口给开发者，开发者可借助此 SDK 构建应用，官方在 CITA SDK 基础上构建了 4 个工具: ReBirth、CITA IDE、CITA Truffle Box、CITA Web Debugger。CITA CLI 是一个非常友好的系统运维工具。除此之外我们还提供与 CITA 适配的钱包 Cyton 和浏览器 Microscope.

### CITA SDK

CITA SDK 分为不同语言版本：Java SDK、JavaScript SDK、Ruby SDK、Swift SDK、Rust SDK。

* JavaScript SDK 是在 Ethereum [Web3](https://github.com/ethereum/web3.js/) 的基础上做了封装并且添加 CITA 的 JSON-RPC 请求以及 CITA 的签名模块，构建了 CITA IDE、CITA Truffle Box、CITA Web Debugger。
* Java SDK 集成了与 CITA 客户端交互的功能，可以用来对 CITA 发送交易、部署智能合约、调用合约方法，进行系统配置以及查询其他信息等。
* Swift SDK 用于构建 Cyton Wallet iOS 端。
* Ruby SDK 用于构建 ReBirth。
* Rust SDK 是 CITA JSON-RPC 客户端的 Rust 实现。

### ReBirth

ReBirth 是针对 CITA 提供的区块链缓存服务器，能够满足检索区块，提供 ERC20 交易列表等业务功能需求，这类功能如果直接在底层实现会影响性能。

### CITA IDE

CITA IDE 是面向 CITA 的智能合约编辑器，能够编写、编译、debug、部署智能合约。

### CITA Truffle Box

CITA Truffle Box 是基于 [Truffle Box](https://github.com/truffle-box) 定制的适配 CITA 的 DApp 全能开发框架，包括编写合约、编译合约、测试合约、部署合约、构建 DApp，因此在 CITA 上开发 DApp 的体验和在 Ethereum 上比较一致。

### CITA Web Debugger

CITA Web Debugger 作为 DApp 调试工具，是一个基于 Chrome 浏览器的插件，用户在开发 DApp 时，在手机上调试很不方便，使用 CITA Web Debugger 能够在浏览器上调试交易方面的功能，能方便地获取交易具体详情和反馈。

此外还提供 3 个针对特定业务需求和开发场景的工具：Cyton Wallet、CITA CLI、Microscope。

### Cyton Wallet

Cyton Wallet 分为 Android 版和 iOS 版，提供账户管理功能（私钥、助记词、keystore）和Token 管理及转账功能，并内置 DApp 浏览器。同时它依赖 [ReBirth](https://github.com/citahub/re-birth) 提供原生代币和 ERC20 代币交易列表。

### CITA CLI

CITA CLI 是在开发中调试 CITA 的命令行工具，与 CITA 链交互可以通过 CITA CLI 操作，支持搜索历史命令，默认支持 secp256k1 和 SM2 加密算法。

### Microscope

Microscope 区块链浏览器，可用于查询所有 CITA 链上信息，并支持基于 CITA 的多链，可在元数据面板中切换目标链。支持搜索区块、交易、帐户信息和调用智能合约方法。 它还可以与 [ReBirth](https://github.com/citahub/re-birth) 一起使用，实现指定组合条件的区块交易列表查询，分析 CITA 的工作状态等高级功能。

## 体验 CITA Toolchain

[first-forever-demo](https://github.com/citahub/first-forever-demo) 是一个可以上传文字到链上存证的 DApp，功能简单而全面。提供 3 种运行方式：在 PC 和 web 浏览器上运行；集成 CITA Web Debugger；集成 Cyton Wallet。此外在编译及部署智能合约时，需领取 CITA 原生代币 NATT，这时也会用到 CITA IDE 和 CITA CLI。通过开发或运行 first-forever-demo，能够熟悉 CITA Toolchain 的大部分子工具，并基本掌握在 CITA 上开发 DApp 的操作流程。





