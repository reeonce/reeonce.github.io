---
layout: default
comments: true
note: true
---


CMakeLists.txt:

```cmake
if(XXX_BUILD_TESTS)
configure_file(CMakeLists.txt.in googletest-download/CMakeLists.txt)
execute_process(COMMAND "${CMAKE_COMMAND}" -G "${CMAKE_GENERATOR}" .
    WORKING_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}/googletest-download" )
execute_process(COMMAND "${CMAKE_COMMAND}" --build .
    WORKING_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}/googletest-download" )

set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)

add_subdirectory("${CMAKE_CURRENT_BINARY_DIR}/googletest-src"
                 "${CMAKE_CURRENT_BINARY_DIR}/googletest-build")

add_subdirectory(xxx_test)    
endif(XXX_BUILD_TESTS)
```


CMakeLists.txt.in:

```cmake
cmake_minimum_required(VERSION 2.8.2)

project(googletest-download NONE)

include(ExternalProject)
ExternalProject_Add(googletest
  GIT_REPOSITORY    https://github.com/google/googletest.git
  GIT_TAG           release-1.8.0
  SOURCE_DIR        "${CMAKE_CURRENT_BINARY_DIR}/googletest-src"
  BINARY_DIR        "${CMAKE_CURRENT_BINARY_DIR}/googletest-build"
  CONFIGURE_COMMAND ""
  BUILD_COMMAND     ""
  INSTALL_COMMAND   ""
  TEST_COMMAND      ""
)
```


xxx_test/CMakeLists.txt:

```cmake
file(GLOB SRCS *.cpp *.h)

ADD_EXECUTABLE(test_xxx ${SRCS})

TARGET_LINK_LIBRARIES(test_xxx
    xxx
    gtest
    gtest_main
    gmock
)

add_test(NAME test_xxx COMMAND test_xxx)

```