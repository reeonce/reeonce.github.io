---
layout: default
comments: true
---

[Taking Advantage of Multiple GPUs Session 422 WWDC 2010](https://asciiwwdc.com/2010/sessions/422)

So let's talk a little bit about IOSurface.

So this API was introduced in Mac OS 10.6 with not a lot of fanfare, this is actually the first place we're talking about it.

The whole point of IOSurface, and what's relevant to this talk, is that it makes resource sharing between different parts of the system a lot easier than it used to be.

IOSurface is basically nothing more than a really nice high level abstraction around a chunk of system shared memory.

So, what this is designed for is to do very efficient cross process and/or cross API data sharing, you know, you might need to send some data from CoreImage to OpenGL and you don't have control over the context involved, so you can't set up sharing, this can help you with that.

Germane to this talk is that it's integrated directly into the GPU software set, for all supported hardware on Mac OS X.

This is what allows us to pull off some really cool tricks that we'll talk about a little bit later.

Now the really neat thing about it is that from the app developer's point of view, it hides nearly all of the details about moving data from GPU to the other, or between the CPU and GPU and vice versa, okay?

If you follow a few simple rules, it pretty much is designed to just work.

So, let's talk about the GPU integrations stuff, because it's important for this talk.

So, an OpenGL texture can be bound to an IOSurface.

This is sort of a live connection, it means that anytime the contents of that surface are modified anywhere in the system, that texture at anytime it gets it used is going to see those modifications happen right away, you don't have to keep copying the data into the texture.

Also, IOSurface does support planar image type, so you can bind and OpenGL texture to a single image plane, for example, say you had an IOSurface with NV12 42.0 style video in it, you can bind an IOSurface once to the luminants plane once to the cromonent and write a shader together to do RGB conversion, works out really well, and we do that internally in some cases.

If you want to modify an IOSurface, you just take your IOSurface back to OpenGLTexture, bind it to an FBO and go, it's really no more complicated than that.

For the most part, you just get to use the standard OpenGL techniques to do it.

Now, OpenCL itself doesn't have direct binding to IOSurface at this time, but via the resource sharing stuff we talked about before, you can more or less take and OpenGL texture, bind it to an IOSurface, then take that OpenGLTexture and use it with the appropriate extension, whose name escapes me at the moment, but you can take that texture and use it in OpenCL's and image and get access to it that way.

Now, what's also cool about IOSurfaceTexture, is it doesn't matter how many textures in the system get bound to that IOSurface.

They all are going to use exactly the same video memory, on any given GPU.

Okay, so this mean, if I have two different processes in the system, both looking at the same IOSurface, and they both create a texture off of it, and they're both using the same GPU, there's not going to be any copies that happen back to host memory, just because were crossing process boundaries, okay, that's part of the just works part of the whole API, and it's a good performance thing as well.

Also, no matter how many different renderers we have in the system, the host memory backing for IOSurface is shared between them.

So if we do have to transfer stuff from one GPU to host memory and up to another card, they're aren't every any CPU copies involved in this process.

With regular OpenGLTexture objects, there actually can be, in this case it's DMA to system memory, DMA up to the other card and that's it, CPU does not touch all of the data.

So this is just a really simple example of creating an IOSurface and getting it usable inside of OpenGL.

So, IOSurface is standard, sort of Mac OS X, Core foundation based API, you give it a dictionary of all of the properties you want for the IOSurface and away it goes.

In this came I'm cheating a little bit and using toll-free bridging because it's a lot less code.

In this case, I'm just going to create a simple 256 by 256 IOSurface, 4-bytes per pixel, and that's pretty much all I need to specify as far as IOSurface is concerned.

IOSurfaces do not have an intrinsic format associated with them.

You can give it a pixel format identifier, like you know, BGRA or any of the sort of quick draw style 4CC or NB12 or anything like that, but IOSurface really doesn't care.

The only reason that's there at all is just so that two processes can sort of pick something to agree upon.

Now from the OpenGL side, all I really have to do is basically generate a new texture object and call this, you know, Mac OS X specific API, CGLTextImageIOSurface2D, it's kind of a mouthful, and that will take that currently bound texture object and bind it to the backing store of that IOSurface.

Okay in this case, I'm telling OpenGL I want the internal format of this texture treated as RGBA, that's 256 by 256, and I want OpenGL to look at that data as if it's BGRA onsite, and 888Reverse, which is just your basic ARGB format.

And you give it the surface that's involved and, in this case it's not a planar surface, so I just specify zero.

If the IOSurface had multiple planes, this is where you would stick that argument.

I want to call out this, again, because it's kind of an important point.

OpenGL is going to view that data in the IOSurface, via these parameters.

It doesn't really matter what the data is, or what format it is, what you specify here is what OpenGL is going to interpret that data as.

When we transfer it back and forth between host memory and the GPU, there's no CPU touching, there's no data formatting, it's straight copy up, straight copy back, you know the GPU's might do hidden tiling or that sort of thing in their local video memory, but that's not exposed to the app developer in any way.

Now, the nice thing is, IOSurface follows the same synchronization rules that we talked about earlier, there isn't anything new to learn here, they work exactly the same way, okay?

If you're going to take a texture on one context, and modify it with the GPU and ship it over to another context, you just have to do the Flush and you just have to do the bind, behind the scenes, IOSurface sort of works outside the Share Group to figure out in the system, that hey, this data is not in the right card.

Now the neat part about this too, is that the two contexts involved in this don't have to know about each other at all and they don't have to even share the same renderers, this is where, because this is integrated at such a low level on the system, we can still get at a GPU that your app doesn't even necessarily know about to go pull the data off of it.

Now the other sort of neat thing about IOSurface is that it lets you get direct access to that backing memory.

You know, for regular textures, if you're not using all of the texture range extension and client storage and all of that stuff, normally you can't get at the sort of shared system memory copy of the textures.

With IOSurface, you can get direct access to it, but you have to be careful about synchronization.

If you're going to write into an IOSurface directly with the CPU and then consume it using the GPU, you have to do what we are doing here, you have to lock it, put your data in it, unlock it.

At that point, we realize that you've changed the host memory copy and then you can go off and use it with OpenGL and everything is good.

For the opposite case, where you're consume some data using the CPU, after you've used a GPU to modify it, you, again, you have to make sure that all of the commands that may have been buffered to that GPU, have been Flushed and are in flight.

If they're not, the kernel part of IOSurface has no way of knowing how long it has to wait before it can DMA that copy back to host memory so that you can use it, so, again, follow the same synchronization rules as you would before.

So, let's talk a little bit about some performance tips when using IOSurface.

So, as I alluded to earlier, the automatic synchronization that we do when data is on the wrong GPU, it's easy to use, but it's not asynchronous, you know, if you've got one GPU consuming some data, and you immediately need to use it on the second one, there's a synchronization point there that we just simply can't avoid, and we don't want to give you bad data, so we're going to go ahead and wait for the data to be done before we pull it back to host memory.

One trick you can pull here, and this is a little bit advanced, because you can force IOSurface to page the data back to host memory by performing a lock, one trick you might consider if you want to use IOSurface for doing double buffering between different GPU's, is you could produce some content, and on that same thread immediately do a lock.

What that means is that the GPU is going to do all of its work and then the first thing it's going to do is page it back to host memory so it's ready to go.

Then you could go and do a second frame, do the same thing.

Get a couple of those frames going like that in buffered and host memory, then fire up the second GPU and start consuming the data, that way you get a nice overlap, you know if you go ahead and bind to the IOSurface and the host memory copy is already up to date on a downstream GPU, you won't pay any synchronization penalty for that.

All right, and again, this gives you really good tight control over exactly when that DMA happens.

And again, earlier, I talked, said there's no CPU copies, that's true in this case as well, so you're not going to pay any extra CPU overhead, other than the wait, for getting the data from one GPU to another.

Another really neat trick you can do is, remember in the slide before I showed you that, you know, IOSurface is going to, you know, view that texture based on the format and type.

Well, one thing you might want to do, for whatever reason, is say you've got, you know a luminants playing a video, and you want to do something with all the luminent channels, like run some kind of filter or something interesting like that, you know, change a gamma, setting, something, what you could do is basically lie to OpenGL and say, you know what, you know, 19, 20, or let's do something that I can do in my head, 640 by 480 video frame, it's really 160 by 480 luminant, or RGBA, even though it's really luminants, now I need to basically process four pixels at the same time and save to my shader instead of one.

So, the neat thing about this is that you can have different textures all pointing at the same piece of video memory, viewing it as different pixel formats, which again, sort of cool trick for doing image processing stuff.

Now if you're going to do that trick, the total data sizes have to match, you know, if you're going to say, you know, it was 640 by 480 four bytes per pixel, whatever width tie in to sort of bytes per pixel OpenGL is going to use works out to, it's going to have to work out to that same amount, or things will fail.

So what are some sort of cool examples for using IOSurface and how does it apply to the Multi-GPU stuff?

Well, say your plug-in, you know, you're an application developer and you want to support plug-ins and you're really having this quandary about, well, do I make this CPU based, or do I make it GPU based, and if we're going to make it GPU based, how do we tell them what renderer to use and Oh my God, this is really complicated, what do I do?

If you just say, here's an IOSurface, go modify it and hand it back to me, we'll abstract everything for you.

You could be looking at it with a CPU, they'll look at it with a GPU, they do their thing, they ship it back to you.

Or, if you're really lucky, they're going to use the same GPU you are, and there's not going to be any copies back and forth, so that's pretty cool.

Another really cool thing to use IOSurface for is Client Server applications.

Because we can pass stuff back and forth across process boundaries so cheaply, even keeping them on the same GPU, this is just really good if you need to use like a renderer server type operation, we use this internally in Mac OS X in a couple of situations as well, just to, you know, do things in sort of a secure manner.

And again, even in the Client Server situation any resources that are up on the GPU, will stay there if the downstream sort of client process is using those exact same GPU's, so again, there won't be any copies involved.

Now, probably the coolest thing you could do is combine both.

You could actually run your plug-in, in a different address space, on a different host architecture, and even on a different GPU, and it would all still just work, you know it's a really nice case to say, you know, as an app developer, "Hey, my plug-in guy crashes, it's not going to take down my app, I don't have to care if he's using a CPU to do his work, I don't care if he's using the GPU, everything is all pretty cool."

So, let me give you a real quick demo.

Okay, so this app here, this is the server, he's just generating Atlantis Frames and waiting for clients to come can check in with him.

The client checks in with the server, and then the server basically starts sending these Atlantis Frames over to this other application.

Now in this case, they're both on the same GPU, there shouldn't be any transfers going back and forth.

But I can say, "Hey, server, start using the hardware, the other hardware renderer."

Now the system is just automatically still just shipping the frames across GPU's to the other application.

Now again, you can't really see any visual difference.

I can even force this guy to use the software renderer, and it starts writing into the IOSurface directly and the client is still just going.

Now, I wrote this server to actually support multiple clients simultaneously, so I can make a duplicate of this client, start it up, and just to be interesting, I'll force it to run 32-bit, okay, and now the server's running 64-bit in this case.

So I can launch another copy of it and now he's running, you know the ponies are in different positions, but they're basically on two different, or actually in this case let's even make it more interesting, so now, the software renderer is writing into the IOSurface, it has no idea what GPU either of the two clients are using.

The clients, in this case, each one of them is using a different GPU and one of them is even a different architecture than the first, and it all still just works.

I think that's pretty cool, I don't know about you guys. 