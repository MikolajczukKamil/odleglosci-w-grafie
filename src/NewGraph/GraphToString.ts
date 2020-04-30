export default function GraphToString(grapth: number[][], separator = ' ') {
  return `[\n${separator}[ ${grapth
    .map((sub) => sub.join(', '))
    .join(` ],\n${separator}[ `)} ]
]`
}
