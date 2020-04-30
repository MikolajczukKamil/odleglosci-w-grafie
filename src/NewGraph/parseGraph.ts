export default function parseGraph(str: string) {
  return (JSON.parse(str) as string[][]).map((sub) =>
    sub.map((nb) => parseInt(nb))
  )
}
