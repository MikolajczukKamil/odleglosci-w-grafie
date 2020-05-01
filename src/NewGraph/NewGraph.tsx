import React, { useState, useCallback } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import Topic from './Topic'
import parseGraph from './parseGraph'
import aviableGraphs, { addNewDefaultGraph } from './defaultGraphs'
import GraphToString from './GraphToString'
import CheckGraphMatrixStringReprezentation from './CheckGraphMatrixStringReprezentation'

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    maxWidth: theme.breakpoints.values.md,
    margin: `${theme.spacing(4)}px auto`
  },
  formControl: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      width: 512
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    },
  },
  select: {
    '&:focus': {
      backgroundColor: 'transparent'
    }
  },
  buttonList: {
    marginLeft: theme.spacing(4),
    paddingRight: theme.spacing(5),
    paddingLeft: theme.spacing(5),
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
      marginLeft: 0
    },
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
    GraphToString(aviableGraphs[selectedDefaultGraph].graph)
  )
  const [textError, setTextError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSelectChange = useCallback((event: React.ChangeEvent<{}>) => {
    const id: number = (event.target as any).value

    setSelectedDefaultGraph(id)
    setText(GraphToString(aviableGraphs[id].graph))
    setTextError(false)
  }, [])

  const useDefaultGraph = useCallback(() => {
    addNewGraph(aviableGraphs[selectedDefaultGraph].graph)
  }, [selectedDefaultGraph, addNewGraph])

  const handleChange = useCallback(
    ({ target }: React.ChangeEvent<{}>) => {
      const content: string = (target as any).value

      if (textError) {
        const err = CheckGraphMatrixStringReprezentation(content)

        if (err === null) {
          setTextError(false)
        }
      }

      setText(content)
    },
    [textError]
  )

  const handleBlur = useCallback(() => {
    const err = CheckGraphMatrixStringReprezentation(text)

    setTextError(err !== null)
    setErrorMessage(err || '')
  }, [text])

  const handleUseButton = useCallback(() => {
    if (textError || CheckGraphMatrixStringReprezentation(text) !== null) return

    const newGraph = parseGraph(text)

    addNewDefaultGraph(newGraph)
    addNewGraph(newGraph)
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
            {aviableGraphs.map(({ name }, id) => (
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
