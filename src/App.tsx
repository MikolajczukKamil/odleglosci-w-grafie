import React, { useEffect, useRef } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

import Main from './Main'

function App() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    Main(ref)
  }, [ref])

  return (
    <CssBaseline>
      <div ref={ref}></div>
    </CssBaseline>
  )
}

export default App
