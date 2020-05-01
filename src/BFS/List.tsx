import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  position: {
    fontWeight: 'bold',
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.main,
    textAlign: 'center',
    verticalAlign: 'middle',
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    lineHeight: `${theme.spacing(5)}px`,
    '&:hover': {
      boxShadow: theme.shadows[4],
    },
  },
  empty: {
    fontWeight: 'bold',
    marginLeft: theme.spacing(1),
  },
  disabled: {
    background: theme.palette.grey[500],
  },
  title: {
    width: 128,
  },
}))

interface IListValue {
  name: string
  disabled?: boolean
}

interface IListProps {
  title: string
  list: IListValue[]
  emptyMessage?: string
}

export default function List({ list, title, emptyMessage }: IListProps) {
  const classes = useStyles()

  return (
    <Paper elevation={5} classes={{ root: classes.root }}>
      <Typography classes={{ root: classes.title }}>{title}</Typography>

      {list.length === 0 ? (
        <Typography color="primary" classes={{ root: classes.empty }}>
          {emptyMessage}
        </Typography>
      ) : null}

      {list.map(({ name, disabled }, i) => (
        <Paper
          key={i}
          elevation={2}
          classes={{
            root: classNames(classes.position, {
              [classes.disabled]: disabled,
            }),
          }}
        >
          {name}
        </Paper>
      ))}
    </Paper>
  )
}
