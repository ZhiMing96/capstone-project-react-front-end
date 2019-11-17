import React, { useEffect, useState, } from 'react';
import api from '../../api';
import { Grid, Button, CssBaseline, IconButton, Paper, Typography, Divider, Box, InputBase, Container, ButtonBase, Avatar, Fab, Card, CardContent, List, ListItemAvatar, ListItem, ListItemText, Snackbar } from '@material-ui/core';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Popover from '@material-ui/core/Popover';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import CompleteMeetupIcon from  '../../images/completeMeetup.svg';
import RemoveMeetupIcon from '../../images/removeMeetup.svg';
import TelegramIcon from '../../images/telegram.svg';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Recommendations from './Recommendations';
import './index.css';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ClearIcon from '@material-ui/icons/Clear'
import Badge from '@material-ui/core/Badge';
import CircularLoading from '../../Components/LoadingBars/CircularLoading';
import Skeleton from '@material-ui/lab/Skeleton';
import InvitationRequestSkeleton from '../../Components/SkeletonLoading/InvitationRequestSkeleton'
import  UpcomingMeetupsSkeletonLoading from '../../Components/SkeletonLoading/UpcomingMeetupsSkeletonLoading';
// import Snackbar from '../../Components/Snackbar';
import axios from 'axios'
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import MeetupInvitation from '../../Components/InvitationsTab/MeetupInvitation'
import UpcomingMeetup from '../../Components/InvitationsTab/UpcomingMeetup'

//redux
import { updatePendingInvitations, updateUpcomingMeetups} from '../../redux/actions/socialInteraction' ; 
import { connect } from "react-redux";


const Wrapper = styled.div`
    width:97%
`;

const Page = styled.div`
    width:90%
`;

const CarouselArrowNext = (props) => {

    const { className, style, onClick} = props;
    // console.log(props)

    if(onClick !== null){
    return (
        <div 
            className={className}
            style={{ display: "block",zIndex:40, marginRight:'1%',}}
            onClick={onClick}
        >
            <Fab
            className={className}
            size='medium'
            style={{display: "block",zIndex:40, marginRight:'20%',backgroundColor:'black', opacity:'0.6'}}
            onClick={onClick}
            > 
                <KeyboardArrowRightIcon style={{color:'white',marginTop:6}}/>
            </Fab>
        </div>
    );
    } else {
        return(<div></div>)
    }
  }
  const CarouselArrowPrev = (props) => {
    const classes = useStyles();
    const { className, onClick, style, currentSlide } = props;

    if(currentSlide !==0){
        return (
            <div 
              className={className}
              style={{ ...style, display: "block",zIndex:40,marginLeft:'1%',content:'none'}}
              onClick={onClick}
            >
              <Fab
                size='medium'
                style={{backgroundColor:'black', opacity:'0.6'}}
              > 
              <KeyboardArrowLeftIcon style={{color:'white',}}/>
            </Fab>
        
            </div>
            
        );
    } else {
        return(<div></div>)
    }
    
  }

const carouselSettings = {
    accessibiliy: true,
    speed:1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: false,
    dots:false,
    //autoplay: true,
    arrows:true,
    //autoplaySpeed:8000,
    draggable:true,
    //lazyLoad: "progressive",
    pauseOnHover: true,
    nextArrow: <CarouselArrowNext />,
    prevArrow: <CarouselArrowPrev />,
    responsive: [
      {
        breakpoint: 1920, //lg
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: false,
        }
      },
      {
        breakpoint: 1280, //md
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
        }
      },
      {
        breakpoint: 1000, //md
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          //infinite: true,
        }
      },
      {
        breakpoint: 600, //sm
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          //initialSlide: 2
          infinite: false,
        }
      },
      {
        breakpoint: 480, //xs
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
        }
      }]
  };
    

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


  }))

  const defaultAvatar = '';

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function Invitations(props) {

    const classes=useStyles();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedInvitationIndex, setSelectedInvitationIndex] = useState()
    const [openInvitation, setOpenInvitation] = useState(false);
    const [selectedMeetupIndexWithDate, setSelectedMeetupIndexWithDate] = useState()
    const [selectedMeetupIndexWithoutDate, setSelectedMeetupIndexWithoutDate] = useState()
    const [OpenMeetupDialog, setOpenMeetupDialog] = useState(false); 
    const [ selectedMeetup, setSelectedMeetup] = useState();
    const [ openMeetupCancellation, setOpenMeetupCancellation ] = useState(false);
    const [ pendingInvitations, setPendingInvitations ] = useState();
    const [ upcomingMeetups, setUpcomingMeetups ] = useState();
    const [ pendingMeetupDate, setPendingMeetupDate ] = useState();
    const [ invitationsLoading, setInvitationsLoading ] = useState(false);
    const [ meetupsloading, setMeetupsLoading ] = useState(false);
    const [ openSnackBarError, setOpenSnackBarError ] = useState(false);
    const [ openSnackBarSuccess, setOpenSnackBarSuccess ] = useState(false);
    const [ reloadInvitation, setReloadInvitation ] = useState(false);
    const [ reloadMeetup, setReloadMeetup ] = useState(false);

    const getPendingInvitation = () => {
        console.log("ENTERED PEDNING INVITATION ")
        setInvitationsLoading(true);
        api.invitations.getPending()
        .then(res=>{
            console.log(res.data)
            if(res.data.response_code === 200) {
                setTimeout(() => {
                    const invitesSent = res.data.invites_sent
                    const invitesReceived = res.data.invites_received
                    console.log('****** Invitations Sent *****')
                    console.log(invitesSent);

                    console.log('****** Invitations Received *****')
                    console.log(invitesReceived);
                    setPendingInvitations(invitesReceived);
                    setInvitationsLoading(false);
                    props.updatePendingInvitations(invitesReceived)
                }, 3000)
            } 
        }).catch(err => console.log(err))
    }

    const getUpcomingMeetups = () => {
        console.log("ENTERED UPCOMING MEETUPS ")
        setMeetupsLoading(true);
        api.invitations.getCurrent()
        .then(res=> {
            console.log(res.data)
            if(res.data.response_code === 200) {
                
                setTimeout(() => {
                    var invitesSent = res.data.invites_sent
                    var invitesReceived = res.data.invites_received
                    console.log('****** Invitations Sent *****')
                    console.log(invitesSent);
                    console.log('****** Invitations Received *****')
                    console.log(invitesReceived);
                    var combined = invitesSent.concat(invitesReceived)
                    console.log('****** Combined Invitations *****')
                    console.log(combined);
                    props.updateUpcomingMeetups(combined)

                    var tempWithDate = [];
                    var tempWithoutDate = [];
    
                    for(let i=0; i<combined.length;i++){
                        const invitation = combined[i]
                        console.log(invitation)
                        if(invitation.accepted === 1 && invitation.is_completed === null){
                            console.log(invitation.suggested_datetime)
                            if(invitation.suggested_datetime !== null){
                                tempWithDate.push(invitation)
                            } else {
                                tempWithoutDate.push(invitation)
                            }
                            
                        }
                    }
                    setUpcomingMeetups(tempWithDate)
                    setPendingMeetupDate(tempWithoutDate)
                    setMeetupsLoading(false);
                }
                , 2500)} 
        })
    }

    
    useEffect(()=>{
        getPendingInvitation();
        getUpcomingMeetups();
    },[]) 

    const handleAcceptInvitation = (requestId) => {
        console.log(requestId)
        api.invitations.acceptInvitation({request_id: requestId})
        .then(res=>{
            if(res.data.response_code === 200){
                console.log("*** INVITATION ACCEPTED *** INSERT A SNACKBAR TO INFORM USER");
                // getBoth();
                getPendingInvitation();
                // setReloadInvitation(!reloadInvitation);
                // setReloadMeetup(!reloadMeetup)
                getUpcomingMeetups();
            } else {
                console.log("**** UNABLE TO ACCEPT INVITATION ****")
                console.log(res.data.response_code + res.data.response_message)
                setOpenSnackBarError(true);
            }
        })
        handleCloseDialog();
    } 

    const handleDeclineInvitation = invitation =>{

        console.log(invitation)
        api.invitations.rejectInvitation({request_id: invitation.request_id})
        .then(res => {
            if(res.data.response_code === 200){
                console.log("*** INVITATION CANCELLED *** INSERT A SNACKBAR TO INFORM USER");
                getPendingInvitation();
                // setReloadInvitation(true);
            } else {
                console.log("**** UNABLE TO CANCEL INVITATION ****")
                console.log(res.data.response_code + res.data.response_message)
                setOpenSnackBarError(true);
            }
        })
    }

    const handleSelectedMeetup = meetup => {
        console.log("***** Entered Handled Select Meetup ****");
        console.log(meetup);
        setSelectedMeetup(meetup);

    }
    
    const handleDateChange = date => {
        console.log('*** ENTERED handleDateChange ****')
        const processDate = new Date(date)

        const formattedDate= processDate.getFullYear() + "-" + (processDate.getMonth()+1) + "-" + processDate.getDate() + " " + + processDate.getHours() + ":" + processDate.getMinutes() + ":" + processDate.getSeconds() 
        console.log(formattedDate)  
        console.log(selectedMeetup ?selectedMeetup.request_id:'NO SELECTED MEETUP')

        api.meetups.changeDate({
            request_id: selectedMeetup ? selectedMeetup.request_id : null,
            datetime: formattedDate,
        })
        .then(res=>{
            console.log(res.data);
            if(res.data.response_code === 200){
                //open snackbar?
                console.log('***** DATE CHANGE RECORDED SUCESSFULLY ****');
                setSelectedMeetup(null);
                getUpcomingMeetups()
                // setReloadMeetup(!reloadMeetup)
            } else {
                console.log('***** DATE CHANGE NOT RECORDED ****')
            }
           
        })
    }; 


    const handleCloseDialog = () => {
        // if(type === 'invitation'){
            setOpenInvitation(false);
        // } else if (type === 'meetup') {
            setOpenMeetupDialog(false);
            setOpenMeetupCancellation(false);
        // }
    };
    
    const timeLeft = (date) => {
        const dateFormat =  new Date(date);
    }

    const handleMeetupConfirmation = (meetup) => {
        console.log(meetup)

        api.meetups.completeMeetup({request_id: meetup.request_id})
        .then(res => {
            console.log(res.data)
            if(res.data.response_code===200){
                getUpcomingMeetups()
                // setReloadMeetup(!reloadMeetup);
                setOpenMeetupDialog(false);
            } else {
                console.log('**** ERROR IN CONFIRMING MEETUP ***');
                setOpenSnackBarError(true);
            }
            handleCloseDialog();
        }).catch(err=> {
            console.log(err)
            handleCloseDialog();
            setOpenSnackBarError(true);
        });
    }
    const handleMeetupCancellation = (meetup) => {
        console.log(meetup)

        api.meetups.cancelMeetup({request_id: meetup.request_id})
        .then(res => {
            console.log(res.data)
            if(res.data.response_code===200){
                getUpcomingMeetups()
                // setReloadMeetup(!reloadMeetup)
                setOpenMeetupDialog(false);
                setOpenMeetupCancellation(true);
            } else {
                console.log('**** ERROR IN CANCELLING MEETUP ***');
            }
            handleCloseDialog()
        }).catch(err=> {
            console.log(err)
            handleCloseDialog();
        });
    }
    const handleTelegramRedirect = ( telegramId ) => {
        if(telegramId!==null){
            api.meetups.getTeleLink({telegram_id : telegramId})
            .then(res=>{
                console.log(res.data)
                if(res.data.response_code === 200){
                    const teleLink = res.data.telegram_link
                    if(teleLink){
                        window.open(teleLink,'_blank');
                    }
                }
            })
        }
    }

    // const resetSnackBars = (reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }
    //     setOpenSnackBarError(false);
    //     setOpenSnackBarSuccess(false);
    // }

    // const handleOpenSnackBar = (type) => {
    //     console.log(" $$$$ ENTERED OPEN SNACKBAR ")

    //     if (type === "Error") {
    //         setOpenErrorSnackbar(true);
    //     } else if (type == "Success") {
    //         setOpenSuccessSnackbar(true);
    //     }
    // }

    // const processQueue = () => {
    //     if (queueRef.current.length > 0) {
    //       setMessageInfo(queueRef.current.shift());
    //       setOpen(true);
    //     }
    // };

    // const handleClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }
    //     setOpen(false);
    // };
    // const handleExited = () => {
    //     processQueue();
    // };

    return (
        <div>
            {/* <Router> */}
            <Grid container direction="row" style={{ width: '100%', textAlign: 'left' }}>
                <Grid item xs={12} style={{marginTop:'5%'}}>
                    <Typography className={classes.sectionHeading}>
                        These People are Interested to Meet You!
                    </Typography>
                </Grid>
                <Grid container style={{ margin:10, marginTop:10, }} spacing={1} justify="space-between" > 
                {invitationsLoading
                ? <InvitationRequestSkeleton/>
                : pendingInvitations && pendingInvitations.length!==0
                ? 
                <Wrapper>
                    <Slider {...carouselSettings}>
                        {pendingInvitations.map((invitation, index) => (
                            <div key={index}>
                            <Page>
                                <MeetupInvitation invitation={invitation} handleAcceptInvitation={handleAcceptInvitation} handleDeclineInvitation={handleDeclineInvitation} />
                            </Page>
                            
                            </div>
                        ))}
                    </Slider>
                </Wrapper>
                :
                "NO INVITATIONS"
                }
                </Grid>
            </Grid>
        
            
            <Grid container spacing={6}>
                    <Grid container item xs={12} md={6}>
                        <Grid item xs={12} style={{marginTop:'10%',textAlign:'left'}}>
                            <Typography className={classes.sectionHeading} style={{}}>
                                Upcoming Meetups 
                            </Typography>
                        </Grid>
                        {meetupsloading
                        ? <UpcomingMeetupsSkeletonLoading/>
                        : upcomingMeetups && upcomingMeetups.length!==0
                        ?
                        upcomingMeetups.map((meetup, index) => {
                            if(meetup.suggested_datetime !== null){
                                return(
                                    <div style={{width:'90%'}}>
                                        <UpcomingMeetup meetup={meetup} handleDateChange={handleDateChange} handleSelectedMeetup={handleSelectedMeetup} handleMeetupCancellation={handleMeetupCancellation}  handleMeetupConfirmation={handleMeetupConfirmation} handleTelegramRedirect={handleTelegramRedirect}/>
                                    </div>
                                )
                            }
                        })
                        : "NO UPCOMING MEETUPS"
                        }
                    </Grid>
                
                    <Grid container item xs={12} md={6}>
                        <Grid item xs={12} style={{marginTop:'10%', textAlign:'left', height:'fit-content'}}>
                            <Typography className={classes.sectionHeading} style={{ color:'#992E24'}}>
                                Enter a Meetup Date
                            </Typography>
                        </Grid>
                        {meetupsloading
                        ? <UpcomingMeetupsSkeletonLoading/>
                        : pendingMeetupDate
                        ?
                        pendingMeetupDate.map((meetup, index) => {
                            if(meetup.suggested_datetime === null){
                                return(
                                    <div style={{width:'90%'}}>
                                        <UpcomingMeetup meetup={meetup} handleDateChange={handleDateChange} handleSelectedMeetup={handleSelectedMeetup} handleMeetupCancellation={handleMeetupCancellation}  handleMeetupConfirmation={handleMeetupConfirmation} handleTelegramRedirect={handleTelegramRedirect}/>
                                    </div>
                                )
                            }
                        })
                        : 'NO UPCOMING MEETUPS' 
                        }
                    </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = state => {
    return { 
      pendingInvitations: state.socialInteraction.pendingInvitations,
      upcomingMeetups: state.socialInteraction.upcomingMeetups
     }
  };
  
export default connect(
mapStateToProps,
{ updateUpcomingMeetups, updatePendingInvitations }
) (Invitations); 
