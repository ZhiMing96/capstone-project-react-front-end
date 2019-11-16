import React, { useEffect, useState, } from 'react';
import api from '../../api';
import { Grid, Button, CssBaseline, IconButton, Paper, Typography, Divider, Box, InputBase, Container, ButtonBase, Avatar, Fab, Card, CardContent, List, ListItemAvatar, ListItem, ListItemText, Slide, Popover } from '@material-ui/core';
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

const useStyles = makeStyles(theme => ({
    root:{

    },
    paper: {
        padding: theme.spacing(1.5),
        maxWidth: 400
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


  }))

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


export default function MeetupInvitation(props) {
    const classes=useStyles();
    console.log(props)
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
        setAnchorEl(event.currentTarget);
        setOpenMessage(true)
    }

    const closeMessage = () => {
        setOpenMessage(false)
    }

    


    return (
        <div>
             <Paper className={classes.carouselPaper} elevation={5}>
                <div style={{textAlign:'end'}}>
                <IconButton style={{padding:0}} onClick={()=> handleOpenRejectDialog(invitation)}>
                    <CloseIcon style={{color:'#992E24'}} />
                </IconButton>
                </div>
                
                <Link to={{
                        pathname: "/profile",
                        state: { user: 
                            invitation.from_user && invitation.from_user.profile
                            ? invitation.from_user.profile.user_id 
                            : null
                        }
                    }} 
                    style={{textDecoration:'none'}}>
                        <Avatar alt="List"
                        src={invitation.from_user && invitation.from_user.social ? invitation.from_user.social.profile_image_link : 
                        ""
                        } 
                        className={classes.carouselAvatar} 
                        imgProps={{style:{objectFit:'contain',border:0}}}
                        // onClick={()=> handleHrefClick(listing)}
                        />
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
                        Fintech Analyst 
                    </Typography>
                    </Grid>
                    <Divider style={{width: '100%', height: '2px', marginTop:'5px',marginBottom:'5px',}}/>
                    <Grid container item xs={12} direction="row"
                    justify="space-between"
                    alignItems="flex-end"
                    style={{height:'fit-content'}}
                    >
                        <Grid item xs={6} style={{textAlign:'end', paddingRight:20}}>
                            <IconButton color='grey' style={{padding:0, }} onClick={showMessage}>
                                <MessageIcon style={{width:35, height:35}}/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={6} style={{textAlign:'start', scrollPaddingLeft:10}}>
                            <Button color='primary' style={{fontSize:17,fontWeight:'bold', color:'green'}} size='small'
                            onClick={()=>handleOpenAcceptDialog(invitation.request_id)}
                            >
                                Accept
                            </Button>
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
                <Typography variant="body2">{invitation.message && invitation.message.length!==0 ? invitation.message  : "No Message Available"}</Typography>
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
                <DialogContent style={{padding:'4%', paddingTop:'5%'}}>
                    {invitation.request_id}
                </DialogContent>
                <DialogActions>
                    <Button 
                    onClick={() => handleAcceptInvitation(invitation.request_id)} color="primary"
                    style={{fontWeight:'bold'}}>
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
                <DialogContent style={{padding:'4%', paddingTop:'5%'}}>
                    {invitation.request_id}
                </DialogContent>
                <DialogActions>
                    <Button 
                    onClick={() => handleDeclineInvitation(invitation)} color="primary"
                    style={{fontWeight:'bold'}}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
