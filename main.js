// ==UserScript==
// @name         洛谷保存站自动跳转（轻量版）
// @namespace    https://www.tampermonkey.net/
// @version      26H1
// @description  luogu.com 和洛谷讨论区部分帖子被封印了，此脚本可自动跳转至相应保存站，产品链接 https://www.cnblogs.com/oierlinch/p/18717023/luogu-jump-plugin
// @author       linch & Vitamin_B
// @homepage     https://www.luogu.com.cn/user/737242
// @match        *://*.luogu.com/paste/*
// @match        *://*.luogu.com/article/*
// @match        *://*.luogu.com.cn/paste/*
// @match        *://*.luogu.com.cn/article/*
// @match        *://*.luogu.com/discuss/*

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
    let a = document.URL;
    let t = document.documentElement.outerHTML;
    let b = "https://lglg.top/";
    let c=-1;
    let f = document.title;
    function work(){
        for (let i = 0; i < a.length; i++) {
            if (i < a.length - 8 && a[i] == 'd' && a[i + 1] == 'i' && a[i + 2] == 's' && a[i + 3] == 'c' && a[i + 4] == 'u' && a[i + 5] == 's' && a[i + 6] == 's' && a[i+7]!='?') {
                c=i+8;
                break;
            }
        }
        if(a.indexOf("luogu.com/discuss")>=0){
            b = "https://www.luogu.com.cn/discuss/";
            for(let i=c;i<a.length;i++){
                b+=a[i];
            }
            console.log("即将跳转至洛谷中国站");
            window.location.replace(b);
        }
        // if(t.indexOf("该内容已删除")>=0 || t.indexOf("题目讨论版需要有提交才能查看")>=0 || t.indexOf("请先登录")>=0 || t.indexOf("完成实名验证才能查看")>=0){
        //     if(f.indexOf("Error")<0) return;
        //     for(let i=c;i<a.length;i++){
        //         b+=a[i];
        //     }
        //     console.log("即将跳转至帖子保存站");
        //     window.location.replace(b);
        // }
        //云剪切板/专栏跳转 其中部分代码 by Vitamin_B, linch 进行优化升级。
        b = "";
        for (let i = 0; i < a.length; i++) {
            if (i < a.length - 4 && a[i] == '.' && a[i + 1] == 'c' && a[i + 2] == 'o' && a[i + 3] == 'm') {
                b += ".me";
                i += 3;
            }
            else b+=a[i];
        }
        if(f.indexOf("安全访问中心")>=0){
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
        if(f.indexOf("cannot serve content")>=0 && (a.indexOf("article")>=0 || a.indexOf("paste")>=0)){
            console.log("即将跳转至云剪切板和专栏保存站");
            window.location.replace(b);
        }
    }
    work();
})();
