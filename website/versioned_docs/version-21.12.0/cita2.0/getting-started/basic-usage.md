---
id: version-21.12.0-basic-usage
title: 基本操作
original_id: basic-usage
---

## 指定链的RPC端口

可以通过设置环境变量的方式，为`cloud-cli`工具指定链的`RPC`端口：

```
$ export CITA_CLOUD_RPC_ADDR=`minikube ip`:30004 CITA_CLOUD_EXECUTOR_ADDR=`minikube ip`:30005
```

注意：这里minikube可能出现svc端口映射问题 使用以下命令解决

```
$ kubectl port-forward pod/test-chain-0 50002:50002 50004:50004
$ export CITA_CLOUD_RPC_ADDR=localhost:30004 CITA_CLOUD_EXECUTOR_ADDR=localhost:30005
```

## 查看块高

```
$ cldi block-number
block_number: 74
```

## 查看系统配置

```
$ cldi system-config
{
  "admin": "0xae069e1925a1dad2a1f4c7034d87258dfd9b6532",
  "block_interval": 3,
  "chain_id": "0x26b0b83e7281be3b117658b6f2636d0368cad3d74f22243428f5401a4b70897e",
  "validators": [
    "0x67611c4afee6a50c56d3a81c733260c2e1ca35ab",
    "0x97e05af22f5870c67b7f98bc6c7ebbba0273376b",
    "0x3275a8e90a92a29496edd9a7a5853a3fd3d51451",
    "0x148d37bd89ba2a8c7b5e4784df51a355439166b9"
  ],
  "version": 0
}
```

## 停止链

```
$ helm uninstall test-chain
release "test-chain" uninstalled
```

## 删除链

```
$ helm install clean cita-cloud/cita-cloud-config --set config.action.type=clean
NAME: clean
LAST DEPLOYED: Wed Jul 14 20:20:37 2021
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None
```

注意：该命令将永久性的删除链的所有数据，请谨慎操作。
