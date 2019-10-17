import React, { useState, useRef } from 'react'
import { Grid, Typography, Box, Snackbar, IconButton, } from '@material-ui/core'
import CurrentSkillsView from './CurrentSkillsView'
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import SuggestedSkillsView from './SuggestedSkillsView'

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

function Skills() {
  const classes = useStyles();
  const queueRef = useRef([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);

  const processQueue = () => {
    if (queueRef.current.length > 0) {
      setMessageInfo(queueRef.current.shift());
      setOpen(true);
    }
  };

  const setSnackbar = (message, undoButton = false) => {
    queueRef.current.push({
      message,
      key: new Date().getTime(),
      undoButton
    });
    if (open) {
      // immediately begin dismissing current message
      // to start showing new one
      setOpen(false);
    } else {
      processQueue();
    }
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const handleExited = () => {
    processQueue();
  };


  return (
    <div>
      <Typography component="div">
        <Box
          fontSize="h5.fontSize"
          m={3.5}
          letterSpacing={3}
          fontWeight="fontWeightBold"
        >
          SKILLS
          </Box>
      </Typography>

      <CurrentSkillsView setSnackbar={setSnackbar}/>
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        onExited={handleExited}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{messageInfo ? messageInfo.message : undefined}</span>}

        action={
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        }
      />
      <SuggestedSkillsView setSnackbar={setSnackbar}/>
    </div>

  );
}

export default Skills;
