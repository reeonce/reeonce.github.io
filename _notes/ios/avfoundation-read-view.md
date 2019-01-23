---
layout: default
comments: true
---


```objc
NSURL *url = [rootDir URLByAppendingPathComponent:@"xxxx.mp4"];
AVURLAsset *asset = [AVURLAsset URLAssetWithURL:url options:nil];

NSError *error = nil;
self.reader = [AVAssetReader assetReaderWithAsset:asset error:&error];
AVAssetTrack *audioTrack = [asset tracksWithMediaType:AVMediaTypeAudio].firstObject;
AVAssetTrack *videoTrack = [asset tracksWithMediaType:AVMediaTypeVideo].firstObject;

AVAssetReaderTrackOutput *aOutput =
    [AVAssetReaderTrackOutput assetReaderTrackOutputWithTrack:audioTrack
                                               outputSettings:nil];
AVAssetReaderTrackOutput *vOutput =
    [AVAssetReaderTrackOutput assetReaderTrackOutputWithTrack:videoTrack
                                               outputSettings:nil];

if ([self.reader canAddOutput:aOutput]) {
    [self.reader addOutput:aOutput];
}
if ([self.reader canAddOutput:vOutput]) {
    [self.reader addOutput:vOutput];
}

BOOL ret = [self.reader startReading];

int i = 0;
CMSampleBufferRef buffer;
while ((buffer = [aOutput copyNextSampleBuffer]) != nil) {
    NSLog(@"audio %d", ++i);
    CFRelease(buffer);
}

i = 0;
while ((buffer = [vOutput copyNextSampleBuffer]) != nil) {
    NSLog(@"video %d", ++i);
    CFRelease(buffer);
}
```