---
id: version-0.25.0-setup
title: 环境准备
original_id: setup
---

## 适用操作系统声明

系统支持以及版本建议：Centos（7.2+）、Ubuntu（16.04、18.04）、Redhat (7.4)

## 硬件配置建议

配置取决于自身业务，请根据实际情况搭配，以下是建议最低配置：

体验配置：CPU：2核心、内存：4GB、硬盘：30G

生产配置：CPU：4核心、内存：8GB、硬盘：200G

## 软件依赖声明

* 依赖 Docker，安装 Docker 参见 [Docker 在线资料](https://yeasy.gitbooks.io/docker_practice/content/install)。
* CITA 的 Docker 镜像托管在 [DockerHub](https://hub.docker.com/r/cita/cita-build)。 因为 CITA 是基于 Ubuntu 18.04 稳定版开发的，因此该镜像中封装了 Ubuntu 18.04 还有其他一些 CITA 运行所需要的配置和文件。

## 安装 CITA 客户端工具

1. 创建目录

   ```shell
   $ mkdir -p /data/cita
   ```

2. 切换目录

   ```shell
   $ cd /data/cita/
   ```

3. 下载 CITA-CLI 安装包

   ```shell
   $ wget https://github.com/cryptape/cita-cli/releases/download/0.19.6/cita-cli-x86_64-musl-tls-0.19.6.tar.gz
   ```

> 注：这里所下载的是 CITA-CLI 是 Linux 系统下的二进制发布包，如果你使用 macOS，请按以下命令下载对应系统的 CITA-CLI：
> 
> ```shell
$ wget https://github.com/cryptape/cita-cli/releases/download/0.19.6/cita-cli-x86_64-mac-osx-tls-0.19.6.tar.gz
```

4. 解压程序

   ```shell
   $ tar zxvf cita-cli-x86_64-musl-tls-0.19.6.tar.gz
   ```

5. 复制 CITA-CLI 到 系统可执行文件目录下

   ```shell
   $ sudo cp -rp cita-cli /usr/local/bin/
   ```

## 下载 CITA

1. 切换目录

   ```shell
   $ cd /data/cita/
   ```

2. 下载 CITA 安装包

   ```shell
   $ wget https://github.com/cryptape/cita/releases/download/v0.25.0/cita_secp256k1_sha3.tar.gz
   ```

3. 解压 CITA 程序

   ```shell
   $ tar zxvf cita_secp256k1_sha3.tar.gz
   ```