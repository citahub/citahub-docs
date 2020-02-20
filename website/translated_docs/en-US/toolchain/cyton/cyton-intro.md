---
title: Cyton Introduction
id: cyton-intro
sidebar_label: Cyton Introduction
---

Cyton Wallet 是支持 CITA 的区块链钱包工具，分为 Android 版和 iOS 版，提供密钥和账户管理功能（私钥、助记词、keystore），Token 管理及转账功能，内置 DApp浏览器，可直接在 Cyton 中使用基于 CITA 和 Ethereum 开发的DApp。代码开源在 Github 上，任何开发者可以基于 Cyton Wallet 进行二次开发，构建属于自己独有的区块链钱包。

Cyton Wallet 兼容 Ethereum，可以管理Ethereum资产，比如 ETH、ERC20、ERC721等，同时也支持现有的以太坊 DApp。由于 CITA 兼容以太坊的 EVM，支持 Solidity 开发智能合约，所以在 Ethereum 上任何合约代码都可以直接移植到 CITA 上，CITA 链上的 ERC20 代币和 Ethereum ERC20 代币完全兼容。此外 Cyton 支持基于 CITA 的多链场景，由于 CITA 是开源的高性能区块链内核，通过 chainId 区分不同的 CITA 链，Cyton 可以同时支持多条不同 chainId 的 CITA 链。

Android 版 Cyton 使用基于 Java 和 Kotlin 两种语言混合开发，项目依赖 Java 版的 SDK [cita-sdk-java](https://github.com/citahub/cita-sdk-java)；iOS版基于最新的 Swift开发，项目依赖 Swift 版 SDK [cita-sdk-swift](https://github.com/citahub/cita-sdk-swift)，同时 Cyton 依赖区块链缓存服务 [ReBirth](https://github.com/citahub/re-birth) 提供原生代币和 ERC20 代币交易列表等自定义区块链数据服务。

## 注意事项

### Cyton-Android：

Cyton-Android 项目代码需要用 Android Studio 编译器打开，Gradle 同步加载依赖并构建整个项目，如果项目构建成功，直接点击 `Run` 按钮，即可安装 App 至模拟器或者手机。

Cyton 首次打开目前仅显示 ETH 代币，其他的 ERC20 代币可以在添加 Token 页面通过输入合约地址添加，如果想要添加 CITA 链的原生代币和 ERC20 代币，只需要输入相应的节点地址和合约地址即可。

Cyton 首页的 DApp 浏览器可以直接输入现有 Ethereum 的 DApp 地址即可访问，如果想要开发基于 CITA 的 DApp，可以参考https://github.com/citahub/first-forever-demo

### Cyton-iOS：

Cyton-iOS 项目代码需要使用 Xcode 10.0 及以上版本打开，同时需要安装 1.6.0 版本及以上的 `cocoapods` , 下载代码之后进入根目录执行`pod install` ， 然后双击 `Cyton.xcworkspace` 打开运行项目。

如果编译过程当中出现 `web3swift` 和 `Cita` 产生冲突，请 clean 项目之后再试，快捷键为 `cmd+shift+k`。

其他注意事项请参考安卓注意事项后两项。

## 下载体验

iOS 和 Android 下载 ![ios](assets/toolchain-assets/ios.png)

![android](assets/toolchain-assets/android.png)

## Getting Started

cyton-android：https://github.com/citahub/cyton-android

cyton-ios：https://github.com/citahub/cyton-ios

## 期待协作

* https://github.com/citahub/cyton-android/issues

我们正在招募社区开发者，想要获得更多资讯欢迎申请加入CITAHub：https://www.citahub.com/#joinArea