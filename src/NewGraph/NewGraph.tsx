import React, { useState, useCallback } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import Topic from './Topic'
import CheckValue from './CheckValue'
import parseGraph from './parseGraph'
import defaultGraphs from './defaultGraphs'
import GraphToString from './GraphToString'

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    width: '100vw',
    maxWidth: theme.breakpoints.values.md,
    margin: `${theme.spacing(4)}px auto`
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 512
  },
  select: {
    '&:focus': {
      backgroundColor: 'transparent'
    }
  },
  buttonList: {
    marginLeft: theme.spacing(4),
    paddingRight: theme.spacing(5),
    paddingLeft: theme.spacing(5)
  },
  buttonText: {
    marginTop: theme.spacing(4),
    paddingRight: theme.spacing(5),
    paddingLeft: theme.spacing(5)
  },
  textField: {
    width: '100%',
    marginTop: theme.spacing(4)
  },
  textArea: {
    minHeight: 200
  }
}))

interface IPropsNewGraph {
  addNewGraph: (graphAdjacencyMatrix: number[][]) => void
}

export default function NewGraph({ addNewGraph }: IPropsNewGraph) {
  const classes = useStyles()
  const [selectedDefaultGraph, setSelectedDefaultGraph] = useState(0)
  const [text, setText] = useState(
    GraphToString(defaultGraphs[selectedDefaultGraph].graph)
  )
  const [textError, setTextError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSelectChange = useCallback((event: React.ChangeEvent<{}>) => {
    const id: number = (event.target as any).value

    setSelectedDefaultGraph(id)
    setText(GraphToString(defaultGraphs[id].graph))
    setTextError(false)
  }, [])

  const useDefaultGraph = useCallback(() => {
    addNewGraph(defaultGraphs[selectedDefaultGraph].graph)
  }, [selectedDefaultGraph, addNewGraph])

  const handleChange = useCallback(
    ({ target }: React.ChangeEvent<{}>) => {
      const content: string = (target as any).value

      if (textError) {
        const err = CheckValue(content)

        if (err === null) {
          setTextError(false)
        }
      }

      setText(content)
    },
    [textError]
  )

  const handleBlur = useCallback(() => {
    const err = CheckValue(text)

    setTextError(err !== null)
    setErrorMessage(err || '')
  }, [text])

  const handleUseButton = useCallback(() => {
    if (textError || CheckValue(text) !== null) return

    addNewGraph(parseGraph(text))
  }, [textError, text, addNewGraph])

  return (
    <>
      <Topic />

      <section className={classes.section}>
        <Typography variant='h6'>
          1. Wybierz jeden z domyślnie dostępnych grafów
        </Typography>

        <FormControl className={classes.formControl}>
          <Select
            value={selectedDefaultGraph}
            onChange={handleSelectChange}
            classes={{ root: classes.select }}
          >
            {defaultGraphs.map(({ name }, id) => (
              <MenuItem value={id} key={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          size='large'
          color='primary'
          variant='contained'
          classes={{ root: classes.buttonList }}
          onClick={useDefaultGraph}
        >
          Użyj
        </Button>
      </section>

      <section className={classes.section}>
        <Typography variant='h6' gutterBottom>
          2. Wprowadź swój graf za pomocą macierzy sąsiedztwa
        </Typography>

        <Typography>Format dwuwymiarowa tablica JSON</Typography>

        <TextField
          multiline
          error={textError}
          variant='outlined'
          onBlur={handleBlur}
          value={text}
          onChange={handleChange}
          placeholder='Macierz sąsiedztwa ...'
          classes={{ root: classes.textField }}
          label={textError ? errorMessage : undefined}
          inputProps={{ className: classes.textArea }}
        />

        <Button
          size='large'
          color='primary'
          variant='contained'
          disabled={textError}
          onClick={handleUseButton}
          classes={{ root: classes.buttonText }}
        >
          Użyj
        </Button>
      </section>
    </>
  )
}
