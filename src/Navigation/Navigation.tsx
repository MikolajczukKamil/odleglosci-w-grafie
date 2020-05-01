import React, { useState, useContext, useCallback, ChangeEvent, useRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import TabPanel from './TabPanel'
import NewGraph from '../NewGraph'
import { graphContext } from '../GraphContext'
import GraphPresentation from '../GraphPresentation'

const useStyles = makeStyles((theme: Theme) => ({
  tab: {
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(5),
      paddingLeft: theme.spacing(5)
    },
    maxWidth: 'max-content'
  }
}))

export default function Navigation() {
  const classes = useStyles()
  const networkTabPanelRef = useRef<HTMLDivElement>(null)
  const [openTabId, setOpenTabId] = useState(0)
  const { isGraphLoaded, loadGraph, deleteGraph } = useContext(graphContext)

  const handleChange = useCallback(
    (event: ChangeEvent<{}>, id: number) => {
      if (id === 0) deleteGraph()

      setOpenTabId(id)
    },
    [deleteGraph]
  )

  const addNewGraph = useCallback(
    (graphAdjacencyMatrix: number[][]) => {
      loadGraph(graphAdjacencyMatrix)
      setOpenTabId(2)
    },
    [loadGraph]
  )

  return (
    <>
      <Paper color='default' square>
        <Tabs centered value={openTabId} onChange={handleChange} indicatorColor='primary'>
          <Tab label='Wprowadzanie grafu' classes={{ root: classes.tab }} />

          <Tab
            label='Znajdowanie odległości'
            classes={{ root: classes.tab }}
            disabled={!isGraphLoaded}
          />

          <Tab
            label='Prezentacja grafu'
            classes={{ root: classes.tab }}
            disabled={!isGraphLoaded}
          />
        </Tabs>
      </Paper>

      <TabPanel value={openTabId} index={0}>
        <NewGraph addNewGraph={addNewGraph} />
      </TabPanel>

      <TabPanel value={openTabId} index={1}>
        Item Two
      </TabPanel>

      <TabPanel value={openTabId} index={2} fullContent ref={networkTabPanelRef}>
        <GraphPresentation containerRef={networkTabPanelRef} />
      </TabPanel>
    </>
  )
}
