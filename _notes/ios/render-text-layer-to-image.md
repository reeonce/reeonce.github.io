---
layout: default
comments: true
---

```swift
let layer = CATextLayer()
layer.frame = CGRect.init(x: 0, y: 0, width: 200, height: 60)
layer.string = "Hello world"

let gradientLayer = CAGradientLayer()
gradientLayer.frame = CGRect.init(x: 0, y: 0, width: 200, height: 60)
gradientLayer.colors = [UIColor.clear.cgColor, UIColor.blue.cgColor]
gradientLayer.startPoint = CGPoint.init(x: 0, y: 0.5);
gradientLayer.endPoint = CGPoint.init(x: 1.0, y: 0.5);

gradientLayer.mask = layer;

let size = layer.frame.size

let path = CGMutablePath()
path.move(to: CGPoint(x: 50, y: 20))
path.addLine(to: CGPoint.init(x: 100, y: 20))

UIGraphicsBeginImageContextWithOptions(size, true, 1.0)
let context = UIGraphicsGetCurrentContext()!
gradientLayer.render(in: context)
context.setStrokeColor(UIColor.yellow.cgColor)
context.setLineWidth(2.0)
context.addPath(path)
context.strokePath()
let image = UIGraphicsGetImageFromCurrentImageContext()
UIGraphicsEndImageContext()
```