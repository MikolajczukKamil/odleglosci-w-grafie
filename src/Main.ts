import { DataSet, Network } from 'vis'
import './style.css'

export default function Main({ current: container }: React.RefObject<HTMLDivElement>) {
  if (container === null) return

  console.log(container)

  let nodes = [
    { id: 0, group: 'c1', label: '8' },
    { id: 1, group: 'c1', label: '12' },
  ]

  let edges = [
    {
      from: 1,
      to: 0,
      id: 'e-1',
      label: '1',
    },
  ]

  let data = {
    nodes: new DataSet(nodes),
    edges: new DataSet(edges),
  }

  let options = {
    nodes: {
      shape: 'dot',
      size: 30,
      font: {
        size: 32,
        color: '#9c9c9c',
      },
      borderWidth: 2,
    },
    edges: {
      width: 2,
    },
    groups: {
      c1: {
        color: '#E91E63',
      },
    },
  }

  const network = new Network(container, data, options)

  network.on('oncontext', (event: any) => {
    event.event.preventDefault()

    const id = network.getNodeAt(event.pointer.DOM)

    console.log(id)
  })
}
