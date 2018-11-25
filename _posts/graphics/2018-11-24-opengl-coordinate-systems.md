---
layout: default
comments: true
title: OpenGL 坐标系统
categories: Graphics
tags: opengl graphics
---

### 引入

我们在学习和使用OpenGL 的时候总是会面临各种坐标系之间的转换，理清各种坐标系统更是进行计算的基础。那么，[**OpenGL 采用的是左手坐标系还是右手坐标系?**](https://stackoverflow.com/questions/4124041/is-opengl-coordinate-system-left-handed-or-right-handed)，先说答案：都可以。what???

### 左/右手坐标系

简单来说，典型的右手坐标系中 x轴指向右边，y轴指向上边，z轴指向的是后面；左手坐标系的x 轴指向右边，y轴指向上边，z轴则指向的是前面。

为了便于理解，你可以伸出手掌，将大拇指往外扩，使其与食指相差90度，然后将中指向掌心弯曲90度，使得拇指、食指、中指俩俩垂直。接下来，分别将拇指、食指、中指按顺序与x、y、z轴对应。如果你的右手与坐标系能够对应上，那么这就是右手坐标系，如果你的左手与坐标系对应，那么就是左手坐标系。


### OpenGL 中的坐标系

我们在写OpenGL 的shader 的时候，实际上使用到与OpenGL 相关的3D 坐标系只有一个，那就是 Normalized device coordinates (NDCs)，也就是vertices shader 里面gl_Position 中所处的坐标系，x 轴向右，y 轴向上，左下角是(-1, -1), 右上角是(1, 1)。而最为重要的z 轴，默认情况下在glDepthRange 为[0, 1] 时，z 轴指向前方的，那么此时这是一个左手坐标系，0 表示的是near, 1 表示的是far。倘若我们通过调用 `glDepthRange(1, 0)`; 将其设置为1 表示near，0 表示 far，那么NDC 就成为一个右手坐标系了。


虽然NDC 默认是左手坐标系，但是我们通常建立的模型、场景是右手坐标系的，这也是大部分3D 软件的共识。那么我们是如何在渲染过程中对这两个坐标系进行转换的呢？大部分情况下，我们并不是通过调用 `glDepthRange` 函数来对应的，而是通过著名的 model-view-projection (MVP) 矩阵。

```c++
gl_Position = M_projection * inverse(M_view) * M_model * V_p;
```

* V_p 是物体上的一个顶点p 相对于物体的3D 坐标，但这里是一个 vec4, V_p 一定要设置为1.0，否则，这里的运算就成为一个三维矩阵的乘法了，最后一列总是0，当 gl_Position.w 为0 时，这个顶点是没有意义的，因为它不能将w 进行归一化而对应到ndc 坐标系中。
* M_model 矩阵指的是物体的变换矩阵，`M_model * V_p` 得到的是p 相对于场景 O点的坐标。
* M_view 指的是camera 的变换矩阵，注意这里需要对 M_view 进行求逆，`inverse(M_view) * M_model * V_p` 得到的是点p 处于camera 坐标系的中得坐标。
* projection 矩阵是则是这次坐标转换的关键，它将点p 最终映射到了ndc 中得坐标。

我们举一个例子:

```c++
glm::vec4 V_p(0.0f, 1.0f, 0.0f, 1.0f);
glm::mat4 M_projection = glm::perspective(glm::radians(60.0f), 4.0f / 3.0f, 0.01f, 10.0f);

glm::mat4 M_model, M_view;
M_model = glm::translate(M_model, glm::vec3(0.0f, 0.0f, -1.0f));
M_view = glm::translate(M_view, glm::vec3(0.0f, 0.0f, 2.0f));

glm::vec4 gl_Position = M_projection * glm::inverse(M_view) * M_model * V_p;
std::cout << glm::to_string(gl_Position) << std::endl;
//vec4(0.000000, 1.732051, 2.985986, 3.000000)

glm::vec4 V_ndc = gl_Position / gl_Position.w;
std::cout << glm::to_string(V_ndc) << std::endl;
//vec4(0.000000, 0.577350, 0.995329, 1.000000)
```

### 坐标系转换的典型案例: 纹理上下颠倒

我们在通过OpenGL 渲染第一个texture 的时候，总是会面临纹理上下颠倒的问题，原因是啥？

我们一般理所当然地会把 vertices buffer 定义为:
```
const float vertices[4][4] = {
    // positions     tex_coord
    {-1.0f, -1.0f,    0.0f, 0.0f,},
    {-1.0f, 1.0f,     0.0f, 1.0f,},
    {1.0f, -1.0f,     1.0f, 0.0f,},
    {1.0f,  1.0f,     1.0f, 1.0f,}
};
```

我们所画的顶点是:

```       
 (-1, 1)------------(1, 1)
        |          |
        |          |
        |          |
(-1, -1)------------(1, -1)
```

而在图片上传到OpenGL 的时候，它的(0, 0)对应的是左上角，uv坐标系是这样的:

```
  (0, 0)------------(1, 0)
        |          |
        |          |
        |          |
  (0, 1)------------(1, 1)
```

这并不对应呀，y 轴是相反的!!

处理的方式很多，将图片在加载时在cpu 中进行矫正，在设置vbo 的时候，将顶点与texture 坐标对应正确，或者是在vertices shader 中将uv 乘以一个旋转矩阵。


references:

1. [Coordinate Transformations](https://www.khronos.org/opengl/wiki/Coordinate_Transformations)
