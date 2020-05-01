import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(4),
    marginBottom: theme.spacing(4),
    width: 'fit-content',
    margin: 'auto',
    maxWidth: theme.breakpoints.values.sm,
  },
}))

export default function Topic() {
  const classes = useStyles()

  return (
    <Paper classes={{ root: classes.root }}>
      <Typography variant='h4' gutterBottom>
        Temat 6
      </Typography>

      <Typography>
        Korzystając z macierzy sąsiedztwa wierzchołków opracować i zaimplementować algorytm
        obliczania odległości pomiędzy dowolnymi wierzchołkami w grafie spójnym skierowanym.
      </Typography>
    </Paper>
  )
}
