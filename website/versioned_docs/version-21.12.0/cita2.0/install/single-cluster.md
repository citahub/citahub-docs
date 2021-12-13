---
id: version-21.12.0-single-cluster
title: 单集群
original_id: single-cluster
---

链的所有节点都在同一个`k8s`集群中。

我们提供了一个`Chart`工程来实现该部署模式。在此之前需先执行`快速入门`-`运行CITA2.0`中的`添加Charts仓库`和`创建PVC`。

```
$ helm install test-chain cita-cloud/cita-cloud-local-cluster --set config.superAdmin=0xae069e1925a1dad2a1f4c7034d87258dfd9b6532 --set pvcName=local-pvc
```

* `test-chain`为要创建的链的名字。
* `pvcName`参数指定了`PVC`的名字。
* `superAdmin`要修改为自己的管理员地址。
* `CITA2.0`的各个微服务都有多种实现，用户可以通过`xxx.imageName`和`xxx.imageTag`参数来选择要使用的实现。
* 更多参数参见[链接](https://github.com/cita-cloud/charts/tree/main/cita-cloud-local-cluster)。
* 部署上采用`statefulset`，链的每个节点对应一个`pod`。
* 网络使用了`headless service`，使得节点直接可以相互访问。
