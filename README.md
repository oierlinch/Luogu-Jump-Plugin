## 简介
### 插件说明
本插件支持以下功能：
- 跳转至不可见帖子（包括已删除帖子、不被信任用户未提交题目相关的帖子，**不包括不合法的 Discuss ID**）。
- 跳转至他人的云剪切板和专栏文章。

**请将下方代码复制进油猴中使用。**

由于部分专栏、剪切板内容及洛谷讨论区的帖子被屏蔽，导致无法直接查看。本脚本可智能跳转至对应的保存站点，同时对可见内容（如可见帖子、自己的文章、剪切板等）不会触发跳转。

如发现 Bug 或有解决方案，欢迎通过洛谷私信反馈给 @[linch](https://www.luogu.com.cn/user/737242)，我们将及时处理！

**制作者**：@[linch](https://www.luogu.com.cn/user/737242)。
**贡献者**：@[Vitamin_B](https://www.luogu.com.cn/user/743373) 提供部分代码。
**开源协议**：GPL-3.0。
**Github 仓库**：[Luogu-Jump-Plugin](https://github.com/oierlinch/Luogu-Jump-Plugin)。

欢迎提交建议，帮助改进插件！

### 功能亮点

- 自动跳转至保存站，支持多次跳转（如从国际站跳转至中国站，再跳转至保存站）。
- 智能识别可见内容，避免不必要的跳转。
- 支持调试：跳转时在控制台输出信息，方便定位问题。

### 代码
```javascript
// ==UserScript==
// @name         洛谷保存站自动跳转
// @namespace    https://www.tampermonkey.net/
// @version      1.4
// @description  luogu.com 和洛谷讨论区部分帖子被封印了，此脚本可自动跳转至相应保存站，产品链接 https://www.luogu.com.cn/article/h1qvkk68。由于洛谷专栏公开可见需要审核，无法访问时请使用备用链接 https://www.cnblogs.com/oierlinch/p/18717023/luogu-jump-plugin 或 https://www.luogu.me/article/h1qvkk68。
// @author       linch & Vitamin_B
// @match        *://*.luogu.com/*
// @match        *://*.luogu.com.cn/*
// @icon         https://cdn.luogu.com.cn/upload/image_hosting/u8fj7st9.png
// ==/UserScript==

// Copyright (c) 2025 linch Vitamin_B

(function() {
    'use strict';
    function work(){
        let a = document.URL;
        let t = document.documentElement.outerHTML;
        let b = "https://lglg.top/";
        let c=-1;
        //帖子跳转 by linch
        for (let i = 0; i < a.length; i++) {
            if (i < a.length - 8 && a[i] == 'd' && a[i + 1] == 'i' && a[i + 2] == 's' && a[i + 3] == 'c' && a[i + 4] == 'u' && a[i + 5] == 's' && a[i + 6] == 's' && a[i+7]!='?') {
                c=i+8;
                break;
            }
        }
        if(c!=-1){
            if(t.indexOf("You are unable to access</span> luogu.com</h2>")>=0){
                b = "https://www.luogu.com.cn/discuss/";
                for(let i=c;i<a.length;i++){
                    b+=a[i];
                }
                console.log("即将跳转至洛谷中国站");
                window.location.replace(b);
            }
            if(t.indexOf("该内容已删除")>=0 || t.indexOf("题目讨论版需要有提交才能查看")>=0){
                for(let i=c;i<a.length;i++){
                    b+=a[i];
                }
                console.log("即将跳转至帖子保存站");
                window.location.replace(b);
            }
        }
        else{
            //云剪切板/专栏跳转 其中部分代码 by Vitamin_B
            b = "";
            for (let i = 0; i < a.length; i++) {
                if (i < a.length - 4 && a[i] == '.' && a[i + 1] == 'c' && a[i + 2] == 'o' && a[i + 3] == 'm') {
                    b += ".me";
                    i += 3;
                }
                else b+=a[i];
            }
            if(t.indexOf("You are unable to access</span> luogu.com</h2>")>=0 && (a.indexOf("article")>=0 || a.indexOf("paste")>=0)){
                console.log("即将跳转至云剪切板和专栏保存站");
                window.location.replace(b);
            }
        }
    }
    window.addEventListener('load', function() {
        work();
        setInterval(work,2000);
    }, false);
})();
```

### 项目应用

该插件已集成至 [Expanded Extend Luogu](https://github.com/Chingxu-Ying/Expanded-Extend-Luogu)，欢迎使用该插件获取更多功能！

## 更新日志

### V1.0 - 2025/2/15
- 初步完成代码编写。

### V1.1 - 2025/2/15
- 特判置顶帖不跳转。

### V1.2 - 2025/3/23
- 增加对可见内容的识别，未被墙内容不跳转。
- 新增国际站帖子被墙后跳转至中国站。

### V1.3 - 2025/4/6
讨论区恢复，进行大幅更新：
- 支持识别已删除或不被信任用户未提交题目相关的帖子并跳转。
- 增加国际站跳转逻辑，支持加载完毕后多次跳转。
- 控制台新增跳转提示，便于调试。

### V1.4 - 2025/4/12
- 修复新前端导致的跳转 Bug，详情见 [Issue #1](https://github.com/oierlinch/Luogu-Jump-Plugin/issues/1)。

### V1.5 - XXXX/X/XX
- 制作中
- 优化项目介绍，部分内容由 AI 生成。
