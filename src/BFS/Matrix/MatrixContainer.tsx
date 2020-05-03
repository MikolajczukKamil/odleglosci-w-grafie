import React, { ReactNode } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    fontSize: theme.typography.h5.fontSize,
    padding: theme.spacing(2),
    width: 'min-content',
  },
  border: {
    width: 4,
    backgroundColor: theme.palette.grey[900],
  },
  endings: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    '&:before, &:after': {
      top: 0,
      width: 16,
      height: 4,
      content: '""',
      display: 'block',
      backgroundColor: theme.palette.grey[900],
    },
    '&:before': {
      left: 0,
    },
    '&:after': {
      right: 0,
    },
  },
  container: {
    display: 'flex',
  },
  main: {
    margin: 2,
  },
}))

interface IMatrixContainerProps {
  children: ReactNode
}

export default function MatrixContainer({ children }: IMatrixContainerProps) {
  const classes = useStyles()

  return (
    <Paper classes={{ root: classes.root }}>
      <div className={classes.endings} />

      <div className={classes.container}>
        <div className={classes.border} />

        <div className={classes.main}>{children}</div>

        <div className={classes.border} />
      </div>

      <div className={classes.endings} />
    </Paper>
  )
}
