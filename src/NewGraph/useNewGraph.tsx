import { useState, useCallback, ChangeEvent } from 'react'

import parseGraph from './parseGraph'
import GraphToString from './GraphToString'
import aviableGraphs, { addNewDefaultGraph } from './defaultGraphs'
import CheckGraphMatrixStringReprezentation from './CheckGraphMatrixStringReprezentation'

export default function useNewGraph(
  addNewGraph: (graphAdjacencyMatrix: number[][]) => void
) {
  const [selectedDefaultGraph, setSelectedDefaultGraph] = useState(0)
  const [text, setText] = useState(
    GraphToString(aviableGraphs[selectedDefaultGraph].graph)
  )
  const [textError, setTextError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSelectChange = useCallback(
    (event: ChangeEvent<{ value: any }>) => {
      const id: number = parseInt(event.target.value)

      setSelectedDefaultGraph(id)
      setText(GraphToString(aviableGraphs[id].graph))
      setTextError(false)
    },
    []
  )

  const useDefaultGraph = useCallback(() => {
    addNewGraph(aviableGraphs[selectedDefaultGraph].graph)
  }, [selectedDefaultGraph, addNewGraph])

  const handleChange = useCallback(
    (event: ChangeEvent<{ value: any }>) => {
      const content: string = event.target.value

      if (textError) {
        const err = CheckGraphMatrixStringReprezentation(content)

        if (err === null) {
          setTextError(false)
        }
      }

      setText(content)
    },
    [textError]
  )

  const handleBlur = useCallback(() => {
    const err = CheckGraphMatrixStringReprezentation(text)

    setTextError(err !== null)
    setErrorMessage(err || '')
  }, [text])

  const handleUseButton = useCallback(() => {
    if (textError || CheckGraphMatrixStringReprezentation(text) !== null) return

    const newGraph = parseGraph(text)

    addNewDefaultGraph(newGraph)
    addNewGraph(newGraph)
  }, [textError, text, addNewGraph])

  return {
    text,
    textError,
    handleBlur,
    handleChange,
    errorMessage,
    handleUseButton,
    useDefaultGraph,
    handleSelectChange,
    selectedDefaultGraph,
  }
}
