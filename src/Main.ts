import { DataSet, Network, Options, Data, Edge, Node } from "vis";
import "./style.css";

type RequiredKeys<T, K extends keyof T> = Exclude<T, K> & Required<Pick<T, K>>;

const a = (el: Options) => el as RequiredKeys<Options, keyof typeof el>;
const b = <T extends Object>(el: T) => el as RequiredKeys<T, keyof typeof el>;

export default function Main({
  current: container,
}: React.RefObject<HTMLDivElement>) {
  if (container === null) return;

  console.log(container);

  const options = b<Options>({
    nodes: {
      shape: "dot",
      size: 30,
      font: {
        size: 32,
        color: "#9c9c9c",
      },
      borderWidth: 2,
    },
    edges: {
      width: 2,
      // arrows: {
      //   to: true,
      // },
      length: 256,
      font: {
        size: 24,
        face: '"Roboto", "Helvetica", "Arial", sans-serif',
      },
    },
    groups: {
      c1: {
        color: "#111188",
      },
    },
    autoResize: true,
    height: "900px",
    width: "100vw",
    locale: "pl",
  });

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

  let data: Data = {
    nodes: new DataSet(nodes),
    edges: new DataSet(edges),
  };

  // @ts-ignore
  window.a = (x) => (edges[0].label = x);
  // @ts-ignore
  window.b = () => network.editNode();

  const network = new Network(container, data, options);

  network.on("oncontext", (event: any) => {
    event.event.preventDefault();

    const id = network.getNodeAt(event.pointer.DOM);

    console.log(id);
  });
}
