---
id: version-21.12.0-multi-cluster
title: 多集群
original_id: multi-cluster
---

链的节点分布在多个`k8s`集群中。

步骤如下：
1. 规划节点所属的`k8s`集群。
2. 提前设置好节点网络端口对外的`ip`和端口。
3. 提前设置好各`k8s`集群节点的pvc。
4. 集中生成配置。
5. 将生成好的节点文件夹，分别下发到所属的`k8s`集群。
6. 在各个`k8s`集群中分别运行节点。

第2步对外暴露节点网络端口。

如果使用[porterLB](https://openelb.github.io/)，可以使用如下命令创建`eip`。
```
$ helm install cita-cloud-eip cita-cloud/cita-cloud-eip
```
* `cita-cloud-eip`为`eip`的名字。
* 更多参数参见[链接](https://github.com/cita-cloud/charts/tree/main/cita-cloud-eip)。

然后使用如下命令创建`SVC`。
```
$ helm install test-chain-0-lb cita-cloud/cita-cloud-porter-lb
```
* `test-chain-0-lb`为`SVC`的名字。
* 更多参数参见[链接](https://github.com/cita-cloud/charts/tree/main/cita-cloud-porter-lb)。

第4步生成配置。

可以使用`Chart`工程：
```
$ helm install init-multi cita-cloud/cita-cloud-config --set config.action.type=initMulti --set config.chainName=test-chain --set config.action.initMulti.superAdmin=8f81961f263f45f88230375623394c9301c033e7 --set config.action.initMulti.kmsPasswordList="123456\,123456\,123456" --set config.action.initMulti.nodeList="192.168.10.123:40000:node0\,192.168.10.134:40000:node1\,192.168.10.135:40000:node2" --set pvcName=local-pvc
```
更多参数参见[链接](https://github.com/cita-cloud/charts/tree/main/cita-cloud-config)。

也可以直接使用[cita-cloud-config](https://github.com/cita-cloud/cita_cloud_config)。

第6步在各个`k8s`运行节点。

可以使用`Chart`工程：
```
$ helm install test-chain-node0 cita-cloud/cita-cloud-multi-cluster-node --set config.chainName=test-chain --set config.domain=node0
```
* `chainName`要与第4步保持一致, `domain`必须是第4步中其中一个节点的domain。
* `CITA-Cloud`的各个微服务都有多种实现，用户可以通过`xxx.imageName`和`xxx.imageTag`参数来选择要使用的实现。
* 更多参数参见[链接](https://github.com/cita-cloud/charts/tree/main/cita-cloud-multi-cluster-node)。

针对阿里云场景，可以使用[cita_cloud_operator](https://github.com/cita-cloud/operator)。`CITA-Cloud`的各个微服务都有多种实现，用户可以通过`service-config.toml`配置文件来选择要使用的实现。
