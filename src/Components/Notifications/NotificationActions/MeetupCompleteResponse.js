import React, { useEffect, useState, useRef, Fragment } from 'react'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { IconButton, Popover, Typography, Tooltip, Button, CardActions, Card, CardContent, TextField } from '@material-ui/core';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../../api';

import ClearIcon from '@material-ui/icons/Clear'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useSnackbar } from 'notistack';


const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1.5),
        // width: '30%',
        maxWidth: 350,
        overflowWrap: 'break-word',
        width:'100%', 
        minWidth:'180px',
        [theme.breakpoints.down('sm')]: {
            maxWidth: 333,
        },
    },
    icon : {
        width: 20,
        height: 20,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '-webkit-fill-available',
    },
}));


export default function MeetupCompleteResponse(props) {
    
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const classes=useStyles();
    const [ openAction, setOpenAction ] = useState(false);
    const [ anchorEl, setAnchorEl ] = useState(null);
    const [ showMessage , setShowMessage ] = useState(false);
    const [ requestMessage, setRequestMessage ] = useState()
    const { alert } = props

    const action = key => (
        <Fragment>
            <IconButton onClick={() => { closeSnackbar(key) }} size="small" style={{ color:'white' }}>
                <ClearIcon/>
            </IconButton>
        </Fragment>
    );
    
    useEffect(()=>{
        if(props.openAction) {
            setOpenAction(true)
        }
    },[props])

    const closeAction = () => {
        console.log("ENTERED closeAction in RecommendationResponse.js")
        setOpenAction(false)
    }

    const handleBack = () => {
        setShowMessage(false);
    }
    const handleOpenMessage = () => {
        setShowMessage(true);
    }
    const handleChange = event => {
        setRequestMessage(event.target.value);
    };

    const handleSendRequest = event => {
        event.preventDefault();
        console.log('**** Entered handleSendRequest ****')
        console.log(alert)
        console.log(requestMessage)
        const targetUser = 
        alert.from_user && alert.from_user.profile
        ? alert.from_user.profile.user_id
        : null ;

        const message = requestMessage
        let i;
        while(i < message.length) {
        if (message.charAt(i) == "'") {
            message =   message.slice(0, i) + "'" + message.slice(i)
            i++
        }
        i++
        }

        console.log(targetUser)

        api.recommendations.request({
            target_user: targetUser,
            message: message
        })
        .then(res => {
            console.log(res.data)
            if(res.data.response_code === 200){
                console.log('**** Successfully Send Recommendation Request ****')
                enqueueSnackbar('Recommendation Request Sent Successfully',  { 
                    variant: "success",
                    action 
                });
                props.handleSeen();
                props.enableRedirect();
            } else {
                enqueueSnackbar('Unable to send Recommendation Request',  { variant: "error", action });
            }
            props.handleCloseActions ? props.handleCloseActions() : closeAction()
        }).catch(err=>{
            console.log(err)
            enqueueSnackbar('Unable to send Recommendation Request',  { variant: "error", action });
        })
    }

    const handleProcessMeetup = (meetup) => {
        console.log("Entered Handle Cancel Request Method")
        console.log(meetup)
        api.recommendations.processRecord({ "request_id" : meetup.request_id })
        .then(res=>{
            console.log(res.data);
            if(res.data.response_code===200){
                console.log("Meetup Record Processed SUCCESSFULLY - OPEN SNACK BAR TO INFORM")
                enqueueSnackbar('Recommendation Request Cancelled Successfully',  { 
                    variant: "success" , 
                    action  
                });
                // props.handleSeen();
                props.enableRedirect();
            } else {
                enqueueSnackbar('Unable to Cancel Recommendation Request',  { 
                    variant: "error" , 
                    action  
                });
            }
            props.handleCloseActions ? props.handleCloseActions() : closeAction()
        
        }).catch(err=>{
            console.log(err)
            enqueueSnackbar('Unable to Cancel Recommendation Request',  { variant: "error", action });
        })
    }

    

    console.log("Rendering Recommendation Response")
    console.log(alert);
    return (
        <span>
            <Popover
                classes={{
                    paper: classes.paper,
                }}
                open={openAction}
                onClose={props.handleCloseActions ? props.handleCloseActions : closeAction}
                anchorEl={props.anchorEl ? props.anchorEl : anchorEl }
                anchorReference= {"anchorOrigin"}
                anchorReference= { "anchorOrigin"}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <div style={{ justifyContent:'space-between' , display:'flex' }}>
                    {showMessage 
                    ? 
                    <IconButton style={{ padding:0, marginTop: 8, marginLeft: 8 }} onClick={()=> handleBack()}>
                        <ArrowBackIcon/>
                    </IconButton>
                    : <IconButton disabled></IconButton>
                    }
                    
                    <IconButton style={{ padding:0, marginTop: 8, marginRight: 8 }} onClick={()=> props.handleCloseActions()}>
                        <ClearIcon/>
                    </IconButton>
                </div>
                <div>
                    
                    { !showMessage 
                    ?
                    <Card elevation={0} style={{}}>
                        <CardContent style={{ paddingTop:0, paddingBottom:0 }}>
                            <Typography style={{ textAlign: 'center', fontSize:20, fontWeigh:'bold', }}>
                                Request for a Recommendation? 
                            </Typography>
                        </CardContent>
                        <CardActions style={{ justifyContent : 'flex-end' }}>
                            <Button size="small" color="primary" onClick={()=> handleOpenMessage()}>
                                Yes
                            </Button>
                            <Button size="small" color="primary" onClick={()=> handleProcessMeetup(alert && alert.meetup_invite ?alert.meetup_invite : null)}>
                                No
                            </Button>
                        </CardActions>
                    </Card>
                    :
                    <Card elevation={0} style={{}}>
                        <form onSubmit={handleSendRequest}>
                            <CardContent style={{ padding:0 }}>
                                <TextField
                                    id="standard-multiline-static"
                                    multiline
                                    rows="4"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    onChange={handleChange}
                                    label={`Request message for ${alert.from_user && alert.from_user.profile ? alert.from_user.profile.username : "User" }`}
                                    required
                                    inputProps={{ maxLength: 2000 }}
                                />
                            </CardContent>
                            <CardActions style={{ justifyContent : 'flex-end', display:'flex', padding:0, paddingTop:5 }}>
                                <Tooltip title="Wish you the best of Luck!">
                                    <Button size="small" color="primary" type='submit'>
                                        SEND
                                    </Button>
                                </Tooltip>
                            </CardActions>
                        </form>
                    </Card>                         
                    }
                </div>
            </Popover>
        </span>
    )
}
