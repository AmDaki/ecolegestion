cmake_minimum_required(VERSION 3.4.1)

# Ajoutez vos fichiers source ici
add_library(native-lib SHARED native-lib.cpp)

find_library(log-lib log)

target_link_libraries(native-lib ${log-lib})
