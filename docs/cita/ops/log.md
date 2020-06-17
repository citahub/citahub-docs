---
id: log
title: 日志管理
---

日志在系统调试，问题定位，甚至业务运维方面有着重要的作用。
CITA 每个微服务的日志信息都会被记录到一个单独的日志文件。

## 日志位置

CITA 日志文件位于各节点文件夹下 `logs` 目录中，每个微服务单独一个日志文件。

```shell
ls test-chain/0/logs
```

如下：

```
cita-auth.log  cita-bft.log  cita-chain.log  cita-executor.log  cita-forever.log  cita-jsonrpc.log  cita-network.log
```

## 日志优先级

日志优先级定义如下：

* Error：错误信息，是日志分级的最高等级
* Warn：警告信息
* Info：默认信息等级
* Debug：调试信息
* Trace：最低等级

CITA 会打印所设置等级及以上的日志。

CITA 默认日志等级为 `Info`。示例如下：

```
2019-05-21 - 14:12:21 | cita_executor        - 172   | INFO  - CITA:executor
2019-05-21 - 14:12:21 | cita_executor        - 176   | INFO  - Version: v0.23.1-112-gc57f107
```

`Info` 级别以上的日志：

```
2019-05-21 - 17:03:12 | cita_bft::core::cita - 1074  | WARN  - verify_version Bft { h: 755, r: 0, s: 0 } self.version is none
```

日志优先级可以在启动 CITA 的时候通过参数修改：

```
bin/cita start test-chain/0 trace
```

这时 `Trace` 级别的日志也可以打印出来了：

```
2019-05-22 - 10:44:47 | core_executor::state - 443   | TRACE - Account::cache_given_code: ic=false; self.code_hash=0x25cd5cc7338b2d3e0cef19d160b1de56dfb09ee94ac7fdf5651aab5496afa26d, self.code_cache=
```

CITA 支持为不同模块设置不同的优先级，这个在系统调试的时候非常有帮助。

为了简化使用，通过 `./bin/cita` 设置的时候是所有模块用统一的日志等级。
如果有系统调试的需要，用户可以临时修改 `./bin/cita` 中 `start` 函数。

## 日志分割

CITA 节点需要长时间持续运行，因此日志文件会越来越大，需要定期清理。
或者需要将某一段比较重要的日志单独备份。这都会涉及到日志分割的功能。
为了适应不同场景的需要，CITA 的日志分割功能采用比较灵活的方式。

通过向进程发信号，触发日志分割和日志文件的转储，保证切换期间没有日志丢失。
### 方法一
对于一个节点内的多个微服务的日志进行分割。

```
bin/cita logrotate test-chain/0
```

返回结果如下：

```
./test-chain/0/logs/cita-auth.log
./test-chain/0/logs/cita-auth_2018-04-02_11-34-51.log
./test-chain/0/logs/cita-chain.log
./test-chain/0/logs/cita-chain_2018-04-02_11-34-51.log
./test-chain/0/logs/cita-jsonrpc.log
./test-chain/0/logs/cita-jsonrpc_2018-04-02_11-34-51.log
./test-chain/0/logs/cita-executor.log
./test-chain/0/logs/cita-executor_2018-04-02_11-34-51.log
./test-chain/0/logs/cita-bft.log
./test-chain/0/logs/cita-bft_2018-04-02_11-34-51.log
./test-chain/0/logs/cita-network.log
./test-chain/0/logs/cita-network_2018-04-02_11-34-51.log
```

原有日志内容转移到带有当前日期的备份日志文件中，原有日志文件清空，进程继续往原有的日志文件里面写入。
可通过如下命令将备份的日志文件筛选出来：

```
find ./test-chain/*/logs | grep `date "+%Y-%m-%d"`
```

然后可以根据用户的需要，移动到专门的备份的地方，压缩保存，甚至直接删除。
如果用户想要定时备份/清理日志，可以将上述命令设置为系统的周期任务。
更多详细的用法请参见 cron 或者 logrotate 工具的文档。
### 方法二
对某一微服务的日志进行分割。
```
./bin/cita top test-chain/0
```
返回结果如：
```
user        2475       1  0 18:33 ?        00:00:00 cita-forever
user        2486    2475 11 18:33 ?        00:00:00 cita-auth -c auth.toml
user        2487    2475  7 18:33 ?        00:00:00 cita-bft -c consensus.toml -p privkey
user        2490    2475 10 18:33 ?        00:00:00 cita-chain -c chain.toml
user        2483    2475 27 18:33 ?        00:00:01 cita-executor -c executor.toml
user        2489    2475  1 18:33 ?        00:00:00 cita-jsonrpc -c jsonrpc.toml
user        2488    2475 10 18:33 ?        00:00:00 cita-network -c network.toml
```
将其中一个节点的 executor.log 进行切割
```
kill -10 2483

```
返回结果如下：
```
cita-auth.log  cita-chain.log     cita-executor_2020-06-09_09-36-10.log  cita-jsonrpc.log
cita-bft.log   cita-executor.log  cita-forever.log                       cita-network.log
```

