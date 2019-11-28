import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, ListItem, ListItemAvatar, List, ListItemText, Avatar, Grid, Divider, Button, IconButton, Tooltip } from '@material-ui/core';
import { Link, Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import ClearIcon from '@material-ui/icons/Clear'
import EmploymentDetails from '../EmploymentDetails';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import api from '../../api';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import InfoIcon from '@material-ui/icons/Info';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import InvitationResponse from './NotificationActions/InvitationResponse' ; 
import MeetupCompleteResponse from './NotificationActions/MeetupCompleteResponse' ; 
import WriteRecommendation from './NotificationActions/WriteRecommendation' ; 
import ViewDetails from './NotificationActions/ViewDetails';
import { useSnackbar } from 'notistack';
import defaultImg from '../../images/defaultImg.jpg'



const useStyles = makeStyles(theme => ({
    root: {
        width:400, 
        height:"fit-content",
        backgroundColor:'white',
        maxHeight: 500, 
        overflowY: 'auto'
    },
    paper: {
      margin: theme.spacing(1),
      width: 200,
      height: 500,
    },
    headerBar: {
        paddingLeft:'13%', 
        paddingTop:'5%', 
        backgroundColor:'#024966',
        position: 'sticky',
        top: '0px',
        zIndex: 10,
    },
    headerIcon : {
        marginTop: 0,
        width: 30,
        height: 30 , 
        verticalAlign: "text-top",
        transform: "rotate(340deg)" ,
        color:'whitesmoke',
        marginRight:10
    },
    listItem: {
        backgroundColor:'white',
        '&:hover': {
            backgroundColor: 'whitesmoke',
        } 
    },
    divider: {
        backgroundColor: 'lightgrey',
        marginLeft: '10%',

    },
    icon :{
        height:20,
        width:20
    },
    imgProps : {
        width: 'inherit',
        border: 0,
        height: 'fit-content',
        objectFit : 'contain' ,
    },
    closeIcon : {
        color:'grey',
        '&:hover': {
            color:'black',
        }
    }

  }));

//   const defaultImg = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"

export default function NotificationsListItem(props) {
    console.log("Entered NotificationsList  ITEM ")
    console.log(props)
    console.log("Path Name ")
    var pathname = window.location.pathname; 
    console.log(pathname)
    // if (pathname.includes("/profile/social")) {
    //     console.log("REDIRECT")
    // } else {
    //     console.log("DONT REDIRECT")
    // }

    const classes = useStyles();
    const { alert } = props;
    const [ loadingNotifications, setLoadingNotifications ] = useState(false);
    const [ openMessage, setOpenMessage ] = useState(false);
    const [ openAction, setOpenAction ] = useState(false);
    const [ anchorEl, setAnchorEl ] = useState(null);
    const [ redirect, setRedirect ] = useState(false);
    const [ actionHover, setActionHover ] = useState(false);

    const alertTypes = ["MEETUP_INVITE", "ACCEPT_INVITE", "CANCEL_MEETUP", "CHANGE_MEETUP_DATE", "COMPLETE_MEETUP", "RECOMMENDATION_REQUEST", "WRITE_RECOMMENDATION"]
    const alertHeaders = [
        { title: "New Meetup Invitation", verb:'From' } , 
        { title:"Invitation Accepted", verb:'With'  }, 
        { title:"Meetup Was Cancelled", verb:'With' }, 
        { title:"Meetup Date Changed", verb:'By' }, 
        { title:"Request a Recommendation", verb:'From'}, 
        { title:"Recommendation Request", verb:'From' }, 
        { title:"New Recommendation", verb:'From'},
    ]

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const action = key => (
        <Fragment>
            <IconButton onClick={() => { closeSnackbar(key) }} size="small" style={{ color:'white' }}>
                <ClearIcon/>
            </IconButton>
        </Fragment>
    );



    const calculateDaysAgo = (dateString) => {
        const currentDate = new Date();
        const alertDate = new Date(dateString);
        const dayDifference = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(alertDate.getFullYear(),alertDate.getMonth(), alertDate.getDate()) ) /(1000 * 60 * 60 * 24))

        const hourDifference = Math.floor(currentDate.getHours() - alertDate.getHours());
        const minuteDifference = Math.floor(currentDate.getMinutes() - alertDate.getMinutes());

        if(dayDifference > 0){
            return (dayDifference + " days ago")
        } else if (dayDifference === 0 && hourDifference > 0) {
            
            return (hourDifference + " hours ago")
        } else if (hourDifference===0 && minuteDifference > 0 ) {
            return (minuteDifference + " min ago")
        } else {
            return "seconds ago"
        }
    }

    const handleSeen = (showSnackbar) => { 
        console.log("ENTERED HANDLE SEEN METHOD")
        // setLoadingNotifications(true);
        api.alerts.seen({"alert_id": alert.alert_id })
        .then(res => {
            console.log(res.data);
            if(res.data.response_code === 200){
                console.log("** SUCCESSFULLY MARKED AS SEEN **")
                console.log("Loading Status = " + loadingNotifications)
                if(showSnackbar){
                    enqueueSnackbar("Marked as Seen",  { variant: "", action } );
                }
                props.retrieveAlerts();
            }
        
        }).catch (err => {
            console.log(err)
            if(showSnackbar){
                enqueueSnackbar("Unable to mark as seen",  { variant: "error", action } );
            }
        })
    }

    const showMessage = (event) => {
        console.log("ENTERED show Message in Notification.js")
        event.preventDefault();
        console.log(event)
        // console.log(event.currentTarget)
        // console.log(event.relatedTarget)
        const anchor = event.currentTarget
        // console.log(anchor)
        setAnchorEl(anchor);
        setTimeout(()=> {setOpenMessage(true)},200)
        
    }

    const handleCloseEmploymentDetails = () => {
        console.log("ENTERED Handle handleCloseEmploymentDetails in Notification.js")
        setOpenMessage(false);
    }

    const openActions =(event)=> {
        console.log("ENTERED show Actions in Notification.js")
        event.preventDefault();
        console.log(event)
        const anchor = event.currentTarget
        console.log(anchor)
        setAnchorEl(anchor);
        setTimeout(()=> {setOpenAction(true)},200)
    }

    const handleCloseActions = () =>{
        console.log("ENTERED handleCloseActions in Notification.js")
        setOpenAction(false);
    }

    const enableRedirect = () => {
        handleSeen(false);
        setRedirect(true);
    }

    const handleActionHover = () => {
        setActionHover(true);
    }
    const handleNoActionHover = () => {
        setActionHover(false);
    }


    const handleRedirect = (alertType) => {
        props.handleClosePopover();


        // if (pathname.includes("/profile/social")) {
        //     console.log("REDIRECT")
            if(alertType==="MEETUP_INVITE" || alertType==="ACCEPT_INVITE" || alertType==="CANCEL_MEETUP" || alertType==="CHANGE_MEETUP_DATE"  ) {
            
                return (
                    <Redirect
                      to={{
                          pathname: "/profile/social",
                          state: {tabIndex: 1}
                      }}
                    />
                )
            } else if (alertType === ""){
                return;
            } else {
                
                return (
                    <Redirect
                      to={{
                          pathname: "/profile/social",
                          state: {tabIndex: 2}
                      }}
                    />
                )
            }
        // } else {
        //     console.log("DONT REDIRECT")
        // }
    }

    // const closePopover = () => {
    //     handleClosePopover();
    // }

    console.log("RENDERING Notification LIST ITEM")
    console.log(alert)
    
    return (
        <div style={{marginBottom:'2%'}}>
        <ListItem  className={classes.listItem} style={{ paddingLeft:0, }} >
                                
            <ListItemAvatar style={{alignSelf:'flex-start', marginTop:9, marginRight:15,marginLeft:'10%' }} >
                <Avatar src={alert.from_user && alert.from_user.social && alert.from_user.social.profile_image_link ? alert.from_user.social.profile_image_link : defaultImg } style={{width:50, height:50}} imgProps={{className: classes.imgProps}}/>
            </ListItemAvatar>
            
            <ListItemText>
                <Grid item container justify="space-between" alignItems="center" style={{height:'fit-content'}}>
                    <Grid item xs={11} style={{maxWidth:'inherit'}}>
                        <div onClick={() => enableRedirect() } >
                            <Typography style={{fontSize:17, fontWeight:'bold'}} >
                                { alertHeaders[alertTypes.indexOf(alert.alert_type)].title }
                            </Typography>
                            <Typography>
                                {alert.from_user && alert.from_user.profile 
                                ? `${ alertHeaders[alertTypes.indexOf(alert.alert_type)].verb } ${alert.from_user.profile.username}`
                                
                                : 'From Unidentified Member'
                                }
                            </Typography>
                        </div>
                    
                        { alert.work_experience 
                        ? 
                        <div>
                            <Typography style={{}}>
                                {alert.work_experience.job_title}
                                <IconButton  size="small" onClick={showMessage} >
                                    <HelpOutlineIcon className={classes.icon}/>
                                </IconButton>
                                {openMessage 
                                ?  <EmploymentDetails buttonExist={true} jobDetails={alert.work_experience} anchorEl={anchorEl} openMessage={openMessage} handleCloseEmploymentDetails={handleCloseEmploymentDetails} username={alert && alert.from_user && alert.from_user.profile  ? alert.from_user.profile.username : ''}/>
                                : ""
                                }
                            </Typography>
                        </div>
                        : ""
                        }
                        <Typography>
                            {calculateDaysAgo(alert.created_datetime)}
                        </Typography>
                    </Grid>
                    <Grid item xs={1} container direction="column" justify="space-between" alignItems="center" style={{textAlign:'end', alignSelf: "flex-start", height:'13vh'}}>
                        <Grid item style={{}}>
                            <Tooltip title="Mark as Seen" placement="bottom-start">
                                <IconButton size="small" onClick={()=> handleSeen(true)}  style={{ backgroundColor:'transparent' }}>
                                    <ClearIcon className={classes.closeIcon}/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item  style={{}}>
                            { alert.alert_type === "WRITE_RECOMMENDATION" || alert.alert_type === "CHANGE_MEETUP_DATE" 
                            ?
                                <IconButton size="small" style={{padding:0}} onClick={openActions} onMouseEnter={handleActionHover} onMouseLeave={handleNoActionHover}>
                                    {actionHover? <InfoIcon/> : <InfoOutlinedIcon/>}
                                    
                                </IconButton>
                            : alert.alert_type === "ACCEPT_INVITE" || alert.alert_type === "CANCEL_MEETUP" 
                            ? ''
                            :
                                <IconButton size="small" style={{ padding:0,backgroundColor:'transparent' }} onClick={openActions}>
                                    <MoreHorizIcon className={classes.closeIcon} /> 
                                </IconButton>
                            }
                            
                            { openAction
                            ?
                            alert.alert_type === "MEETUP_INVITE"
                            ? <InvitationResponse alert={alert} handleCloseActions={handleCloseActions} openAction={openAction} anchorEl={anchorEl} handleSeen={handleSeen} enableRedirect={enableRedirect} /> : 
                            alert.alert_type === "COMPLETE_MEETUP" 
                            ? <MeetupCompleteResponse alert={alert} handleCloseActions={handleCloseActions} openAction={openAction} anchorEl={anchorEl} handleSeen={handleSeen} enableRedirect={enableRedirect} /> : 
                            alert.alert_type === "RECOMMENDATION_REQUEST" 
                            ? <WriteRecommendation alert={alert} handleCloseActions={handleCloseActions} openAction={openAction} anchorEl={anchorEl} handleSeen={handleSeen} enableRedirect={enableRedirect}/> :
                            alert.alert_type === "WRITE_RECOMMENDATION" || alert.alert_type === "CHANGE_MEETUP_DATE"
                            ? <ViewDetails alert={alert} handleCloseActions={handleCloseActions} openAction={openAction} anchorEl={anchorEl} handleSeen={handleSeen} enableRedirect={enableRedirect}/> : ''
                            : "" 
                            }
                        </Grid>
                    </Grid>
                    
                </Grid>
            </ListItemText>
        </ListItem>
        <Divider className={classes.divider} />
        {redirect
        ? 
        handleRedirect(alert ? alert.alert_type : "")
        :""
        }
        </div>
    )
}
