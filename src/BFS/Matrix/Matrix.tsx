import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import classNames from 'classnames'

import Graph from '../../Graph'
import MatrixContainer from './MatrixContainer'

const useStyles = makeStyles((theme: Theme) => ({
  row: {
    display: 'flex',
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },
  selectedRow: {
    fontWeight: 'bold',
  },
  col: {
    width: '1em',
    height: ' 1em',
    lineHeight: '1em',
    textAlign: 'center',
    margin: theme.spacing(0.5),
  },
}))

interface IMatrixProps {
  graph: Graph
  first: number
  markFirst: boolean
}

export default function Matrix({ graph, first, markFirst }: IMatrixProps) {
  const classes = useStyles()

  return (
    <MatrixContainer>
      {graph.map((mapColumns, i) => (
        <div
          key={i}
          className={classNames(classes.row, {
            [classes.selectedRow]: markFirst && first === i,
          })}
        >
          {mapColumns((value, j) => (
            <div key={j} className={classes.col}>
              {value}
            </div>
          ))}
        </div>
      ))}
    </MatrixContainer>
  )
}
