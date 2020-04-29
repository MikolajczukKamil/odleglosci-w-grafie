
  let nodes: Node[] = [
    { id: 0, group: "c1", label: "0" },
    { id: 1, group: "c1", label: "1" },
    { id: 2, group: "c1", label: "2" },
    { id: 3, group: "c1", label: "3" },
    { id: 4, group: "c1", label: "4" },
    { id: 5, group: "c1", label: "5" },
    { id: 6, group: "c1", label: "6" },
    { id: 7, group: "c1", label: "7" },
    { id: 8, group: "c1", label: "8" },
  ];

  let edges: Edge[] = [
    {
      from: 0,
      to: 1,
      // id: "e-1",
      label: "1"
    },
    {
      from: 1,
      to: 2
      , label: "2"
    },
    {
      from: 3,
      to: 4
      , label: "6"
    },
    {
      from: 4,
      to: 5
      , label: "7"
    },
    {
      from: 6,
      to: 7
      , label: "11"
    },
    {
      from: 7,
      to: 8
      , label: "12"
    },

    {
      from: 0,
      to: 3
      , label: "3"
    },
    {
      from: 1,
      to: 4
      , label: "4"
    },
    {
      from: 2,
      to: 5
      , label: "5"
    },{
      from: 3,
      to: 6
      , label: "8"
    },
    {
      from: 4,
      to: 7
      , label: "9"
    },
    {
      from: 5,
      to: 8
      , label: "10"
    },
  ];