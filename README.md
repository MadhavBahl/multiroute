# Multi Salesman

Shortest Path Representation By Implementation Of Genetic Algorithms Parallely on a Shared Memory System using OpenMP

## ABSTRACT

Implementing genetic algorithm (GA) in OpenMP and C++ to solve Travelling Salesman Problem (TSP).
The TSP is an NP-hard problem that involves finding the shortest distance between a given set of cities. Cities are arranged in a two-dimensional (2D) world. The starting and ending positions are left unfixed, resulting in an open-looped path between the cities. Each city must be visited exactly once. It is assumed that direct paths may be taken between cities.

The goal is to minimize the total distance, i.e. the sum of the Euclidean distance between each pair of connecting cities.

## OBJECTIVE

To create a Web App which takes position as iniput and finds the shortest path. This is done by solving Travelling salesman problem using Genetic algorithm to find the semi optimal trip in the backend.

## MOTIVATION

The TSP is an NP-hard problem solving which can be costly in terms of time. It can be solved using genetic algorithm. Genetic algorithms are effective in solving many practical problems, but their execution usually take a long time. 
This problem can be solved, execution of genetic algorithms can be made faster. We can use hardware accelerators (FPGA) but it is difficult and costly. Second option available is of grid computing, but that is very expensive. Third option is to go for multicore parallelization. Therefore, I am doing this project to solve (NP hard) Travelling Salesman Problem using OpenMP.