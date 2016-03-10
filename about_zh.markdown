---
layout: page
title: 关于 Reeonce
permalink: /about/zh/
css: "/css/about.css"
js: ["/js/vendors/d3.v3.min.js", "/js/vendors/modernizr.min.js", "/js/others/about_zh.js"]
---

<div id="lang-selector">
  <a href="/about/">English</a>
</div>

### 简单介绍

我的名字叫*曾斌*，一名软件工程师，现主要集中精力于 *iOS 开发*。今年 {{ 'now' | date: '%Y' | minus: 1991 }} 岁啦，居广东省深圳市。

毕业于[北京航空航天大学](http://www.buaa.edu.cn/)。

### 我的程序员之路

<div id="timeline" class="">
  <div id="career-timelime" class="">
    <svg>
    </svg>
  </div>
  <div id="career-buaa" class="">
    <div class="back-icon"><a href=""></a></div>
    <div class="content">
      <h3>@北京航空航天大学 (2009 ~ 2013)</h3>
      <ul>
        <li>2013年6月，我获取到了北京航空航天大学软件工程专业的学士学位。</li>
        <li>2012年5月至10月，在微软（亚洲）互联网工程院五个月的实习。</li>
        <li>2012年4月，我们团队获得了第二十二届冯如杯科技竞赛的二等奖。</li>
        <li>2011年4月到10月，经过学校ACM俱乐部的培训，拿了几个水奖吧。</li>
      </ul>
    </div>
  </div>
  <div id="career-yahoo" class="">
    <div class="back-icon"><a href=""></a></div>
    <div class="content">
      <h3>@雅虎 (2013 ~ 2014)</h3>
      <p>在如此多的大牛面前，我一个新人似乎想创下壮举是比较艰难的。还好雅虎有着非常深厚的技术背景，不能一步登天，那就慢慢学呗。一年多的时间，熟悉 Scrum 团队开发，后端开发与CI、CD的搭建，处理前端的一些事务。
        完成 MYC 与 CKV 两个项目。
      </p>
    </div>
  </div>
  <div id="career-xjimi" class="">
    <div class="back-icon"><a href=""></a></div>
    <div class="content">
      <h3>@极觅数据 (2014 ~ 2015)</h3>
      <p>在极觅数据，大部分时间我还是开心地做着iOS 开发的工作，主要项目是 <em>伴旅</em> APP。</p>
      <p>当然，在初创公司还是得帮着做些其它的工作的，包括搭建官网，搭建微信服务号的网页等。</p>
      <p>虽然结果是不尽如人意的，但这绝对是宝贵的一番经历。</p>
    </div>
  </div>
  <div id="career-gtzn" class="">
    <div class="back-icon"><a href=""></a></div>
    <div class="content">
      <h3>广田智能 (2015 ~ 2016)</h3>
      <p>满怀激情地来到了智能家居领域，希望子能能够在这个领域留下自己的一点痕迹。</p>
      <p>角色依然时iOS 开发，不过也有做一些其他的。</p>
    </div>
  </div>
</div>

### 主要技能
#### 基础
从大学开始已经写了数万行代码了，现在的我对如何写出优质代码有了新的认识。现在比较青睐于Swift 所提倡的 [protocol-oriented programming](https://developer.apple.com/videos/wwdc/2015/?id=408). 自从使用了 [ReactiveCocoa](https://github.com/ReactiveCocoa/ReactiveCocoa)，[functional reactive programming](http://blog.maybeapps.com/post/42894317939/input-and-output) 对数据流的处理颇感震撼。

虽然很久没有刷OJ 了，但是实现基础的数据结构和算法问题应该不大。计算机网络和数据安全加密等相关知识也不敢轻忘。

对新技术我总是会充满好奇，业余时间忍不住总是要研究研究的。

#### iOS 开发
  喜爱Swift，坚信它能成为一门更加强大的语言，越来越反感写 Objective-C 代码了。熟悉Cocoa Touch 中的基本框架和使用CocoaPods 来管理组件。

  主要项目：

  *[图灵猫](https://itunes.apple.com/cn/app/tu-ling-mao-zhi-neng-jia-ju/id1019413695?l=zh&ls=1&mt=8)*。图灵猫智能家居平台的iOS 客户端（支持iPad 横屏和Apple Watch）。网络使用socket 与服务器进行通讯，Realm 存储数据以及复杂多样的界面。

  *[伴旅](https://itunes.apple.com/us/app/ban-lu-gei-ni-yi-ge-wen-nuan/id993592240?ls=1&mt=8)*。一款基于LBS 的景区服务应用。大部分的代码都是Swift 所写。应用使用了mapbox 来加载地图，cordova 和ionic 来加载游戏副本，sqlite 来管理景区数据资源，alamofire 来处理网络请求。在极觅的工作中，贡献了此工程大部分的代码。

  *[围住点点](https://itunes.apple.com/us/app/trap-the-dot-!/id922876408?ls=1&mt=8)*。一款使用 Objective-C 开发的 “围住神经猫” 的游戏。

#### 前端开发
  前端技术是发展非常迅速的，我所了解的npm, bower, grunt, bootstrap, foundation, jQuery, less, sass, angularJS, 并不足以让我称为一名*专业的前端工程师*。

  主要项目：

  *[reeonce.github.io](/)*。

  *[MYC](https://mobile.yahoo.com)*。一个基于Mojito(Node.js 的开源框架) + YUI3 的网站，全球化，https，整合其它部分强大服务也是这个网站开发过程的挑战。

  *[伴旅语音导游](http://www_wechat.reeonce.biz/page-test/voice_tour.htm)*。是极觅数据的一项在景区中提供语音导游的服务，服务设在了微信服务号上，使用了微信的一些JS 接口。

#### 后端开发
  熟悉Linux 环境，使用了一年多的Node.js, 也使用过PHP, bash, docker, python 进行工作。

  主要项目：

  *CKV*。一个基于express.js 实现 key-value 云存储的解决方案。作为主要的开发人员，与PM 商量需求，准备环境，开发，与用户的协调，集成CI、CD等等。

#### Kinect 开发
  熟悉Windows 开发环境。

  主要项目：

  *基于Kinect 的演示框架*，检测肢体动作来控制演示程序并且实现了在屏幕上书写的功能。

  *图灵猫Kinect 控制程序*，检测肢体动作对图灵猫家电进行控制。

### 其他兴趣爱好

好久没有上球场了，只因烹饪、阅读、学习和思考占用了太多时间呀。

<div id="contact-me">
  <h3>联系我</h3>
  <p>手机: 18503009823</p>
  <p>邮箱: reeonce@gmail.com</p>
  <p>博客: reeonce.github.io</p>
</div>

<div id="welcome-overlay">
  <a href="/"><h1>Reeonce</h1></a>
</div>
