---
id: version-21.12.0-network
title: 网络
original_id: network
---
网络方面，需要节点之间可以通过网络相互连接。

集群内部可以通过`k8s`的`SVC`来暴露节点的网络端口。

如果是跨集群的情况，则需要使用`LoaderBalancer`服务对外暴露节点的网络端口。

如使用公有云环境，请咨询当前使用的云服务商。
