export default class Graph {
  private adjacencyMatrix: number[][]

  public get size() {
    return this.adjacencyMatrix.length
  }

  constructor(adjMatrix: number[][]) {
    this.adjacencyMatrix = adjMatrix
  }
}
