import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { Hidden } from '@material-ui/core';
import { Block } from '@material-ui/icons';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
    inline: {
        display: 'inline',
    },
    root: {
        minWidth: 80,
    },
    avatar: {
        width: 50,
        height: 50,
        marginTop: 10
    },
    calendar: {
        marginRight: 10,
        display: 'inline'
    },
    button: {
        margin: theme.spacing(1)
    },
    dialogAvatar : {
        width:95,
        height:95,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '-webkit-fill-available',
    },
    avatarGrid: {
        marginRight:'5%', 
        textAlign:'-webkit-center', 
        paddingLeft:'4%',
        [theme.breakpoints.down('xs')]: {
            marginBottom:'7%'
        },
    },
    headers : {
        fontWeight:'bold'
    },
    listAvatar: {
        margin:'5%',
        width:60, 
        height:60, 
        boxShadow:'0px 1px 5px 0px rgba(0,0,0,0.2)',
    },
    
}));

export default function RecommendationRequestSkeletonLoading() {
    const classes=useStyles();


    return (
        <div >
            <Skeleton variant='rect' style={{width:'28vw', height:'fit-content', padding:'5%',marginBottom:'4%'}}>
                <Grid container item xs={12}>
                    <Grid item xs={4}> 
                        <Skeleton variant='circle'
                            className={classes.listAvatar}
                        />
                    </Grid>
                    <Grid item xs={6} style={{textAlign:'left', paddingLeft:'2%', margin:'10px'}}> 
                        <Skeleton/>
                        <Skeleton/>
                    </Grid>
                </Grid>
            </Skeleton>
    </div>
    )
}
