---
id: run-cita
title: 运行 CITA
---

## 配置 CITA

1. 进入 CITA 目录：

   ```shell
   $ cd cita_secp256k1_sha3
   ```

2. 初始化链(注意：如果使用的系统是 CentOS 7 请先关闭 selinux 再执行如下命令)：

   ```shell
   $ bin/cita create --super_admin "0x37d1c7449bfe76fe9c445e626da06265e9377601" --nodes "127.0.0.1:4000,127.0.0.1:4001,127.0.0.1:4002,127.0.0.1:4003"
   ```

   其中：
   * super_admin 为超级管理员账号地址；请采用上一步执行结果的为准。
   * nodes 是要部署的节点地址（IP:PORT）。

   > * 注1：以上是简单的配置，系统会默认一些参数，更多自定义参数请见[链级配置]；
   > * 注2：以上操作是在一台服务器上部署 4 个 CITA 节点，如要将节点部署到多台服务器，初始化链时 --nodes 需要填写服务器真实 IP:PORT；
   > * 注3：如果未安装 CITA 的 Docker 环境，会自动拉取镜像，并启动 CITA 容器。

## 启动 CITA

第一次启动 CITA 时需要使用 `setup` 命令初始化每个节点，之后重新启动不需要再次操作。
更多信息可查看 `bin/cita help` 中 `setup` 部分。
> * 注：setup 或 start 节点时，节点号后面存证多余的"/"， 会报错
错误写法示例： 
```shell 
$ bin/cita setup test-chain/0/
$ bin/cita start test-chain/0/
```

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

1. 查看节点 0

   ```shell
   $ bin/cita top test-chain/0
   user      1953     0  0 17:10 ?        00:00:00 cita-forever
   user      1968  1953  0 17:10 ?        00:00:00 cita-auth -c auth.toml
   user      1963  1953  0 17:10 ?        00:00:00 cita-bft -c consensus.toml -p privkey
   user      1966  1953  0 17:10 ?        00:00:00 cita-chain -c chain.toml
   user      1969  1953  0 17:10 ?        00:00:00 cita-executor -c executor.toml
   user      1967  1953  0 17:10 ?        00:00:00 cita-jsonrpc -c jsonrpc.toml
   user      1965  1953  0 17:10 ?        00:00:00 cita-network -c network.toml
   ```

   检查 7 个服务是否都已经启动。

2. 查看节点 1

   ```shell
   $ bin/cita top test-chain/1
   user      2107     0  0 17:10 ?        00:00:00 cita-forever
   user      2124  2107  0 17:10 ?        00:00:00 cita-auth -c auth.toml
   user      2117  2107  0 17:10 ?        00:00:00 cita-bft -c consensus.toml -p privkey
   user      2125  2107  0 17:10 ?        00:00:00 cita-chain -c chain.toml
   user      2123  2107  0 17:10 ?        00:00:00 cita-executor -c executor.toml
   user      2116  2107  0 17:10 ?        00:00:00 cita-jsonrpc -c jsonrpc.toml
   user      2130  2107  0 17:10 ?        00:00:01 cita-network -c network.toml
   ```

   检查 7 个服务是否都已经启动。

3. 查看节点 2

   ```shell
   $ bin/cita top test-chain/2
   user      2274     0  0 17:10 ?        00:00:00 cita-forever
   user      2286  2274  0 17:10 ?        00:00:00 cita-auth -c auth.toml
   user      2291  2274  0 17:10 ?        00:00:00 cita-bft -c consensus.toml -p privkey
   user      2284  2274  0 17:10 ?        00:00:00 cita-chain -c chain.toml
   user      2297  2274  0 17:10 ?        00:00:00 cita-executor -c executor.toml
   user      2287  2274  0 17:10 ?        00:00:00 cita-jsonrpc -c jsonrpc.toml
   user      2288  2274  0 17:10 ?        00:00:01 cita-network -c network.toml
   ```

   检查 7 个服务是否都已经启动。

4. 查看节点 3

   ```shell
   $ bin/cita top test-chain/3
   user      2437     0  0 17:10 ?        00:00:00 cita-forever
   user      2450  2437  0 17:10 ?        00:00:00 cita-auth -c auth.toml
   user      2458  2437  0 17:10 ?        00:00:00 cita-bft -c consensus.toml -p privkey
   user      2451  2437  0 17:10 ?        00:00:00 cita-chain -c chain.toml
   user      2459  2437  0 17:10 ?        00:00:00 cita-executor -c executor.toml
   user      2447  2437  0 17:10 ?        00:00:00 cita-jsonrpc -c jsonrpc.toml
   user      2449  2437  0 17:10 ?        00:00:01 cita-network -c network.toml
   ```

   检查 7 个服务是否都已经启动。

[链级配置]: ../configuration-guide/chain-config
