import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import NodeBox, { size, mdSize, xsSize } from './NodeBox'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  empty: {
    fontWeight: 'bold',
    verticalAlign: 'middle',
    height: theme.spacing(size),
    lineHeight: `${theme.spacing(size)}px`,
    [theme.breakpoints.down('md')]: {
      height: theme.spacing(mdSize),
      lineHeight: `${theme.spacing(mdSize)}px`,
    },
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(xsSize),
      lineHeight: `${theme.spacing(xsSize)}px`,
    },
  },
  title: {
    width: theme.spacing(16),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  list: {
    display: 'flex',
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

      <div className={classes.list}>
        {list.map(({ name, disabled }, i) => (
          <NodeBox key={i} name={name} disabled={disabled} />
        ))}
      </div>
    </Paper>
  )
}
