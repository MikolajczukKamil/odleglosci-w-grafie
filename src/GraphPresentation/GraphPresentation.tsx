import React, { useEffect, useState, useContext, RefObject } from 'react'
import grey from '@material-ui/core/colors/grey'
import indigo from '@material-ui/core/colors/indigo'
import { Network, Options, Data } from 'vis'

import { graphContext } from '../GraphContext'

const options: Options = {
  nodes: {
    shape: 'dot',
    size: 30,
    font: {
      size: 28,
      color: grey[800],
    },
    color: indigo[700],
    borderWidth: 2,
  },
  edges: {
    width: 2,
    arrows: {
      to: true,
    },
    length: 1.2*256,
  },
  autoResize: true,
  height: '100vw',
  width: '100vh',
  locale: 'pl',
}

interface IGraphPresentationProps {
  containerRef: RefObject<HTMLDivElement>
}

export default function GraphPresentation({ containerRef }: IGraphPresentationProps) {
  const [network, setNetwork] = useState<Network | null>(null)
  const { isGraphLoaded, graph } = useContext(graphContext)

  useEffect(() => {
    if (containerRef.current !== null && network === null && isGraphLoaded) {
      const data: Data = {
        nodes: graph.getNodes(),
        edges: graph.getEdges(),
      }

      const width = `${containerRef.current.offsetWidth}px`
      const height = `${containerRef.current.offsetHeight}px`

      const newNetwork = new Network(containerRef.current, data, { ...options, width, height })

      setNetwork(newNetwork)
    }

    return () => {
      if (network !== null) {
        network.destroy()
        setNetwork(null)
      }
    }
  }, [containerRef, isGraphLoaded, graph, network])

  return <></>
}
