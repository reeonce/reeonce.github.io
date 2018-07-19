---
layout: default
comments: true
---

pthread implement thread_local and call_once:

```c

#include <pthread.h>

static pthread_key_t foo_key;
static pthread_once_t key_is_created = PTHREAD_ONCE_INIT;

void create_key() {
    pthread_key_create(&foo_key, NULL);

    printf("create keysssss !!!!!\n");
}

static void open(void) {
    pthread_once(&key_is_created, create_key);

    int *foo = (int *)malloc(sizeof(int));
    *foo = 233;
    pthread_setspecific(foo_key, foo);
}

static void close(void) {
    int *foo = (int *)pthread_getspecific(foo_key);
    printf("%d\n", *foo);
    free(foo);
}

```