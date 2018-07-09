---
layout: default
comments: true
---


### std::remove_if()

```c++
template<class ForwardIt, class UnaryPredicate>
ForwardIt remove_if(ForwardIt first, ForwardIt last, UnaryPredicate p)
{
    first = std::find_if(first, last, p);
    if (first != last)
        for(ForwardIt i = first; ++i != last; )
            if (!p(*i))
                *first++ = std::move(*i);
    return first;
}
```

```c++
int main()
{
    std::string str = "Text\n with\tsome \t  whitespaces\n\n";
    str.erase(std::remove_if(str.begin(), 
                             str.end(),
                             [](unsigned char x){return std::isspace(x);}),
              str2.end());
    std::cout << str << '\n';
}
```