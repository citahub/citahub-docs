---
id: ordi-node
title: 普通节点管理
---

目前 CITA 对于普通节点的准入管理采用白名单的方式。每个节点本地保存白名单配置文件，其中记录着允许连接的p2p通信和数据同步的节点，包括其公钥、IP 地址、端口、对应的身份信息等。
白名单由管理机构生成并分发，运维人员可对其进行维护和管理，可选择连接若干其他节点同时可配置若干普通节点，使其承担数据分析等工作。

普通节点的管理，包括添加和删除。下面我们将用具体的示例来阐述。

## 添加普通节点（以下以 4 号节点举例）

1. 假设目前的工作目录在 `../cita/target/install/` 下：

   ```shell
   $ pwd
   ../cita/target/install
   $ ls test-chain/
     0  1  2  3  template
   ```

   template 中保存了当前节点的公钥地址 `template/authorities.list`，以及创世块信息 `template/configs/genesis.json`，目前地址有四个。

2. 生成新 node：

   ```shell
   $ ./scripts/create_cita_config.py append --chain_name test-chain --node "127.0.0.1:4004"
   $ ls test-chain/
     0  1  2  3  4  template
   ```

   - append 子命令，在指定链中增加对应 ip 地址的节点
   - 脚本将自动生成 4 号节点，并在原有节点中 `test-chain/*/network.toml` 中插入新节点的 ip 及端口配置

3. 启动新节点：

   对于原来的节点，如果正在运行，那么 network.toml 修改后，将自动重新加载 p2p 网络配置，并开始尝试寻找新节点。

   新节点只需要按照正常流程启动，就可以连接入网络，并开始同步链上的块数据，**注意，此时的新节点为普通节点，不参与共识选举，即只能同步数据和接收 jsonrpc 请求**。

   ```shell
   $ ./bin/cita setup test-chain/4
   $ ./bin/cita start test-chain/4
   ```

## 删除普通节点

到对应节点目录下，找到 `network.toml`，删除对应 `peers` 条目即可。