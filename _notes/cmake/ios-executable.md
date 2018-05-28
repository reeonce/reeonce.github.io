---
layout: default
comments: true
---


```cmake
set(APP_NAME xxx-demo)

set(APP_HEADER_FILES
    src/xxx.h
    samples/xxx-demo/AppDelegate.h
    samples/xxx-demo/ViewController.h
)


set(APP_SOURCE_FILES
    src/xxx.mm
    samples/xxx-demo/AppDelegate.m
    samples/xxx-demo/ViewController.m
    samples/xxx-demo/main.m
)

set(RESOURCES
    samples/xxx-demo/Base.lproj/Main.storyboard
    samples/xxx-demo/Base.lproj/LaunchScreen.storyboard
    samples/xxx-demo/Assets.xcassets
)

add_executable(
    ${APP_NAME}
    MACOSX_BUNDLE
    ${APP_HEADER_FILES}
    ${APP_SOURCE_FILES}
    ${RESOURCES}
)

set_target_properties(${APP_NAME} PROPERTIES
    RESOURCE "${RESOURCES}"
    XCODE_ATTRIBUTE_IPHONEOS_DEPLOYMENT_TARGET "9.0"
    XCODE_ATTRIBUTE_CODE_SIGN_IDENTITY "iPhone Developer"
    XCODE_ATTRIBUTE_DEVELOPMENT_TEAM "UBX9xxxxxX"
    XCODE_ATTRIBUTE_PRODUCT_BUNDLE_IDENTIFIER "com.insta360.${APP_NAME}"
    MACOSX_BUNDLE_INFO_PLIST ${CMAKE_CURRENT_SOURCE_DIR}/samples/xxx-demo/Info.plist
)

set_target_properties(${APP_NAME} PROPERTIES
    XCODE_ATTRIBUTE_ONLY_ACTIVE_ARCH[variant=Debug] "YES"
    XCODE_ATTRIBUTE_DEBUG_INFORMATION_FORMAT[variant=Debug] "dwarf-with-dsym"
    XCODE_ATTRIBUTE_CLANG_ENABLE_OBJC_ARC YES
    XCODE_ATTRIBUTE_COMBINE_HIDPI_IMAGES NO
    XCODE_ATTRIBUTE_INSTALL_PATH "$(LOCAL_APPS_DIR)"
    XCODE_ATTRIBUTE_ENABLE_TESTABILITY YES
    XCODE_ATTRIBUTE_GCC_SYMBOLS_PRIVATE_EXTERN YES
    XCODE_ATTRIBUTE_LD_RUNPATH_SEARCH_PATHS "@executable_path/Frameworks"
)

target_include_directories(${APP_NAME} 
    PRIVATE src
)

target_link_libraries(${APP_NAME} PRIVATE 
    xxx
    "-framework UIKit"
)
```