import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, ListItem, ListItemAvatar, List, ListItemText, Avatar, Grid, Divider, Button, IconButton, Tooltip } from '@material-ui/core';
import { Link, Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import ClearIcon from '@material-ui/icons/Clear'
import EmploymentDetails from '../EmploymentDetails';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import api from '../../api';


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
        backgroundColor:'whitesmoke',
        '&:hover': {
            backgroundColor: 'white'
        } 
    }
  }));

  const defaultImg = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"

export default function NotificationsListItem(props) {
    const classes = useStyles();
    const { alert } = props;
    const [ loadingNotifications, setLoadingNotifications ] = useState(false);
    const [ openMessage, setOpenMessage ] = useState(false);
    const [ anchorEl, setAnchorEl ] = useState(null);

    const alertTypes = ["MEETUP_INVITE", "ACCEPT_INVITE", "CANCEL_MEETUP", "CHANGE_MEETUP_DATE", "COMPLETE_MEETUP", "RECOMMENDATION_REQUEST", "WRITE_RECOMMENDATION"]
    const alertHeaders = ["New Meetup Invitation", "Invitation Accepted", "Meetup Was Cancelled", "Meetup Date Changed", "Write a Recommendation", "New Recommendation Request", "Write a Recommendation", ]



    const calculateDaysAgo = (dateString) => {
        console.log("Entered Calculate Days Ago Method")
        
        const currentDate = new Date();
        const alertDate = new Date(dateString);
        console.log(currentDate)
        console.log(alertDate)
        const dayDifference = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(alertDate.getFullYear(),alertDate.getMonth(), alertDate.getDate()) ) /(1000 * 60 * 60 * 24))

        const hourDifference = Math.floor(currentDate.getHours() - alertDate.getHours());
        const minuteDifference = Math.floor(currentDate.getMinutes() - alertDate.getMinutes());
    

        // const minuteDifference = Math.floor((Date.UTC(alertDate.getFullYear(), alertDate.getMonth(), alertDate.getDate(), alertDate.getTime()) - Date.UTC(currentDate.getFullYear(),currentDate.getMonth(), currentDate.getDate(), currentDate.getTime()) ) /(1000 * 60))

        console.log(dayDifference)
        console.log(hourDifference)
        console.log(minuteDifference)

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

    const handleSeen = (alert) => { 
        console.log("ENTERED HANDLE SEEN METHOD")
        setLoadingNotifications(true);
        api.alerts.seen({"alert_id": alert.alert_id })
        .then(res => {
            console.log(res.data);
            if(res.data.response_code === 200){
                console.log("** SUCCESSFULLY MARKED AS SEEN **")
                console.log("Loading Status = " + loadingNotifications)
                props.retrieveAlerts();
            }
        
        }).catch (err => {
            console.log(err)
        })
    }

    const showMessage = (event) => {
        console.log("ENTERED show Message in Notification.js")
        event.preventDefault();
        console.log(event)
        // console.log(event.currentTarget)
        // console.log(event.relatedTarget)
        const anchor = event.currentTarget
        console.log(anchor)
        setAnchorEl(anchor);
        setTimeout(()=> {setOpenMessage(true)},200)
        
    }

    const handleCloseMessage = () => {
        console.log("ENTERED Handle Close Message in Notification.js")
        setOpenMessage(false);
    }

    return (
        <ListItem  className={classes.listItem} style={{ paddingLeft:0, }} >
                                
            <ListItemAvatar style={{alignSelf:'flex-start', marginTop:9, marginRight:15,marginLeft:'10%' }} >
                <Avatar src={alert.from_user && alert.from_user.social && alert.from_user.social.profile_image_link ? alert.from_user.social.profile_image_link : defaultImg } style={{width:50, height:50}}/>
            </ListItemAvatar>
            
            <ListItemText>
                <Grid item container justify="space-between" alignItems="center" >
                    <Grid item xs={10} style={{maxWidth:'inherit'}}>
                        <Link
                            to={{
                                pathname: "/profile/social",
                                state: alert.alert_type === "RECOMMENDATION_REQUEST" || alert.alert_type === "WRITE_RECOMMENDATION" || alert.alert_type === "COMPLETE_MEETUP" ? {tabIndex: 2} : {tabIndex: 1}
                            }}
                            style={{textDecoration:'none', color:'inherit',}}
                            onClick={()=> handleSeen(alert)}
                        >
                        
                            <Typography style={{fontSize:17, fontWeight:'bold'}} >
                                {alertHeaders[alertTypes.indexOf(alert.alert_type)]}
                            </Typography>
                            {alert.from_user && alert.from_user.profile 
                            ? `From ${alert.from_user.profile.username}`
                            
                            : 'From Unidentified Member'
                            }
                            </Link>
                            { alert.work_experience 
                            ? 
                            <div>
                                <Typography style={{}}>
                                    {alert.work_experience.job_title}
                                    <IconButton  size="small" onClick={showMessage} >
                                        <HelpOutlineIcon className={classes.icon}/>
                                    </IconButton>
                                    {openMessage 
                                    ?  <EmploymentDetails buttonExist={true} jobDetails={alert.work_experience} anchorEl={anchorEl} openMessage={openMessage} handleCloseMessage={handleCloseMessage}/>
                                    : ""
                                    }
                                    {/* {alert.work_experience
                                     ? <EmploymentDetails jobDetails={alert.work_experience} />
                                     : ""
                                    } */}
                                </Typography>
                            </div>
                            : ""
                            }
                            <Typography>
                                {calculateDaysAgo(alert.created_datetime)}
                            </Typography>
                        
                        
                    </Grid>
                    <Grid item xs={2} style={{textAlign:'end', alignSelf: "flex-start"}}>
                        <Tooltip title="Mark as Seen" placement="bottom-start">
                            <IconButton size="small" onClick={()=> handleSeen(alert)}>
                                <ClearIcon/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    
                </Grid>

                {/* {alert.from_user && alert.from_user.profile 
                ? `From ${alert.from_user.profile.username}`
                
                : 'From Unidentified Member'
                }
                { alert.work_experience 
                ? 
                <div>
                    <Typography>
                        {alert.work_experience.job_title}
                        <EmploymentDetails jobDetails={alert.work_experience}/>
                    </Typography>
                    
                </div>
                : ""
                } */}


                {/* <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                        <Typography>
                            {calculateDaysAgo(alert.created_datetime)}
                        </Typography>
                    </Grid>
                </Grid> */}
            </ListItemText>
        </ListItem>
    )
}
