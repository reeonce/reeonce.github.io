---
layout: default
comments: true
---

download Agner Fog's [asmlib](https://www.agner.org/optimize/#asmlib);

```c++
#include <iostream>
#include <chrono>
#include <vector>

#include "asmlib/asmlib.h"

class TimeMeasure {
public:
    TimeMeasure(const std::string &desc = std::string()): desc_(desc) {}
    void Start() { start_ = std::chrono::system_clock::now(); }
    void Stop() { end_ = std::chrono::system_clock::now(); }
    int64_t DurationUs() {
        using namespace std::chrono;
        return duration_cast<microseconds>(end_ - start_).count();
    }
private:
    const std::string &desc_;
    std::chrono::system_clock::time_point start_;
    std::chrono::system_clock::time_point end_;
};

static size_t kMemSize = 16 * 1024 * 1024;
static const size_t kCount = 10;

int main(int argc, char const *argv[]) {
    for (int i = 0; i < 3; ++i) {
        auto src = malloc(kMemSize);
        auto dst = malloc(kMemSize);

        auto sizeStr = std::to_string(kMemSize / 1024 / 1024) + " MB ";
        TimeMeasure t1, t2;
        for (int i = 0; i < kCount; ++i) {
            t1.Start();
            A_memcpy(dst, src, kMemSize);
            t1.Stop();
            t2.Start();
            memcpy(dst, src, kMemSize);
            t2.Stop();

            std::cout << sizeStr 
                << " A_memcpy takes " << t1.DurationUs() << " us, " 
                << "memcpy takes " << t2.DurationUs() << " us, "
                << "ratio: " << static_cast<double>(t1.DurationUs()) * 100 / t2.DurationUs()
                << std::endl;
        }
        free(src);
        free(dst);

        kMemSize *= 4;
    }

    return 0;
}
```

```bash
clang++ -c -std=c++11 main.cc
clang++ -lc++ asmlib/libamac64.a main.o
./a.out
```

result:

```
16 MB  A_memcpy takes 21540 us, memcpy takes 3655 us, ratio: 589.33
16 MB  A_memcpy takes 3836 us, memcpy takes 2545 us, ratio: 150.727
16 MB  A_memcpy takes 1949 us, memcpy takes 2605 us, ratio: 74.8177
16 MB  A_memcpy takes 2661 us, memcpy takes 3321 us, ratio: 80.1265
16 MB  A_memcpy takes 1930 us, memcpy takes 4339 us, ratio: 44.4803
16 MB  A_memcpy takes 8537 us, memcpy takes 8269 us, ratio: 103.241
16 MB  A_memcpy takes 2085 us, memcpy takes 2695 us, ratio: 77.3655
16 MB  A_memcpy takes 2149 us, memcpy takes 3008 us, ratio: 71.4428
16 MB  A_memcpy takes 3006 us, memcpy takes 3783 us, ratio: 79.4607
16 MB  A_memcpy takes 8897 us, memcpy takes 8031 us, ratio: 110.783
64 MB  A_memcpy takes 112967 us, memcpy takes 10520 us, ratio: 1073.83
64 MB  A_memcpy takes 7504 us, memcpy takes 13561 us, ratio: 55.3352
64 MB  A_memcpy takes 9363 us, memcpy takes 11419 us, ratio: 81.9949
64 MB  A_memcpy takes 9861 us, memcpy takes 26373 us, ratio: 37.3905
64 MB  A_memcpy takes 8717 us, memcpy takes 11294 us, ratio: 77.1826
64 MB  A_memcpy takes 18974 us, memcpy takes 13614 us, ratio: 139.371
64 MB  A_memcpy takes 17336 us, memcpy takes 17454 us, ratio: 99.3239
64 MB  A_memcpy takes 9739 us, memcpy takes 9528 us, ratio: 102.215
64 MB  A_memcpy takes 22726 us, memcpy takes 11623 us, ratio: 195.526
64 MB  A_memcpy takes 9180 us, memcpy takes 10920 us, ratio: 84.0659
256 MB  A_memcpy takes 356347 us, memcpy takes 59948 us, ratio: 594.427
256 MB  A_memcpy takes 51294 us, memcpy takes 48640 us, ratio: 105.456
256 MB  A_memcpy takes 38103 us, memcpy takes 47350 us, ratio: 80.471
256 MB  A_memcpy takes 41853 us, memcpy takes 44656 us, ratio: 93.7231
256 MB  A_memcpy takes 37982 us, memcpy takes 49481 us, ratio: 76.7608
256 MB  A_memcpy takes 38153 us, memcpy takes 50048 us, ratio: 76.2328
256 MB  A_memcpy takes 38243 us, memcpy takes 49569 us, ratio: 77.151
256 MB  A_memcpy takes 40113 us, memcpy takes 47369 us, ratio: 84.682
256 MB  A_memcpy takes 46017 us, memcpy takes 58217 us, ratio: 79.0439
256 MB  A_memcpy takes 40266 us, memcpy takes 49561 us, ratio: 81.2453
```


在mac 上，汇编的A_memcpy 还是比memcpy 快上20% 左右.