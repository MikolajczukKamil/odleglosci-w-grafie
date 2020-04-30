import React, { useState, useCallback } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

import Topic from './Topic'

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    width: '100vw',
    maxWidth: theme.breakpoints.values.md,
    margin: `${theme.spacing(4)}px auto`,
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 512,
  },
  select: {
    '&:focus': {
      backgroundColor: 'transparent',
    },
  },
  buttonList: {
    marginLeft: theme.spacing(4),
    paddingRight: theme.spacing(5),
    paddingLeft: theme.spacing(5),
  },
  buttonText: {
    marginTop: theme.spacing(4),
    paddingRight: theme.spacing(5),
    paddingLeft: theme.spacing(5),
  },
  textArea: {
    width: '100%',
    marginTop: theme.spacing(4),
    '& textarea': {
      minHeight: 200,
    },
  },
}))

interface IPropsNewGraph {
  addNewGraph: (graphAdjacencyMatrix: number[][]) => void
}

interface IDefaultGraph {
  name: string
  graph: number[][]
}

const defaultGraphs: IDefaultGraph[] = [
  {
    name: 'Klasyka gatunku',
    graph: [],
  },
  {
    name: '10 wierzchołkowy wielokąt foremny',
    graph: [],
  },
  {
    name: 'Cuda na patyku',
    graph: [],
  },
]

export default function NewGraph({ addNewGraph }: IPropsNewGraph) {
  const classes = useStyles()
  const [selectedDefaultGraph, setSelectedDefaultGraph] = useState(0)
  const [newGraphValue, setNewGraphValue] = useState('')

  const handleSelectChange = (event: React.ChangeEvent<{}>) =>
    setSelectedDefaultGraph((event.target as any).value)

  const useDefaultGraph = useCallback(() => {
    addNewGraph(defaultGraphs[selectedDefaultGraph].graph)
  }, [selectedDefaultGraph])

  const handleChange = useCallback((event: React.ChangeEvent<{}>) => {
    const content: string = (event.target as any).value

    setNewGraphValue(content)
  }, [])

  return (
    <>
      <Topic />

      <section className={classes.section}>
        <Typography variant='h6'>1. Wybierz jeden z domyślnie dostępnych grafów</Typography>

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

        <Typography>Format tablica JSON lub macierz matlaba </Typography>

        <TextField
          classes={{ root: classes.textArea }}
          value={newGraphValue}
          onChange={handleChange}
          label='Graf'
          multiline
          variant='outlined'
        />

        <Button size='large' color='primary' variant='contained' classes={{ root: classes.buttonText }}>
          Użyj
        </Button>
      </section>
    </>
  )
}
