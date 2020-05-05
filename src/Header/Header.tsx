import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Info from './Info'

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.fontSize,
    },
  },
}))

export default function Header() {
  const classes = useStyles()

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          classes={{ root: classes.title }}
        >
          Kamil Mikołajczuk - Grafy i Sieci
        </Typography>

        <Info />
      </Toolbar>
    </AppBar>
  )
}
