import { useState, useContext, useCallback, ChangeEvent } from 'react'

import { BFSAlgorythm } from './BFSAlgorythm'
import { graphContext } from '../GraphContext'
import { IStep } from './BFSAlgorythm'

export default function useBFSAlgorithm() {
  const [step, setStep] = useState(0)
  const [start, setStart] = useState(0)
  const { graph, isGraphLoaded } = useContext(graphContext)
  const [algotythm, setAlgorythm] = useState(new BFSAlgorythm(graph, start))

  const updateStart = useCallback(
    (event: ChangeEvent<{ value: any }>) => {
      const newStart = parseInt(event.target.value)

      if (newStart === start) return

      setStep(0)
      setStart(newStart)
      setAlgorythm(new BFSAlgorythm(graph, newStart))
    },
    [start, graph]
  )

  const nextStep = useCallback(() => {
    setStep((step) =>
      algotythm === null || step >= algotythm.steps.length ? step : step + 1
    )
  }, [algotythm])

  const previusStep = useCallback(() => {
    setStep((step) => (step <= 0 ? step : step - 1))
  }, [])

  const scrollToBegining = useCallback(() => {
    setStep(0)
  }, [])

  const scrollToEnd = useCallback(() => {
    setStep(algotythm !== null ? Math.max(algotythm.steps.length - 1, 0) : 0)
  }, [algotythm])

  const correctLoaded = isGraphLoaded && algotythm.steps.length !== 0

  const currentStep = correctLoaded ? algotythm.steps[step] : IStep.Empty

  const steps = algotythm.steps.length

  const finishStep = correctLoaded
    ? algotythm.steps[algotythm.steps.length - 1]
    : IStep.Empty

  return {
    step,
    steps,
    graph,
    start,
    nextStep,
    finishStep,
    updateStart,
    previusStep,
    scrollToEnd,
    currentStep,
    correctLoaded,
    scrollToBegining,
  }
}
