import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  shortContent: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    [theme.breakpoints.down('xs')]: {
      textTransform: 'lowercase',
    },
  },
}))

interface ITabLabelProps {
  content: string
  shortContent: string
}

export default function TabLabel({ content, shortContent }: ITabLabelProps) {
  const classes = useStyles()

  return (
    <>
      <span className={classes.content}>{content}</span>
      <span className={classes.shortContent}>{shortContent}</span>
    </>
  )
}
