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
