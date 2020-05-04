import React, { useRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import BFS from '../BFS'
import TabLabel from './TabLabel'
import TabPanel from './TabPanel'
import NewGraph from '../NewGraph'
import useNavigation from './useNavigation'
import GraphPresentation from '../GraphPresentation'

const useStyles = makeStyles((theme: Theme) => ({
  tab: {
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(5),
      paddingLeft: theme.spacing(5),
    },
    maxWidth: 'max-content',
  },
}))

export default function Navigation() {
  const classes = useStyles()
  const networkTabPanelRef = useRef<HTMLDivElement>(null)
  const { openTab, addNewGraph, handleChange, isGraphLoaded } = useNavigation()

  return (
    <>
      <Paper color="default" square>
        <Tabs
          centered
          value={openTab}
          onChange={handleChange}
          indicatorColor="primary"
        >
          <Tab
            label={
              <TabLabel
                content="Wprowadzanie grafu"
                shortContent="Wprowadzanie"
              />
            }
            classes={{ root: classes.tab }}
          />

          <Tab
            label={
              <TabLabel
                content="Znajdowanie odległości"
                shortContent="Odległości"
              />
            }
            classes={{ root: classes.tab }}
            disabled={!isGraphLoaded}
          />

          <Tab
            label={
              <TabLabel
                content="Prezentacja grafu"
                shortContent="Prezentacja"
              />
            }
            classes={{ root: classes.tab }}
            disabled={!isGraphLoaded}
          />
        </Tabs>
      </Paper>

      <TabPanel value={openTab} index={0}>
        <NewGraph addNewGraph={addNewGraph} />
      </TabPanel>

      <TabPanel value={openTab} index={1}>
        <BFS />
      </TabPanel>

      <TabPanel value={openTab} index={2} fullContent ref={networkTabPanelRef}>
        <GraphPresentation containerRef={networkTabPanelRef} />
      </TabPanel>
    </>
  )
}
