export interface IDefaultGraph {
  name: string
  graph: number[][]
}

export default [
  {
    name: 'Klasyka gatunku',
    graph: [
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 0]
    ]
  },
  {
    name: '3 wierzchołkowy wielokąt foremny',
    graph: [
      [0, 1, 0],
      [0, 0, 1],
      [1, 0, 0]
    ]
  },
  {
    name: 'Cuda na patyku',
    graph: [[1]]
  }
] as IDefaultGraph[]
