## 介绍
建议前往 <https://www.luogu.com.cn/article/h1qvkk68>。

目前支持跳转不可见帖子（已删帖、不被信任用户未提交的题目相关帖子，不包括不合法的 Discuss ID），他人的云剪切板，他人的专栏文章。

专栏、剪切板和洛谷讨论区部分帖子被封印了，无法查看。此脚本可自动跳转至相应保存站。可自动识别可见帖子、自己的文章、剪切板等内容不跳转，没有被墙住（即内容可见）时不跳转，请复制下方该插件代码至油猴使用。最后更新于 2025-04-12。

如果脚本有其他 Bug 或您有已知 Bug 的解决方案，欢迎向 @[linch](https://www.luogu.com.cn/user/737242) 反馈，我们会及时处理！

制作者：@[linch](https://www.luogu.com.cn/user/737242)（部分代码由 @[Vitamin_B](https://www.luogu.com.cn/user/743373) 提供），采用 GPL-3.0 开源协议。

[Github 仓库](https://github.com/oierlinch/Luogu-Jump-Plugin)，欢迎提交建议。

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
已搭载于 <https://github.com/Chingxu-Ying/Expanded-Extend-Luogu>，欢迎使用该插件获得更多功能。

## 更新日志

### V1.0 2025/2/15
完成代码编写。

### V1.1 2025/2/15
特判置顶帖不跳转。

### V1.2 2025/3/23
特判没有被墙住（即内容可见）时不跳转，新增国际站帖子被墙后跳转。

### V1.3 2025/4/6
讨论区恢复，进行大更新：
- 更改为识别到已删帖、不被信任用户未提交的题目相关帖子跳转。
- 增加国际站帖子跳转至中国站。
- 在页面加载完毕后跳转，支持多次跳转（如国际站到中国站，但帖子不可见，再次跳转至保存站）。
- 跳转时在控制台发送信息，便于调试。
- 修复已知问题。

### V1.4 2025/4/12
修复了新前端无法跳转的重大 bug，详见 [此 Issue](https://github.com/oierlinch/Luogu-Jump-Plugin/issues/1)。
