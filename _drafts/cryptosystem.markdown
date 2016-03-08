---
layout: post
title: Net adsf
category: cryptography
tags: [cryptography, rsa, "D-H"]
css: ["//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css"]
js: ["//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.js",
"/js/katex-parse.js"]
---

#### D-H 密钥交换

首先恭喜Diffie 和 Hellman 赢得了今年的图灵奖。

公示：

<script type="math/tex"> (gen^{s1})^{s2}\ \equiv \ (gen^{s2})^{s1}\ \equiv \ shared\ secret\ (mod\ p) </script>

<br>
步骤分析：

1. Alice 与 Bob 首先商定同用一个的基数*gen* 和模数 p（gen 和 p 互制）, Alice 选择一个私有值s1，Bob 选择一个私有值s2。
2. Alice 将 *A = gen^s1* 传给 Bob，Bob 将 *B = gen^s2* 传给 Alice。
3. Alice 将 Bob 传过来的数据与自己的私钥组合得到*shared secret*，即 A^s1。而Bob 将 Alice 传过来的数据与自己的私钥组合得到shared secret，即 B^s2。
4. 这样，双方就达成了一致，并可以用shared secret 进行对称的加密传输。

在实际使用时，a, b, p 都会是比较大的数字。当p 是一个大于10^600 的质数时，即使当前最快的计算机也无法通过p 和 b 计算出a 的值使得 g^a = p，而gen^a^b % p ([Modular exponentiation](https://en.wikipedia.org/wiki/Modular_exponentiation))却可以使用比较快的方法计算出来。

The [number field sieve](https://en.wikipedia.org/wiki/General_number_field_sieve) algorithm, which is generally the most effective in solving the discrete logarithm problem

### RSA:
Used to perform "true" public-key cryptography
Key identity: (me)d = m   (mod n)   (lets you recover the encrypted message)
Where:

n = prime1 × prime2    (n is publicly used for encryption)
φ = (prime1 - 1) × (prime2 - 1)   (Euler's totient function)
e is such that 1 < e < φ, and (e, φ) are coprime    (e is publicly used for encryption)
d × e = 1   (mod φ)    (the modular inverse d is privately used for decryption)
