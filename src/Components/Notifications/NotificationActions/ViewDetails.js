import React, { useEffect, useState, useRef } from 'react'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { IconButton, Popover, Typography, Tooltip, Button, CardActions, Card, CardContent, TextField } from '@material-ui/core';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../../api';

import ClearIcon from '@material-ui/icons/Clear'


const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1.5),
        // width: '30%',
        maxWidth: 350,
        overflowWrap: 'break-word',
        width:'100%', 
        minWidth:'180px',
        maxWidth: 350,
        maxHeight: 175,
        overflowY : 'auto',
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

export default function ViewDetails(props) {
    const classes = useStyles();
    const { alert } = props
    const [ openAction, setOpenAction ] = useState(false);
    const [ anchorEl, setAnchorEl ] = useState(null);


    useEffect(()=>{
        if(props.openAction) {
            setOpenAction(true)
        }
    },[props])

    const closeAction = () => {
        console.log("ENTERED closeAction in RecommendationResponse.js")
        setOpenAction(false)
    }


    const formatDate = (stringDate, length) => {
        const date = new Date(stringDate)
        if(length === "short") {
           var month = date.toLocaleString('en-GB', { month: 'short' });
        } else {
           var month = date.toLocaleString('en-GB', { month: 'long' });
        }
        

        return(date.getDate() + " " +  month + " " + date.getFullYear())
   }

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
                    {alert.alert_type === "WRITE_RECOMMENDATION" 
                    ?
                    <Card elevation={0} >
                        <CardContent style={{ padding:0, paddingLeft:'3%' }}>
                            <Typography style={{ fontSize:20, fontWeight: 'bold', minWidth:270, maxWidth:315 }} gutterBottom >
                                {alert.from_user ? alert.from_user.profile.username:'User'}'s Recommendation to You
                            </Typography>
                            <Typography variant="subtitle2" style={{}} >
                                {alert && alert.recommendation_request ?alert.recommendation_request.message : "Empty Recommendation"}
                            </Typography> 
                        </CardContent>
                    </Card>
                    : alert.alert_type === "CHANGE_MEETUP_DATE" 
                    ?
                    <Card elevation={0}>
                        <CardContent style={{ padding:0, paddingLeft:'3%' }}>
                            <Typography style={{ fontSize:18, fontWeight: 300, minWidth:270, maxWidth:315, paddingTop:'3%' }} gutterBottom >
                                Meetup with <b>{alert.from_user ? alert.from_user.profile.username:'User'}</b> resescheduled to <b>{alert && alert.meetup_invite ?
                                formatDate(alert.meetup_invite.suggested_datetime, "short") : 'Unknown Date' }</b>
                            </Typography>
                        </CardContent>
                    </Card>
                    : ""
                    }
                    <IconButton style={{ padding:0, alignSelf:'start' }} onClick={()=> props.handleCloseActions()}>
                        <ClearIcon/>
                    </IconButton>
                </div>

            </Popover>

            
        </span>
    )
}
