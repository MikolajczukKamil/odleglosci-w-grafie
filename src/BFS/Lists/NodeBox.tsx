import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import classNames from 'classnames'

export const size = 5
export const mdSize = size * 0.8
export const xsSize = size * 0.6

const useStyles = makeStyles((theme: Theme) => ({
  position: {
    fontWeight: 'bold',
    textAlign: 'center',
    verticalAlign: 'middle',
    width: theme.spacing(size),
    height: theme.spacing(size),
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    lineHeight: `${theme.spacing(size)}px`,
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down('md')]: {
      width: theme.spacing(mdSize),
      height: theme.spacing(mdSize),
      lineHeight: `${theme.spacing(mdSize)}px`,
    },
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(xsSize),
      height: theme.spacing(xsSize),
      lineHeight: `${theme.spacing(xsSize)}px`,
    },
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
