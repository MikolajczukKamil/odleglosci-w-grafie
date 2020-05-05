import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import InfoIcon from '@material-ui/icons/Info'

import logo from '../img/logo.png'

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    backgroundColor: theme.palette.grey[100],
  },
  logo: {
    width: 192,
    margin: 'auto',
    display: 'block',
    marginBottom: theme.spacing(4),
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
        <InfoIcon />
      </IconButton>

      <Dialog onClose={closeDialog} open={open}>
        <DialogTitle classes={{ root: classes.title }}>
          Informacje o projekcie
        </DialogTitle>

        <DialogContent dividers>
          <img src={logo} alt="Logo" className={classes.logo} />

          <Typography gutterBottom>
            <b>Cel</b>
            <br />
            Wyznaczenie odległości pomiędzy dowolnymi wierzchołkami w grafie
            spójnym skierowanym. Wykorzystanie algorytmu BSF
          </Typography>

          <Typography gutterBottom>
            <b>Jak wprowadzić graf?</b>
            <br />
            Można skorzystać z gotowych grafów wybierając je z listy lub
            wprowadzić swój graf
          </Typography>

          <Typography gutterBottom>
            <b>Format danych</b>
            <br />
            Dwuwymiarowa tablica JSON np [ [0, 1], [1, 0] ]
          </Typography>

          <Typography>
            <b>Krótka instrukcja</b>
            <br />
            Jeżeli wybierzesz jeden z dostępnych grafów zostanie on załadowanych
            do edytora, można go wyedytować
            <br />
            Stworzone grafy zostaną zapisane i będą dostępne na liście
            <br />
            Dostęp do zakładek z znajdowaniem odległości oraz do wizualizacji
            grafu pojawi się po wybraniu grafu
            <br />
            Po wybraniu grafu przechodzimy do zakładki znajdowanie odległości,
            tam wybieamy wierzchołek startowy
            <br />
            Strzałkami na dole przechodzimy dokolejnych kroków algorytmu
            <br />
            Po przejściu całego algorytmu pojawi się raport końcowy, można go
            otworzyć różnież przyciskiem na dole
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
