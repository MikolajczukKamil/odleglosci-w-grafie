import React, {
  useState,
  useContext,
  useCallback,
  ChangeEvent,
  useRef,
} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

import Queue from './Queue'
import Visited from './Visited'
import Distance from './Distance'
import { graphContext } from '../GraphContext'

const useStyles = makeStyles((theme: Theme) => ({
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  navigationIcon: {
    marginRight: theme.spacing(4),
    marginLeft: theme.spacing(4),
  },
  main: {
    flex: 1,
  },
}))

export default function BFS() {
  const classes = useStyles()
  const { isGraphLoaded, loadGraph, deleteGraph } = useContext(graphContext)

  return (
    <>
      <main className={classes.main}>
        <Queue queue={['A', 'B', 'C', 'D', 'E']} />
        <Visited visited={[true, true, false, true, false]} />
        <Distance distances={[Infinity, 3, Infinity, 1, 50]} />
      </main>

      <section className={classes.navigation}>
        <IconButton
          color="primary"
          title="poprzedni krok"
          aria-label="poprzedni krok"
          classes={{ root: classes.navigationIcon }}
        >
          <ArrowBackIcon fontSize="large" color="primary" />
        </IconButton>

        <IconButton
          color="primary"
          title="następny krok"
          aria-label="następny krok"
          classes={{ root: classes.navigationIcon }}
        >
          <ArrowForwardIcon fontSize="large" color="primary" />
        </IconButton>
      </section>
    </>
  )
}
