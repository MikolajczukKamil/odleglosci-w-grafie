import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import DoneAllIcon from '@material-ui/icons/DoneAll'

import Graph from '../Graph'
import { IStep } from './BFSAlgorythm'

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    backgroundColor: theme.palette.grey[100],
  },
  icon: {
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main,
  },
}))

interface IEndInfoProps {
  end: IStep
  start: number
}

export default function EndInfo({
  end: { visited, distances },
  start,
}: IEndInfoProps) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const startName = Graph.fromIndexToName(start)

  const openDialog = useCallback(() => {
    setOpen(true)
  }, [])

  const closeDialog = useCallback(() => {
    setOpen(false)
  }, [])

  const findedAll = visited.every((v) => v)

  return (
    <>
      <IconButton
        title="Raport"
        size="medium"
        onClick={openDialog}
        classes={{ root: classes.icon }}
      >
        <DoneAllIcon color="primary" />
      </IconButton>

      <Dialog onClose={closeDialog} open={open}>
        <DialogTitle classes={{ root: classes.title }}>Raport</DialogTitle>

        <DialogContent dividers>
          <Typography gutterBottom>
            {findedAll
              ? `Z wierzchołka ${startName} osiągalne są wszystkie wierzchołki`
              : `Nie wszystkie wierzchołki są nieosiągalne z wierzchołka ${startName} więc graf nie jest silnie spójny`}
          </Typography>

          <Typography gutterBottom>
            Odległości pomiędzy wierzchołkami to odpowiednio
          </Typography>

          {distances.map((dst, i) => (
            <Typography key={i}>
              z {startName} do {Graph.fromIndexToName(i)} -{' '}
              {Number.isFinite(dst) ? dst : 'nieosiągalny'}
            </Typography>
          ))}
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={closeDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
