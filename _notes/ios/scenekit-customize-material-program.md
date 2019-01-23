---
layout: default
comments: true
---

设置SCNNode 的material 的program

```objc
SCNProgram *program = [SCNProgram program];
NSBundle *currentBundle = [NSBundle bundleForClass:[self class]];
NSError *error;
id<MTLLibrary> library = [mtkView.device newDefaultLibraryWithBundle:currentBundle error:&error];
if (error) {
    NSLog(@"new Default Library failed %@", error);
}
program.library = library;
program.vertexFunctionName = @"myVertex";
program.fragmentFunctionName = @"myFragment";
sphere.firstMaterial.program = program;
```

将 MTLTexture 设置为scenekit 的material

```objc
SCNMaterialProperty *imageProperty = [SCNMaterialProperty materialPropertyWithContents:texture];
[_carrierNode.geometry.firstMaterial setValue:imageProperty forKey:@"diffuseTexture"];
```

shader 为:

```cpp
#include <metal_stdlib>
using namespace metal;

#include <SceneKit/scn_metal>

struct MyNodeBuffer {
    float4x4 modelTransform;
    float4x4 modelViewTransform;
    float4x4 normalTransform;
    float4x4 modelViewProjectionTransform;
};

typedef struct {
    float3 position [[ attribute(SCNVertexSemanticPosition) ]];
    float2 texCoords [[ attribute(SCNVertexSemanticTexcoord0) ]];
} MyVertexInput;

struct SimpleVertex
{
    float4 position [[position]];
    float2 texCoords;
};

vertex SimpleVertex myVertex(MyVertexInput in [[ stage_in ]],
                             constant SCNSceneBuffer& scn_frame [[buffer(0)]],
                             constant MyNodeBuffer& scn_node [[buffer(1)]])
{
    SimpleVertex vert;
    vert.position = scn_node.modelViewProjectionTransform * float4(in.position, 1.0);
    vert.texCoords = in.texCoords;
    
    return vert;
}

fragment float4 myFragment(SimpleVertex in [[stage_in]],
                          texture2d<float, access::sample> diffuseTexture [[texture(0)]])
{
    constexpr sampler sampler2d(coord::normalized, filter::linear, address::repeat);
    float4 color = diffuseTexture.sample(sampler2d, in.texCoords);
    return color;
}
```