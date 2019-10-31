import React, { useState, useRef, useEffect}from 'react'
import { Button, Typography, Box, Snackbar, IconButton,  } from '@material-ui/core'
import UserDetailsView from './UserDetailsView'
import ReadOnlyView from './ReadOnlyView'
import WorkWithDatepicker from './WorkWithDatepicker'
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import SocialProfileEdit from './SocialProfileEdit'
import SocialProfileRead from './SocialProfileRead'

const useStyles = makeStyles(theme => ({
    close: {
        padding: theme.spacing(0.5),
    },
  }));

function Profile(props) {
    const classes = useStyles();
    const [editProfileState, setEditProfileState] = React.useState(false)
    const [editSocialProfileState, setEditSocialProfileState] = React.useState(false)
    const queueRef = useRef([]);
    const [open, setOpen] = useState(false);
    const [messageInfo, setMessageInfo] = useState(undefined);
    const [setupState, setSetupState] = useState(false);


    /*useEffect(()=>{
        if(props.history.location.state!== undefined && props.history.location.state.setup === true) {//first time logging in
            setSetupState(true)
        }
    })*/
    const processQueue = () => {
        if (queueRef.current.length > 0) {
            setMessageInfo(queueRef.current.shift());
            setOpen(true);
        }
    };

    const setSnackbar = (message, undoButton=false) => {
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

    const changeProfileState = () => {
        console.log("change")
        const currentState = editProfileState
        setEditProfileState(!currentState)
    }
    const changeSocialProfileState = () => {
        console.log("change Social")
        const currentState = editSocialProfileState
        setEditSocialProfileState(!currentState)
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
                    PROFILE
              </Box>
            </Typography>
            
            {editProfileState ? <UserDetailsView changeState={changeProfileState} setSnackbar={setSnackbar} /> :
                <ReadOnlyView changeState={changeProfileState} />}
            <br />
            {setupState || editSocialProfileState? <SocialProfileEdit changeState={changeSocialProfileState} setSnackbar={setSnackbar}/> : <SocialProfileRead changeState={changeSocialProfileState}/>} 
                <br />
            <WorkWithDatepicker setSnackbar={setSnackbar}/>

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
                    /*messageInfo && messageInfo.undoButton? 
                    [
                    <Button color="secondary" size="small" onClick={handleUndo}>
                        UNDO
                    </Button>,
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                    ]:*/
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
            
        </div>
    )
}
export default connect(null)(Profile);
