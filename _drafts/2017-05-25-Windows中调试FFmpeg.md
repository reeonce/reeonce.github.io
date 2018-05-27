---
layout: post
title: Windows 中调试 FFmpeg
category: AV
tags: [AV, Windows, FFmpeg, msvc]
---

### Windows 中编译 FFmpeg

根据[官方教程](https://www.ffmpeg.org/platform.html#Microsoft-Visual-C_002b_002b-or-Intel-C_002b_002b-Compiler-for-Windows)

安装 [MSYS2](http://www.msys2.org/)

X64 Native Tools Command Prompt for VS 2017

msys_shell.cmd -mingw64

pacman -S make pkg-config diffutils
pacman -S mingw-w64-x86_64-yasm mingw-w64-x86_64-gcc mingw-w64-x86_64-SDL


./configure --toolchain=msvc --enable-debug
./configure --enable-asm --enable-yasm --enable-gpl --enable-libx264 --disable-ffserver --disable-avdevice --disable-doc --disable-ffplay --disable-ffprobe --disable-ffmpeg --enable-shared --enable-static --disable-static --disable-bzlib --disable-libopenjpeg --disable-iconv --disable-zlib --prefix=/d/ffmpeg --toolchain=msvc --arch=amd64 --extra-cflags="-MDd -I/d/ffmpeg/include" --extra-ldflags="/NODEFAULTLIB:libcmt -L/d/ffmpeg/lib" --enable-debug


make

pacman -S gdb
pacman -S base-devel
pacman -S ncurses-devel
pacman -S libreadline-devel
