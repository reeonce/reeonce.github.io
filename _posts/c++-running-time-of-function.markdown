There are some ways to measure the executing running time of a function in C++.

1. use `time()` in ctime. However, be aware that clock() measures CPU time, not actual time elapsed (which may be much greater). 
```
#include <ctime>

void f() {
  using namespace std;
  clock_t begin = clock();

  code_to_time();

  clock_t end = clock();
  double elapsed_secs = double(end - begin) / CLOCKS_PER_SEC;
}
```

2. With C++11 and the help of a class template and lambda functions (when needed) you could abstract the time measuring mechanism. Then each callable would have its run time measured with minimal extra code, just by being called throught the measure structure. Plus, at compile time you can parametrize the time type (milliseconds, nanoseconds etc)
```
#include <iostream>
#include <chrono>

template<typename TimeT = std::chrono::milliseconds>
struct measure
{
    template<typename F, typename ...Args>
    static typename TimeT::rep execution(F func, Args&&... args)
    {
        auto start = std::chrono::system_clock::now();

        // Now call the function with all the parameters you need.
        func(std::forward<Args>(args)...);

        auto duration = std::chrono::duration_cast< TimeT> 
                            (std::chrono::system_clock::now() - start);

        return duration.count();
    }
};

int main()
{
    std::cout << measure<>::execution( [&]() {  
        std::cout << "In lambda, run for ";
    }) << std::endl;

    return 0;
}
```
