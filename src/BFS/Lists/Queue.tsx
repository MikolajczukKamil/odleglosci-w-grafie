import React from 'react'
import List from './List'

interface IQueueProps {
  queue: string[]
}

export default function Queue({ queue }: IQueueProps) {
  return (
    <List
      title="Kolejka"
      emptyMessage="Pusta"
      list={queue.map((name) => ({ name }))}
    />
  )
}
