export interface IAvailableGraph {
  name: string
  graph: number[][]
}

const buildInGraphs: IAvailableGraph[] = [
  {
    name: 'Klasyka gatunku graf z Wikipedii',
    graph: [
      [0, 1, 0, 0, 1, 0],
      [0, 0, 1, 0, 1, 0],
      [0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ]
  },
  {
    name: '3 wierzchołkowy wielokąt foremny',
    graph: [
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 0]
    ]
  },
  {
    name: 'Cuda na patyku',
    graph: [[1]]
  }
]

const userGraphs: IAvailableGraph[] = []

;(() => {
  const userGraphsLocalStorage = localStorage.getItem('userGraphs')

  if (userGraphsLocalStorage !== null) {
    try {
      userGraphs.push(...(JSON.parse(userGraphsLocalStorage) as IAvailableGraph[]))
    } catch {}
  }
})()

const availableGraphs: IAvailableGraph[] = [...buildInGraphs, ...userGraphs]

export function addNewDefaultGraph(
  graph: number[][],
  name = `Twój graf ${new Date().toLocaleDateString(undefined, {
    hour: 'numeric',
    minute: 'numeric'
  })}`
) {
  const newGraph: IAvailableGraph = { name, graph }

  userGraphs.push(newGraph)
  availableGraphs.push(newGraph)

  localStorage.setItem('userGraphs', JSON.stringify(userGraphs))
}

export default availableGraphs
