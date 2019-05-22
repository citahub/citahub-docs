---
id: run-cita
title: 运行 CITA
---

## 创建超级管理员账户地址、私钥、公钥

   执行命令：
   
   ```shell
   $ cita-cli key create
   ```                   

   命令返回:

   ```json
   {
     "address": "0x141d051b1b1922bf686f5df8aad45cefbcb0b696",
     "private": "0xa2c4ce22f3ee18d4ca6e560d4a5a6b54823773348b95cd95afb3ee2843ff7768",
     "public": "0x37aa832ae77a580c2c305dfee234af424a90274b236b8925d7c452e1834f3fa34cd87178c2116d34dc816d0b06c869b01409a328d7a28fcfcfca994f6095d166"
   }
   ```

   > 注：此处为示例公私钥对，不要在生产环境复制使用，其中：
   >
   > * "address", 为帐号地址；
   > * "private", 为帐号私钥；
   > * "public", 为帐户公钥。
   > 
   > 由于每次执行命令生成的结果都不同，以下所有的示例操作均使用本次生成的结果。

## 配置 CITA

   1. 进入 CITA 目录：

      ```shell
      $ cd cita_secp256k1_sha3
      ```
   
   2. 初始化链：

      ```shell
      $ bin/cita create --super_admin "0x141d051b1b1922bf686f5df8aad45cefbcb0b696" --nodes "127.0.0.1:4000,127.0.0.1:4001,127.0.0.1:4002,127.0.0.1:4003"
      ```
   
      其中：
      * super_admin 为管理员账号地址；请采用上一步执行结果的为准。
      * nodes 是要部署的节点地址（IP:Port）。
      
      > * 注1：以上是简单的配置，系统会默认一些参数，更多自定义参数请见 [链接配置]；
      > * 注2：以上操作是在一台服务器上部署 4 个 CITA 节点，如要将节点部署到多台服务器，初始化链时 --nodes 需要填写服务器真实 IP:PORT。

## 启动 CITA

   1. 启动节点 0

      ```shell
      $ bin/cita setup test-chain/0
      $ bin/cita start test-chain/0
      ```

   2. 启动节点 1

      ```shell
      $ bin/cita setup test-chain/1
      $ bin/cita start test-chain/1
      ```

   3. 启动节点 2

      ```shell
      $ bin/cita setup test-chain/2
      $ bin/cita start test-chain/2
      ```

   4. 启动节点 3

      ```shell
      $ bin/cita setup test-chain/3
      $ bin/cita start test-chain/3
      ```

## 验证 CITA 是否运行正常

   查看进程是否启动成功

   ```shell
   $ ps -ef | grep cita- |grep -v grep |wc -l && ps -ef | grep cita- |grep -v grep
   ```

   返回结果可以看到启动了 28 个进程（每个节点有 7 个服务 * 4 个节点）

   ```
   28
   cita      6180 32335  0 10:54 ?        00:00:00 cita-forever
   cita      6188  6180  0 10:54 ?        00:00:00 cita-auth -c auth.toml
   cita      6191  6180  0 10:54 ?        00:00:00 cita-network -c network.toml
   cita      6193  6180  0 10:54 ?        00:00:00 cita-jsonrpc -c jsonrpc.toml
   cita      6194  6180  0 10:54 ?        00:00:00 cita-executor -c executor.toml
   cita      6195  6180  0 10:54 ?        00:00:00 cita-chain -c chain.toml
   cita      6202  6180  0 10:54 ?        00:00:00 cita-bft -c consensus.toml -p privkey
   cita      6394 32335  0 10:54 ?        00:00:00 cita-forever
   cita      6402  6394  0 10:54 ?        00:00:00 cita-chain -c chain.toml
   cita      6405  6394  0 10:54 ?        00:00:00 cita-executor -c executor.toml
   cita      6407  6394  0 10:54 ?        00:00:00 cita-network -c network.toml
   cita      6408  6394  0 10:54 ?        00:00:00 cita-bft -c consensus.toml -p privkey
   cita      6409  6394  0 10:54 ?        00:00:00 cita-auth -c auth.toml
   cita      6413  6394  0 10:54 ?        00:00:00 cita-jsonrpc -c jsonrpc.toml
   cita      6613 32335  0 10:54 ?        00:00:00 cita-forever
   cita      6622  6613  0 10:54 ?        00:00:00 cita-bft -c consensus.toml -p privkey
   cita      6625  6613  0 10:54 ?        00:00:00 cita-executor -c executor.toml
   cita      6626  6613  0 10:54 ?        00:00:00 cita-jsonrpc -c jsonrpc.toml
   cita      6627  6613  0 10:54 ?        00:00:00 cita-chain -c chain.toml
   cita      6628  6613  0 10:54 ?        00:00:00 cita-network -c network.toml
   cita      6635  6613  0 10:54 ?        00:00:00 cita-auth -c auth.toml
   cita      6831 32335  0 10:54 ?        00:00:00 cita-forever
   cita      6839  6831  0 10:54 ?        00:00:00 cita-executor -c executor.toml
   cita      6841  6831  0 10:54 ?        00:00:00 cita-jsonrpc -c jsonrpc.toml
   cita      6843  6831  0 10:54 ?        00:00:00 cita-bft -c consensus.toml -p privkey
   cita      6845  6831  0 10:54 ?        00:00:00 cita-chain -c chain.toml
   cita      6846  6831  0 10:54 ?        00:00:00 cita-network -c network.toml
   cita      6857  6831  0 10:54 ?        00:00:00 cita-auth -c auth.toml
   ```

[链接配置]: ../operation/chain-config
