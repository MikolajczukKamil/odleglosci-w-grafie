import { DataSet, Network, Options, Data, Edge, Node } from 'vis'
import './style.css'

export default function Main({ current: container }: React.RefObject<HTMLDivElement>) {
  if (container === null) return

  console.log(container)

  let options: Options = {
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
      arrows: {
        to: true,
      },
      length: 256,
      font: {
        size: 24,
        face: '"Roboto", "Helvetica", "Arial", sans-serif'
      }
    },
    groups: {
      c1: {
        color: '#E91E63',
      },
    },
    autoResize: true,
    height: '512px',
    width: '100vw',
    locale: 'pl'
  }

  let nodes: Node[] = [
    { id: 0, group: 'c1', label: '8' },
    { id: 1, group: 'c1', label: '12' },
  ]

  let edges: Edge[] = [
    {
      from: 1,
      to: 0,
      id: 'e-1',
      label: '1',
      title: 'E 1',
      width: options.edges?.width * 2
    },
    {
      from: 0,
      to: 1,
      id: 'e-2',
      label: '2',
      title: 'E 2',

    },
  ]

  let data: Data = {
    nodes: new DataSet(nodes),
    edges: new DataSet(edges),
  }

  // @ts-ignore
  window.a = (x) => edges[0].label = x
  // @ts-ignore
  window.b = () => network.editNode()

  const network = new Network(container, data, options)

  network.on('oncontext', (event: any) => {
    event.event.preventDefault()

    const id = network.getNodeAt(event.pointer.DOM)

    console.log(id)
  })
}
