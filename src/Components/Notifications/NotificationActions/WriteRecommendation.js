import React, { useEffect, useState, useRef, Fragment } from 'react'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { IconButton, Popover, Typography, Tooltip, Button, CardActions, Card, CardContent, TextField } from '@material-ui/core';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../../api';

import ClearIcon from '@material-ui/icons/Clear'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1.5),
        // width: '30%',
        maxWidth: 350,
        overflowWrap: 'break-word',
        width:'100%', 
        minWidth:'180px',
        // maxWidth: 350,
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
    const [ showConfirmation , setShowConfirmation ] = useState(false);
    const [ recoMessage, setRecoMessage ] = useState();
    const { alert } = props

    const action = key => (
        <Fragment>
            <IconButton onClick={() => { closeSnackbar(key) }}>
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

    const handleOpenMessage = () => {
        setShowMessage(true);
        setShowConfirmation(false);
    }
    const handleOpenConfirmation = () => {
        setShowConfirmation(true);
        setShowMessage(false)
    }

    const handleOpenDefault = () => {
        setShowConfirmation(false);
        setShowMessage(false)
    }


    const handleChange = event => {
        setRecoMessage(event.target.value);
    };

    const handleSendRecommendation = event => {
        event.preventDefault();
        console.log('**** Entered handleSendRequest ****')
        // console.log(alert)

        console.log(recoMessage)
        const targetUser = 
        alert.from_user && alert.from_user.profile
        ? alert.from_user.profile.user_id
        : null ;

        console.log(targetUser)

        const message = recoMessage
        let i;
        while(i < message.length) {
        if (message.charAt(i) == "'") {
            message =   message.slice(0, i) + "'" + message.slice(i)
            i++
        }
        i++
        }

        api.recommendations.submitRecommendation({
            target_user: targetUser,
            message: message
        })
        .then(res => {
            console.log(res.data)
            if(res.data.response_code === 200){
                console.log('**** Successfully Submitted the Recommendation ****')
                enqueueSnackbar('Recommendation Sent Successfully',  { variant: "success", action } );
                props.handleSeen();
                // props.enableRedirect();
            } else {
                enqueueSnackbar('Unable to Send Recommendation', { variant: "error", action  } );
            }
            props.handleCloseActions ? props.handleCloseActions() : closeAction()
        }).catch(err=>{
            console.log(err)
        })
    }


    const removeRecoRequest=(meetup)=>{
        console.log("received request_id" + meetup.request_id)
        api.recommendations.reject({
            "request_id": meetup.request_id
            }
        ).then(res=>{
            if(res.data.response_code===200){
                console.log('**** Successfully Rejected the Recommendation ****')
                enqueueSnackbar('Recommendation Rejected Successfully', { variant: "success", action } );
                props.handleSeen();
                // props.enableRedirect();
            } else {
                enqueueSnackbar('Unable to Reject Recommendation',  { variant: "error", action  } );
            }
        }).catch(err=>{
            console.log(err)
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
                    {showConfirmation && !showMessage
                    ?
                    <Tooltip title="View Message">
                        <IconButton style={{ padding:0, marginTop: 8, marginLeft: 8 }} onClick={()=> handleOpenDefault()}>
                            <ArrowBackIcon/>
                        </IconButton>
                    </Tooltip>
                    
                    :
                    !showConfirmation && showMessage  
                    ? 
                    <Tooltip title="View Options">
                        <IconButton style={{ padding:0, marginTop: 8, marginLeft: 8 }} onClick={()=> handleOpenConfirmation()}>
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
                    
                    {!showConfirmation && !showMessage
                    ? 
                    <Card elevation={0} >
                        <CardContent style={{padding:0, paddingLeft:'3%'}}>
                            <Typography style={{width:'85%', fontSize:20, fontWeight: 'bold'}} gutterBottom >
                                {alert.from_user ? alert.from_user.profile.username:'User'}'s Message
                            </Typography>
                            <Typography variant="subtitle2" style={{width:'85%'}} >
                                {alert && alert.recommendation_request ? alert.recommendation_request.message : 'User did not write a message'}
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
                    : showConfirmation && !showMessage
                    ?
                    <Card elevation={0} style={{}}>
                        <CardContent>
                            <Typography style={{ textAlign: 'center', fontSize:20, fontWeigh:'bold', width:'90%'}}>
                                Write a Recommendation for <b>{alert.from_user && alert.from_user.profile ? alert.from_user.profile.username : "User"}</b> ?
                            </Typography>
                        </CardContent>
                        <CardActions style={{ justifyContent : 'flex-end' }}>
                            <Tooltip title="Write Recommendation">
                                <Button size="small" color="primary" onClick={()=> handleOpenMessage()}>
                                    Yes
                                </Button>
                            </Tooltip>
                            <Tooltip title="Reject Recommendation">
                                <Button size="small" color="primary" onClick={()=> removeRecoRequest(alert && alert.recommendation_request ?alert.recommendation_request : null)}>
                                    No
                                </Button>
                            </Tooltip>
                            
                        </CardActions>
                    </Card>
                    :
                    !showConfirmation && showMessage 
                    ?
                    <Card elevation={0} style={{}}>
                        <form onSubmit={handleSendRecommendation}>
                            <CardContent style={{ padding:0 }}>
                                <TextField
                                    id="standard-multiline-static"
                                    multiline
                                    rows="4"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    onChange={handleChange}
                                    label={`Recommendation for ${alert.from_user && alert.from_user.profile ? alert.from_user.profile.username : "User" }`}
                                    required
                                    inputProps={{ maxLength: 2000 }}
                                />
                            </CardContent>
                            <CardActions style={{ justifyContent : 'flex-end', display:'flex', padding:0, paddingTop:5 }}>
                                <Tooltip title="Submit Recommendation! ">
                                    <Button size="small" color="primary" type='submit'>
                                        Send
                                    </Button>
                                </Tooltip>
                            </CardActions>
                        </form>
                    </Card>                   
                    :
                    ""
                    }
                </div>
            </Popover>
        </span>
    )
}
