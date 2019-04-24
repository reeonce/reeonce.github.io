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
mat4 mat = {
    {0.3588, 0.7044, 0.1368, 0.0},
    {0.2990, 0.5870, 0.1140, 0.0},
    {0.2392, 0.4696, 0.0912 ,0.0},
    {0,0,0,1.0},
};
gl_FragColor = mat * color;

```

### amatorka

lookup filter with lookup_amatorka.png.

### missetikate

lookup filter with lookup_miss_etikate.png.

### softelegance

lookup filter with lookup_soft_elegance_1.png and lookup_soft_elegance_2.png.

### color invert

```glsl
gl_FragColor = vec4((1.0 - color.rgb), color.a);
```

### histogram

```glsl
```


### average color

```glsl
color = 0.25 * (upperLeftColor + upperRightColor + lowerLeftColor + lowerRightColor);
```

### luminosity

```glsl
luminosity = 0.25 * (upperLeftLuminance + upperRightLuminance + lowerLeftLuminance + lowerRightLuminance);
color = vec4(luminosity, luminosity, luminosity, 1.0);
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


### low pass (slow-down the movements)

```glsl
color = mix(color, bufferColor, alpha);
bufferColor = color;
```

### high pass (high-light the movements)

```glsl
color = abs(color - lowpassColor);
```

### motion detector

```glsl
vec3 currentImageColor = texture2D(inputImageTexture, textureCoordinate).rgb;
vec3 lowPassImageColor = texture2D(inputImageTexture2, textureCoordinate2).rgb;

float colorDistance = distance(currentImageColor, lowPassImageColor); // * 0.57735
float movementThreshold = step(0.2, colorDistance);

gl_FragColor = movementThreshold * vec4(textureCoordinate2.x, textureCoordinate2.y, 1.0, 1.0);
```

### gray scale

```glsl
float luminance = dot(color, luminanceWeighting);
color.rgb = vec3(luminance);
```

### pixellate

```glsl
vec2 sampleDivisor = vec2(fractionalWidthOfPixel, fractionalWidthOfPixel / aspectRatio);

vec2 samplePos = textureCoordinate - mod(textureCoordinate, sampleDivisor) + 0.5 * sampleDivisor;
gl_FragColor = texture2D(inputImageTexture, samplePos );
```


### polar pixellate

```glsl
vec2 normCoord = 2.0 * textureCoordinate - 1.0;
vec2 normCenter = 2.0 * center - 1.0;

normCoord -= normCenter;

float r = length(normCoord); // to polar coords
float phi = atan(normCoord.y, normCoord.x); // to polar coords

r = r - mod(r, pixelSize.x) + 0.03;
phi = phi - mod(phi, pixelSize.y);

normCoord.x = r * cos(phi);
normCoord.y = r * sin(phi);

normCoord += normCenter;

vec2 textureCoordinateToUse = normCoord / 2.0 + 0.5;

gl_FragColor = texture2D(inputImageTexture, textureCoordinateToUse );
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
vec2 textureCoordinateToUse = textureCoordinate;
float dist = distance(center, textureCoordinate);
if (dist < radius)
{
    textureCoordinateToUse -= center;
    float percent = (radius - dist) / radius;
    float theta = percent * percent * angle * 8.0;
    float s = sin(theta);
    float c = cos(theta);
    textureCoordinateToUse = vec2(dot(textureCoordinateToUse, vec2(c, -s)), dot(textureCoordinateToUse, vec2(s, c)));
    textureCoordinateToUse += center;
}

gl_FragColor = texture2D(inputImageTexture, textureCoordinateToUse );
```

### bulge

```glsl
```

### pinch

```glsl
```

### sphere refraction

```glsl
vec2 textureCoordinateToUse = vec2(textureCoordinate.x, (textureCoordinate.y * aspectRatio + 0.5 - 0.5 * aspectRatio));
float distanceFromCenter = distance(center, textureCoordinateToUse);
float checkForPresenceWithinSphere = step(distanceFromCenter, radius);

distanceFromCenter = distanceFromCenter / radius;

float normalizedDepth = radius * sqrt(1.0 - distanceFromCenter * distanceFromCenter);
vec3 sphereNormal = normalize(vec3(textureCoordinateToUse - center, normalizedDepth));

vec3 refractedVector = refract(vec3(0.0, 0.0, -1.0), sphereNormal, refractiveIndex);

gl_FragColor = texture2D(inputImageTexture, (refractedVector.xy + 1.0) * 0.5) * checkForPresenceWithinSphere;
```

### glass sphere

```glsl
vec2 textureCoordinateToUse = vec2(textureCoordinate.x, (textureCoordinate.y * aspectRatio + 0.5 - 0.5 * aspectRatio));
float distanceFromCenter = distance(center, textureCoordinateToUse);
float checkForPresenceWithinSphere = step(distanceFromCenter, radius);

distanceFromCenter = distanceFromCenter / radius;

float normalizedDepth = radius * sqrt(1.0 - distanceFromCenter * distanceFromCenter);
vec3 sphereNormal = normalize(vec3(textureCoordinateToUse - center, normalizedDepth));

vec3 refractedVector = 2.0 * refract(vec3(0.0, 0.0, -1.0), sphereNormal, refractiveIndex);
refractedVector.xy = -refractedVector.xy;

vec3 finalSphereColor = texture2D(inputImageTexture, (refractedVector.xy + 1.0) * 0.5).rgb;

// Grazing angle lighting
float lightingIntensity = 2.5 * (1.0 - pow(clamp(dot(ambientLightPosition, sphereNormal), 0.0, 1.0), 0.25));
finalSphereColor += lightingIntensity;

// Specular lighting
lightingIntensity  = clamp(dot(normalize(lightPosition), sphereNormal), 0.0, 1.0);
lightingIntensity  = pow(lightingIntensity, 15.0);
finalSphereColor += vec3(0.8, 0.8, 0.8) * lightingIntensity;

gl_FragColor = vec4(finalSphereColor, 1.0) * checkForPresenceWithinSphere;
```

### stretch

```glsl
vec2 normCoord = 2.0 * textureCoordinate - 1.0;
vec2 normCenter = 2.0 * center - 1.0;

normCoord -= normCenter;
vec2 s = sign(normCoord);
normCoord = abs(normCoord);
normCoord = 0.5 * normCoord + 0.5 * smoothstep(0.25, 0.5, normCoord) * normCoord;
normCoord = s * normCoord;

normCoord += normCenter;

vec2 textureCoordinateToUse = normCoord / 2.0 + 0.5;

gl_FragColor = texture2D(inputImageTexture, textureCoordinateToUse);
```

### dilation

### erosion

### opening

### closing

### dissolve blend

```glsl
color = mix(color1, color2, mixturePercent);
```

### perlin noise

### voronoi

### mosaic

```glsl
vec2 xy = textureCoordinate;
xy = xy - mod(xy, displayTileSize);

vec4 lumcoeff = vec4(0.299,0.587,0.114,0.0);

vec4 inputColor = texture2D(inputImageTexture2, xy);
float lum = dot(inputColor,lumcoeff);
lum = 1.0 - lum;

float stepsize = 1.0 / numTiles;
float lumStep = (lum - mod(lum, stepsize)) / stepsize; 

float rowStep = 1.0 / inputTileSize.x;
float x = mod(lumStep, rowStep);
float y = floor(lumStep / rowStep);

vec2 startCoord = vec2(float(x) *  inputTileSize.x, float(y) * inputTileSize.y);
vec2 finalCoord = startCoord + ((textureCoordinate - xy) * (inputTileSize / displayTileSize));

color = texture2D(inputImageTexture, finalCoord);
```

### local binaray pattern

```glsl
float centerIntensity = texture2D(inputImageTexture, textureCoordinate).r;
float bottomLeftIntensity = texture2D(inputImageTexture, bottomLeftTextureCoordinate).r;
float topRightIntensity = texture2D(inputImageTexture, topRightTextureCoordinate).r;
float topLeftIntensity = texture2D(inputImageTexture, topLeftTextureCoordinate).r;
float bottomRightIntensity = texture2D(inputImageTexture, bottomRightTextureCoordinate).r;
float leftIntensity = texture2D(inputImageTexture, leftTextureCoordinate).r;
float rightIntensity = texture2D(inputImageTexture, rightTextureCoordinate).r;
float bottomIntensity = texture2D(inputImageTexture, bottomTextureCoordinate).r;
float topIntensity = texture2D(inputImageTexture, topTextureCoordinate).r;

float byteTally = 1.0 / 255.0 * step(centerIntensity, topRightIntensity);
byteTally += 2.0 / 255.0 * step(centerIntensity, topIntensity);
byteTally += 4.0 / 255.0 * step(centerIntensity, topLeftIntensity);
byteTally += 8.0 / 255.0 * step(centerIntensity, leftIntensity);
byteTally += 16.0 / 255.0 * step(centerIntensity, bottomLeftIntensity);
byteTally += 32.0 / 255.0 * step(centerIntensity, bottomIntensity);
byteTally += 64.0 / 255.0 * step(centerIntensity, bottomRightIntensity);
byteTally += 128.0 / 255.0 * step(centerIntensity, rightIntensity);

// TODO: Replace the above with a dot product and two vec4s
// TODO: Apply step to a matrix, rather than individually

gl_FragColor = vec4(byteTally, byteTally, byteTally, 1.0);
```

### chroma key blend

### add blend

```glsl
color.rgb = overlay.rgb + base.rgb;
color.a = overlay.a + base.a - overlay.a * base.a;
```

### divide blend

```glsl
ra = overlay.a * base.a + overlay.r * (1.0 - base.a) + base.r * (1.0 - overlay.a);
rg...
gb...
a = overlay.a + base.a - overlay.a * base.a;
```

### multiple blend

```glsl
color = overlayer * base + overlayer * (1.0 - base.a) + base * (1.0 - overlayer.a);
```

### overlay blend

```glsl
if (2.0 * base.r < base.a) {
    ra = 2.0 * overlay.r * base.r + overlay.r * (1.0 - base.a) + base.r * (1.0 - overlay.a);
} else {
    ra = overlay.a * base.a - 2.0 * (base.a - base.r) * (overlay.a - overlay.r) + overlay.r * (1.0 - base.a) + base.r * (1.0 - overlay.a);
}
```

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