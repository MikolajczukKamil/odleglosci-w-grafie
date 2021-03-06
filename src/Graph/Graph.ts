import { Edge, Node } from 'vis'

const A = 'A'.charCodeAt(0)
const Z = 'Z'.charCodeAt(0)

type ColMap<T> = (value: number, j: number) => T
type RowMap<T, R> = (map: (colMap: ColMap<R>) => R[], i: number) => T

export default class Graph {
  private adjacencyMatrix: number[][]

  public get Size() {
    return this.adjacencyMatrix.length
  }

  constructor(adjMatrix: number[][]) {
    this.adjacencyMatrix = adjMatrix
  }

  public map<T, R>(rowMap: RowMap<T, R>) {
    return this.adjacencyMatrix.map((row, i) =>
      rowMap((colMap) => row.map((value, j) => colMap(value, j)), i)
    )
  }

  public mapNodes<T>(callback: (name: string, index: number) => T) {
    return this.adjacencyMatrix.map((_, i) =>
      callback(Graph.fromIndexToName(i), i)
    )
  }

  public getNodes() {
    return this.adjacencyMatrix.map(
      (_, id) => ({ id, label: Graph.fromIndexToName(id) } as Node)
    )
  }

  public getEdges() {
    const edges: Edge[] = []

    for (let from = 0; from < this.adjacencyMatrix.length; from++) {
      for (let to = 0; to < this.adjacencyMatrix.length; to++) {
        if (this.adjacencyMatrix[from][to] !== 0) {
          edges.push({ from, to })
        }
      }
    }

    return edges
  }

  public getNeighbors(index: number) {
    if (index < 0 || index >= this.Size) return []

    const neighbors: number[] = []

    for (let to = 0; to < this.adjacencyMatrix.length; to++) {
      if (this.adjacencyMatrix[index][to] !== 0) {
        neighbors.push(to)
      }
    }

    return neighbors
  }

  public static fromIndexToName(index: number) {
    return index + A > Z ? index.toString() : String.fromCharCode(index + A)
  }
}
