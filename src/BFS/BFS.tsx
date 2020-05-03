import React, { useState, useContext, useCallback } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

import Code from './Code'
import Queue from './Queue'
import Matrix from './Matrix'
import Visited from './Visited'
import Distance from './Distance'
import { BFSAlgorythm } from './BFSAlgorythm'
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
  step: {
    userSelect: 'none',
    fontWeight: 'bold',
    marginTop: 'auto',
  },
}))

export default function BFS() {
  const classes = useStyles()
  let [algotythm, setAlgorythm] = useState<BFSAlgorythm | null>(null)
  let [step, setStep] = useState(0)
  const { isGraphLoaded, graph } = useContext(graphContext)

  if (algotythm === null) {
    setAlgorythm((algotythm = new BFSAlgorythm(graph, 0)))
  }

  const nextStep = useCallback(() => {
    setStep((step) =>
      algotythm === null || step >= algotythm.steps.length ? step : step + 1
    )
  }, [algotythm])

  const previusStep = useCallback(() => {
    setStep((step) => (step <= 0 ? step : step - 1))
  }, [])

  if (!isGraphLoaded || algotythm.steps.length === 0) {
    return null
  }

  const currentStep = algotythm.steps[step]

  return (
    <>
      <main className={classes.main}>
        <Queue queue={currentStep.queue} />
        <Visited visited={currentStep.visited} />
        <Distance distances={currentStep.distances} />
      </main>

      <div>
        {currentStep.first.length !== 0 ? (
          <p>Pierwszy: {currentStep.first}</p>
        ) : null}
        {currentStep.neighbor.length !== 0 ? (
          <p>Sąsiad: {currentStep.neighbor}</p>
        ) : null}
      </div>

      <Code code={BFSAlgorythm.code} selectedLine={currentStep.line} />

      <Matrix graph={graph} first={currentStep.firstIndex} markFirst={currentStep.markFirstInMatrix} />

      <section className={classes.navigation}>
        <IconButton
          color="primary"
          disabled={step <= 0}
          onClick={previusStep}
          title="poprzedni krok"
          aria-label="poprzedni krok"
          classes={{ root: classes.navigationIcon }}
        >
          <ArrowBackIcon
            fontSize="large"
            color={step <= 0 ? 'disabled' : 'primary'}
          />
        </IconButton>

        <Typography classes={{ root: classes.step }}>
          Krok: {step + 1}/{algotythm.steps.length}
        </Typography>

        <IconButton
          color="primary"
          title="następny krok"
          onClick={nextStep}
          aria-label="następny krok"
          classes={{ root: classes.navigationIcon }}
          disabled={step >= algotythm.steps.length - 1}
        >
          <ArrowForwardIcon
            fontSize="large"
            color={step >= algotythm.steps.length - 1 ? 'disabled' : 'primary'}
          />
        </IconButton>
      </section>
    </>
  )
}
