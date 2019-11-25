import React, { useEffect, useState, Fragment } from 'react';
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
import Slide from '@material-ui/core/Slide';
import Recommendations from './Recommendations';
import './index.css';
import ClearIcon from '@material-ui/icons/Clear'
import Skeleton from '@material-ui/lab/Skeleton';
import InvitationRequestSkeleton from '../../Components/SkeletonLoading/InvitationRequestSkeleton'
import  UpcomingMeetupsSkeletonLoading from '../../Components/SkeletonLoading/UpcomingMeetupsSkeletonLoading';
import MeetupInvitation from '../../Components/InvitationsTab/MeetupInvitation'
import UpcomingMeetup from '../../Components/InvitationsTab/UpcomingMeetup'
import { useSnackbar } from 'notistack';

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
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [ selectedMeetup, setSelectedMeetup] = useState();
    const [ pendingInvitations, setPendingInvitations ] = useState();
    const [ upcomingMeetups, setUpcomingMeetups ] = useState();
    const [ pendingMeetupDate, setPendingMeetupDate ] = useState();
    const [ invitationsLoading, setInvitationsLoading ] = useState(false);
    const [ meetupsloading, setMeetupsLoading ] = useState(false);
    const [ reloadInvitation, setReloadInvitation ] = useState(false);
    const [ reloadMeetup, setReloadMeetup ] = useState(false);

    const action = key => (
        <Fragment>
            <IconButton onClick={() => { closeSnackbar(key) }} size="small" style={{ color:'white' }}>
                <ClearIcon/>
            </IconButton>
        </Fragment>
    );

    const getPendingInvitation = () => {
        console.log("ENTERED PEDNING INVITATION ")
        if(window.localStorage.getItem('authToken') !== null){
            setInvitationsLoading(true);
            api.invitations.getPending()
            .then(res=>{
                console.log(res.data)
                if(res.data.response_code === 200) {
                    // setTimeout(() => {
                        const invitesSent = res.data.invites_sent
                        const invitesReceived = res.data.invites_received
                        console.log('****** Invitations Sent *****')
                        console.log(invitesSent);
    
                        console.log('****** Invitations Received *****')
                        console.log(invitesReceived);
                        setPendingInvitations(invitesReceived);
                        setInvitationsLoading(false);
                        // props.updatePendingInvitations(invitesReceived)
                    // }, 3000)
                } else {
                    enqueueSnackbar('Unable to Retrieve Invitations',  { variant: "error", action } );
                }
            }).catch(err => {
                console.log(err);
                if(err.response) {
                    const status = err.response.status
                    const statusText = err.response.statusText
                    console.log(status);
                    console.log(statusText);
                    enqueueSnackbar(`Error ${status}: ${statusText}`,  { variant: "error", action } );
                  }
            })
        }
        
    }

    const getUpcomingMeetups = () => {
        console.log("ENTERED UPCOMING MEETUPS ")
        if(window.localStorage.getItem('authToken') !== null){
            setMeetupsLoading(true);
            api.invitations.getCurrent()
            .then(res=> {
                console.log(res.data)
                if(res.data.response_code === 200) {
                    
                    // setTimeout(() => {
                        var invitesSent = res.data.invites_sent
                        var invitesReceived = res.data.invites_received
                        console.log('****** Invitations Sent *****')
                        console.log(invitesSent);
                        console.log('****** Invitations Received *****')
                        console.log(invitesReceived);
                        var combined = invitesSent.concat(invitesReceived)
                        console.log('****** Combined Invitations *****')
                        console.log(combined);
                        // props.updateUpcomingMeetups(combined)
    
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
                        setMeetupsLoading(false);
                        setUpcomingMeetups(tempWithDate)
                        setPendingMeetupDate(tempWithoutDate)
                        
                } else {
                    enqueueSnackbar('Unable to Retrieve Meetups',  { variant: "error", action } );
                }
            }).catch(err => {
                if(err.response) {
                    const status = err.response.status
                    const statusText = err.response.statusText
                    console.log(status);
                    console.log(statusText);
                    enqueueSnackbar(`Error ${status}: ${statusText}`,  { variant: "error", action } );
                  }
                // enqueueSnackbar('Unable to Retrieve Meetups',  { variant: "error", action } );
                setMeetupsLoading(false);
            })
        }
       
    }

    
    useEffect(()=>{
        console.log("Getting Upcoming Meetups");
        setTimeout(() => {getUpcomingMeetups() } , 1000);
        // getUpcomingMeetups();
        
        console.log("Getting Pending Invitations");
       
        setInvitationsLoading(true);
        setTimeout(() => {getPendingInvitation() } , 5000);
        // getPendingInvitation()
        console.log(props)
    },[props.tabState]) 

    const handleAcceptInvitation = (requestId) => {
        console.log(requestId)
        api.invitations.acceptInvitation({request_id: requestId})
        .then(res=>{
            if(res.data.response_code === 200){
                console.log("*** INVITATION ACCEPTED *** INSERT A SNACKBAR TO INFORM USER");
                enqueueSnackbar('Invitation Accepted',  { variant: "success", action } );
                
                console.log("Getting Pending Invitations");
                getPendingInvitation();
                console.log("Getting Upcoming Meetups");
                getUpcomingMeetups();
                
            } else {
                console.log("**** UNABLE TO ACCEPT INVITATION ****")
                console.log(res.data.response_code + res.data.response_message)

                enqueueSnackbar('Unable to Accept Invitation',  { variant: "error", action } );
            }
        }).catch(err=> {
            const status = err.response.status
            const statusText = err.response.statusText
            console.log(status);
            console.log(statusText);
            enqueueSnackbar(`Error ${status}: ${statusText}`,  { variant: "error", action } );
        })
        // handleCloseDialog();
    } 

    const handleDeclineInvitation = invitation =>{

        console.log(invitation)
        api.invitations.rejectInvitation({request_id: invitation.request_id})
        .then(res => {
            if(res.data.response_code === 200){
                console.log("*** INVITATION CANCELLED *** INSERT A SNACKBAR TO INFORM USER");
                enqueueSnackbar('Invitation Cancelled Successfully',  { variant: "success", action } );
                getPendingInvitation();
                // setReloadInvitation(true);
            } else {
                console.log("**** UNABLE TO CANCEL INVITATION ****")
                console.log(res.data.response_code + res.data.response_message)
                enqueueSnackbar('Unable to Cancel Invitation',  { variant: "error", action } );
            }
        }).catch(err=> {
            const status = err.response.status
            const statusText = err.response.statusText
            console.log(status);
            console.log(statusText);
            enqueueSnackbar(`Error ${status}: ${statusText}`,  { variant: "error", action } );
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

                console.log('***** DATE CHANGE RECORDED SUCESSFULLY ****');
                enqueueSnackbar('Meetup Date Changed',  { variant: "success", action } );
                setSelectedMeetup(null);
                getUpcomingMeetups()

            } else {
                console.log('***** DATE CHANGE NOT RECORDED ****')
                enqueueSnackbar('Unable to Perform Operation',  { variant: "error", action } );
            }
           
        }).catch(err=> {
            const status = err.response.status
            const statusText = err.response.statusText
            console.log(status);
            console.log(statusText);
            enqueueSnackbar(`Error ${status}: ${statusText}`,  { variant: "error", action } );
        })
    }; 


    
    

    const handleMeetupConfirmation = (meetup) => {
        console.log(meetup)

        api.meetups.completeMeetup({request_id: meetup.request_id})
        .then(res => {
            console.log(res.data)
            if(res.data.response_code===200){
                enqueueSnackbar('Meetup Completed',  { variant: "success", action } );
                getUpcomingMeetups()
                // setReloadMeetup(!reloadMeetup);
                // setOpenMeetupDialog(false);
            } else {
                console.log('**** ERROR IN CONFIRMING MEETUP ***');

                enqueueSnackbar('Unable to Perform Operation',  { variant: "error", action } );
            }
            // handleCloseDialog();
        }).catch(err=> {
            const status = err.response.status
            const statusText = err.response.statusText
            console.log(status);
            console.log(statusText);
            enqueueSnackbar(`Error ${status}: ${statusText}`,  { variant: "error", action } );
            // handleCloseDialog();
        });
    }
    const handleMeetupCancellation = (meetup) => {
        console.log(meetup)

        api.meetups.cancelMeetup({request_id: meetup.request_id})
        .then(res => {
            console.log(res.data)
            if(res.data.response_code===200){
                enqueueSnackbar('Meetup Cancelled',  { variant: "success", action } );

                getUpcomingMeetups()
                // setReloadMeetup(!reloadMeetup)
                // setOpenMeetupDialog(false);
                // setOpenMeetupCancellation(true);
            } else {
                console.log('**** ERROR IN CANCELLING MEETUP ***');
                enqueueSnackbar('Unable to Perform Operation',  { variant: "error", action } );
            }
            // handleCloseDialog()
        }).catch(err=> {
            const status = err.response.status
            const statusText = err.response.statusText
            console.log(status);
            console.log(statusText);
            enqueueSnackbar(`Error ${status}: ${statusText}`,  { variant: "error", action } );
            // handleCloseDialog();
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
                } else {
                    enqueueSnackbar('Unable to Perform Operation',  { variant: "error", action } );
                }
            }).catch(err => {
                if(err.response) {
                    const status = err.response.status
                    const statusText = err.response.statusText
                    console.log(status);
                    console.log(statusText);
                    enqueueSnackbar(`Error ${status}: ${statusText}`,  { variant: "error", action } );
                  }
            })
        }
    }

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
                                <MeetupInvitation invitation={invitation} handleAcceptInvitation={handleAcceptInvitation} handleDeclineInvitation={handleDeclineInvitation} redirectProfile={props.redirectProfile} />
                            </Page>
                            
                            </div>
                        ))}
                    </Slider>
                </Wrapper>
                :
                <div>
                    <Typography variant='subtitle1' style={{color:'grey', fontStyle:'italic'}}>
                        No Invitations at the Moment ..
                    </Typography>
                </div>
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
                                        <UpcomingMeetup meetup={meetup} handleDateChange={handleDateChange} handleSelectedMeetup={handleSelectedMeetup} handleMeetupCancellation={handleMeetupCancellation}  handleMeetupConfirmation={handleMeetupConfirmation} handleTelegramRedirect={handleTelegramRedirect} redirectProfile={props.redirectProfile}/>
                                    </div>
                                )
                            }
                        })
                        : 
                        <div>
                            <Typography variant='subtitle1' style={{color:'grey', fontStyle:'italic', marginTop:'5%'}}>
                                No Upcoming Meetups at the Moment ..
                            </Typography>
                        </div>
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
                        : pendingMeetupDate && pendingMeetupDate.length !== 0
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
                        : 
                        <div>
                            <Typography variant='subtitle1' style={{color:'grey', fontStyle:'italic', marginTop:'5%'}}>
                                No Upcoming Meetups at the Moment ..
                            </Typography>
                        </div>
                        }
                    </Grid>
            </Grid>
        </div>
    )
}

// const mapStateToProps = state => {
//     return { 
//       pendingInvitations: state.socialInteraction.pendingInvitations,
//       upcomingMeetups: state.socialInteraction.upcomingMeetups
//      }
//   };
  
// export default connect(
// mapStateToProps,
// { updateUpcomingMeetups, updatePendingInvitations }
// ) (Invitations); 

export default Invitations;