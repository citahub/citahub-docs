---
title: ReBirth Introduction
id: version-20.2.0-rebirth-intro
sidebar_label: ReBirth 简介
original_id: rebirth-intro
---

ReBirth 是针对 CITA 的区块链缓存服务器。技术栈为 Ruby、Ruby on Rails、sidekiq、redis 和 postgres。
在做企业级应用或 DApp 时，如果前端直接与合约层交互，性能会受到很大影响，因此 ReBirth 缓存 block 列表，tx 列表，event logs ，ERC20 列表，前端与 ReBirth 交互，不影响性能。

## 功能

* 同步块的进程：从 blockNumber 获取当前块高，跟当前存储的数据做对比，如果比当前高会把获取的新块的信息放入队列。
* server 进程：提供 rest api 服务，可用于 Microscope 和 Cyton Wallet。
* 队列服务：把放在队列中的信息进行处理：包括获取新块，获取交易回执，
    * 从块高获取块信息, 处理，存储
    * 里面的交易要 getTransactionReceipt 获取交易回执，里面有 errorMessage 等信息，还有 EventLog 信息在里面

## 程序架构

ReBirth 业务逻辑包括：

* controllers/api 对外提供的 api 服务，具体可见 readme
* workers 队列任务处理
* models 模型
    * models/cita_sync 是跟CITA链交互的部分
    * persist.rb 里面都是 从链上获取信息 → 处理 → 存储 的部分
* serializers
    * 输出 json 的序列化文件

## Getting Started

https://github.com/citahub/re-birth

## 期待协作

https://github.com/citahub/re-birth/issues
我们正在招募社区开发者，想要获得更多资讯欢迎申请加入 CITAHub：https://www.citahub.com/#joinArea
