---
layout: default
comments: true
---

### saturation 饱和度

```glsl
float luminance = dot(color, luminanceWeighting);
vec4 greyScaleColor = vec4(luminance);
color = mix(greyScaleColor, color, saturation);
```

### contrast 对比度

```glsl
color.rgb = (color.rgb - vec3(0.5)) * contrast + vec3(0.5);
```

### brightness 亮度

```glsl
color.rgb = color.rgb + vec3(brightness);
```

### levels

```glsl
#define GammaCorrection(color, gamma) pow(color, 1.0 / gamma)

vec3 alpha = min(max(color - minInput, vec3(0.0)) / (maxInput - minInput), vec3(1.0));
alpha = GammaCorrection(alpha, gamma);
color = mix(minOutput, maxOutput, alpha);
```

### exposure 曝光

```glsl
color.rgb = color.rgb * pow(2.0 * exposure);
```

### HUE 色调

```glsl
vec3 yuv = mat_rgb_2_yuv * color.rgb;
hue = atan(v, u);
chroma = sqrt(u * u + v * v);

hue += (-hueAdjust);

u = chroma * cos(hue);
v = chroma * sin(hue);

color.rgb = mat_yuv_2_rgb * yuv;
```
 
### sharpness 锐度

```glsl
avg_color = (left_color + right_color + top_color + bottom_color) / 4;
color.rgb = color.rgb + (color.rgb - avg_color.rgb) * sharpness;
```

### white balance 白平衡 

```glsl
vec3 yuv = mat_rgb_2_yuv * color.rgb;
u = clamp(u + tint * 0.5226 * 0.1, -0.5226, 0.5226);
color.rgb = mat_yuv_2_rgb * yuv;

vec3 warmFilter = vec3(0.93, 0.54, 0.0);
vec3 processed;
processed.r = color.r < 0.5 ? (2.0 * color.r * warmFilter.r) : (1.0 - 2.0 * (1.0 - color.r) * (1.0 - warmFilter.r)));
processed.g = color.g < 0.5 ? (2.0 * color.g * warmFilter.g) : (1.0 - 2.0 * (1.0 - color.g) * (1.0 - warmFilter.g)));
processed.b = color.b < 0.5 ? (2.0 * color.b * warmFilter.b) : (1.0 - 2.0 * (1.0 - color.b) * (1.0 - warmFilter.b)));

color.rgb = mix(color.rgb, processed, temperature);
```

### mono chrome

```glsl
float luminance = dot(color, luminanceWeighting);
vec3 processed;
processed.r = color.r < 0.5 ? (2.0 * luminance * filterColor.r) : (1.0 - 2.0 * (1.0 - luminance) * (1.0 - filterColor.r)));
processed.g = color.g < 0.5 ? (2.0 * luminance * filterColor.g) : (1.0 - 2.0 * (1.0 - luminance) * (1.0 - filterColor.g)));
processed.b = color.b < 0.5 ? (2.0 * luminance * filterColor.b) : (1.0 - 2.0 * (1.0 - luminance) * (1.0 - filterColor.b)));
color.rgb = mix(color.rgb, processed, intensity);
```

### false color

```glsl
float luminance = dot(color, luminanceWeighting);
color.rgb = mix(first_color.rgb, second_color.rgb, luminance);
```

### gamma

```glsl
color.rgb = pow(color.rgb, vec3(gamma));
```

### tone curve

```glsl
color.r = texture(toneCurveTexture, vec2(color.r, 0.0)).r;
color.g = texture(toneCurveTexture, vec2(color.g, 0.0)).g;
color.b = texture(toneCurveTexture, vec2(color.b, 0.0)).b;
```

### highlight shadow 高光阴影

```glsl
float luminance = dot(source.rgb, luminanceWeighting);
    
float shadow = clamp((pow(luminance, 1.0/(shadows+1.0)) + (-0.76)*pow(luminance, 2.0/(shadows+1.0))) - luminance, 0.0, 1.0);
float highlight = clamp((1.0 - (pow(1.0-luminance, 1.0/(2.0-highlights)) + (-0.8)*pow(1.0-luminance, 2.0/(2.0-highlights)))) - luminance, -1.0, 0.0);
vec3 result = vec3(0.0, 0.0, 0.0) + ((luminance + shadow + highlight) - 0.0) * ((source.rgb - vec3(0.0, 0.0, 0.0))/(luminance - 0.0));
```

### haze

```glsl
highp vec4 color = vec4(1.0);//todo reimplement as a parameter
     
highp float  d = textureCoordinate.y * slope  +  hazeDistance;

highp vec4 c = texture2D(inputImageTexture, textureCoordinate) ; // consider using unpremultiply

c = (c - d * color) / (1.0 -d);

gl_FragColor = c; //consider using premultiply(c);
```

### sepia

```glsl
```

### amatorka

```glsl
```

### missetikate

```glsl
```


### softelegance

```glsl
```

### color invert

```glsl
```


### histogram

```glsl
```


### average color

```glsl
```


### luminosity

```glsl
```


### threshold

```glsl
```


### adaptive threshold

```glsl
```

### average luminance threshold

```glsl
```


### harris corner detection

```glsl
```


### noble corner detection

```glsl
```


### shitomasi feature detection

```glsl
```


### hough transform line detection

```glsl
```


### buffer

```glsl
```


### low pass

```glsl
```

### high pass

```glsl
```

### motion detector

```glsl
```

### gray scale

```glsl
float luminance = dot(color, luminanceWeighting);
color.rgb = vec3(luminance);
```

### pixellate

```glsl
```


### polar pixellate

```glsl
```

### pixellate position

```glsl
```


### polkadot

```glsl
```


### half tone

```glsl
```


### cross hatch

```glsl
```


### sobel edge detection

```glsl
```


### prewitt edge detection

```glsl
```

### canny edge detection

```glsl
```

### threshold edge detection

```glsl
```

### xy gradient

```glsl
```


### sketch

```glsl
```


### threshold sketch

```glsl
```


### toon

```glsl
```


### convolution

```glsl
```



### smooth toon

```glsl
```


### tilt shift

```glsl
```

### cga

```glsl
```

### posterize

```glsl
```

### emboss

```glsl
```

### laplacian

```glsl
```


### chroma keynon blend

```glsl
```


### kuwahara

```glsl
```

### vignette

```glsl
```

### gaussian blur

```glsl
// @input: radius
// @input: texelWidthOffset = texelSpacingMultiplier / texure.width
// @input: texelHeightOffset = texelSpacingMultiplier / texure.height

// vertex shader
out vec2 blurCoordinates[2 * radius + 1];

main {
    vec2 singleStepOffset = vec2(texelWidthOffset, texelHeightOffset);
    for i in 0...2 * radius + 1
        blurCoordinates[i] = uv + singleStepOffset * (i - radius);
}


// fragment shader
// weights[radius + 1];
// weights[i] = (1.0 / sqrt(2.0 * M_PI * pow(sigma, 2.0))) * exp(-pow(i, 2.0) / (2.0 * pow(sigma, 2.0)))
// weights[i] /= sum_of_weights

for i in 0...2 * radius + 1
    sum += texture(tex, blurCoordinates[i]) * weights[abs(i - radius)];


// optimized
// numberOfOptimizedOffsets = MIN(radius / 2 + radius % 2, 7);

// vertex shader
// out vec2 blurCoordinates[2 * numberOfOptimizedOffsets + 1];

// fragment shader
sum += texture(tex, blurCoordinates[0]) * weights[0];
for i in 0...2 * numberOfOptimizedOffsets
    weight = weights[i * 2 + 1] + weights[i * 2 + 2];
    sum += texture(tex, blurCoordinates[i * 2 + 1]) * weight;
    sum += texture(tex, blurCoordinates[i * 2 + 2]) * weight;
```

### gaussian selective

```glsl
```

### gaussian position

```glsl
```

### box blur

```glsl
```

### median

```glsl
```

### bilateral

```glsl
```

### motion blur

```glsl
```

### zoom blur

```glsl
```

### swirl

```glsl
```

### bulge

```glsl
```

### pinch

```glsl
```

### sphere refraction

```glsl
```

### sphere refraction

```glsl
```

### glass sphere

### stretch

### dilation

### erosion

### opening

### closing

### dissolve blend

### perlin noise

### voronoi

### mosaic

### local binaray pattern

### chroma key blend

### add blend

### divide blend

### multiple blend

### overlay blend

### lighten blend

```glsl
color = max(color1, color2);
```

### darken blend

```
color.rgb = min(color2.rgb * color1.a, color1.rgb * color2.a) + color2.rgb * (1.0 - color1.a) + color1.rgb * (1.0 - color2.a);
```

### color burn blend

### color dodge blend

### linear burn lend

### screen blend

```glsl
color = white - (white - color2) * (white - color1);
```

### difference blend

```glsl
color.rgb = abs(color2.rgb - color1.rgb);
```

### subtract blend

```glsl
color.rgb = color1.rgb - color2.rgb;
```

### exclusion blend

```glsl
color.rgb = color2.rgb * color1.a + color1.rgb * color2.a - 2.0 * color2.rgb * color.rgb + color2.rgb * (1.0 - color1.a) + color1.rgb * (1.0 - color2.a);
color.a = color1.a;
```

### hard light blend

### soft light blend

### color blend

### hue blend

### saturation blend

### luminosity blend



### normal blend

```glsl
a = color2.a + color1.a * (1.0 - color2.a);
alpha_divisor = a + step(a, 0.0);

color.r = (color2.r * color2.a + color1.r * color1.a * (1.0 - color2.a)) / alpha_divisor;
color.g = (color2.g * color2.a + color1.g * color1.a * (1.0 - color2.a)) / alpha_divisor;
color.b = (color2.b * color2.a + color1.b * color1.a * (1.0 - color2.a)) / alpha_divisor;
```

### poisson blend

```glsl
vec3 mean_color = (bottom_color + top_color + right_color + top_color) / 4;
diff_color = color.rgb - mean_color;

vec3 mean_color1 = (bottom_color1 + top_color1 + right_color1 + top_color1) / 4;
diff_color1 = color1.rgb - mean_color1;

grad_color = mean_color + diff_color1;

color.rgb = mix(color.rgb, grad_color, color.a * mixture_percent);
```

### opacity adjustment

```glsl
color.a = color.a * opacity;
```