---
layout: post
title: 利用gitlab 搭建私有pod repo
category: ios
tags: [gitlab, ios, cocoapods]
---

iOS 项目的代码越来越重，引用的第三方库越来越多，我们的项目使用cocoapods 进行依赖管理，`pod install` 的时间面临着这么一些问题：

- Cocoapods/Specs 的主仓库已经有快1G 大小了，每次初始化时都得从github 上clone 下来，而其中 `pod repo update` 的时候更是耗时超久。
- 大部分依赖的库都是开源在github 上的，对于大文件则会放在了AWS S3 上，当你没有掌握足够的科学上网技能时，等的时间久都是小事，可怕的是碰到总是装不上。
- 同时，随着技术的积累，公司内部也有了一些网络、图像处理等基础服务库，它们如果能够像第三方库一样被安装好就方便多了。

于是决定创建一个私有的pod 仓库。

### 搭建gitlab

对于公司内网有Linux 主机的同学就很幸福，由于gitlab 有自己的docker 镜像，因此只需要安装docker，然后创建gitlab 实例（从gitlab 官网下载安装也同样很方便）：

```
$ docker run --detach \
    --hostname gitlab.yourcorp.com \
    --publish 443:443 --publish 80:80 --publish 2222:22 \
    --name gitlabce \
    --restart always \
    --volume ~/.gitlab/config:/etc/gitlab \
    --volume ~/.gitlab/logs:/var/log/gitlab \
    --volume ~/.gitlab/data:/var/opt/gitlab \
    gitlab/gitlab-ce
```

<!-- more -->

这时你可以在浏览器中打开gitlab.yourcorp.com，这样你就有了自己git 服务器了，可以尽情地在里面创建自己的账号，团队，项目，而且还是免费！一般你还需要配置SMTP 使得gitlab 能发送邮件，假如使用的是gmail:

```
$ docker exec -it gitlabce /bin/bash
$ vi /etc/gitlab/gitlab.rb

# smtp
gitlab_rails['smtp_enable'] = true
gitlab_rails['smtp_address'] = "smtp.gmail.com"
gitlab_rails['smtp_port'] = 587
gitlab_rails['smtp_user_name'] = "you@gmail.com"
gitlab_rails['smtp_password'] = "yourpassword"
gitlab_rails['smtp_domain'] = "gmail.com"
gitlab_rails['smtp_authentication'] = "login"
gitlab_rails['smtp_enable_starttls_auto'] = true
gitlab_rails['smtp_tls'] = true

$ exit
$ docker restart gitlabce
```

由于我的另一个项目必须在Windows 下开发，只好将linux 安装在VirtualBox里。如果虚拟机的网络设置为NAT 的话，还需要配置端口转发，包括80, 443 和 22 号端口。

> 这里有个血淋淋的教训，不可想着Docker 为Win 提供了docker-machine，然后在里面安装gitlab。因为docker-machine 使用的linux 是docker 自己研发的 [boot2docker](https://github.com/boot2docker/boot2docker)，而
boot2docker 采用的是 Tiny Core Linux, 默认只跑在内存里面，不会将数据写入文件系统，当重启后，所有的数据都会不复存在。虽然可以通过共享文件的方式将数据存在Windows 里，但是由于隔了是在VirtualBox 里，配置以后gitlab 总是起不来。

### 创建私有的Pod Specs 仓库
在gitlab 里新建一个 Specs 的项目，然后在本地运行:

```
$ pod repo add myrepo http://gitlab.yourcorp.com/iOSDev/Specs
$ cd ~/.cocoapods/repos/myrepo
$ pod repo lint .
```

是的，创建一个基本的仓库就是如此简单。

### 将自己的库放入私有仓库中

现在某个第三方库提供了很大的静态库，你不想把它放进自己的项目代码中，就可以考虑放入私有的pod 仓库里，`pod install` 时自动下载即可。

可以新建一个文件夹，将framework 文件放入其中，并创建Sample.podspec 和README 文件。

```
.
├── Sample.framework
│   ├── Headers
│   │   └── Sample.h
│   ├── Sample
│   ├── Info.plist
│   └── Modules
│       └── module.modulemap
├── Sample.podspec
└── README.md
```

修改podspec 文件，具体可以参考[官方文档](https://guides.cocoapods.org/making/specs-and-specs-repo.html)

```
Pod::Spec.new do |s|

  s.name         = "SampleFramework"
  s.version      = "0.0.1"
  s.license      = { :type => "Copyright", :text => "   Copyright 2016" }
  s.authors      = { "xxxx" => "xxxx@yourcorp.com" }
  s.summary      = "Sample Framework"
  s.platform     = :ios, "8.0"
  s.homepage     = "http://gitlab.yourcorp.com/iOSDev/SampleFramework.git"
  s.source       = { :git => s.homepage, :tag => s.version }
  s.source_files = 'Sample.framework/Headers/*.h'
  s.vendored_frameworks = 'Sample.framework'

  s.libraries    = "bz2"
  s.frameworks   = 'UIKit', 'CoreGraphics'

end
```

接下来就是要将本地代码提交到gitlab 上。

```
$ pod lib lint
$ git add -A && git commit -m "Release 0.0.1"
$ git tag '0.0.1'
$ git push origin mster --tags
$ pod spec lint
$ pod repo push myrepo SampleFramework.podspec
```

编辑已有项目的Podfile，在第一行加入`source 'http://gitlab.yourcorp.com/iOSDev/Specs'`，相应target 中加入`pod 'SampleFramework', '~> 0.0.1'`，然后`pod install`，完！
