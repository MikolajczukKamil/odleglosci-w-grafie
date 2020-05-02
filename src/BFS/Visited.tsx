import React from 'react'
import List from './List'
import Graph from '../Graph'

interface IVisitedProps {
  visited: boolean[]
}

export default function Visited({ visited }: IVisitedProps) {
  return (
    <List
      title="Odwiedzone"
      list={visited.map((vis, i) => ({
        name: Graph.fromIndexToName(i),
        disabled: !vis,
      }))}
    />
  )
}
