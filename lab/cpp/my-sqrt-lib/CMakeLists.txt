cmake_minimum_required(VERSION 3.14)

# set the project name and version
project(mymath VERSION 1.0 DESCRIPTION "dummy math library for build & debug demo purposes")

# prevent debug symbols stripping
set(CMAKE_BUILD_TYPE Debug)

# specify the C++ standard
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# find source files
file(GLOB SOURCES src/*.cxx)

# define header search paths
include_directories(include)

# create shared library
add_library(${PROJECT_NAME} SHARED ${SOURCES})

# set library version & public headers (API exposed to clients)
set_target_properties(${PROJECT_NAME} PROPERTIES
    VERSION ${PROJECT_VERSION}
    SOVERSION 1
    PUBLIC_HEADER include/mymath.h)

if(APPLE)
    # set system loader search path
    set(LIBRARY_DESTINATION /usr/local/lib/)
    # set system public headers search path
    set(HEADERS_DESTINATION /usr/local/include/)
endif()

if(UNIX AND NOT APPLE)
    # set system loader search path
    set(LIBRARY_DESTINATION /usr/lib64/)
    # set system public headers search path
    set(HEADERS_DESTINATION /usr/include/)
endif()

# copy the shared library to system shared libraries search paths
install(TARGETS ${PROJECT_NAME}
    LIBRARY DESTINATION ${LIBRARY_DESTINATION}
    PUBLIC_HEADER DESTINATION ${HEADERS_DESTINATION})
