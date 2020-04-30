import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Header from './Header'
import Navigation from './Navigation'
import { GraphContextProvider } from './GraphContext'

function App() {
  return (
    <CssBaseline>
      <GraphContextProvider>
        <Header />

        <Navigation />
      </GraphContextProvider>
    </CssBaseline>
  )
}

export default App
