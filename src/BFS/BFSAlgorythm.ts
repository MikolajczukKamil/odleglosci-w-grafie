import Graph from '../Graph'

import { ICode } from './Code'

function Copy<T>(arr: T[]) {
  return arr.slice(0)
}

interface IStepParams {
  line: number
  queue: number[]
  visited: boolean[]
  distances: number[]
  first?: number
  markFirstInMatrix?: boolean
  neighbor?: number
}

export class IStep {
  public queue: string[]
  public visited: boolean[]
  public distances: number[]

  public line: number
  public first: string
  public neighbor: string
  public firstIndex: number
  public markFirstInMatrix: boolean

  public static Empty = new IStep({
    line: -1,
    queue: [],
    visited: [],
    distances: [],
  })

  constructor({
    line,
    queue,
    visited,
    distances,
    first = -1,
    markFirstInMatrix = false,
    neighbor = -1,
  }: IStepParams) {
    this.queue = queue.map((id) => Graph.fromIndexToName(id))
    this.visited = Copy(visited)
    this.distances = Copy(distances)
    this.line = line
    this.firstIndex = first
    this.first = first < 0 ? '' : Graph.fromIndexToName(first)
    this.markFirstInMatrix = markFirstInMatrix
    this.neighbor = neighbor < 0 ? '' : Graph.fromIndexToName(neighbor)
  }
}

export class BFSAlgorythm {
  public steps: IStep[] = []

  private static readonly mainCode = 2
  private static readonly DeQueue = 8
  private static readonly ifNeighbor = 11
  private static readonly visit = 13

  // [indentation, content]
  public static readonly code: ICode[] = [
    [
      0,
      'Odwiedzone[...] = NIE; Odległość[...] = Nieskończoność; Kolejka = Pusta',
    ],
    [0, ''],
    // 2
    [0, 'Odwiedzone[Startowy] = TAK'],
    [0, 'Odległość[Startowy] = 0'],
    [0, 'Kolejka.Wstaw(Startowy)'],
    [0, ''],
    [0, 'Dopuki Kolejka nie jest pusta'],
    [0, ''],
    // 8
    [1, 'Pierwszy = Kolejka.Następny()'],
    [1, "Dla każdego Sąsiad'a wierzchołka Pierwszy"],
    [1, ''],
    // 11
    [2, 'Jeżeli Odwiedzone[Sąsiad] == NIE'],
    [2, ''],
    // 13
    [3, 'Odwiedzone[Sąsiad] = TAK'],
    [3, 'Odległość[Sąsiad] = Odległosć[Pierwszy] + 1'],
    [3, 'Kolejka.Wstaw(Sąsiad)'],
  ].map(([indentation, content], id) => ({ id, content, indentation } as ICode))

  constructor(graph: Graph, startIndex: number) {
    const queue: number[] = []
    const visited: boolean[] = new Array(graph.Size).fill(false)
    const distances: number[] = new Array(graph.Size).fill(Infinity)

    this.steps.push(new IStep({ line: 0, queue, visited, distances }))

    visited[startIndex] = true

    this.steps.push(
      new IStep({ line: BFSAlgorythm.mainCode, queue, visited, distances })
    )

    distances[startIndex] = 0

    this.steps.push(
      new IStep({ line: BFSAlgorythm.mainCode + 1, queue, visited, distances })
    )

    queue.push(startIndex)

    this.steps.push(
      new IStep({ line: BFSAlgorythm.mainCode + 2, queue, visited, distances })
    )

    while (queue.length !== 0) {
      const first: number = queue.shift() as any

      this.steps.push(
        new IStep({
          line: BFSAlgorythm.DeQueue,
          queue,
          visited,
          distances,
          first,
        })
      )

      this.steps.push(
        new IStep({
          line: BFSAlgorythm.DeQueue + 1,
          queue,
          visited,
          distances,
          first,
          markFirstInMatrix: true,
        })
      )

      for (const neighbor of graph.getNeighbors(first)) {
        this.steps.push(
          new IStep({
            line: BFSAlgorythm.ifNeighbor,
            queue,
            visited,
            distances,
            first,
            markFirstInMatrix: true,
            neighbor,
          })
        )

        if (!visited[neighbor]) {
          visited[neighbor] = true

          this.steps.push(
            new IStep({
              line: BFSAlgorythm.visit,
              queue,
              visited,
              distances,
              first,
              markFirstInMatrix: true,
              neighbor,
            })
          )

          distances[neighbor] = distances[first] + 1

          this.steps.push(
            new IStep({
              line: BFSAlgorythm.visit + 1,
              queue,
              visited,
              distances,
              first,
              markFirstInMatrix: true,
              neighbor,
            })
          )

          queue.push(neighbor)

          this.steps.push(
            new IStep({
              line: BFSAlgorythm.visit + 2,
              queue,
              visited,
              distances,
              first,
              markFirstInMatrix: true,
              neighbor,
            })
          )
        }
      }
    }
  }
}
