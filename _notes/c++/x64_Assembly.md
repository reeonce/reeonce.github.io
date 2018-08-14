---
layout: default
comments: true
---

![Generic Architecture:](/assets/x64-assembly-figure-1.jpg)

Figure 1 shows sixteen general purpose 64-bit registers, the first eight of which are labeled (for historical reasons) RAX, RBX, RCX, RDX, RBP, RSI, RDI, and RSP. The second eight are named R8-R15. By replacing the initial R with an E on the first eight registers, it is possible to access the lower 32 bits (EAX for RAX). Similarly, for RAX, RBX, RCX, and RDX, access to the lower 16 bits is possible by removing the initial R (AX for RAX), and the lower byte of the these by switching the X for L (AL for AX), and the higher byte of the low 16 bits using an H (AH for AX). The new registers R8 to R15 can be accessed in a similar manner like this: R8 (qword), R8D (lower dword), R8W (lowest word), R8B (lowest byte MASM style, Intel style R8L). Note there is no R8H.

Common Opcodes:

Opcode | Meaning | Opcode | Meaning
-------|---------|--------|---------
MOV | Move to/from/between memory and registers | AND/OR/XOR/NOT | Bitwise operations
CMOV* | Various conditional moves | SHR/SAR | Shift right logical/arithmetic
XCHG | Exchange | SHL/SAL | Shift left logical/arithmetic
BSWAP | Byte swap | ROR/ROL | Rotate right/left
PUSH/POP | Stack usage | RCR/RCL | Rotate right/left through carry bit
ADD/ADC | Add/with carry | BT/BTS/BTR | Bit test/and set/and reset
SUB/SBC | Subtract/with carry | JMP | Unconditional jump
MUL/IMUL | Multiply/unsigned | JE/JNE/JC/JNC/J* | Jump if equal/not equal/carry/not carry/ many others
DIV/IDIV | Divide/unsigned | LOOP/LOOPE/LOOPNE | Loop with ECX
INC/DEC | Increment/Decrement | CALL/RET | Call subroutine/return
NEG | Negate | NOP | No operation
CMP | Compare | CPUID | CPU information


[More Details](https://software.intel.com/en-us/articles/introduction-to-x64-assembly)