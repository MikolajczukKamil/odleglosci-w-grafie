let nodes: Node[] = [
  { id: 0, group: 'c1', label: '1' },
  { id: 1, group: 'c1', label: '2' },
  { id: 2, group: 'c1', label: '3' },
  { id: 3, group: 'c1', label: '4' },
  { id: 4, group: 'c1', label: '5' },
  { id: 5, group: 'c1', label: '6' },
]

let edges: Edge[] = [
  {
    from: 1,
    to: 2,
  },
  {
    from: 2,
    to: 3,
  },

  {
    from: 4,
    to: 1,
  },
  {
    from: 4,
    to: 3,
  },
  {
    from: 5,
    to: 0,
  },
]