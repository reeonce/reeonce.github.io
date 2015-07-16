---
layout: page
title: 关于 Reeonce
permalink: /about/zh/
css: "/css/about.css"
---

<div id="lang-selector">
  <a href="/about/">English</a>
</div>

### 简单介绍

我的名字叫**曾斌**，一名全栈工程师。今年 {{ 'now' | date: '%Y' | minus: 1991 }} 岁啦，现居广东省深圳市。

毕业于北京航空航天大学，现在集中精力于 **iOS 开发**。

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
      <p>在极觅数据，开心地做着iOS 开发的工作，主要项目是 <em>伴旅</em> APP。</p>
      <p>当然，在初创公司还是得帮着做些其它的工作的，包括搭建官网，搭建微信服务号的网页等。</p>
    </div>
  </div>
  <div id="career-you" class="">
    <div class="back-icon"><a href=""></a></div>
    <div class="content">
      <h3>@？ (2015 ~ 未知)</h3>
      <p>非常希望能够到一个充满激情且专业的团队，大家能够一起讨论技术，偶尔hack 一些有趣的东西。</p>
    </div>
  </div>
</div>

### 主要技能
#### IOS 开发

  熟悉swift，对 Objective-C 和 swift 有一定理解，熟悉 iOS 的基本框架。熟悉面向对象设计的基本原则，熟悉常用的设计模式及算法。

  主要项目：

  **Passwords Safes**。一款使用 swift 开发的管理密码的应用。特点是将网站密码存入 Keychain 中，所有信息都使用 AES256 进行加密，数据使用 CoreData 来管理，Auto Layout 是开发应用所必须使用的方式了。

  **Trap The Dot !**。一款使用 Objective-C 开发的基于 SpriteKit 框架的“围住神经猫”的游戏。该应用本地化了9个语言，可以将游戏截图分享到 Facebook 上，并且集成友盟数据统计和 iAd 服务。当然，这可不是一只笨猫，一不留神就可能会逃走喔。

  **伴旅**。一款基于LBS 的景区服务应用。应用使用了mapbox 来加载地图，cordova 和ionic 来加载游戏副本，sqlite 来管理景区数据资源，alamofire 来处理网络请求。在极觅的工作中，贡献了此工程大部分的代码。

#### 前端开发
  前端技术是发展非常迅速的，我所了解的npm, bower, grunt, bootstrap, foundation, jQuery, less, sass, angularJS, 并不足以让我称为一名*专业的前端工程师*。

  主要项目：

  **[reeonce.github.io](/)**。

  **MYC**。一个基于Mojito(Node.js 的开源框架) + YUI3 的网站，全球化，https，整合其它部分强大服务也是这个网站开发过程的挑战。

  **伴旅语音导游**。是极觅数据的一项在景区中提供语音导游的服务，服务设在了微信服务号上，使用了微信的一些JS 接口。

#### 后端开发
  熟悉Linux 环境，使用了一年多的Node.js, 也使用过PHP, bash, docker, python 进行工作。

  主要项目：

  **CKV**。一个基于express.js 实现 key-value 云存储的解决方案。作为主要的开发人员，与PM 商量需求，准备环境，开发，与用户的协调，集成CI、CD等等。

### 兴趣爱好

一贯热爱运动的我，开始喜欢思考、阅读、看片和煮饭啦。

### 感慨

时间你好，时间再见。


<div id="welcome-overlay">
  <a href="/"><h1>Reeonce</h1></a>
</div>
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="/js/d3.v3.min.js"></script>
<script type="text/javascript" src="/js/modernizr.min.js"></script>
<script type="text/javascript" src="/js/others/about_zh.js"></script>
