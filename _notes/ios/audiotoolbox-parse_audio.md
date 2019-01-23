---
layout: default
comments: true
---

```swift
var streamID: AudioFileStreamID?;

let status = AudioFileStreamOpen(nil, { (inClientData, streamID, propertyID, flags) in
    var pID = CFSwapInt32(propertyID)
    let data = NSData(bytes: &pID, length: 4);
    let str = String.init(data: data as Data, encoding: .ascii)
    print("propertyID \(String(describing: str)), flags \(flags[0].rawValue)")
    flags[0] = AudioFileStreamPropertyFlags.propertyIsCached
}, { (inClientData, inNumberBytes, inNumberPackets, inInputData, inPacketDescriptions) in
    print("inNumberPackets \(inNumberPackets), inNumberBytes - \(inNumberBytes), inInputData - \(inPacketDescriptions[0].mStartOffset),\(inPacketDescriptions[0].mDataByteSize)")
}, kAudioFileAAC_ADTSType, &streamID);

guard status == noErr else {
    return
}

AudioFileStreamParseBytes(streamID!, UInt32(data.length), data.bytes, AudioFileStreamParseFlags(rawValue: 0))
AudioFileStreamParseBytes(streamID!, UInt32(data.length), data.bytes, AudioFileStreamParseFlags(rawValue: 0))
AudioFileStreamParseBytes(streamID!, UInt32(data.length), data.bytes, AudioFileStreamParseFlags(rawValue: 0))

var outWriteable: DarwinBoolean = false
var asbd = AudioStreamBasicDescription()
var size = UInt32(MemoryLayout<AudioStreamBasicDescription>.size)
var asbdSize: UInt32 = 0

AudioFileStreamGetPropertyInfo(streamID!, kAudioFileStreamProperty_DataFormat, &asbdSize, &outWriteable)
AudioFileStreamGetProperty(streamID!, kAudioFileStreamProperty_DataFormat, &size, &asbd)
print(audioFormatIDReadableString(mFormatID: asbd.mFormatID))

var formatListSize: UInt32 = 0
var formatList: AudioFormatListItem?
AudioFileStreamGetPropertyInfo(streamID!, kAudioFileStreamProperty_FormatList, &formatListSize, &outWriteable)
AudioFileStreamGetProperty(streamID!, kAudioFileStreamProperty_FormatList, &formatListSize, &formatList)
print("\(String(describing: formatList?.mChannelLayoutTag))")

var fileFormatSize = UInt32(MemoryLayout<UInt32>.size)
var fileFormat: UInt32 = 0
AudioFileStreamGetProperty(streamID!, kAudioFileStreamProperty_FileFormat, &fileFormatSize, &fileFormat)
print(audioFormatIDReadableString(mFormatID: fileFormat))
```