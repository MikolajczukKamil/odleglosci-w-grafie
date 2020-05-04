import React from 'react'
import List from './List'

interface IVisitedProps {
  distances: number[]
}

export default function Distance({ distances }: IVisitedProps) {
  return (
    <List
      title="Odległość"
      list={distances.map((dst, i) => ({
        name: Number.isFinite(dst) ? dst.toString() : 'inf',
      }))}
    />
  )
}
