import Graph from '../Graph'

interface ICode {
  id: number
  content: string
  indentation: number
}

function Copy<T>(arr: T[]) {
  return arr.slice(0)
}

export class IStep {
  public queue: string[]
  public visited: boolean[]
  public distances: number[]

  constructor(
    public lineId: number,
    queue: number[],
    visited: boolean[],
    distances: number[],
    public first = -1,
    public markFirstInMatrix = false,
    public selectedNeighbors: number[] = []
  ) {
    this.queue = queue.map((id) => Graph.fromIndexToName(id))
    this.visited = Copy(visited)
    this.distances = Copy(distances)
    this.lineId = lineId
  }
}

export class BFSAlgorythm {
  public steps: IStep[] = []

  /**
   * [
   *   [indentation, content]
   * ]
   */
  public static readonly code: ICode[] = [
    [0, '// Inicjalizacja wartości'],
    [0, '// Odwiedzone[...] = NIE'],
    [0, '// Odległość[...] = Nieskończoność'],
    [0, '// Kolejka = Pusta'],
    // 4
    [0, 'Odwiedzone[Startowy] = TAK'],
    [0, 'Odległość[Startowy] = 0'],
    [0, 'Kolejka.Wstaw(Startowy)'],
    [0, 'Dopuki Kolejka nie jest pusta'],
    // 8
    [1, 'Pierwszy = Kolejka.Następny()'],
    [1, "Dla każdego Sąsiad'a wierzchołka Pierwszy"],
    // 10
      [2, 'Jeżeli Sąsiad nie jest odwiedzony'],
      // 11
        [3, '// Odwiedzamy wierzchołek Sąsiad'],
        [3, 'Odwiedzone[Sąsiad] = TAK'],
        [3, '// Odległość do Sąsiada = Odległosć do Pierwszego + 1'],
        [3, 'Odległość[Sąsiad] = Odległosć[Pierwszy] + 1'],
        [3, 'Kolejka.Wstaw(Sąsiad)'],
    // 16
    [1, 'Odwiedzone[Pierwszy] = TAK'],
  ].map(([indentation, content], id) => ({ id, content, indentation } as ICode))

  constructor(private graph: Graph, private startIndex: number) {
    const Q: number[] = []
    const visited: boolean[] = new Array(graph.Size).fill(false)
    const distances: number[] = new Array(graph.Size).fill(Infinity)

    this.steps.push(new IStep(0, Q, visited, distances))

    visited[startIndex] = true

    this.steps.push(new IStep(4, Q, visited, distances))

    distances[startIndex] = 0

    this.steps.push(new IStep(5, Q, visited, distances))

    Q.push(startIndex)

    this.steps.push(new IStep(6, Q, visited, distances))

    while (Q.length !== 0) {
      this.steps.push(new IStep(7, Q, visited, distances))

      const first: number = Q.shift() as any

      this.steps.push(new IStep(8, Q, visited, distances, first))

      this.steps.push(new IStep(8, Q, visited, distances, first))

      for (const neighbor of graph.getNeighbors(first)) {
        
      }
    }

    this.steps.push(new IStep(7, Q, visited, distances))
  }
}
