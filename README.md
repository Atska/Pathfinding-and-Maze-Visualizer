# Pathfinding and Maze visualizer

> [>Link to App<](https://atska.github.io/visualizer/)

---

### Table of Contents
You're sections headers will be used to reference location of destination.

- [Introduction](#introduction)
- [How To Use](#how-to-use)
- [Algorithm descriptions](#algorithm-descriptions)
- [License](#license)

---

## Introduction

This project is showcasing pathfinding and maze algorithms. At the beginning I was interested in the basics of software engineering and wanted to learn more about algorithms and data structures. At the end I did this fun, challenging, furiously frustrating yet so extremly rewarding project.

#### What I learned
- Algorithmic thinking: Slicing a problem in many different subproblems and solve each of them step by step.
- Datastructures: Queues, stacks, heaps, sets and so on. When to use them and write one on your own if you need it.
- Graph traversal: Must-know stuff like depth-first-search or breadth-first-search, writing recursive function and its pros and cons.
- That I am so bad at css.

#### Technologies

- Javascript ES6
- ReactJS

Note: This project was developed with Google Chrome and its not optimized for phone usage. It was written with a 27inch monitor and a 14inch" laptop.

[Back To The Top](#pathfinding-and-maze-visualizer)

---

## How To Use

#### Installation
If you dont want test it with the [LINK](https://atska.github.io/visualizer/) above you can always download this project. To host it locally use your terminal and write "npm install" and after that "npm start".


[Back To The Top](#pathfinding-and-maze-visualizer)

---

## Algorithm descriptions

```Pathfinding algorithms```
#### Dijkstra´s Algorithm
- Pseudo Code: [Wikipedia](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)
- Shortest path: Yes
- Ancestor of all pathfinding algorithms. It is an uninformed algorithm meaning it doesnt use the location of the endnode to help its search process. The grid based 
board makes its search process similar to breadth-first-search.

#### A* Search Algorithm
- Pseudo Code: [Wikipedia](https://en.wikipedia.org/wiki/A*_search_algorithm)
- Shortest path: Yes
- Heuristic: Manhattan distance
- Dijkstra´s with a brain. A* is an informed algorithm and works very similar to Dijkstras with the exception of its heuristic function. This function determines which node you travel next. To implement this, a min heap / priority queue is mandatory. In this project you can only got left, right, top and bottom so the Manhatten distance was chosen.

#### Greedy-Best-First-Search
- Shortest path: No
- Heuristic: Pythagorean Theorem
- Similar to A*. It is greedy because it goes directly to the endnode. Its very fast but does not always guarantee the shortest path.

#### Depth-First-Search
- Pseudo Code: [Wikipedia](https://en.wikipedia.org/wiki/Tree_traversal)
- Shortest path: No
- Simple graph traversal algorithm. Terrible pathfinding algorithm. Its good at finding out whether there is a path to an endnode.

#### Breadth-First-Search
- Pseudo Code: [Wikipedia](https://en.wikipedia.org/wiki/Tree_traversal)
- Shortest path: Yes
- Simple graph traversal algorithm which gets the job of finding the shortest path done.


```Maze Algorithms```
#### Binary-Tree-Maze
- Pseudo Code: [Hurna.io](https://hurna.io/academy/algorithms/maze_generator/binary.html)
- Visualizes a binary tree data structure if you spin the maze 45°. Because of that the left and top of this maze will always be paths. There cannot be crossroads and all dead ends must point right or down.

#### Recursive Backtracking
- Pseudo Code: [Wikipedia](https://en.wikipedia.org/wiki/Maze_generation_algorithm)
- This algorithm visualizes depth-first-search and backtracking wonderfully. However as given above this algorithm involves deep recursion which may cause stack overflow issues. 

#### Recursive Division
- Pseudo Code: [Wikipedia](https://en.wikipedia.org/wiki/Maze_generation_algorithm)
- Great and complex algorithm. This algorithm slices a rectangle in half at a random position and keeps doing it recursivly until the rectangle is small enough so it cannot be sliced anymore.

[Back To The Top](#pathfinding-and-maze-visualizer)

---

## License

MIT License

Copyright (c) [2020] [Binh Nguyen]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[Back To The Top](#pathfinding-and-maze-visualizer)

---
