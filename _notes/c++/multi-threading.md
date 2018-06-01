---
layout: default
comments: true
---


#### muxer, recursive_mutex

A **mutex** is a lockable object that is designed to signal when critical sections of code need exclusive access, preventing other threads with the same protection from executing concurrently and access the same memory locations.

mutex objects provide exclusive ownership and do not support recursivity

**recursive_mutex** allows the same thread to acquire multiple levels of ownership over the mutex object.

This allows to lock (or try-lock) the mutex object from a thread that is already locking it, acquiring a new level of ownership over the mutex object: the mutex object will actually remain locked owning the thread until its member unlock is called as many times as this level of ownership.

#### lock_guard, unique_lock

A **lock guard** is an object that manages a mutex object by keeping it always locked.

On construction, the mutex object is locked by the calling thread, and on destruction, the mutex is unlocked. It is the simplest lock, and is specially useful as an object with automatic duration that lasts until the end of its context. In this way, it guarantees the mutex object is properly unlocked in case an exception is thrown.

Note though that the lock_guard object does not manage the lifetime of the mutex object in any way: the duration of the mutex object shall extend at least until the destruction of the lock_guard that locks it.

A **unique lock** is an object that manages a mutex object with unique ownership in both states: locked and unlocked.

On construction (or by move-assigning to it), the object acquires a mutex object, for whose locking and unlocking operations becomes responsible.

The object supports both states: locked and unlocked.

This class guarantees an unlocked status on destruction (even if not called explicitly). 

#### condition_variable

A **condition variable** is an object able to block the calling thread until notified to resume.

It uses a unique_lock (over a mutex) to lock the thread when one of its wait functions is called. The thread remains blocked until woken up by another thread that calls a notification function on the same condition_variable object.

Objects of type condition_variable always use unique_lock<mutex> to wait: for an alternative that works with any kind of lockable type, see condition_variable_any

**wait** causes the current thread to block until the condition variable is notified or a spurious wakeup occurs, optionally looping until some predicate is satisfied.

Atomically releases lock, blocks the current executing thread, and adds it to the list of threads waiting on *this. The thread will be unblocked when notify_all() or notify_one() is executed. It may also be unblocked spuriously. When unblocked, regardless of the reason, lock is reacquired and wait exits. If this function exits via exception, lock is also reacquired. (until C++14)