import React, { Fragment } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import NodeBox from './NodeBox'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  spacer: {
    width: theme.spacing(1),
  },
}))

interface IVariable {
  name: string
  value: string
}

interface IVariablesProps {
  variables: (IVariable | null)[]
}

export default function Variables({ variables }: IVariablesProps) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {variables.map((variable) =>
        variable !== null ? (
          <Fragment key={variable.name}>
            <p>{variable.name}: </p>

            <NodeBox name={variable.value} />
            <div className={classes.spacer} />
          </Fragment>
        ) : null
      )}
    </div>
  )
}
