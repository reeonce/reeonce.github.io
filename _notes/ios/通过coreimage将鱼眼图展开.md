---
layout: default
comments: true
---

继承 CIFilter:

```swift
class Fish2SphereFilter: CIFilter {
    
    let kernel: CIKernel
    var inputImage: CIImage?
    
    override init() {
        let filterCodeURL = Bundle.main.url(forResource: "fish2sphere", withExtension: "cikernel")!
        let code: String
        try! code = String.init(contentsOf: filterCodeURL, encoding: .utf8)
        
        let kernels = CIKernel.makeKernels(source: code)!
        kernel = kernels.first!
        
        super.init()
    }

    convenience init(_ inputImage: CIImage) {
        self.init()
        
        self.inputImage = inputImage;
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func setValue(_ value: Any?, forUndefinedKey key: String) {
        if key == kCIInputImageKey {
            self.inputImage = value as? CIImage
        }
    }
    
    override var outputImage: CIImage? {
        guard let inputImage = inputImage else { return nil }
        
        let src = CISampler.init(image: inputImage)
        print("\(src.extent)")
        return self.apply(kernel, arguments: [src], options: nil)
    }
}
```

```glsl
// fish2sphere.cikernel
kernel vec4 fish2sphere(sampler src)
{
    vec2 pfish;
    float theta,phi,r;
    vec3 psph;

    float FOV = 3.141592654; // FOV of the fisheye, eg: 180 degrees
    float width = samplerSize(src).x;
    float height = samplerSize(src).y;

    // Polar angles
    theta = 3.14159265 * (destCoord().x / width - 0.5); // -pi to pi
    phi = 3.14159265 * (destCoord().y / height - 0.5);    // -pi/2 to pi/2

    // Vector in 3D space
    psph.x = cos(phi) * sin(theta);
    psph.y = cos(phi) * cos(theta);
    psph.z = sin(phi);

    // Calculate fisheye angle and radius
    theta = atan(psph.z,psph.x);
    phi = atan(sqrt(psph.x*psph.x+psph.z*psph.z),psph.y);
    r = width * phi / FOV;

    // Pixel in fisheye space
    pfish.x = 0.5 * width + r * cos(theta);
    pfish.y = 0.5 * width + r * sin(theta);
    
//    pfish.x = 0.5 * width + destCoord().x * sin(theta);
//    pfish.y = destCoord().y;

    return sample(src, pfish);
}
```

使用:

```swift
CIFilter.registerName("Fish2Sphere", constructor: self, classAttributes: [kCIAttributeFilterDisplayName : "Fish 2 Sphere", kCIAttributeFilterCategories: [kCICategoryStillImage, kCICategoryVideo]]);
        
let ciContext = CIContext.init()
let ciFilter = CIFilter.init(name: "Fish2Sphere", withInputParameters: [kCIInputImageKey: ciImage])

let flipFilter = CIFilter.init(name: "CIAffineTransform")
flipFilter?.setValue(ciFilter?.outputImage, forKey: kCIInputImageKey)

let flipTransform = NSAffineTransform.init()
flipTransform.scale(by: -1)
flipTransform.translateX(by: -519, yBy: -529)
flipFilter?.setValue(flipTransform, forKey: "inputTransform")

guard let outputImage = flipFilter?.outputImage else {
    return
}
```