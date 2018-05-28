---
layout: default
comments: true
---


```cmake
cmake_minimum_required(VERSION 3.0.2 FATAL_ERROR)

project(prebuilt-test)

function(IMPORT_PREBUILT_LIBRARY)
    set(options)
    set(oneValueArgs PROJECT_NAME ROOT_PATH PREBUILT_LIB)
    set(multiValueArgs PREBUILT_LIBS DEPS)

    cmake_parse_arguments(IPL "${options}" "${oneValueArgs}" "${multiValueArgs}" ${ARGN} )

    message("LIB_PROJECT_NAME ${IPL_PROJECT_NAME} PROJECT_LIB ${PROJECT_LIB} PROJECT_LIBS: ${PROJECT_LIBS}")

    add_library(${IPL_PROJECT_NAME} STATIC IMPORTED GLOBAL)

    if(IPL_PREBUILT_LIB)
        unset(TMP_LIB CACHE)
        find_library(TMP_LIB ${IPL_PREBUILT_LIB} 
            PATHS ${IPL_ROOT_PATH}/lib
            NO_DEFAULT_PATH
        )
        if(NOT TMP_LIB)
            message(FATAL_ERROR "failed as prebuilt lib ${IPL_PREBUILT_LIB} cannot be found")
        endif(NOT TMP_LIB)
        set(PROJECT_LIB ${TMP_LIB})
    endif(IPL_PREBUILT_LIB)

    if(IPL_PREBUILT_LIBS)
        foreach(prebuilt_lib ${IPL_PREBUILT_LIBS})
            unset(TMP_LIB CACHE)
            find_library(TMP_LIB ${prebuilt_lib} 
                PATHS ${IPL_ROOT_PATH}/lib
                NO_DEFAULT_PATH
            )
            if(NOT TMP_LIB)
                message(FATAL_ERROR "failed as prebuilt lib ${prebuilt_lib} cannot be found")
            endif(NOT TMP_LIB)
            if(NOT PROJECT_LIB)
                set(PROJECT_LIB ${TMP_LIB})
            else()
                list(APPEND PROJECT_LIBS ${TMP_LIB})
            endif()
        endforeach(prebuilt_lib)
    endif(IPL_PREBUILT_LIBS)
    
    if(NOT PROJECT_LIB AND NOT PROJECT_LIBS)
        message(FATAL_ERROR "IMPORT_PREBUILT_LIBRARY ${IPL_PROJECT_NAME} failed as prebuilt lib cannot be found")
    endif(NOT PROJECT_LIB AND NOT PROJECT_LIBS)

    set_target_properties(${IPL_PROJECT_NAME} PROPERTIES 
        INTERFACE_INCLUDE_DIRECTORIES ${IPL_ROOT_PATH}/include
    )
    if(PROJECT_LIB)
        set_target_properties(${IPL_PROJECT_NAME} PROPERTIES 
            IMPORTED_LOCATION ${PROJECT_LIB}
        )
    endif(PROJECT_LIB)

    if(IPL_DEPS)
        list(APPEND PROJECT_LIBS ${IPL_DEPS})
    endif(IPL_DEPS)
    if(PROJECT_LIBS)
        set_target_properties(${IPL_PROJECT_NAME} PROPERTIES 
            IMPORTED_LINK_INTERFACE_LIBRARIES "${PROJECT_LIBS}"
        )
    endif(PROJECT_LIBS)
endfunction(IMPORT_PREBUILT_LIBRARY)


IMPORT_PREBUILT_LIBRARY(
    PROJECT_NAME curl
    ROOT_PATH ${CMAKE_CURRENT_LIST_DIR}/curl
    PREBUILT_LIB curl
    DEPS "z;-framework Security -framework CoreFoundation"
)


IMPORT_PREBUILT_LIBRARY(
    PROJECT_NAME ffmpeg
    ROOT_PATH ${CMAKE_CURRENT_LIST_DIR}/ffmpeg
    PREBUILT_LIBS avcodec swresample swscale avutil x264
    DEPS "objc;m;iconv;lzma;bz2;z;-framework AudioToolbox -framework Cocoa -framework QuartzCore -framework CoreMedia -framework VideoToolBox -framework CoreServices -framework CoreFoundation -framework Security -framework VideoDecodeAcceleration"
)

add_executable(prebuilt-test main.cc)

target_link_libraries(prebuilt-test PRIVATE curl ffmpeg)
```