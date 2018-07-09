---
layout: default
comments: true
---


```c++
class Singleton {
public:
    static Singleton &instance() {
        static Singleton instance;
        return instance;
    }
    ~Singleton() {};
    
private:
    Singleton() {};
    Singleton(const Singleton &) = delete;
};
```