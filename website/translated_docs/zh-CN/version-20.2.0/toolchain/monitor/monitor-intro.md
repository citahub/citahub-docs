---
title: CITA 监控系统简介
id: version-20.2.0-monitor-intro
sidebar_label: 简介
original_id: monitor-intro
---

这是一套基于 Prometheus 框架的 [CITA](https://github.com/citahub/cita) 区块链服务运行状态监控系统 。

监控指标包括区块链数据、服务进程状态、运行环境的 CPU/存储器/磁盘使用率等主机信息等。

项目开源在 [GitHub](https://github.com/citahub/cita-monitor)。

## 仪表板(Dashboard) 截图

Summary Dashboard Demo ![summary-dashboard-demo-fs8](https://user-images.githubusercontent.com/71397/57682153-b9a5c700-7663-11e9-93c6-a29758e7d3a1.png)

CITA Node Info Dashboard Demo ![cita-node-info-dashboard-demo-fs8](https://user-images.githubusercontent.com/71397/57681838-15bc1b80-7663-11e9-91b4-202c306a0f3b.png)

Host Info Dashboard Demo ![host-info-dashboard-demo-fs8](https://user-images.githubusercontent.com/71397/57681906-3ab08e80-7663-11e9-9229-76b85c0eaaa4.png)

Rabbitmq Dashboard Demo ![rabbitmq-dashboard-demo-fs8](https://user-images.githubusercontent.com/71397/57682140-b0b4f580-7663-11e9-8db0-c4e2a0e29606.png)

## 功能列表

* CITA 服务进程监控
  - CITA 微服务及MQ进程的存活、进程的 CPU、内存使用率、IO
* 区块链数据健康监控
  - 节点出块高度历史、出块时间、出块间隔趋势、Quota、交易量历史、TPS、磁盘占用比例、数据目录大小增长趋势
* 运行环境监控
  - 主机运行环境的系统负载、CPU、内存、磁盘空间使用情况、网络流量、TCP 连接数等
* 故障告警通知
  - [监控告警策略](https://github.com/citahub/cita-monitor/blob/master/docs/alert_strategies.md)
  - 支持邮件通知、Slack 通知、短信通知（Pro 版）
* 节点网络监控（Pro 版）
  - 连接节点数、网络拓扑、地理位置等
* 鉴源限流（Pro 版）
  - 鉴别请求来源、工具；限制访问来源、频率
* JSONRPC 接口调用分析（Pro 版）
  - 统计分析 RPC 方法的请求时间、请求次数

### 仪表板的监控指标

* Summary Dashboard
  * 各节点最新块高
  * 各节点监控进程存活
  * 各节点 CPU 使用率变化
  * 节点列表
* CITA Node Info Dashboard
  * CITA Meta Data - 链的配置信息，如 Chain Name、创建时间等
  * Chain Info - 链的最新块高、共识节点数、共识节点出块历史趋势
  * Node Info - 选定节点的详细信息，包括区块链数据、运行环境、运行软件信息
* Host Info Dashboard
  * 各节点运行主机的信息，包括系统负载、CPU、内存、硬盘使用率、网络流量
* Process Info Dashboard
  * 节点中 CITA 微服进程的存活历史、CPU、内存、IO 变化历史
* RabbitMQ Dashboard
  * RabbitMQ 服务的存活状态、channels 、consumers、connections、queues 等的变化记录

更细节可查看：[监控指标信息结构](https://github.com/citahub/cita-monitor/tree/master/docs/information_architecture.md)

更多信息请查看[项目 GitHub Repo](https://github.com/citahub/cita-monitor)。
