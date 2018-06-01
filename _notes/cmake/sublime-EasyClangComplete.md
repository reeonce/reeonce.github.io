---
layout: default
comments: true
---

1. 对于简单的项目，可以直接 subl xxx_path

2. 对于cmake 需要参数的项目，可以配置project 文件：

```json
{
  "folders":
  [
    {
      "path": "."
    }
  ],
  "settings":
  {
      // override "flags_sources" setting in this project.
      "ecc_flags_sources": [
        {
          "file": "compile_commands.json",
          "search_in": "xxx_path/build-ninja/",
        },
      ],
  }
}

```

运行cmake -G 生成项目文件

cmake -G Ninja -DXXX=ON -DXXXX=ssss -DCMAKE_EXPORT_COMPILE_COMMANDS=ON ..