import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import classNames from 'classnames'

const useStyles = makeStyles((theme: Theme) => ({
  position: {
    fontWeight: 'bold',
    textAlign: 'center',
    verticalAlign: 'middle',
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    lineHeight: `${theme.spacing(5)}px`,
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      boxShadow: theme.shadows[4],
    },
  },
  disabled: {
    background: theme.palette.grey[500],
  },
}))

interface INodeBoxProps {
  name: string
  disabled?: boolean
}

export default function NodeBox({ name, disabled }: INodeBoxProps) {
  const classes = useStyles()

  return (
    <Paper
      elevation={2}
      classes={{
        root: classNames(classes.position, {
          [classes.disabled]: disabled,
        }),
      }}
    >
      {name}
    </Paper>
  )
}
