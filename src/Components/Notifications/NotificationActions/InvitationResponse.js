import React, { useEffect, useState, useRef } from 'react'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { IconButton, Popover, Typography, Tooltip, Card, Button, CardActions, CardContent } from '@material-ui/core';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../../api';
import ClearIcon from '@material-ui/icons/Clear'
import { Link, Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1.5),
        // width: '30%',
        maxWidth: 350,
        overflowWrap: 'break-word',
        width:'100%', 
        minWidth:'180px',
        maxWidth: 350,
        maxHeight: 230,
        overflowY : 'auto',
    },
    icon : {
        width: 20,
        height: 20,
    },
}));

export default function InvitationResponse(props) {
    const classes=useStyles();
    const [ openAction, setOpenAction ] = useState(false);
    const [ showConfirmation, setShowConfirmation ] = useState(false);
    const [ anchorEl, setAnchorEl ] = useState(null);
    const { alert } = props
    const [ redirect, setRedirect ] = useState(false);

    useEffect(()=>{
        if(props.openAction) {
            setOpenAction(true)
        }
    },[props])

    const closeAction = () => {
        console.log("ENTERED closeMessage in employmentDetails.js")
        setOpenAction(false)
    } 

    const handleOpenDefault = () => {
        setShowConfirmation(false);
    }

    const handleOpenConfirmation = () => {
        setShowConfirmation(true);
    }

    const handleAcceptInvitation = (meetup) => {
        console.log("ENTERED ACCEPT INVITATION ");
        console.log(meetup)
        
        api.invitations.acceptInvitation({request_id: meetup.request_id})
        .then(res=>{
            if(res.data.response_code === 200){
                console.log("*** INVITATION ACCEPTED *** INSERT A SNACKBAR TO INFORM USER");
                props.handleSeen();
                props.enableRedirect();
            } else {
                console.log("**** UNABLE TO ACCEPT INVITATION ****")
                console.log(res.data.response_code + res.data.response_message);
            }
            
            props.handleCloseActions ? props.handleCloseActions() : closeAction()
            
        }).catch(err => {
            console.log(err);

        })
        
    }
    const handleRejectInvitation = (meetup) => {
        console.log("ENTERED REJECT INVITATION ");
        console.log(meetup)
        api.invitations.rejectInvitation({request_id: meetup.request_id})
        .then(res => {
            if(res.data.response_code === 200){
                console.log("*** INVITATION CANCELLED *** INSERT A SNACKBAR TO INFORM USER");
                props.handleSeen();
                // props.enableRedirect();
            } else {
                console.log("**** UNABLE TO CANCEL INVITATION ****");
                console.log(res.data.response_code + res.data.response_message);
            }
            props.handleCloseActions ? props.handleCloseActions() : closeAction()
            
        }).catch(err => {
            console.log(err);

        })
    }

    console.log("RENDERING INVITATION RESPONSE");
    console.log(alert)

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
                    { showConfirmation
                    ? 
                    <Tooltip title="View Message">
                        <IconButton style={{ padding:0, marginTop: 8, marginLeft: 8 }} onClick={()=> handleOpenDefault()}>
                            <ArrowBackIcon/>
                        </IconButton>
                    </Tooltip>
                    : <IconButton disabled></IconButton>
                    }
                    <IconButton style={{ padding:0, marginTop: 8, marginRight: 8 }} onClick={()=> props.handleCloseActions()}>
                        <ClearIcon/>
                    </IconButton>
                </div>
                <div>
                    { !showConfirmation
                    ?
                    <Card elevation={0} >
                        <CardContent style={{padding:0, paddingLeft:'8%'}}>
                            <Typography style={{width:'85%', fontSize:20, fontWeight: 'bold'}} gutterBottom >
                                {alert.from_user ? alert.from_user.profile.username:'User'}'s Message
                            </Typography>
                            <Typography variant="subtitle2" style={{width:'85%'}} >
                                {alert && alert.meetup_invite ? alert.meetup_invite.message : 'User did not write a message'}
                            </Typography> 
                        </CardContent>
                        <CardActions style={{ justifyContent : 'flex-end' }}>
                            <Tooltip title="Proceed">
                                <IconButton size="small" color="primary" onClick={()=> handleOpenConfirmation()}>
                                    <ArrowForwardIcon/>
                                </IconButton>
                            </Tooltip>
                        </CardActions>
                    </Card>
                    : 
                    <Card elevation={0} style={{}}>
                        <CardContent style={{paddingTop:0}}>
                            <Typography style={{ textAlign: 'center', fontSize:20, fontWeigh:'bold'}}>
                                Accept Invitation? 
                            </Typography>
                        </CardContent>
                        <CardActions style={{ justifyContent : 'flex-end' }}>
                            <Button size="small" color="primary" onClick={()=> handleAcceptInvitation(alert &&  alert.meetup_invite ?alert.meetup_invite : null)}>
                                Yes
                            </Button>
                            <Button size="small" color="primary" onClick={()=> handleRejectInvitation(alert && alert.meetup_invite ?alert.meetup_invite : null)}>
                                No
                            </Button>
                        </CardActions>
                    </Card>
                    }
                </div>
                
            </Popover>
        </span>
    )
}
