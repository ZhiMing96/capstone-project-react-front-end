import React, { useEffect, useState, } from 'react';
import api from '../../api';
import { Grid, Button, CssBaseline, IconButton, Paper, Typography, Divider, Box, InputBase, Container, ButtonBase, Avatar, Fab, Card, CardContent, List, ListItemAvatar, ListItem, ListItemText, Slide, createMuiTheme } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  useStaticState,
} from '@material-ui/pickers';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CompleteMeetupIcon from  '../../images/completeMeetup.svg';
import RemoveMeetupIcon from '../../images/removeMeetup.svg';
import TelegramIcon from '../../images/telegram.svg';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ClearIcon from '@material-ui/icons/Clear'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';



const theme = createMuiTheme({
    overrides: {
        MuiSvgIcon: {
          root:{
            color:'maroon'
          }
      },
    }
  });


const useStyles = makeStyles(theme => ({
    root:{

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
        width:85, 
        height:85, 
        boxShadow:'0px 1px 5px 0px rgba(0,0,0,0.2)',
    },
    listAvatar: {
        margin:'5%',
        width:60, 
        height:60, 
        boxShadow:'0px 1px 5px 0px rgba(0,0,0,0.2)',
    },
    carouselUsername: {
        marginTop:'6%',
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
    calandar : {
        color: "red"
    },
    moreIcon : {
        padding:0,
        // paddingRight:'3%',
        color: 'grey',
        '&:hover': {
            color: 'black'
          } 
    },
  }))

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const defaultImg = "https://image.flaticon.com/icons/svg/149/149071.svg"
export default function UpcomingMeetup(props) {
    const classes=useStyles();
    console.log(props);
    const { meetup, handleDateChange, handleSelectedMeetup, handleMeetupCancellation, handleMeetupConfirmation, handleTelegramRedirect } = props;
    const [ daysLeft, setDaysLeft ] = useState();
    const [ openMeeetupDialog, setOpenMeeetupDialog ] = useState(false);


    const handleCloseDialog = () => {
        setOpenMeeetupDialog(false);
    }

    const handleOpenDialog = () => {
        setOpenMeeetupDialog(true);

    }

    const handleCancelled = () => {
        handleMeetupCancellation(meetup);
        handleCloseDialog();
    }

    const handleConfirmed = () => {
        handleMeetupConfirmation(meetup);
        handleCloseDialog();
    }

    const calculateDaysLeft = (date) => {
        const meetupDate =  new Date(date);
        const currentDate = new Date();
        console.log("Suggested Date = " + meetupDate )
        console.log("Current Date = " + currentDate )

        const calculatedDaysLeft = Math.floor((Date.UTC(meetupDate.getFullYear(), meetupDate.getMonth(), meetupDate.getDate()) - Date.UTC(currentDate.getFullYear(),currentDate.getMonth(), currentDate.getDate()) ) /(1000 * 60 * 60 * 24))
        return calculatedDaysLeft;
    }

    useEffect(()=>{
       setDaysLeft(calculateDaysLeft(meetup.suggested_datetime))
    },[meetup.suggested_datetime])

    // console.log(meetup.other_user.social)
    return (
        <div>
            <Card style={{width:'100%', height:'fit-content', padding:'5%',marginBottom:'4%'}}>
                <Grid container item xs={12}>
                    <Grid item xs={3}> 
                        <Avatar alt="List"
                            src={meetup.other_user && meetup.other_user.social ? meetup.other_user.social.profile_image_link : defaultImg} 
                            className={classes.listAvatar} 
                            // imgProps={{style:{objectFit:'contain',border:0}}}
                            // onClick={()=> handleViewProfile()}
                        />
                    </Grid>
                    <Grid item xs={6} style={{textAlign:'left', paddingLeft:'2%'}}> 
                        <Typography>
                        {meetup.other_user && meetup.other_user.profile
                            ? meetup.other_user.profile.username
                            : ''
                        }
                        </Typography>
                        <Typography>
                        {meetup.from_user && meetup.from_user.work_experience
                        ? meetup.from_user.work_experience.job_title
                        : "Unknown Occupation"
                        }
                        </Typography>
                        <ThemeProvider theme={meetup.suggested_datetime ? null : theme}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                format="MM/dd/yyyy"
                                value={meetup.suggested_datetime}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                style={{width:'65%'}}
                                onChange={handleDateChange}
                                onOpen={()=> handleSelectedMeetup(meetup)}
                                disablePast
                            />
                        </MuiPickersUtilsProvider>
                        </ThemeProvider>
                    </Grid>
                    <Grid container item xs={3} direction="row" justify="space-between"> 
                        <Grid item  xs={12} style={ daysLeft < 5 ? {color:"maroon"} : daysLeft <20 ? {color:"green" } : {color:'blue'}}>
                            <Typography style={{fontWeight:'bold'}}>
                                {meetup.suggested_datetime
                                ?
                                `${daysLeft} Days left` 
                                : ""
                                }
                                
                            </Typography>
                        </Grid>   
                        <Grid item container xs={12}>
                            <Grid item xs={6} style={{textAlign:'-webkit-center', alignSelf:'center'}}>
                                <Avatar
                                className={classes.controlButtons}
                                onClick={() => handleTelegramRedirect(
                                    meetup.other_user && meetup.other_user.profile
                                    ? meetup.other_user.profile.telegram_id 
                                    : null
                                )}
                                src={TelegramIcon}
                                />
                            </Grid>
                            <Grid item xs={6} style={{textAlign:'-webkit-center', alignSelf:'center'}}>
                                <IconButton
                                className={classes.moreIcon}
                                onClick={()=> handleOpenDialog()}
                                >
                                    <MoreVertIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
            <Dialog
            open={openMeeetupDialog}
            TransitionComponent={Transition}
            keepMounted
            fullWidth
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            style={{}}
            >
                <DialogContent style={{padding:'9%', paddingTop:0, paddingRight:0, overflow:'hidden'}}>
                    <Grid container>
                        <Grid item xs={12} style={{textAlign:'right'}}>
                            <IconButton
                            onClick={handleCloseDialog}
                            style={{margin:'1%'}}
                            >
                                <ClearIcon style={{width:45, height:45}}/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={12} style={{textAlign:'center', marginBottom:'5%',paddingRight:'7%'}}>
                            <Typography style={{fontSize:'150%', fontWeight:'lighter'}}>
                                {meetup.other_user && meetup.other_user.profile 
                                ? `How was your meetup with ${meetup.other_user.profile.username} !`
                                : 'How was your meetup! '
                                }
                            </Typography>
                        </Grid>
                        <Grid item container spacing={7} style={{ paddingRight:'7%'}}>
                            <Grid item xs={6} style={{textAlign:'-webkit-right'}}>
                                <Avatar alt="List"
                                    src={RemoveMeetupIcon} 
                                    className={classes.listAvatar} 
                                    imgProps={{style:{objectFit:'contain',border:0}}}
                                    style={{marginRight:'16%'}}
                                />
                                <Button 
                                style={{fontWeight:'bold', fontSize:18}}
                                onClick={()=> handleCancelled()}
                                >
                                    Cancelled
                                </Button>
                            </Grid>
                            <Grid item xs={6} style={{textAlign:'-webkit-left'}}>
                                <Avatar alt="List"
                                    src={CompleteMeetupIcon} 
                                    className={classes.listAvatar} 
                                    imgProps={{style:{objectFit:'contain',border:0}}}
                                    style={{marginLeft:'16%'}}
                                />
                                <Button 
                                style={{fontWeight:'bold', fontSize:18}}
                                onClick={()=> handleConfirmed()} 
                                >
                                    Completed
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    )
}
