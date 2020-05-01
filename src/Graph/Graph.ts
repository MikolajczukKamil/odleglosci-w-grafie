import { Edge, Node } from 'vis'

const A = 'A'.charCodeAt(0)
const Z = 'Z'.charCodeAt(0)

export default class Graph {
  private adjacencyMatrix: number[][]

  public get size() {
    return this.adjacencyMatrix.length
  }

  constructor(adjMatrix: number[][]) {
    this.adjacencyMatrix = adjMatrix
  }

  public getNodes() {
    const nodes: Node[] = []

    for (let i = 0; i < this.adjacencyMatrix.length; i++) {
      const label = i + A > Z ? i.toString() : String.fromCharCode(i + A)

      nodes.push({ id: i, label })
    }

    return nodes
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
}
