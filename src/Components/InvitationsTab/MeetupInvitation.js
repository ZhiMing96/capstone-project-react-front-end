import React, { useEffect, useState, } from 'react';
import api from '../../api';
import { Grid, Button, CssBaseline, IconButton, Paper, Typography, Divider, 
    Box, InputBase, Container, ButtonBase, Avatar, Fab, Card, CardContent, 
    List, ListItemAvatar, ListItem, ListItemText, Slide, Popover, Tooltip, CardActions } from '@material-ui/core';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '../../Components/Snackbar';
import axios from 'axios'
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import MessageIcon from '@material-ui/icons/Message';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import EmploymentDetails from '../EmploymentDetails'
import FaceIcon from '@material-ui/icons/Face';
import viewProfileBG from '../../images/viewProfileBG.jpg'
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
    root:{

    },
    paper: {
        padding: theme.spacing(1.5),
        width: '30%',
        maxWidth: 350,
        minWidth: '226px',
        overflowWrap: 'break-word',
    },
    sectionHeading: {
        fontSize:20, 
        fontWeight:'bold', 
        color:'#0091ea',
        marginBottom:'2%',
        // marginTop:'2%',
        textAlign:'left',
    },
    carouselPaper: {
        width:'80%',
        textAlign: '-webkit-center', 
        padding:15, 
        marginBottom:5,
        marginTop:10,
        marginLeft:'5%'
    },
    carouselAvatar: {
        margin:'5%',
        marginTop:'0px',
        width:90, 
        height:90, 
        boxShadow:'0px 1px 5px 0px rgba(0,0,0,0.2)',
        // backgroundImage: "url('https://image.flaticon.com/icons/svg/64/64572.svg')",
        backgroundImage: `url(${viewProfileBG})` ,
        backgroundSize: 'cover'
    },
    carouselAvatarImg : {
        width: 'inherit',
        border: 0,
        height: 'fit-content',
        objectFit : 'contain' ,
        '&:hover': {
            opacity: 0.55,
        }
    },
    listAvatar: {
        margin:'5%',
        width:60, 
        height:60, 
        boxShadow:'0px 1px 5px 0px rgba(0,0,0,0.2)',
    },
    carouselUsername: {
        // marginTop:'6%',
        fontWeight:'bold', 
        fontSize:18,
        whiteSpace:'normal', 
        overflow:'hidden',
        textOverflow:'ellipsis',
        display:'-webkit-box',
        WebkitLineClamp:1,
        WebkitBoxOrient:'vertical',
    },
    card: {
        height: '100%',
        textAlign: 'center',
        alignItems: 'center',
        maxWidth:300
    }, 
    userDetails :{
        display: 'flex',
        flexDirection: 'column',
    },
    controlButtons :{
        width: 30,
        height: 30,
    },
    dialogButtons: {
        fontWeight:'bold', 
        fontSize:'20px',
        '&:hover': {
            backgroundColor: '#ffffff',
            color: '#024966',
            fontWeight: 'bold',
            borderColor: "#ffffff",
          }
    },
    messageIcon : {
        padding:0,
        paddingRight:'3%',
        color: 'grey',
        '&:hover': {
            color: 'black'
        } 
    },
    close: {
        float: "right",
        margin: theme.spacing(1),
    },
    avatar: {
        marginBottom: 20,
        marginTop: -10,
        width: 100,
        height: 100,
        backgroundImage: `url(${viewProfileBG})` ,
        backgroundSize: 'cover'
    },
    button: {
        margin: theme.spacing(1),
        marginRight:theme.spacing(0.5),
    },
  }))

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const defaultImg = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"

export default function MeetupInvitation(props) {
    const classes=useStyles();
    // console.log(props)
    const { invitation, handleDeclineInvitation, handleAcceptInvitation } = props
    const [OpenAcceptInvitationDialog, setOpenAcceptInvitationDialog] = useState(false); 
    const [OpenRejectInvitationDialog, setOpenRejectInvitationDialog] = useState(false); 
    const [openMessage, setOpenMessage] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    
    

    

    console.log(props)

    const handleOpenRejectDialog = () => {
        setOpenRejectInvitationDialog(true);
    }

    const handleOpenAcceptDialog = () => {
        setOpenAcceptInvitationDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenAcceptInvitationDialog(false);
        setOpenRejectInvitationDialog(false);
    }

    const showMessage = (event) => {
        console.log(event.currentTarget)
        setAnchorEl(event.currentTarget);
        setOpenMessage(true)
    }

    const closeMessage = () => {
        setOpenMessage(false)
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

    


    return (
        <div>
             <Card className={classes.card}>
                <div style={{textAlign:'end'}}>
                <Tooltip title="Decline Invitation" placement="bottom-start">
                    <IconButton aria-label="settings" className={classes.close} size='small'>
                        <CloseIcon onClick={()=> handleOpenRejectDialog(invitation)} fontSize="inherit" className={classes.close} />
                    </IconButton>
                </Tooltip>
                </div>
                
                <CardContent>
                    <Grid container justify="center" alignItems="center">
                        <Avatar className={classes.avatar} src={invitation.from_user && invitation.from_user.social && invitation.from_user.social.profile_image_link? invitation.from_user.social.profile_image_link : 
                    defaultImg
                    }  
                    imgProps={{className: classes.carouselAvatarImg }}
                    onClick={()=> props.redirectProfile(invitation.from_user && invitation.from_user.profile
                        ? invitation.from_user.profile.user_id : null)}
                    />
                    </Grid>
                    <Grid container justify="center" alignItems="center">
                        <Box alignContent='center'>
                            <Typography
                                component="div"
                                variant="h6"
                                style={{ fontWeight: 'bold', lineHeight: 'inherit' }}
                                className={classes.inline}
                                color="textPrimary"
                            >
                                {invitation.from_user && invitation.from_user.profile
                            ? invitation.from_user.profile.username 
                            : ''
                        }
                            </Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom style={{ fontSize: 'medium' }}>
                            {invitation.from_user.work_experience && invitation.from_user.work_experience.job_title}
                            &nbsp;
                            </Typography>
                        </Box>
                    </Grid>
                </CardContent>
                <Divider style={{width: '100%', height: '2px', marginTop:'5px',marginBottom:'5px',}}/>
                <CardActions disableSpacing >
                    <Grid container justify="center" alignItems="center">
                        <Grid item xs={9}>
                        <Tooltip title="Accept Invitation!" placement="bottom">
                            <Button color="primary" variant="outlined" className={classes.button} onClick={()=>handleOpenAcceptDialog(invitation.request_id)} size="small">
                            Accept
                            </Button>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={3}>
                        <Tooltip title={invitation.from_user && invitation.from_user.profile
                            ? `Open ${invitation.from_user.profile.username}'s Message!`: "Open Message!"} placement="bottom-end">
                            <IconButton onClick={showMessage} disabled={invitation.message !== null && invitation.message.length > 0 ? false : true}>
                                <MessageIcon />
                            </IconButton>
                            </Tooltip>
                        </Grid>

                    </Grid>
                </CardActions>
            </Card>
            <Popover
                classes={{
                    paper: classes.paper,
                }}
                open={openMessage}
                onClose={closeMessage}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <Typography style={{fontSize:20, fontWeight:'bolder', paddingBottom:'2%'}}>
                    Message
                </Typography>
                <Typography style={{fontSize:15, fontWeight:100, paddingBottom:'4%'}} >
                    {invitation.message && invitation.message.length!==0 ? invitation.message  : "No Message Available"}
                </Typography>
                
                {invitation.suggested_datetime 
                ? 
                <Tooltip title="You can change it later!" placement="right-start">
                    <Typography style={{width:'fit-content', fontSize:12, fontWeight:500}}>
                        Suggested Date: <u><b>{formatDate(invitation.suggested_datetime)}</b></u>
                    </Typography>
                </Tooltip>
                :
                <Tooltip title="Please inform us once a date has been selected!" placement="right-start">
                <Typography style={{width:'fit-content', fontSize:12, fontWeight:500}}>
                        Suggested Date: <u>Unavailable</u>
                    </Typography>
                </Tooltip>
                }             
            </Popover>
            <Dialog
            open={ OpenAcceptInvitationDialog }
            TransitionComponent={Transition}
            keepMounted
            fullWidth
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent style={{ overflowY: 'hidden', margin:40}}>
                <DialogContentText color="textPrimary" fontWeight="bold" >
                <Box m={3} textAlign="center"> {invitation.from_user && invitation.from_user.profile 
                        ? `Accept Invitation From ${invitation.from_user.profile.username}?`
                        : "Accept Invitation? "
                        }
                </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button 
                    //className={classes.dialogButtons}
                    onClick={() => handleCloseDialog()} color="primary" 
                    style={{}}>
                        Cancel
                </Button>
                <Button 
                    onClick={() => handleAcceptInvitation(invitation.request_id)} color="primary"
                    //className={classes.dialogButtons}
                >
                        Confirm
                </Button>
                </DialogActions>
            </Dialog>
            <Dialog
            open={ OpenRejectInvitationDialog }
            TransitionComponent={Transition}
            keepMounted
            fullWidth
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent style={{ overflowY: 'hidden', margin:40}}>
                <DialogContentText color="textPrimary" fontWeight="bold">
                <Box m={3} textAlign="center"> {invitation.from_user && invitation.from_user.profile 
                        ? `Decline Invitation From ${invitation.from_user.profile.username} ?`
                        : "Decline Invitation? "
                        }
                </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button 
                    onClick={() => handleCloseDialog()} color="primary"
                    //className={classes.dialogButtons}
                    >
                        Cancel
                    </Button>
                    <Button 
                    onClick={() => handleDeclineInvitation(invitation)} color="primary"
                    //className={classes.dialogButtons}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
