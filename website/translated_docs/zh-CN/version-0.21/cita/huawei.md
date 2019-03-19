---
id: version-0.21-huawei
title: 华为云一键部署
original_id: huawei
---
目前一键部署的功能为，通过使用部署模板，用户只需输入必要的配置参数，即可一键部署一条至少4个node 的链。

#### 准备工作

用户已经在华为云官网注册。并且已经账户充入一定的资金。

> **关于密钥对**  
> 若用户之前没有创建过密钥对，则应先在“示例模板>示例模板详情”的“模板概述”中按提示创建一个密钥对。  
> 若已经有密钥对，则进入示例模板详情页面，然后“创建堆栈”，按页面提示一步步输入配置信息并最终创建堆栈。

#### 操作步骤

1. 进入 CITA 模版页面

首先进入华为云控制台页面：https://console.huaweicloud.com/

在导航栏**服务列表**菜单中，找到**应用编排服务**。在**模板市场**页面中，找到模版**一键部署 CITA 区块链 (nervos)**。

![step 1](assets/cita-assets/huawei01.png) ![step 1.1](assets/cita-assets/huawei02.png)

1. 点击“创建堆栈”，

其中，token_avatar为代币图标，应输入图标所在的url链接。

![step 2](assets/cita-assets/huawei03.png) 3. 点击下一步，

![step 3](assets/cita-assets/huawei04.png) 输入资源配置的相关参数。如下图：

一个用户用同一个模板在一个区域（见下图第一个参数“集群可用区”）只能部署一个链。

另外,第一次操作时用户没有sshkey，需要先生成sshkey.

Cce_node_flavor为节点的规格，指CPU和内存规格。如4核8G，8核16G，16核32G。

Cita_sfs_size为节点的硬盘大小。

Eip_bandwidth为节点的带宽。

您可根据您的具体要求输入配置。也可以参考我们的推荐配置来输入：

| 参考性能（TPS） | 云主机个数 | 节点个数 | CPU和内存 | 每台带宽(Mbps) |
| --------- | ----- | ---- | ------ | ---------- |
| 1500      | 4     | 4    | 4核8G   | 10         |
| 3900      | 4     | 4    | 8核16G  | 20         |
| 15000     | 4     | 4    | 32核64G | 100        |

![step 4](assets/cita-assets/huawei05.png) 点击“下一步”。显示，

![step 5](assets/cita-assets/huawei06.png) 点击创建堆栈，页面显示创建进度，最后完成。

生成sshkey的步骤为,返回到第一个页面，如下图，找到“这里”，并点击

![step 6](assets/cita-assets/huawei07.png) 点击“创建密钥对”，

![step 7](assets/cita-assets/huawei08.png) 点击“确定”。

![step 8](assets/cita-assets/huawei09.png) 密钥文件下载到本地。