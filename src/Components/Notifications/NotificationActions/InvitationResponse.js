import React, { useEffect, useState, Fragment } from 'react'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { IconButton, Popover, Typography, Tooltip, Card, Button, CardActions, CardContent } from '@material-ui/core';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../../api';
import ClearIcon from '@material-ui/icons/Clear'
import { Link, Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useSnackbar } from 'notistack';


const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1.5),
        // width: '30%',
        overflowWrap: 'break-word',
        width:'100%', 
        minWidth:'180px',
        maxWidth: 350,
        maxHeight: 230,
        overflowY : 'auto',
        [theme.breakpoints.down('sm')]: {
            maxWidth: 333,
        },
    },
    icon : {
        width: 20,
        height: 20,
    },
}));

export default function InvitationResponse(props) {
    console.log("Path Name in Invitation Response ")
    var pathname = window.location.pathname; 
    console.log(pathname)

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const classes=useStyles();
    const [ openAction, setOpenAction ] = useState(false);
    const [ showConfirmation, setShowConfirmation ] = useState(false);
    const [ anchorEl, setAnchorEl ] = useState(null);
    const { alert } = props
    const [ redirect, setRedirect ] = useState(false);

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
                enqueueSnackbar('Invitation Accepted',  { variant: "success", action } );
                props.handleSeen(false);
                if (pathname.includes("/profile/social")) {
                    console.log("REDIRECT")
                    props.enableRedirect();
                }
            } else {
                console.log("**** UNABLE TO ACCEPT INVITATION ****")
                enqueueSnackbar('Unable to Accept Invitation', { variant: "error", action  });
                console.log(res.data.response_code + res.data.response_message);
            }
            
            props.handleCloseActions ? props.handleCloseActions() : closeAction()
            
        }).catch(err => {
            console.log(err);

            enqueueSnackbar('Unable to Perform Operation',  { variant: "error", action } );
            
        })
        
    }
    const handleRejectInvitation = (meetup) => {
        console.log("ENTERED REJECT INVITATION ");
        console.log(meetup)
        api.invitations.rejectInvitation({request_id: meetup.request_id})
        .then(res => {
            if(res.data.response_code === 200){
                console.log("*** INVITATION CANCELLED *** INSERT A SNACKBAR TO INFORM USER");
                enqueueSnackbar('Invitation Cancelled Successfully',  { variant: "success", action } );
                props.handleSeen(false);
                if (pathname.includes("/profile/social")) {
                    console.log("REDIRECT")
                    props.enableRedirect();
                }
            } else {
                console.log("**** UNABLE TO CANCEL INVITATION ****");
                enqueueSnackbar('Unable to Cancel Invitation',  { variant: "error", action } );

                console.log(res.data.response_code + res.data.response_message);
            }

            props.handleCloseActions ? props.handleCloseActions() : closeAction()
            
        }).catch(err => {
            console.log(err);
                enqueueSnackbar('Unable to Perform Operation',  { variant: "error", action } );
            
        })
    }
    const formatDate = (dateString) => {
        console.log("Entered FormatDate in MeetupInvitation")
        const date = new Date(dateString)
        var day = date.getDate();
        console.log(day)
        var year = date.getFullYear();
        var month = date.toLocaleString('en-GB', { month: 'short' });

        return day + " " + month + " " + year

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
                            <Tooltip title="You Can Change it Later!" placement="right-start">
                                <Typography style={{width:'fit-content', fontSize:12, fontWeight:500}}>
                                {alert.meetup_invite.suggested_datetime 
                                ? <span>Suggested Date: <u><b>{  formatDate(alert.meetup_invite.suggested_datetime)} </b></u></span>
                                : '' }
                                </Typography>
                            </Tooltip>
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
