cmake_minimum_required(VERSION 3.14)

# set the project name and version
project(mymath VERSION 1.0 DESCRIPTION "dummy math library for build & debug demo purposes")

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

# set System Loader search path
set(LIBRARY_DESTINATION /usr/local/lib/)
# set System Linker search path
set(HEADERS_DESTINATION /usr/local/include/)

# copy the shared library to System Loader search path & the public headers to System Linker search path
install(TARGETS ${PROJECT_NAME}
    LIBRARY DESTINATION ${LIBRARY_DESTINATION}
    PUBLIC_HEADER DESTINATION ${HEADERS_DESTINATION})
