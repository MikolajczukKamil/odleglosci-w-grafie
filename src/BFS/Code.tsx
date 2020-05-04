import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

export interface ICode {
  id: number
  content: string
  indentation: number
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& ::selection': {
      background: theme.palette.grey[500],
      color: theme.palette.common.white,
    },
    maxWidth: '100%',
    overflow: 'hidden',
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    width: 'fit-content',
    color: theme.palette.grey[800],
  },
  line: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(theme.typography.fontSize * 0.8),
    },
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },
  lineNb: {
    fontWeight: 'bold',
    textAlign: 'right',
    color: theme.palette.primary.main,
    paddingRight: theme.spacing(1),
  },
  lineContent: {
    paddingLeft: 4,
    whiteSpace: 'nowrap',
    paddingRight: theme.spacing(1),
  },
  indentation: {
    minWidth: theme.spacing(1.5),
    borderLeft: `1px solid ${theme.palette.grey[300]}`,
  },
}))

interface ICodeProps {
  code: ICode[]
  selectedLine: number
}

export default function Code({ code, selectedLine }: ICodeProps) {
  const classes = useStyles()

  const lineNbStyle = {
    minWidth: `${Math.floor(Math.log10(code.length) + 1)}em`,
  }

  return (
    <Paper classes={{ root: classes.root }}>
      {code.map(({ id, content, indentation }, i) => (
        <div key={id} className={classes.line}>
          <div className={classes.lineNb} style={lineNbStyle}>
            {i + 1}
          </div>

          {Array(indentation)
            .fill(0)
            .map((_, i) => (
              <div key={i} className={classes.indentation} />
            ))}

          <div
            style={{
              fontWeight: id === selectedLine ? 'bold' : 'normal',
            }}
            className={classes.lineContent}
          >
            {content}
          </div>
        </div>
      ))}
    </Paper>
  )
}
