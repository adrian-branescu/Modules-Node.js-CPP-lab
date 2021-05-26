# Build - Install - Test C++ Shared Library

## CMake

Run the cmake executable to configure the project:
```bash
# create build dir
mkdir -p build

# go to build dir (which should be added to .gitignore) to not pollute the repo with generated build config files
cd build

# run cmake with path to CMakeLists.txt
cmake ..
```

Call the generated Makefile to actually compile (& link) the project:
```bash
make -j<number-of-cores>
```

Install the shared library to system shared libraries search paths
```bash
make install
```
