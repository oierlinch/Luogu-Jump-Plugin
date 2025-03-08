// ==UserScript==
// @name         洛谷保存站自动跳转
// @namespace    https://www.tampermonkey.net/
// @version      1.1
// @description  luogu.com 和洛谷讨论区被封印了，此脚本可自动跳转至相应保存站，建议与 https://www.luogu.me/paste/dcwt2uo1 搭配使用。产品链接 https://www.cnblogs.com/linch737242/p/18717023/luogutzcj。
// @author       linch & sz_jinzikai
// @match        *://*.luogu.com/article/*
// @match        *://*.luogu.com/paste/*
// @match        *://*.luogu.com.cn/discuss/*
// @icon         https://cdn.luogu.com.cn/upload/image_hosting/u8fj7st9.png
// ==/UserScript==

// Copyright (c) 2025 linch sz_jinzikai

(function() {
    'use strict';
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
        if(t.indexOf("1058316")>=0 && a.indexOf("1058316")==-1){
            for(let i=c;i<a.length;i++){
                b+=a[i];
            }
            window.location.replace(b);
        }
    }
    else{
        //云剪切板/专栏跳转 by sz_jinzikai
        b = "";
        for (let i = 0; i < a.length; i++) {
            if (i < a.length - 4 && a[i] == '.' && a[i + 1] == 'c' && a[i + 2] == 'o' && a[i + 3] == 'm') {
                b += ".me";
                i += 3;
            }
            else b+=a[i];
        }
        window.location.replace(b);
    }
    /*
   已知 Bug1：由于洛谷前端和技术原因，在从新前端跳转至帖子时可能无法直接正常跳转。

   此时有两种简单便捷的方案：

   - 打开时在新标签页中打开（快捷键 Ctrl+点击链接）。（应该很多人都有这个习惯）
   - 也可以在加载完成后手动点击刷新或按 F5 刷新页面。
   */
})();
