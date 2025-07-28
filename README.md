> [!tip]
> **Github 仓库不一定及时更新，建议前往 <https://www.luogu.com.cn/article/h1qvkk68> 查看。**

## 简介
### 插件说明
本插件支持以下功能：
- 跳转不可见帖子（包括已删除帖子、不被信任用户未提交题目相关的帖子，不包括不合法的 Discuss ID，此时跳转没有作用）至保存站。
- 跳转他人的云剪切板和未推荐专栏文章至保存站。

由于部分专栏、剪切板内容被屏蔽，导致无法直接查看。本脚本可智能跳转至对应的保存站点，同时对可见内容（如可见帖子、自己的文章、剪切板等）不会触发跳转。

### 新版本功能亮点
- 自动跳转至保存站，支持多次跳转（如从国际站跳转至中国站，再跳转至保存站）。
- 智能识别可见内容，避免不必要的跳转。
- 跳转时在控制台输出信息，方便联系我们定位问题。
- 在洛谷跳转安全界面自动转至国际站，减少不必要操作。
- 支持新版本更新提醒。
> [!warning]
> 当更新提醒无法跳转时，请检查该站点的浏览器【重定向】权限或直接访问本专栏文章。

### 贡献情况
目前大部分代码均由 @[linch](https://www.luogu.com.cn/user/737242) 完成，并对所有代码进行优化更新。也感谢 @[Vitamin_B](https://www.luogu.com.cn/user/743373) 提供部分代码。

如发现 Bug 或有解决方案，欢迎通过洛谷私信反馈给 @[linch](https://www.luogu.com.cn/user/737242)，我们将及时处理！

欢迎提交建议，帮助改进插件！

### 代码


**请直接将下方代码复制进 Tampermonkey 中使用。**
```javascript lines=25-25
// ==UserScript==
// @name         洛谷保存站自动跳转
// @namespace    https://www.tampermonkey.net/
// @version      2.5.1
// @description  luogu.com 和洛谷讨论区部分帖子被封印了，此脚本可自动跳转至相应保存站，产品链接 https://www.luogu.com.cn/article/h1qvkk68。由于洛谷专栏公开可见需要审核，无法访问时请使用备用链接 https://www.luogu.me/article/h1qvkk68。
// @author       linch & Vitamin_B
// @homepage     https://www.luogu.com.cn/user/737242
// @match        *://*.luogu.com/*
// @match        *://*.luogu.com.cn/*
// @run-at       document-end
// @license      GNU GPL-3.0
// @icon         https://cdn.luogu.com.cn/upload/image_hosting/u8fj7st9.png
// @grant        GM_xmlhttpRequest
// @grant        GM_notification
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

// Copyright (c) 2025 linch Vitamin_B

(function() {
    'use strict';

    // 自动更新相关配置
    const UPDATE_CHECK_INTERVAL = 7*24*60*60; // 忽略后7*24小时检查一次更新
    const VERSION_URL = "https://www.luogu.com.cn/article/h1qvkk68";
    const CURRENT_VERSION = "2.5.1";
    const now = Date.now();

    // 检查更新
    function checkUpdate() {
        const lastCheck = GM_getValue("lastUpdateCheck", 0);
        if (now - lastCheck < UPDATE_CHECK_INTERVAL) return;
        GM_xmlhttpRequest({
            method: "GET",
            url: VERSION_URL,
            onload: function(response) {

                // 简单解析页面获取最新版本号
                const latestVersion = parseVersion(response.responseText);
                if (latestVersion && compareVersions(latestVersion, CURRENT_VERSION) > 0) {
                    notifyUpdate(latestVersion);
                }
            },
            onerror: function() {
                console.log("更新检查失败");
            }
        });
    }

    // 解析版本号
    function parseVersion(text) {
        const versionMatch = text.match(/@version\s+([\d.]+)/);
        return versionMatch ? versionMatch[1] : null;
    }

    // 比较版本号
    function compareVersions(a, b) {
        const partsA = a.split('.').map(Number);
        const partsB = b.split('.').map(Number);
        for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
            const partA = partsA[i] || 0;
            const partB = partsB[i] || 0;
            if (partA > partB) return 1;
            if (partA < partB) return -1;
        }
        return 0;
    }

    // 通知更新
    function notifyUpdate(latestVersion) {
        var result = confirm("脚本【洛谷保存站自动跳转】有新版本可用\n当前版本:"+CURRENT_VERSION+"，最新版本: "+latestVersion+"\n点击确定前往更新。忽略后 7 天内将不再提醒（若点击后无法正常跳转，请直接访问 https://www.luogu.com.cn/article/h1qvkk68）");
        GM_setValue("lastUpdateCheck", now);
        if(result) window.location.replace(VERSION_URL);
    }

    function work(){
        let a = document.URL;
        let t = document.documentElement.outerHTML;
        let b = "https://lglg.top/";
        let c=-1;
        let f = document.title;

        //帖子跳转 by linch
        for (let i = 0; i < a.length; i++) {
            if (i < a.length - 8 && a[i] == 'd' && a[i + 1] == 'i' && a[i + 2] == 's' && a[i + 3] == 'c' && a[i + 4] == 'u' && a[i + 5] == 's' && a[i + 6] == 's' && a[i+7]!='?') {
                c=i+8;
                break;
            }
        }

        if(c!=-1){
            if(f.indexOf("cannot serve content")>=0){
                b = "https://www.luogu.com.cn/discuss/";
                for(let i=c;i<a.length;i++){
                    b+=a[i];
                }
                console.log("即将跳转至洛谷中国站");
                window.location.replace(b);
            }
            if(t.indexOf("该内容已删除")>=0 || t.indexOf("题目讨论版需要有提交才能查看")>=0 || t.indexOf("请先登录")>=0 || t.indexOf("完成实名验证才能查看")>=0){
                if(f.indexOf("Error")<0) return;
                for(let i=c;i<a.length;i++){
                    b+=a[i];
                }
                console.log("即将跳转至帖子保存站");
                window.location.replace(b);
            }
        }
        else{
            //云剪切板/专栏跳转 其中部分代码 by Vitamin_B, linch 进行优化升级。
            b = "";
            for (let i = 0; i < a.length; i++) {
                if (i < a.length - 4 && a[i] == '.' && a[i + 1] == 'c' && a[i + 2] == 'o' && a[i + 3] == 'm') {
                    b += ".me";
                    i += 3;
                }
                else b+=a[i];
            }
            if(f.indexOf("cannot serve content")>=0 && (a.indexOf("article")>=0 || a.indexOf("paste")>=0)){
                console.log("即将跳转至云剪切板和专栏保存站");
                window.location.replace(b);
            }
            else if(f.indexOf("安全访问中心 - 洛谷")>=0){
                b="";
                console.log("即将跳转至洛谷国际站以跳转至云剪切板和专栏保存站");
                for (let i = 0; i < a.length; i++) {
                    if(i < a.length - 3 && a[i] == '.' && a[i + 1] == 'c' && a[i + 2] == 'n'){
                        i+=2;
                    }
                    else{
                        b+=a[i];
                    }
                }
                window.location.replace(b);
            }
        }
    }
    // 初始化
    checkUpdate();//不需要自动更新可注释。
    work();
    setInterval(work, 1000);//自行修改判断时长。
})();
```

### 个性化设置
1. 关闭自动更新：请注释掉第 140 行。
2. 修改判断间隔：请修改第 142 行的数字，单位 ms。
   > [!warning]
   > 注意判断时间不宜过短，容易发生卡顿。由于洛谷部分页面具有错误 3s 后返回上一页的特性，为防止影响使用效果，不宜超过 3000ms。
3. 忽略更新提醒后不检查时长。默认为 7 天，可在代码 25 行更改。

### 项目应用

该插件已集成至 [Expanded Extend Luogu](https://github.com/Chingxu-Ying/Expanded-Extend-Luogu)，欢迎使用该插件获取更多功能！

### 更新日志

#### V1.0 - 2025/2/15
- 初步完成代码编写。

#### V1.1 - 2025/2/15
- 特判置顶帖不跳转。

#### V1.2 - 2025/3/23
- 增加对可见内容的识别，未被墙内容不跳转。
- 新增国际站帖子被墙后跳转至中国站。

#### V2.0 - 2025/4/6
讨论区恢复，进行大幅更新：
- 支持识别已删除或不被信任用户未提交题目相关的帖子并跳转。
- 增加国际站跳转逻辑，支持加载完毕后多次跳转。
- 控制台新增跳转提示，便于调试。

#### V2.1 - 2025/4/12
- 修复新前端导致的跳转 Bug，详情见 [Issue #1](https://github.com/oierlinch/Luogu-Jump-Plugin/issues/1)。

#### V2.2 - 2025/5/3
- 在洛谷跳转安全界面自动转至国际站，减少不必要操作。
- 新增未登录跳转。
- 优化项目介绍，部分内容由 AI 生成。

#### V2.3 - 2025/5/18
- 洛谷国际站无法访问页面更改，原判断规则失效，进行更新修复。

#### V2.4 - 2025/7/8
- 修复部分连锁跳转 bug。
- 增加自动更新功能（部分代码结合 AI 完成）。
- 修改本文中大幅更新的版本号。

#### V2.5 - 2025/7/9
- 修复自动更新的 bug。

#### V2.5.1 - 2025/7/26
- 更新提醒中添加无法跳转的提示。
- 文章增加个性化设置提示。

## 联系我们

- **洛谷私信**：[给 linch 发送私信](https://www.luogu.com.cn/chat?uid=737242)。
- **Github 仓库**：[Luogu Jump Plugin](https://github.com/oierlinch/Luogu-Jump-Plugin)。
- **GreasyFork**：[洛谷保存站自动跳转](https://greasyfork.org/zh-CN/scripts/541091-%E6%B4%9B%E8%B0%B7%E4%BF%9D%E5%AD%98%E7%AB%99%E8%87%AA%E5%8A%A8%E8%B7%B3%E8%BD%AC)。
- **博客园**：[洛谷保存站自动跳转](https://www.cnblogs.com/oierlinch/p/18717023/luogu-jump-plugin)。
