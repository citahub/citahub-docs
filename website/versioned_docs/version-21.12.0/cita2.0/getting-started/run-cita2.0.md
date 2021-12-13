---
id: version-21.12.0-run-cita2.0
title: 运行CITA2.0
original_id: run-cita2.0
---

## 添加Charts仓库

```
$ helm repo add cita-cloud https://registry.devops.rivtower.com/chartrepo/cita-cloud
$ helm repo update
$ helm search repo cita-cloud
NAME                                            CHART VERSION   APP VERSION     DESCRIPTION
cita-cloud/cita-cloud-config                    6.3.0           6.3.0           Create a job to change config of CITA-Cloud blo...
cita-cloud/cita-cloud-eip                       6.3.0           6.3.0           Create EIP for CITA-Cloud
cita-cloud/cita-cloud-local-cluster             6.3.0           6.3.0           Setup CITA-Cloud blockchain in one k8s cluster
cita-cloud/cita-cloud-multi-cluster-node        6.3.0           6.3.0           Setup CITA-Cloud node in multi k8s cluster
cita-cloud/cita-cloud-porter-lb                 6.3.0           6.3.0           Setup porter Loadbalancer for CITA-Cloud node
cita-cloud/cita-cloud-pvc                       6.0.0           6.0.0           Create PVC for CITA-Cloud
```

## 创建PVC
PersistentVolumeClaim (PVC)是对PV的申请(Claim)。PVC通常由普通用户创建 和维护。需要为Pod分配存储资源时，用户可以创建一个PVC,指明存储资源的容量大小 和访问模式(比如只读)等信息，Kubemetes会查找并提供满足条件的PV。

```
$ helm install local-pvc cita-cloud/cita-cloud-pvc --set scName=standard
$ kubectl get pvc
NAME        STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS    AGE
local-pvc   Bound    pvc-fd3eaebd-3413-4205-b88a-dbc6cee9a057   10Gi       RWO            standard        18m
```

对应的路径在`minikube`虚拟机内的 `/tmp/hostpath-provisioner/default/local-pvc`。

注意：如果`minikube`版本为 `v1.20.0`，这里会有一个bug。详细情况和解决方法参见[链接](https://tonybai.com/2021/05/14/a-bug-of-minikube-1-20/)。

## 生成超级管理员账户

```
$ cldi account create admin
user: `admin`
account_addr: 0xae069e1925a1dad2a1f4c7034d87258dfd9b6532
```


## 运行CITA2.0

```
$ helm install test-chain cita-cloud/cita-cloud-local-cluster --set config.superAdmin=0xae069e1925a1dad2a1f4c7034d87258dfd9b6532
NAME: test-chain
LAST DEPLOYED: Wed Jul 14 23:09:37 2021
NAMESPACE: default
STATUS: deployed
REVISION: 1
```

该命令会创建一条有3个节点，链名为`test-chain`的链。

注意：`superAdmin`参数必须设置为自己生成的账户地址，切勿使用默认值。

## 查看运行情况

```
$ kubectl get pod
NAME                      READY      STATUS       RESTARTS     AGE
test-chain-0              7/7        Running      1            3m24s
test-chain-1              7/7        Running      1            3m24s
test-chain-2              7/7        Running      1            3m24s
```

查看日志：

```
$ minikube ssh
docker@minikube:~$ tail -10f /tmp/hostpath-provisioner/default/local-pvc/test-chain-0/logs/controller-service.log
2021-07-21T08:12:07.242086786+00:00 INFO controller::node_manager - update node: 0xc3469...ebaeb
2021-07-21T08:12:07.242251607+00:00 INFO controller::node_manager - update node: 0xa6a1...208f9
2021-07-21T08:12:07.284207745+00:00 INFO controller::controller - add remote proposal(0x7b28...5cc64) through check_proposal
2021-07-21T08:12:10.228046821+00:00 INFO controller::controller - add remote proposal(0x26e7...fcf91) through check_proposal
2021-07-21T08:12:10.251289942+00:00 INFO controller::util - height: 126 hash 0x26e7...fcf91
2021-07-21T08:12:10.253093372+00:00 INFO controller::chain - finalize_block: 126, block_hash: 0x26e7...fcf91
2021-07-21T08:12:10.254012416+00:00 INFO controller::node_manager - update node: 0xc346...ebaeb
2021-07-21T08:12:10.254931221+00:00 INFO controller::node_manager - update node: 0x766a...7a954
2021-07-21T08:12:10.273834898+00:00 WARN controller - rpc: process_network_msg failed: Receive early status from same node
2021-07-21T08:12:10.296086993+00:00 INFO controller::controller - add remote proposal(0xe5f4...973cd) through check_proposal
2021-07-21T08:12:13.216728462+00:00 INFO controller::chain - main_chain_tx_hash len 0
2021-07-21T08:12:13.216755352+00:00 INFO controller::chain - tx poll len 0
2021-07-21T08:12:13.216766922+00:00 INFO controller::chain - proposal 127 prevhash 0x26e7...fcf91
2021-07-21T08:12:13.216778762+00:00 INFO controller::chain - proposal 127 block_hash 0x6a14...1e4e6
2021-07-21T08:12:13.256383088+00:00 INFO controller::util - height: 127 hash 0x6a14...1e4e6
```
