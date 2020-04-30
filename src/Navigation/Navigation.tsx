import React, { useState, useContext, useCallback, ChangeEvent } from 'react'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import { makeStyles, Theme } from '@material-ui/core/styles'

import TabPanel from './TabPanel'
import NewGraph from '../NewGraph'
import { graphContext } from '../GraphContext'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1
  },
  tab: {
    paddingRight: theme.spacing(5),
    paddingLeft: theme.spacing(5),
    maxWidth: 'max-content'
  }
}))

export default function Navigation() {
  const styles = useStyles()
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
      setOpenTabId(1)
    },
    [loadGraph]
  )

  return (
    <>
      <Paper color='default' classes={{ root: styles.root }} square>
        <Tabs
          value={openTabId}
          onChange={handleChange}
          centered
          indicatorColor='primary'
        >
          <Tab label='Wprowadzanie grafu' classes={{ root: styles.tab }} />
          <Tab
            label='Znajdowanie odległości'
            classes={{ root: styles.tab }}
            disabled={!isGraphLoaded}
          />
          <Tab
            label='Prezentacja grafu'
            classes={{ root: styles.tab }}
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

      <TabPanel value={openTabId} index={2}>
        Item Three
      </TabPanel>
    </>
  )
}
