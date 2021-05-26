cmake_minimum_required(VERSION 3.14)

# set the project name and version
project(mymath-test VERSION 1.0)

# prevent debug symbols stripping
set(CMAKE_BUILD_TYPE Debug)

# add the executable
add_executable(${PROJECT_NAME} main.cxx)

# find mymath shared library - installed in system's loader search paths
find_library(LIB_PATH mymath)

# find mymath shared library public header
find_path(LIB_HEADER_PATH mymath.h)

# link with mymath shared library
target_link_libraries(${PROJECT_NAME} PUBLIC "${LIB_PATH}")

# set header search paths
target_include_directories(${PROJECT_NAME} PUBLIC "${LIB_HEADER_PATH}")
