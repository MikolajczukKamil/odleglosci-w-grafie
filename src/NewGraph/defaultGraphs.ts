export interface IAvailableGraph {
  name: string
  graph: number[][]
}

const randomGraph = (n: number, successRatio = 0.2) =>
  Array(n)
    .fill(0)
    .map((_, i) =>
      Array(n)
        .fill(0)
        .map((_, j) => (i === j || Math.random() >= successRatio ? 0 : 1))
    )

const buildInGraphs: IAvailableGraph[] = [
  {
    name: 'Klasyka gatunku graf z Wikipedii',
    graph: [
      [0, 1, 0, 0, 1, 0],
      [0, 0, 1, 0, 1, 0],
      [0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
  },
  {
    name: 'Nieco bardziej skomplikowany graf',
    graph: [
      [0, 0, 1, 1, 0],
      [1, 0, 1, 1, 1],
      [0, 1, 0, 1, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 0],
    ],
  },
  {
    name: '3 wierzchołkowy wielokąt foremny',
    graph: [
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 0],
    ],
  },
  {
    name: 'Losowy graf 5 wierzchołków',
    graph: randomGraph(5, 0.5),
  },
  {
    name: 'Losowy graf 10 wierzchołków',
    graph: randomGraph(10, 0.2),
  },
  {
    name: 'Losowy graf 20 wierzchołków',
    graph: randomGraph(20, 0.12),
  },
]

const userGraphs: IAvailableGraph[] = []

;(() => {
  const userGraphsLocalStorage = localStorage.getItem('userGraphs')

  if (userGraphsLocalStorage !== null) {
    try {
      userGraphs.push(
        ...(JSON.parse(userGraphsLocalStorage) as IAvailableGraph[])
      )
    } catch {}
  }
})()

const availableGraphs: IAvailableGraph[] = [...buildInGraphs, ...userGraphs]

export function addNewDefaultGraph(
  graph: number[][],
  name = `Twój graf ${new Date().toLocaleDateString(undefined, {
    hour: 'numeric',
    minute: 'numeric',
  })}`
) {
  const newGraph: IAvailableGraph = { name, graph }

  userGraphs.push(newGraph)
  availableGraphs.push(newGraph)

  localStorage.setItem('userGraphs', JSON.stringify(userGraphs))
}

export default availableGraphs
