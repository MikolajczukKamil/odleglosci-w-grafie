import React from 'react'
import List from './List'

interface IVisitedProps {
  visited: boolean[]
}

export default function Visited({ visited }: IVisitedProps) {
  return (
    <List
      title="Odwiedzone"
      list={visited.map((disabled, i) => ({ name: '', disabled }))}
    />
  )
}
