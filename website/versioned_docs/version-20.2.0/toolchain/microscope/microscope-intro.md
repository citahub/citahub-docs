---
title: Microscope Introduction
id: version-20.2.0-microscope-intro
sidebar_label: Microscope 简介
original_id: microscope-intro
---

Microscope 区块链浏览器，可用于查询所有 CITA 链上信息，并支持多链，可通过在元数据面板中切换目标链。技术栈为 React、TypeScript、Rxjs。主要功能模块包括：首页信息、区块信息、交易信息、账户信息、账户信息、配置页面。可访问[官方浏览器](https://microscope.citahub.com/#/)进行体验。

## 开发&用户手册

https://github.com/citahub/microscope-v2/blob/develop/README-CN.md

## 项目结构

* 主要业务逻辑位于 src 目录下
    * components: 可复用的组件
    * container: 页面和一些顶层组件( Dialog 等)
    * context: 全局状态控制, 目前包括页面配置和全局 Observable
    * Routes: 路由组件, 控制页面跳转

## 注意事项

* 对于新区块的监控位于 context 中的 newBlockByNumberSubject 这个 Observable, 全局共用；
* i18n 方案采用了 i18next 和 locize 服务, 自动读取页面上的字段到 locize 上, 翻译后在线替换页面上的文本；
* Microscope 设计之初考虑到直连节点和连接缓存服务器两种情况, 所以大部分接口还是 rpc 请求；
* 考虑到浏览器的轻量化, sdk 使用单独封装的 @appchain/observables,  `@citahub/cita-signer`；
    * 引入签名模块对交易信息进行一次解签。
* 对于交易详情的处理, 由于 rpc 接口返回的交易只包含序列化后的交易信息, 需要通过 `@citahub/cita-signer` 的 unsign 方法来解析。

## 期待协作

https://github.com/citahub/microscope-v2/issues

我们正在招募社区开发者，想要获得更多资讯欢迎申请加入 CITAHub：https://www.citahub.com/#joinArea


