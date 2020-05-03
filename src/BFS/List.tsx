import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import NodeBox from './NodeBox'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  empty: {
    fontWeight: 'bold',
    verticalAlign: 'middle',
    height: theme.spacing(5),
    lineHeight: `${theme.spacing(5)}px`,
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
        <NodeBox key={i} name={name} disabled={disabled} />
      ))}
    </Paper>
  )
}
