import React from 'react'
import Box from '@material-ui/core/Box'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

/**
 * Displays TabPanel Content if value is equals index
 */
export default function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  const visable = value === index

  return (
    <div role='tabpanel' hidden={!visable} {...other}>
      {visable ? <Box p={3}>{children}</Box> : null}
    </div>
  )
}
