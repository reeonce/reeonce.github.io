---
layout: default
comments: true
title: MP4 文件格式
categories: Media
tags: video media
---

### box

```sdl
aligned(8) class Box (unsigned int(32) boxtype,
        optional unsigned int(8)[16] extended_type) {
    unsigned int(32) size;
    unsigned int(32) type = boxtype;
    if (size==1) {
        unsigned int(64) largesize;
    } else if (size==0) {
        // box extends to end of file
    }
    if (boxtype==‘uuid’) {
        unsigned int(8)[16] usertype = extended_type;
    }
}

// Many objects also contain a version number and flags field:
aligned(8) class FullBox(unsigned int(32) boxtype, 
        unsigned int(8) v, bit(24) f) extends Box(boxtype) {
    unsigned int(8) version = v;
    bit(24) flags = f;
}

```

### ftyp box

```sdl
aligned(8) class FileTypeBox extends Box(‘ftyp’) {
    unsigned int(32) major_brand;
    unsigned int(32) minor_version;
    unsigned int(32) compatible_brands[]; // to end of the box
}

e.g.
[ftyp] size=8+16
  major_brand = avc1
  minor_version = 0
  compatible_brand = avc1
  compatible_brand = isom
```

### box order

In order to improve interoperability and utility of the files, the following rules and guidelines shall be followed for the order of boxes:
1. The file type box ‘ftyp’ shall occur before any variable-length box (e.g. movie, free space, media data). Only a fixed-size box such as a file signature, if required, may precede it.
2. It is strongly recommended that all header boxes be placed first in their container: these boxes are the Movie Header, Track Header, Media Header, and the specific media headers inside the Media Information Box (e.g. the Video Media Header).
3. Any Movie Fragment Boxes shall be in sequence order (see subclause 8.33).
4. It is recommended that the boxes within the Sample Table Box be in the following order: Sample Description, Time to Sample, Sample to Chunk, Sample Size, Chunk Offset.
5. It is strongly recommended that the Track Reference Box and Edit List (if any) should precede the Media Box, and the Handler Reference Box should precede the Media Information Box, and the Data Information Box should precede the Sample Table Box.
6. It is recommended that user Data Boxes be placed last in their container, which is either the Movie Box or Track Box.
7. It is recommended that the Movie Fragment Random Access Box, if present, be last in the file.
8. It is recommended that the progressive download information box be placed as early as possible in files, for maximum utility.

![](/assets/media/box_structure.png)
![](/assets/media/box_structure_continue.png)