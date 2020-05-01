import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import Header from './Header'
import Navigation from './Navigation'
import { GraphContextProvider } from './GraphContext'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  }
})

function App() {
  const classes = useStyles()

  return (
    <CssBaseline>
      <GraphContextProvider>
        <div className={classes.root}>
          <Header />

          <Navigation />
        </div>
      </GraphContextProvider>
    </CssBaseline>
  )
}

export default App
