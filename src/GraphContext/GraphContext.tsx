import React, { createContext, useState, useCallback } from 'react'
import Graph from '../Graph'

export interface IGraphContextValue {
  graph: Graph
  isGraphLoaded: boolean
  deleteGraph: () => void
  loadGraph: (graphAdjacencyMatrix: number[][]) => void
}

const defaultValue: IGraphContextValue = {
  graph: new Graph([]),
  loadGraph: () => void 0,
  isGraphLoaded: false,
  deleteGraph: () => void 0,
}

export const graphContext = createContext<IGraphContextValue>(defaultValue)

const { Provider } = graphContext

interface IGraphContextProviderProps {
  children?: React.ReactNode
}

export function GraphContextProvider({ children }: IGraphContextProviderProps) {
  const [graph, setGraph] = useState(defaultValue.graph)
  const [isGraphLoaded, setIsGraphLoaded] = useState(false)

  const loadGraph = useCallback((graphAdjacencyMatrix: number[][]) => {
    setIsGraphLoaded(true)
    setGraph(new Graph(graphAdjacencyMatrix))
  }, [])

  const deleteGraph = useCallback(() => {
    setIsGraphLoaded(false)
    setGraph(defaultValue.graph)
  }, [])

  return <Provider value={{ graph, loadGraph, isGraphLoaded, deleteGraph }}>{children}</Provider>
}
