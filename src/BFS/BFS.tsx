import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Typography from '@material-ui/core/Typography'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

import LastPageIcon from '@material-ui/icons/LastPage'
import FirstPageIcon from '@material-ui/icons/FirstPage'

import Code from './Code'
import Matrix from './Matrix'
import { BFSAlgorythm } from './BFSAlgorythm'
import useBFSAlgorithm from './useBFSAlgorithm'
import { Queue, Visited, Distance, Variables } from './Lists'

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
    marginTop: 'auto',
    userSelect: 'none',
    fontWeight: 'bold',
  },
  middle: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  formControl: {
    minWidth: theme.spacing(7),
    marginLeft: theme.spacing(2),
  },
  select: {
    textAlign: 'center',
  },
  start: {
    marginBottom: theme.spacing(1),
    display: 'flex',
  },
}))

export default function BFS() {
  const classes = useStyles()
  const {
    step,
    start,
    updateStart,
    steps,
    graph,
    nextStep,
    previusStep,
    scrollToEnd,
    currentStep,
    correctLoaded,
    scrollToBegining,
  } = useBFSAlgorithm()

  if (!correctLoaded) {
    return null
  }

  return (
    <>
      <main className={classes.main}>
        <div className={classes.start}>
          <Typography variant="h6">Wierzchołek startowy</Typography>

          <FormControl className={classes.formControl}>
            <Select
              value={start}
              onChange={updateStart}
              classes={{ root: classes.select }}
            >
              {graph.mapNodes((name, index) => (
                <MenuItem value={index} key={index}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <Queue queue={currentStep.queue} />
        <Visited visited={currentStep.visited} />
        <Distance distances={currentStep.distances} />
        <Variables
          variables={[
            currentStep.first.length !== 0
              ? { name: 'Pierwszy', value: currentStep.first }
              : null,
            currentStep.neighbor.length !== 0
              ? { name: 'Sąsiad', value: currentStep.neighbor }
              : null,
          ]}
        />
      </main>

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
          Krok: {step + 1} / {steps}
        </Typography>

        <div>
          <IconButton
            color="primary"
            title="Przewiń do końca"
            onClick={scrollToEnd}
            aria-label="Przewiń do końca"
            classes={{ root: classes.navigationIcon }}
            disabled={step >= steps - 1}
          >
            <LastPageIcon
              fontSize="large"
              color={step >= steps - 1 ? 'disabled' : 'primary'}
            />
          </IconButton>

          <IconButton
            color="primary"
            title="następny krok"
            onClick={nextStep}
            aria-label="następny krok"
            classes={{ root: classes.navigationIcon }}
            disabled={step >= steps - 1}
          >
            <ArrowForwardIcon
              fontSize="large"
              color={step >= steps - 1 ? 'disabled' : 'primary'}
            />
          </IconButton>
        </div>
      </section>
    </>
  )
}
