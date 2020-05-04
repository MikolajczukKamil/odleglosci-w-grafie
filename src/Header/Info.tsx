import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Infoicon from '@material-ui/icons/Info'

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    backgroundColor: theme.palette.grey[100],
  },
}))

export default function Info() {
  const classes = useStyles()
  const [open, setOpen] = useState(localStorage.getItem('welcome') === null)

  useEffect(() => {
    localStorage.setItem('welcome', Date().toString())
  }, [])

  const openDialog = useCallback(() => {
    setOpen(true)
  }, [])

  const closeDialog = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <>
      <IconButton onClick={openDialog} color="inherit" title="Informacje">
        <Infoicon />
      </IconButton>

      <Dialog onClose={closeDialog} open={open}>
        <DialogTitle classes={{ root: classes.title }}>
          Informacje o projekcie
        </DialogTitle>

        <DialogContent dividers>
          <Typography gutterBottom>
            Cel: Wyznaczenie odległości pomiędzy dowolnymi wierzchołkami w
            grafie spójnym skierowanym
          </Typography>

          <Typography gutterBottom>
            Jak wprowadzić graf, można skorzystać z gotowych grafów wybierając
            je z listy lub wprowadzić swój graf.
            <br />
            Format danych to dwuwymiarowa tablica JSON np [ [0, 1], [1, 0] ]
            <br />
            Jeżeli wybierzesz jeden z dostępnych grafów zostanie on załadowanych
            do edytora, można go wyedytować
            <br />
            Stworzone grafy zostaną zapisane i będą dostępne na liście
          </Typography>

          <Typography gutterBottom>
            Dostęp do zakładek z znajdowaniem odległości oraz do wizualizacji
            grafu pojawi się po wybraniu grafu
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={closeDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
