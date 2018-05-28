---
layout: default
comments: true
note: true
---


1. 设置 `CAEAGLLayer.contentsScale = UIScreen.mainScreen.scale`;

2. 修改 renderbuffer 的大小

    ```objc
    glGenRenderbuffers(1, &renderTarget->colorRenderBuffer);
    glBindRenderbuffer(GL_RENDERBUFFER, renderTarget->colorRenderBuffer);
    [_context renderbufferStorage:GL_RENDERBUFFER fromDrawable:_glLayer];

    GLint width = 0, height = 0;
    glGetRenderbufferParameteriv(GL_RENDERBUFFER, GL_RENDERBUFFER_WIDTH, &width);
    glGetRenderbufferParameteriv(GL_RENDERBUFFER, GL_RENDERBUFFER_HEIGHT, &height);
    _drawableWidth = width;
    _drawableHeight = height;
    ```
3. 应用 viewport

    ```objc
    glViewport(0, 0, _drawableWidth, _drawableHeight);
    ```