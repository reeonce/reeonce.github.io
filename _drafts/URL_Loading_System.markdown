---
layout: post
title: URL Loading System in iOS
category: ios
tags: [ARC, ios]
---

* In iOS 7 and later or OS X v10.9 and later, NSURLSession is the preferred API for new code that performs URL requests.
* For software that must support older versions of OS X, you can use NSURLDownload to download the contents of a URL to a file on disk.
* For software that must support older versions of iOS or OS X, you can use NSURLConnection to download the contents of a URL to memory. You can then write the data to disk if needed.

#### Fetching Content as Data (In Memory)

At a high level, there are two basic approaches to fetching URL data:

* For simple requests, use the NSURLSession API to retrieve the contents from an NSURL object directly, either as an NSData object or as a file on disk.
* For more complex requests—requests that upload data, for example—provide an NSURLRequest object (or its mutable subclass, NSMutableURLRequest) to NSURLSession or NSURLConnection.