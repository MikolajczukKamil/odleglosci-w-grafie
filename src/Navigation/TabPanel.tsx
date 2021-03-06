import React, { forwardRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles({
  root: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  box: {
    flex: 1,
    display: 'flex',
    maxWidth: '100%',
    flexDirection: 'column',
  },
})

interface TabPanelProps {
  index: number
  value: number
  fullContent?: boolean
  children?: React.ReactNode
}

/**
 * Displays TabPanel Content if value is equals index
 */
const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ children, value, index, fullContent = false }: TabPanelProps, ref) => {
    const classess = useStyles()

    const visable = value === index

    return (
      <div
        ref={ref}
        role='tabpanel'
        hidden={!visable}
        className={visable ? classess.root : undefined}
      >
        {visable ? (
          fullContent ? (
            children
          ) : (
            <Box p={2} className={classess.box}>
              {children}
            </Box>
          )
        ) : null}
      </div>
    )
  }
)

export default TabPanel
