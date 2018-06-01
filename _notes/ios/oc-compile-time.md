---
layout: default
comments: true
---

```sh
brew install moreutils

gem install xcpretty

xcodebuild -configuration Release | xcpretty | ts "%.s" | grep "Compiling"

```

然后在excel 中算出编译时间


找到编译耗时较长的模块，单独抽出来以静态库的方式导入


对于不能抽出来的文件，单独编译 Product->Perform Action->Compile 

在OTHER_CPLUSPLUSFLAGS 中上 -ftime-report:

http://schd.ws/hosted_files/cppcon2017/a7/CppCon2017.pdf