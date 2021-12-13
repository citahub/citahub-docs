---
id: version-21.12.0-persistent-storage
title: 持久化存储
original_id: persistent-storage
---

链的节点是有状态的服务，需要挂载持久化存储来保存数据。

为了方便对接不同的存储服务，我们使用了`k8s`的`PV/PVC`对存储进行了抽象。

建议由运维人员配置`StorageClass`，对`PV/PVC`进行动态绑定。

例如`快速入门`中就使用了`minikube`自带的名为`standard`的`StorageClass`。

```
$ helm install local-pvc cita-cloud/cita-cloud-pvc --set scName=standard
```

用户需要根据自己的环境以及所使用的存储服务来设置`scName`参数。

`local-pvc`为创建的`PVC`的名字，用户也可以随意设置。
