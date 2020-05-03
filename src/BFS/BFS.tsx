import React, { useState, useContext, useCallback } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

import LastPageIcon from '@material-ui/icons/LastPage'
import FirstPageIcon from '@material-ui/icons/FirstPage'

import Code from './Code'
import Queue from './Queue'
import Matrix from './Matrix'
import NodeBox from './NodeBox'
import Visited from './Visited'
import Distance from './Distance'
import { BFSAlgorythm } from './BFSAlgorythm'
import { graphContext } from '../GraphContext'

const useStyles = makeStyles((theme: Theme) => ({
  navigation: {
    display: 'flex',
    marginTop: theme.spacing(2),
    justifyContent: 'space-between',
  },
  navigationIcon: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  main: {
    flex: 1,
  },
  step: {
    userSelect: 'none',
    fontWeight: 'bold',
    marginTop: 'auto',
  },
  middle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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

  const scrollToBegining = useCallback(() => {
    setStep(0)
  }, [])

  const scrollToEnd = useCallback(() => {
    setStep(algotythm !== null ? Math.max(algotythm.steps.length - 1, 0) : 0)
  }, [algotythm])

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
          <p>
            Pierwszy: <NodeBox name={currentStep.first} />
          </p>
        ) : null}

        {currentStep.neighbor.length !== 0 ? (
          <p>
            Sąsiad: <NodeBox name={currentStep.neighbor} />
          </p>
        ) : null}
      </div>

      <div className={classes.middle}>
        <Code code={BFSAlgorythm.code} selectedLine={currentStep.line} />

        <Matrix
          graph={graph}
          first={currentStep.firstIndex}
          markFirst={currentStep.markFirstInMatrix}
        />
      </div>

      <section className={classes.navigation}>
        <div>
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

          <IconButton
            color="primary"
            disabled={step <= 0}
            onClick={scrollToBegining}
            title="Przewiń do początku"
            aria-label="Przewiń do początku"
            classes={{ root: classes.navigationIcon }}
          >
            <FirstPageIcon
              fontSize="large"
              color={step <= 0 ? 'disabled' : 'primary'}
            />
          </IconButton>
        </div>

        <Typography classes={{ root: classes.step }}>
          Krok: {step + 1} / {algotythm.steps.length}
        </Typography>

        <div>
          <IconButton
            color="primary"
            title="Przewiń do końca"
            onClick={scrollToEnd}
            aria-label="Przewiń do końca"
            classes={{ root: classes.navigationIcon }}
            disabled={step >= algotythm.steps.length - 1}
          >
            <LastPageIcon
              fontSize="large"
              color={
                step >= algotythm.steps.length - 1 ? 'disabled' : 'primary'
              }
            />
          </IconButton>

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
              color={
                step >= algotythm.steps.length - 1 ? 'disabled' : 'primary'
              }
            />
          </IconButton>
        </div>
      </section>
    </>
  )
}
