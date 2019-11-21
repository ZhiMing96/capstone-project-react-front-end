import React, { useEffect, useState, } from 'react';
import api from '../../api';
import { Grid, Button, CssBaseline, IconButton, Paper, Typography, Divider, Box, InputBase, Container, ButtonBase, Avatar, Fab, Card, CardContent, List, ListItemAvatar, ListItem, ListItemText, Slide, Popover, Tooltip } from '@material-ui/core';
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
        display: 'flex',
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
        const date = new Date(dateString)
        var day = date.getMonth();
        var year = date.getFullYear();
        var month = date.toLocaleString('en-GB', { month: 'short' });

        return day + " " + month + " " + year

    }

    


    return (
        <div>
             <Paper className={classes.carouselPaper} elevation={5}>
                <div style={{textAlign:'end'}}>
                <Tooltip title="Decline Invitation" placement="bottom-start">
                    <IconButton style={{padding:0}} onClick={()=> handleOpenRejectDialog(invitation)}>
                        <CloseIcon style={{color:'#992E24'}} />
                    </IconButton>
                </Tooltip>
                </div>
                
                <Link 
                to={{
                    pathname: "/profile",
                    state: { user: 
                        invitation.from_user && invitation.from_user.profile
                        ? invitation.from_user.profile.user_id 
                        : null
                    }
                    }} 
                style={{textDecoration:'none'}}
                >
                        <div>
                        <Avatar
                        src={invitation.from_user && invitation.from_user.social && invitation.from_user.social.profile_image_link? invitation.from_user.social.profile_image_link : 
                        defaultImg
                        } 
                        className={classes.carouselAvatar} 
                        // imgProps={{style:{objectFit:'contain',border:0}}}
                        imgProps={{className: classes.carouselAvatarImg }}
                        // onClick={()=> handleHrefClick(listing)}
                        />
                        </div>
                </Link>
                <Grid container  justify='space-between' style={{height:'15vh'}}>
                    <Grid item xs={12}>
                    <Typography gutterBottom className={classes.carouselUsername} style={{}}>
                        {invitation.from_user && invitation.from_user.profile
                            ? invitation.from_user.profile.username 
                            : ''
                        }
                    </Typography>
                    <Typography style={{fontSize:13, color:'grey'}}>
                        {invitation.from_user && invitation.from_user.work_experience
                        ? 
                        <div>
                            {invitation.from_user.work_experience.job_title} 
                            <EmploymentDetails jobDetails={invitation.from_user.work_experience} username={invitation.from_user && invitation.from_user.profile
                            ? invitation.from_user.profile.username 
                            : 'User'
                        }/>
                        </div>
                        : "Unknown Occupation"
                        }
                    </Typography>
                    </Grid>
                    <Divider style={{width: '100%', height: '2px', marginTop:'5px',marginBottom:'5px',}}/>
                    <Grid container item xs={12} direction="row"
                    justify="space-between"
                    alignItems="flex-end"
                    style={{height:'fit-content'}}
                    >
                        <Grid item xs={6} style={{textAlign:'end', paddingRight:20}}>
                            <Tooltip title={invitation.from_user && invitation.from_user.profile
                            ? `Open ${invitation.from_user.profile.username}'s Message!`: "Open Message!"} placement="bottom-end">
                                <IconButton className={classes.messageIcon} onClick={showMessage}>
                                    <MessageIcon style={{width:35, height:35}}/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={6} style={{textAlign:'start', scrollPaddingLeft:10}}>
                            <Tooltip title="Accept Invitation!" placement="bottom">
                                <Button color='primary' style={{fontSize:17,fontWeight:'bold', color:'green'}} size='small'
                                onClick={()=>handleOpenAcceptDialog(invitation.request_id)}
                                >
                                    Accept
                                </Button>
                            </Tooltip>
                        </Grid>
                        
                    </Grid>
                </Grid>
            </Paper>
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
                <Tooltip title="You Can Change it Later!" placement="right-start">
                    <Typography style={{width:'fit-content', fontSize:12, fontWeight:500}}>
                        Suggested Date: <u><b>{formatDate(invitation.suggested_datetime)}</b></u>
                    </Typography>
                </Tooltip>
                :
                <Tooltip title="Please Inform us once a date has been selected!" placement="right-start">
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
                <DialogContent style={{paddingBottom:'5%', paddingTop:'10%', textAlign:'center'}}>
                    <Typography style={{fontSize:"150%", fontWeight:'lighter'}}>
                        {invitation.from_user && invitation.from_user.profile 
                        ? `Accept Invitation From ${invitation.from_user.profile.username} ?`
                        : "Accept Invitation? "
                        }
                    </Typography>
                </DialogContent>
                <DialogActions>
                <Button 
                    className={classes.dialogButtons}
                    onClick={() => handleCloseDialog()} color="primary" 
                    style={{}}>
                        Cancel
                </Button>
                <Button 
                    onClick={() => handleAcceptInvitation(invitation.request_id)} color="primary"
                    className={classes.dialogButtons}>
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
                <DialogContent style={{paddingBottom:'5%', paddingTop:'10%', textAlign:'center'}}>
                    <Typography style={{fontSize:"150%", fontWeight:'lighter'}}>
                        {invitation.from_user && invitation.from_user.profile 
                        ? `Decline Invitation From ${invitation.from_user.profile.username} ?`
                        : "Decline Invitation? "
                        }
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button 
                    onClick={() => handleCloseDialog()} color="primary" size='large'
                    className={classes.dialogButtons}>
                        Cancel
                    </Button>
                    <Button 
                    onClick={() => handleDeclineInvitation(invitation)} color="primary" size='large'
                    className={classes.dialogButtons}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
