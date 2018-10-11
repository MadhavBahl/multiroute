# Multi-Route

Multi-Route is a web app to solve travelling salesman problem involving branch and bound algorithm design using multi processor design using OpenMP.

## Travelling Salesman Problem

The Travelling Salesman Problem (often called TSP) is a classic algorithmic problem in the field of computer science and operations research

The travelling salesman problem was defined in the 1800s by the Irish mathematician W. R. Hamilton and by the British mathematician Thomas Kirkman. Hamilton’s Icosian Game was a recreational puzzle based on finding a Hamiltonian cycle.

>> A Hamiltonian path is a path in a graph which contains each vertex of the graph exactly once. A Hamiltonian cycle is a Hamiltonian path, which is also a cycle. Knowing whether such a path exists in a graph, as well as finding it is a fundamental problem of graph theory.

The Travelling Salesman Problem describes a salesman who must travel between N cities. The order in which he does so is something he does not care about, as long as he visits each once during his trip, and finishes where he was at first. Each city is connected to other close by cities, or nodes, by airplanes, or by road or railway. Each of those links between the cities has one or more weights (or the cost) attached. The cost describes how "difficult" it is to traverse this edge on the graph, and may be given, for example, by the cost of an airplane ticket or train ticket, or perhaps by the length of the edge, or time required to complete the traversal. The salesman wants to keep both the travel costs, as well as the distance he travels as low as possible.

## Branch And Bound Algorithm Design

Branch and bound (BB, B&B, or BnB) is an algorithm design paradigm for discrete and combinatorial optimization problems, as well as mathematical optimization. A branch-and-bound algorithm consists of a systematic enumeration of candidate solutions by means of state space search: the set of candidate solutions is thought of as forming a rooted tree with the full set at the root. The algorithm explores branches of this tree, which represent subsets of the solution set. Before enumerating the candidate solutions of a branch, the branch is checked against upper and lower estimated bounds on the optimal solution, and is discarded if it cannot produce a better solution than the best one found so far by the algorithm.

**Hence, Branch and Bound algorithm design can be implemented in parallel processing design**

## Travelling Salesman Problem using Branch And Bound

Given a set of cities and distance between every pair of cities, the problem is to find the shortest possible tour that visits every city exactly once and returns to the starting point.

#### Example:

![image](https://user-images.githubusercontent.com/26179770/46792641-739d2380-cd61-11e8-8f22-ee8cd4821be2.png)

A TSP tour in the graph is 0-1-3-2-0. The cost of the tour is 10+25+30+15 which is 80

### Solution

**Note that the cost through a node includes two costs.**

1. Cost of reaching the node from the root (When we reach a node, we have this cost computed)

2. Cost of reaching an answer from current node to a leaf (We compute a bound on this cost to decide whether to ignore subtree with this node or not).

   - In cases of a maximization problem, an upper bound tells us the maximum possible solution if we follow the given node.
   - In cases of a minimization problem, a lower bound tells us the minimum possible solution if we follow the given node.

In branch and bound, the challenging part is figuring out a way to compute a bound on best possible solution. Below is an idea used to compute bounds for Traveling salesman problem.

Cost of any tour can be written as below.

```md
Cost of a tour T = (1/2) * ∑ (Sum of cost of two edges
                              adjacent to u and in the
                              tour T) 
                   where u ∈ V
For every vertex u, if we consider two edges through it in T,
and sum their costs.  The overall sum for all vertices would
be twice of cost of tour T (We have considered every edge 
twice.)

(Sum of two tour edges adjacent to u) >= (sum of minimum weight
                                          two edges adjacent to
                                          u)

Cost of any tour >=  1/2) * ∑ (Sum of cost of two minimum
                              weight edges adjacent to u) 
                   where u ∈ V
```

For example, consider the above shown graph. Below are minimum cost two edges adjacent to every node.

```md
Node     Least cost edges   Total cost            
0     (0, 1), (0, 2)            25
1     (0, 1), (1, 3)         35
2    (0, 2), (2, 3)            45
3     (0, 3), (1, 3)            45

Thus a lower bound on the cost of any tour = 
         1/2(25 + 35 + 45 + 45)
       = 75
Refer this for one more example.
```

Now we have an idea about computation of lower bound. Let us see how to how to apply it state space search tree. We start enumerating all possible nodes (preferably in lexicographical order)

#### The Root Node

Without loss of generality, we assume we start at vertex “0” for which the lower bound has been calculated above.

#### Dealing with Level 2

The next level enumerates all possible vertices we can go to (keeping in mind that in any path a vertex has to occur only once) which are, 1, 2, 3… n (Note that the graph is complete). Consider we are calculating for vertex 1, Since we moved from 0 to 1, our tour has now included the edge 0-1. This allows us to make necessary changes in the lower bound of the root.

```md

Lower Bound for vertex 1 = 
   Old lower bound - ((minimum edge cost of 0 + 
                    minimum edge cost of 1) / 2) 
                  + (edge cost 0-1)
```

How does it work? To include edge 0-1, we add the edge cost of 0-1, and subtract an edge weight such that the lower bound remains as tight as possible which would be the sum of the minimum edges of 0 and 1 divided by 2. Clearly, the edge subtracted can’t be smaller than this.

#### Dealing with other levels:

As we move on to the next level, we again enumerate all possible vertices. For the above case going further after 1, we check out for 2, 3, 4, …n.
Consider lower bound for 2 as we moved from 1 to 1, we include the edge 1-2 to the tour and alter the new lower bound for this node.

```md
Lower bound(2) = 
     Old lower bound - ((second minimum edge cost of 1 + 
                         minimum edge cost of 2)/2)
                     + edge cost 1-2)
```

#### Time Complexity: 

The worst case complexity of Branch and Bound remains same as that of the Brute Force clearly because in worst case, we may never get a chance to prune a node. Whereas, in practice it performs very well depending on the different instance of the TSP. The complexity also depends on the choice of the bounding function as they are the ones deciding how many nodes to be pruned.

### References

1. [http://lcm.csa.iisc.ernet.in/dsa/node187.html](http://lcm.csa.iisc.ernet.in/dsa/node187.html)