---
id: introduction
title: 关于 CITA2.0
---

## 产品定位
参见[产品定位白皮书](https://talk.citahub.com/t/topic/1662)。

## 运行环境
`CITA2.0`默认运行在[k8s](https://kubernetes.io/docs/tutorials/kubernetes-basics/)环境中，原因有：

- 方便支持各种基础设施，尤其是各种云计算设施。
- 方便实施自动化运维。
- 方便复用云原生社区已有的技术。

## 工程仓库

`CITA2.0`的代码仓库都在`github`上[CITA2.0组织](https://github.com/cita-cloud)下。主要代码仓库有：

- [rfcs](https://github.com/CITA2.0/rfcs) 存放白皮书以及后续的改进建议。
- [cita_cloud_proto](https://github.com/CITA2.0/cita_cloud_proto) 存放`CITA2.0`微服务间`gRPC`接口定义文件。
- [cita_cloud_config](https://github.com/CITA2.0/cita_cloud_config) 用于生成链的配置文件的工具。
- [charts](https://github.com/CITA2.0/charts) 用于在`k8s`环境部署链的工程。
- [docs](https://github.com/CITA2.0/docs) 存放文档。

其余仓库主要是各个微服务实现。仓库名称以`cita_cloud_proto`中定义的微服务名称开头，下划线后接用于标识不同实现的名称。比如`storage_sqlite`，是基于`sqlite`实现的`storage`微服务。发布件以`Docker`镜像的方式发布在`DockerHub`上，参见[链接](https://hub.docker.com/u/citacloud)。
