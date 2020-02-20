---
title: CITA Web Debugger
id: web-debugger-intro
sidebar_label: CITA Web Debugger Introduction
---

CITA Web Debugger 作为 DApp 调试工具，是一个基于 Chrome 浏览器的插件，用户在开发 DApp 时，在手机上调试很不方便，使用 CITA Web Debugger 能够在浏览器上调试交易方面的功能，能方便地获取交易具体详情和反馈。

## 注意事项

CITA Web Debugger 用 React 实现，开发时需注意：因为浏览器插件一直在后台运行，如果对消息不做拦截，那么所有DApp信息都会被插件获取，隐私得不到保证，所以在浏览器插件中有 3 个环境：

* [contentscript.js](https://github.com/citahub/cita-sdk-js/blob/develop/packages/cita-web-debugger/public/contentscript.js) 和 DApp 运行在同一个 js 环境中，可以获取 DApp 的信息，DApp 也可以向 contentscript.js 环境发送请求，但是无法和插件做直接通信。
* [background.js](https://github.com/citahub/cita-sdk-js/blob/develop/packages/cita-web-debugger/public/background.js) 是在浏览器后台一直运行的，跟插件做实时通信。
* [src](https://github.com/citahub/cita-sdk-js/tree/develop/packages/cita-web-debugger/src) 里的 js 文件，是插件环境。

因此 DApp 如果想要向插件发送信息，首先，DApp 向 contentscript.js 发送请求，contentscript.js 再向 background.js 发送请求，background.js 再向插件发送请求

## Getting Started

https://github.com/citahub/cita-sdk-js/tree/develop/packages/cita-web-debugger

## 期待协作

* 实现合约的管理功能

我们正在招募社区开发者，想要获得更多资讯欢迎申请加入 CITAHub：https://www.citahub.com/#joinArea