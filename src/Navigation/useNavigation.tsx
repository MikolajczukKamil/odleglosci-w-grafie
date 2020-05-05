import { useState, useContext, useCallback } from 'react'

import { graphContext } from '../GraphContext'

export default function useNavigation() {
  const [openTab, setOpenTabId] = useState(0)
  const { isGraphLoaded, loadGraph, deleteGraph } = useContext(graphContext)

  const handleChange = useCallback(
    (_, id: number) => {
      if (id === 0) deleteGraph()

      setOpenTabId(id)
    },
    [deleteGraph]
  )

  const addNewGraph = useCallback(
    (graphAdjacencyMatrix: number[][]) => {
      loadGraph(graphAdjacencyMatrix)
      setOpenTabId(1)
    },
    [loadGraph]
  )

  return {
    openTab,
    addNewGraph,
    handleChange,
    isGraphLoaded,
  }
}
