# Multi Salesman

Shortest Path Representation By Implementation Of Genetic Algorithms Parallely on a Shared Memory System using OpenMP

## ABSTRACT

Implementing branch and bound algorithm in OpenMP and C++ to solve Travelling Salesman Problem (TSP).
The TSP is an NP-hard problem that involves finding the shortest distance between a given set of cities. Cities are arranged in a two-dimensional (2D) world. The starting and ending positions are left unfixed, resulting in an open-looped path between the cities. Each city must be visited exactly once. It is assumed that direct paths may be taken between cities.

The goal is to minimize the total distance, i.e. the sum of the Euclidean distance between each pair of connecting cities.

## OBJECTIVE

To create a Web App which takes position as iniput and finds the shortest path. This is done by solving Travelling salesman problem using branch and bound algorithm to find the semi optimal trip in the backend.

## To run the C program for tsp

for runninig the tsp_openmp.c file, you would require an input (.in) file
Run the following command

```sh
make < [testcase_file_name.in]
```

**Note:** Number of threads can be changed by changing the number in "omp_set_num_threads" function call. It is the first statement in the main function.