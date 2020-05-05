import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import Topic from './Topic'
import useNewGraph from './useNewGraph'
import aviableGraphs from './defaultGraphs'

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    maxWidth: theme.breakpoints.values.md,
    margin: `${theme.spacing(2)}px auto`,
  },
  formControl: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      width: 512,
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
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
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
      marginLeft: 0,
    },
  },
  buttonText: {
    marginTop: theme.spacing(4),
    paddingRight: theme.spacing(5),
    paddingLeft: theme.spacing(5),
  },
  textField: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  textArea: {
    minHeight: 200,
  },
}))

interface IPropsNewGraph {
  addNewGraph: (graphAdjacencyMatrix: number[][]) => void
}

export default function NewGraph({ addNewGraph }: IPropsNewGraph) {
  const classes = useStyles()
  const {
    text,
    handleBlur,
    handleUseButton,
    handleChange,
    useDefaultGraph,
    handleSelectChange,
    errorMessage,
    textError,
    selectedDefaultGraph,
  } = useNewGraph(addNewGraph)

  return (
    <div>
      <Topic />

      <section className={classes.section}>
        <Typography variant="h6">
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
          size="large"
          color="primary"
          variant="contained"
          classes={{ root: classes.buttonList }}
          onClick={useDefaultGraph}
        >
          Użyj
        </Button>
      </section>

      <section className={classes.section}>
        <Typography variant="h6" gutterBottom>
          2. Wprowadź swój graf za pomocą macierzy sąsiedztwa
        </Typography>

        <Typography>Format dwuwymiarowa tablica JSON</Typography>

        <TextField
          multiline
          error={textError}
          variant="outlined"
          onBlur={handleBlur}
          value={text}
          onChange={handleChange}
          placeholder="Macierz sąsiedztwa ..."
          classes={{ root: classes.textField }}
          label={textError ? errorMessage : undefined}
          inputProps={{ className: classes.textArea }}
        />

        <Button
          size="large"
          color="primary"
          variant="contained"
          disabled={textError}
          onClick={handleUseButton}
          classes={{ root: classes.buttonText }}
        >
          Użyj
        </Button>
      </section>
    </div>
  )
}
