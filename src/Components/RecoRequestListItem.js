import React , { useState, useEffect, Fragment } from 'react';
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
import { Hidden, IconButton, Tooltip } from '@material-ui/core';
import { Block } from '@material-ui/icons';
import api from '../api';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Badge from '@material-ui/core/Badge';
import CloseIcon from '@material-ui/icons/Close';
import ClearIcon from '@material-ui/icons/Clear'
import EmploymentDetails from './EmploymentDetails'
import viewProfileBG from '../images/viewProfileBG.jpg'
import { useSnackbar } from 'notistack';


const useStyles = makeStyles(theme => ({
    inline: {
        display: 'inline',
    },
    root: {
        minWidth: 0,
        marginRight:'3.5%'
    },
    avatar: {
        width: 50,
        height: 50,
        marginTop: 10,
        backgroundImage: `url(${viewProfileBG})`,
        backgroundSize: 'cover'
    },
    avatarImg:{
        width: 'inherit',
        border: 0,
        height: 'fit-content',
        objectFit : 'contain' ,
        '&:hover': {
            opacity: 0.55,
        }
    },
    calendar: {
        marginRight: 10,
        display: 'inline'
    },
    button: {
        margin: theme.spacing(1),
        marginRight:0
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
    closeIcon : {
        color:'grey',
        '&:hover': {
            color:'black',
        }
    },
    
}));

const defaultImg = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"

export default function AlignItemsList(props) {

    const { meetup, handleProcessRequestFromCompletedMeetup, getCompletedMeetups } = props 
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const classes = useStyles();
    const [requestMessage, setRequestMessage] = useState()
    const [openDialog, setOpenDialog] = useState(false);
    // const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    // const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const errorMsg = "An Error Has Occured! Request was Unsucessful"
    const successMsg = "Requst Sent! "
    const [ hoverOnPic, setHoverOnPic ] = useState(false);

    const action = key => (
        <Fragment>
            <IconButton onClick={() => { closeSnackbar(key) }} size="small" style={{ color:'white' }}>
                <ClearIcon/>
            </IconButton>
        </Fragment>
    );

    const handleChange = event => {
        //console.log(event.target.value);
        setRequestMessage(event.target.value);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }
    const handleCloseDialog = () => {
        setOpenDialog(false)
    }
    
    const handleSendRequest = event => {
        event.preventDefault();
        console.log('**** Entered handleSendRequest ****')
        console.log(meetup)
        console.log(requestMessage)
        const targetUser = 
        meetup.other_user && meetup.other_user.profile
        ? meetup.other_user.profile.user_id
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
        setOpenDialog(false);

        api.recommendations.request({
            target_user: targetUser,
            message: message
        })
        .then(res => {
            
            console.log(res.data)
            if(res.data.response_code === 200){
                console.log('**** Successfully Send Recommendation Request ****')
                enqueueSnackbar('Recommendation Request Sent Successfully',  { variant: "success", action } );
                getCompletedMeetups();
                
            } else {
                enqueueSnackbar('Unable to Send Recommendation Request',  { variant: "error", action } );
            }
            
        }).catch(err=>{
            console.log(err)
            enqueueSnackbar('Unable to Perform Operation',  { variant: "error", action } );
            setOpenDialog(false);
        })
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

    console.log("JUST BEFORE RENDER")
    return (
        <div>
            <ListItem alignItems="flex">
                <ListItemAvatar className={classes.root}>
                    <Avatar src={meetup.other_user && meetup.other_user.social ? meetup.other_user.social.profile_image_link : defaultImg} 
                    className={classes.avatar} 
                    imgProps={{className: classes.avatarImg}}
                    onClick={()=> props.redirectProfile(meetup.other_user && meetup.other_user.profile ? meetup.other_user.profile.user_id : null)}
                    />
                </ListItemAvatar>
                <Grid container alignItems="center" justify="space-between">
                    <Grid item xs={8}>
                        <ListItemText
                            primary={
                                <Typography
                                    component="div"
                                    variant="h6"
                                    style={{ fontWeight: 'bold', lineHeight: 'inherit' }}
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {meetup.other_user && meetup.other_user.profile
                                    ? meetup.other_user.profile.username
                                    : 'USER' 
                                    }
                                </Typography>
                            }
                            secondary={
                                <Grid container >
                                    <Grid item style={{paddingBottom:'3%'}}>
                                        {meetup.other_user && meetup.other_user.work_experience 
                                        ?
                                        <Typography>
                                            {meetup.other_user.work_experience.job_title}
                                            <EmploymentDetails jobDetails={meetup.other_user.work_experience}
                                            username={meetup.other_user && meetup.other_user.profile
                                                ? meetup.other_user.profile.username 
                                                : 'User'
                                                }/>
                                        </Typography> 
                                        
                                        : ""}
                                        
                                    </Grid>
                                    <Grid item container alignItems="center">
                                        <CalendarTodayIcon className={classes.calendar} />
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textSecondary"
                                            style={{ fontSize: 'medium' }}
                                        >
                                            {formatDate(meetup.suggested_datetime,'short')}
                                        </Typography>
                                    </Grid>
                                    
                                </Grid>
                            }
                        />
                    </Grid>

                    <Grid item xs={4} container direction="column">
                        <Grid item style={{textAlign:'end'}}>
                        <Tooltip title={`Remove If Recommendation From ${meetup.other_user && meetup.other_user.profile? meetup.other_user.profile.username:'User'} Is Not Needed`}  
                        placement="top-start">
                            <IconButton style={{ padding:0, backgroundColor:'transparent' }} onClick={()=> handleProcessRequestFromCompletedMeetup(meetup)} size="small">
                                <CloseIcon className={classes.closeIcon}/>
                            </IconButton>
                        </Tooltip>
                        </Grid>
                        <Grid item style={{ textAlign:'end' }}>
                            <Button color="primary" edge="end" variant="outlined" className={classes.button}
                            onClick={() => handleOpenDialog()}>
                                Request
                            </Button>
                        </Grid>
                        
                    </Grid>

                </Grid>
            </ListItem>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <form onSubmit={handleSendRequest}>
                <DialogContent style={{padding:'10%', paddingBottom:'1%'}}>
                    <Grid container>
                        <Grid item container xs={12}>
                            <Grid item xs={12} sm={3} className={classes.avatarGrid}>
                                <Avatar
                                src={meetup.other_user && meetup.other_user.social ? meetup.other_user.social.profile_image_link : defaultImg} 
                                alt='list'
                                className={classes.dialogAvatar}/>
                            </Grid>
                            <Grid item container xs={12} sm={8} style={{}}>
                                <Grid item container xs={12}>
                                    <Grid item xs={4} className={classes.headers}>
                                        Name:
                                    </Grid>
                                    <Grid item xs={8} style={{ paddingLeft:'3%' }}>
                                        <Typography gutterBottom>
                                            {meetup.other_user && meetup.other_user.profile
                                            ? meetup.other_user.profile.username.toUpperCase()
                                            : 'USER' 
                                            }
                                        </Typography>
                                    </Grid>

                                </Grid>
                                <Grid item container xs={12} >
                                    <Grid item xs={4} className={classes.headers}>
                                        Job Title
                                    </Grid>
                                    <Grid item xs={8} style={{ paddingLeft:'3%' }} >
                                        <Typography gutterBottom>
                                            {meetup && meetup.other_user && meetup.other_user.work_experience? meetup.other_user.work_experience.job_title : ""}
                                            {/* <EmploymentDetails jobDetails={ meetup && meetup.other_user ? meetup.other_user.work_experience : null }
                                            username={meetup && meetup.other_user && meetup.other_user.profile
                                                ? meetup.other_user.profile.username 
                                                : 'User'
                                                }/> */}
                                        </Typography>
                                    </Grid>

                                </Grid>
                                {/* <Grid item container xs={12} >
                                    <Grid item xs={4} className={classes.headers}>
                                        Company
                                    </Grid>
                                    <Grid item xs={8}>
                                        National University of Singapore
                                    </Grid>

                                </Grid> */}
                                <Grid item container xs={12} className={classes.headers}>
                                    <Grid item xs={4}>
                                        Meetup Date
                                    </Grid>
                                    <Grid item xs={8} style={{ paddingLeft:'3%' }} >
                                        <Typography gutterBottom>
                                            {formatDate(meetup.suggested_datetime,'long')}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                        <Grid container style={{marginTop:'2%',}}>
                            <Grid item xs={12} style={{textAlign:'center'}}>
                                <TextField
                                    id="standard-multiline-static"
                                    multiline
                                    rows="5"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    onChange={handleChange}
                                    label="Type a Message"
                                    required
                                    inputProps={{ maxLength: 2000 }}
                                />
                            </Grid>
                        </Grid>
                    
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                    Cancel
                </Button>
                <Button type='submit' color="primary" autoFocus>
                    Submit
                </Button>
                </DialogActions>
                </form>
            </Dialog>

            <Divider variant="inset" component="li" />
        </div>)
}