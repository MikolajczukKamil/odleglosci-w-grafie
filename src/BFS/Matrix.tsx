import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import classNames from 'classnames'

import Graph from '../Graph'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    fontSize: theme.typography.h5.fontSize,
    padding: theme.spacing(2),
    width: 'min-content',
  },
  row: {
    display: 'flex',
  },
  selectedRow: {
    backgroundColor: theme.palette.grey[100],
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
    <Paper classes={{ root: classes.root }}>
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
    </Paper>
  )
}
