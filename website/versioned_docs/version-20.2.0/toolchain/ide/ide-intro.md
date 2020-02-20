---
title: CITA IDE 简介
id: version-20.2.0-ide-intro
sidebar_label: CITA IDE 简介
original_id: ide-intro
---

CITA IDE 是基于 Ethereum 的 Solidity 编辑器进行修改并适配 CITA ，是面向 CITA 的智能合约编辑器，能够编写、编译、debug、部署智能合约。可直接运行官方 [CITA IDE](https://cita-ide.citahub.com/) 进行体验。

## 用户手册

* browser 内置常用的模板合约，首先从内置合约模板中选择合适的模板开始开发
* Compile 本地编译，选择当前 solidity 版本，与合约 pragma 一致
* 进入右侧的 Run 标签, 在 Deploy to CITA 中填入相关信息
    * 勾选 Auto ValidUntilBlock 则发送交易前会自动更新 validUntilBlock 字段
    * 勾选 store ABI on chain 则会在合约部署成功后将合约 ABI 存储到 CITA 上
    * 此处特别注意 Quota 的设置, 一般合约需要较多 Quota, 若 quota 不足, 在交易信息打印的时候可以查看 Error Message 获知
* 点击 Load Contracts 加载当前编译完成的合约, 并选择要部署的合约
* 点击 Deploy to CITA 发起部署合约的交易
* 观察控制台的输出, 交易详细信息会显示在控制台上, 当流程结束时, 会输出交易 hash 和合约地址, 并且以链接形式支持到 Microscope 查看

## 开发

* CITA IDE 是在 Solidity Remix 项目基础上定制, 并保持其新特性的同步, 因此开发中要注意代码的分离
* 技术栈主要是 React
* CITA IDE 内置合约通过脚本形式同步 CITA 的治理合约和 OpenZepplin 的模板合约

## Getting Started

https://github.com/citahub/cita-ide

## 期待协作

* https://github.com/citahub/cita-ide/issues

我们正在招募社区开发者，想要获得更多资讯欢迎申请加入 CITAHub：https://www.citahub.com/#joinArea
