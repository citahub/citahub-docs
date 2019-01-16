---
id: auto-exec
<<<<<<< HEAD:docs/cita/system-contract-interface/auto-exec.md
title: Auto-exec Contract
sidebar_label: Auto-exec
---
=======
title: 自动执行合约接口
sidebar_label: 自动执行合约接口
---

# 自动执行合约接口
>>>>>>> master:docs/cita/system-contract-interface/auto-exec.md

<h2 class="hover-list">Auto Exec</h2>

* [register](#register)
* [autoExec](#autoExec)
* [contAddr](#contAddr)

### register

注册自动执行合约，只能管理员调用，新注册的地址会覆盖旧地址。

* Parameters

    `address` - The address to be setted

* Returns

    None

### autoExec

仅供底层调用的接口，不对用户开放。

* Parameters

    None

* Returns

    None

### contAddr

* Parameters

    None

* Returns

    `address` - The address of the registerd contract
