import React, { useEffect, useState, } from 'react';
import api from '../../api';
import { Grid, Button, CssBaseline, IconButton, Paper, Typography, Divider, Box, InputBase, Container, ButtonBase, Avatar, Fab, Card, CardContent, List, ListItemAvatar, ListItem, ListItemText } from '@material-ui/core';
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
import Snackbar from '../../Components/Snackbar';


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
    const [openMeetupConfirmation, setOpenMeetupConfirmation] = useState(false); 
    const [ selectedMeetup, setSelectedMeetup] = useState();
    const [ openMeetupCancellation, setOpenMeetupCancellation ] = useState(false);
    const [ pendingInvitations, setPendingInvitations ] = useState();
    const [ upcomingMeetups, setUpcomingMeetups ] = useState();
    const [ pendingMeetupDate, setPendingMeetupDate ] = useState();
    const [ invitationsLoading, setInvitationsLoading ] = useState(false);
    const [ meetupsloading, setMeetupsLoading ] = useState(false);
    const [ openSnackBarError, setOpenSnackBarError ] = useState(false);
    const [ openSnackBarSuccess, setOpenSnackBarSuccess ] = useState(false);

    const getPendingInvitation = () => {
        setInvitationsLoading(true);
        api.invitations.getPending()
        .then(res=>{
            console.log(res.data)
            if(res.data.response_code === 200) {
                const invitesSent = res.data.invites_sent
                const invitesReceived = res.data.invites_received

                console.log('****** Invitations Sent *****')
                console.log(invitesSent);

                console.log('****** Invitations Received *****')
                console.log(invitesReceived);

                setPendingInvitations(invitesReceived)
            } 
            setInvitationsLoading(false);
        }).catch(err => console.log(err))
    }

    const getUpcomingMeetups = () => {
        setMeetupsLoading(true);
        api.invitations.getCurrent()
        .then(res=> {
            console.log(res.data)
            if(res.data.response_code === 200) {
                const invitesSent = res.data.invites_sent
                const invitesReceived = res.data.invites_received
                console.log('****** Invitations Sent *****')
                console.log(invitesSent);
                console.log('****** Invitations Received *****')
                console.log(invitesReceived);
                var combined = invitesSent.concat(invitesReceived)
                console.log('****** Combined Invitations *****')
                console.log(combined);
                var tempWithDate = [];
                var tempWithoutDate = [];

                for(let i=0; i<combined.length;i++){
                    const invitation = combined[i]
                    console.log(invitation)
                    if(invitation.accepted === 1){
                        if(invitation.suggested_datetime !== null){
                            tempWithDate.push(invitation)
                        } else {
                            tempWithoutDate.push(invitation)
                        }
                        
                    }
                }
                setUpcomingMeetups(tempWithDate)
                setPendingMeetupDate(tempWithoutDate)
            }
            setMeetupsLoading(false);
        })
    }
    
    
    useEffect(()=>{
        getPendingInvitation();
        getUpcomingMeetups();
    },[props]) 

    const handleAcceptInvitation = (requestId) => {
        console.log(requestId)
        api.invitations.acceptInvitation({request_id: requestId})
        .then(res=>{
            if(res.data.response_code === 200){
                console.log("*** INVITATION ACCEPTED *** INSERT A SNACKBAR TO INFORM USER");
                getPendingInvitation();
                getUpcomingMeetups();
            } else {
                console.log("**** UNABLE TO ACCEPT INVITATION ****")
                console.log(res.data.response_code + res.data.response_message)
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
            } else {
                console.log("**** UNABLE TO CANCEL INVITATION ****")
                console.log(res.data.response_code + res.data.response_message)
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
            } else {
                console.log('***** DATE CHANGE NOT RECORDED ****')
            }
           
        })
    }; 

    const handleOpenConfirmationDialog = (index,type) => {
        if(type === 'invitation'){
            setSelectedInvitationIndex(index)
            setOpenInvitation(true);
        } else if (type === 'meetupWithDate') {
            setSelectedMeetupIndexWithDate(index)
            setSelectedMeetupIndexWithoutDate(null)
            setOpenMeetupConfirmation(true);
        } else if (type === 'meetupWithoutDate') {
            setSelectedMeetupIndexWithoutDate(index)
            setSelectedMeetupIndexWithDate(null)
            setOpenMeetupConfirmation(true);
        }
    };
    const handleOpenCancellationDialog = (index,type) => {
        if (type === 'meetupWithDate') {
            setSelectedMeetupIndexWithDate(index)
            setSelectedMeetupIndexWithoutDate(null)
            setOpenMeetupCancellation(true);
        } else if (type === 'meetupWithoutDate') {
            setSelectedMeetupIndexWithoutDate(index)
            setSelectedMeetupIndexWithDate(null)
            setOpenMeetupCancellation(true);
        }
    };

    const handleCloseDialog = () => {
        // if(type === 'invitation'){
            setOpenInvitation(false);
        // } else if (type === 'meetup') {
            setOpenMeetupConfirmation(false);
            setOpenMeetupCancellation(false);
        // }
    };


    const deleteElement = (index) => {
        console.log('Index = ' + index)
        var array = [...pendingInvitations]
        array.splice(index,1)
        // setPendingInvitations(array);
    }
    
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
                setOpenMeetupConfirmation(false);
            } else {
                console.log('**** ERROR IN CONFIRMING MEETUP ***');
            }
            handleCloseDialog();
        }).catch(err=> {
            console.log(err)
            handleCloseDialog();
        });
    }
    const handleMeetupCancellation = (meetup) => {
        console.log(meetup)

        api.meetups.cancelMeetup({request_id: meetup.request_id})
        .then(res => {
            console.log(res.data)
            if(res.data.response_code===200){
                getUpcomingMeetups()
                setOpenMeetupConfirmation(false);
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

    return (
        <div>
            {/* <Router> */}
            <Grid container direction="row" style={{ width: '100%', textAlign: 'left' }}>
                <Grid item xs={12} style={{marginTop:'5%'}}>
                {/* <Badge badgeContent={pendingInvitations ? pendingInvitations.length : null} color="error" 
                anchorOrigin={{ vertical: 'top', horizontal: 'left',}}> */}
                    <Typography className={classes.sectionHeading}>
                        INVITATION REQUESTS
                    </Typography>
                {/* </Badge> */}
                </Grid>
                <Grid container style={{ margin:10, marginTop:10, }} spacing={1} justify="space-between" > 
                {invitationsLoading
                // ? <Skeleton variant="rect" width={246} height={249}>
                //      <Skeleton variant="circle" width={85} height={85} style={{margin:'5%', marginLeft:'32%', marginTop:'10%'}}/>
                //      <Skeleton variant='rect' height='20%' style={{marginLeft:'20%',marginRight:'20%', marginBottom:'8%'}} />
                //      <Grid container >
                //          <Grid item xs={6}>
                //             <Skeleton variant='rect' width="60%" height={30} style={{marginLeft:'21%'}} />
                //          </Grid>
                //          <Grid item xs={6}>
                //             <Skeleton variant='rect'  width="60%" height={30} style={{marginLeft:'10%'}} />
                //          </Grid>
                //      </Grid>
                // </Skeleton>
                ? <InvitationRequestSkeleton/>
                : pendingInvitations
                ? 
                <Wrapper>
                    <Slider {...carouselSettings}>
                        {pendingInvitations.map((invitation, index) => (
                            <div key={index}>
                            <Page>
                                <Paper className={classes.carouselPaper} elevation={5}>
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
                                            src={invitation.to_user && invitation.to_user.social.profile_image_link ? invitation.to_user.social.profile_image_link : 
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
                                            {invitation.to_user && invitation.to_user.profile
                                                ? invitation.to_user.profile.username 
                                                : invitation.from_user && invitation.from_user.profile
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
                                            <Grid item xs={6}>
                                                <Button color='primary' style={{fontSize:15,fontWeight:'bold'}} size='small'
                                                onClick={()=>handleOpenConfirmationDialog(index,'invitation')}
                                                >
                                                    Accept
                                                </Button>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Button color='primary' style={{fontSize:15,fontWeight:'bold', color:'#992E24'}} size='small'
                                                onClick={()=>handleDeclineInvitation(invitation)}
                                                >
                                                    Decline
                                                </Button>
                                            </Grid>
                                            
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Page>
                            <Dialog
                            open={index === selectedInvitationIndex ? openInvitation: false}
                            TransitionComponent={Transition}
                            keepMounted
                            fullWidth
                            onClose={handleCloseDialog}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogContent style={{padding:'4%', paddingTop:'5%'}}>
                                    <Grid container >
                                        <Grid item xs={12} sm={4} style={{textAlign:'-webkit-center'}}>
                                            <Avatar alt="List"
                                                src={invitation.to_user && invitation.to_user.social 
                                                    ? invitation.to_user.social.profile_image_link
                                                    : invitation.from_user && invitation.from_user.social
                                                    ? invitation.from_user.social.profile_image_link
                                                    : ''} 
                                                imgProps={{style:{objectFit:'contain',border:0}}}
                                                style={{width:90, height:90, marginBottom:'5%' }}
                                            />
                                        </Grid>
                                        <Grid Item xs={12} sm={8} style={{textAlign:'-webkit-center'}}>
                                            <Typography style={{fontSize:20, fontWeight:"bold"}} gutterBottom>
                                                {invitation.to_user &&  invitation.to_user.profile
                                                    ? invitation.to_user.profile.username.toUpperCase() 
                                                    : invitation.from_user && invitation.from_user.profile
                                                    ? invitation.from_user.profile.username.toUpperCase()  
                                                    : ''
                                                }'S MESSAGE
                                            </Typography>
                                            <Typography style={{fontSize:17, fontWeight:"medium"}}>
                                                {invitation.message}
                                            </Typography>
                                            
                                        </Grid>
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Link to={{
                                        pathname: "/profile",
                                        state: { user: 
                                            invitation.to_user && invitation.to_user.profile
                                                ? invitation.to_user.profile.user_id 
                                                : invitation.from_user && invitation.from_user.profile
                                                ? invitation.from_user.profile.user_id 
                                                : null
                                        }
                                    }} 
                                    style={{textDecoration:'none'}}>
                                        <Button 
                                            color="primary"
                                            onClick={()=> handleCloseDialog()}
                                            style={{fontWeight:'bold'}}
                                            >
                                                View Profile 
                                        </Button>
                                    </Link>
                                        
                                    <Button 
                                    onClick={() => handleAcceptInvitation(invitation.request_id)} color="primary"
                                    style={{fontWeight:'bold'}}>
                                        Accept
                                    </Button>
                                </DialogActions>
                            </Dialog>
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
                            {/* <Badge badgeContent={upcomingMeetups? upcomingMeetups.length : null } color="error"
                            anchorOrigin={{ vertical: 'top', horizontal: 'left',}}> */}
                                <Typography className={classes.sectionHeading} style={{}}>
                                    UPCOMING MEETUPS
                                </Typography>
                            {/* </Badge> */}
                        </Grid>
                        
                        {meetupsloading
                        ? <UpcomingMeetupsSkeletonLoading/>
                        : upcomingMeetups
                        ?
                        upcomingMeetups.map((meetup, index) => {
                            if(meetup.suggested_datetime !== null){
                                return(
                                    <div style={{width:'90%'}}>
                                        <Card style={{width:'100%', height:'fit-content', padding:'5%',marginBottom:'4%'}}>
                                            <Grid container item xs={12}>
                                                <Grid item xs={3}> 
                                                    <Avatar alt="List"
                                                        src='' 
                                                        className={classes.listAvatar} 
                                                        imgProps={{style:{objectFit:'contain',border:0}}}
                                                        // onClick={()=> handleViewProfile()}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} style={{textAlign:'left', paddingLeft:'2%'}}> 
                                                    <Typography>
                                                    {meetup.from_user && meetup.from_user.profile
                                                        ? meetup.from_user.profile.username 
                                                        : meetup.to_user && meetup.to_user.profile
                                                        ? meetup.to_user.profile.username 
                                                        : ''
                                                    }
                                                    </Typography>
                                                    <Typography>
                                                        Chong Yi Qiong
                                                    </Typography>
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
                                                        />
                                                    </MuiPickersUtilsProvider>
                                                </Grid>
                                                <Grid container item xs={3} direction="row" justify="space-between"> 
                                                    <Grid item  xs={12}>
                                                        <Typography>
                                                            2 Days Left
                                                        </Typography>
                                                    </Grid>   
                                                    <Grid item container xs={12}>
                                                        <Grid item xs={6} style={{textAlign:'-webkit-center', alignSelf:'center'}}>
                                                            <Avatar
                                                            className={classes.controlButtons}
                                                            onClick={() => handleTelegramRedirect(
                                                                meetup.to_user && meetup.to_user.profile
                                                                ? meetup.to_user.profile.telegram_id 
                                                                : meetup.from_user && meetup.from_user.profile
                                                                ? meetup.from_user.profile.telegram_id 
                                                                : null
                                                            )}
                                                            src={TelegramIcon}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6} style={{textAlign:'-webkit-center', alignSelf:'center'}}>
                                                            <IconButton
                                                            // className={classes.controlButtons}
                                                            onClick={()=> handleOpenConfirmationDialog(index, 'meetupWithoutDate')}
                                                            >
                                                                <MoreVertIcon/>
                                                            </IconButton>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                        <Dialog
                                        open={index === selectedMeetupIndexWithoutDate ? openMeetupConfirmation: false}
                                        TransitionComponent={Transition}
                                        keepMounted
                                        fullWidth
                                        onClose={handleCloseDialog}
                                        aria-labelledby="alert-dialog-slide-title"
                                        aria-describedby="alert-dialog-slide-description"
                                        style={{}}
                                        >
                                            <DialogContent style={{padding:'9%', paddingTop:0, paddingRight:0}}>
                                                <Grid container>
                                                    <Grid item xs={12} style={{textAlign:'right'}}>
                                                        <IconButton
                                                        onClick={handleCloseDialog}
                                                        style={{margin:'1%'}}
                                                        >
                                                            <ClearIcon style={{width:45, height:45}}/>
                                                        </IconButton>
                                                    </Grid>
                                                    <Grid item xs={12} style={{textAlign:'center', marginBottom:'5%', paddingRight:'9%'}}>
                                                        <Typography style={{fontSize:20}}>
                                                            How was your meetup with John Doe?
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item container spacing={7} style={{ paddingRight:'9%'}}>
                                                        <Grid item xs={6} style={{textAlign:'-webkit-right'}}>
                                                            <Avatar alt="List"
                                                                src={RemoveMeetupIcon} 
                                                                className={classes.listAvatar} 
                                                                imgProps={{style:{objectFit:'contain',border:0}}}
                                                                style={{marginRight:'16%'}}
                                                            />
                                                            <Button 
                                                            style={{fontWeight:'bold', fontSize:18}}
                                                            onClick={()=> handleMeetupCancellation(meetup)}
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
                                                            onClick={()=> handleMeetupConfirmation(meetup)} 
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
                        })
                        : "NO UPCOMING MEETUPS"
                        }
                    </Grid>
                
                    <Grid container item xs={12} md={6}>
                        <Grid item xs={12} style={{marginTop:'10%', textAlign:'left'}}>
                            {/* <Badge badgeContent={pendingMeetupDate? pendingMeetupDate.length : null } color="error"
                            anchorOrigin={{ vertical: 'top', horizontal: 'left',}}> */}
                                <Typography className={classes.sectionHeading} style={{ color:'#992E24'}}>
                                    PENDING MEETUP DATE
                                </Typography>
                            {/* </Badge> */}
                        </Grid>
                        {meetupsloading
                        ? <UpcomingMeetupsSkeletonLoading/>
                        : pendingMeetupDate
                        ?
                        pendingMeetupDate.map((meetup, index) => {
                            if(meetup.suggested_datetime === null){
                                return(
                                    <div style={{width:'90%'}}>
                                        <Card style={{width:'100%', height:'fit-content', padding:'5%',marginBottom:'4%'}}>
                                            <Grid container item xs={12}>
                                                <Grid item xs={3}> 
                                                    <Avatar alt="List"
                                                        src='' 
                                                        className={classes.listAvatar} 
                                                        imgProps={{style:{objectFit:'contain',border:0}}}
                                                        // onClick={()=> handleHrefClick(listing)}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} style={{textAlign:'left', paddingLeft:'2%'}}> 
                                                    <Typography>s
                                                        {meetup.to_user && meetup.to_user.profile
                                                            ? meetup.to_user.profile.username 
                                                            : meetup.from_user && meetup.from_user.profile
                                                            ? meetup.from_user.profile.username 
                                                            : ''
                                                        }
                                                    </Typography>
                                                    <Typography>
                                                        Chong Yi Qiong
                                                    </Typography>
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils} style={{color:'#992E24'}}>
                                                        <KeyboardDatePicker
                                                            margin="normal"
                                                            id="date-picker-dialog"
                                                            format="MM/dd/yyyy"
                                                            value={null}
                                                            onChange={handleDateChange}
                                                            KeyboardButtonProps={{
                                                                'aria-label': 'change date',
                                                                'color':'#992E24'
                                                            }}
                                                            onOpen={()=> handleSelectedMeetup(meetup)}
                                                            style={{width:'65%', }}
                                                        />
                                                    </MuiPickersUtilsProvider>
                                                    
                                                </Grid>
                                                <Grid container item xs={3} direction="row" justify="space-between"> 
                                                    <Grid item  xs={12}>
                                                        <Typography>
                                                            2 Days Left
                                                        </Typography>
                                                    </Grid>   
                                                    <Grid item container xs={12}>
                                                        <Grid item xs={6} style={{textAlign:'-webkit-center', alignSelf:'center'}}>
                                                            <Avatar
                                                            className={classes.controlButtons}
                                                            src={TelegramIcon}
                                                            onClick={()=> handleTelegramRedirect(117216954)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6} style={{textAlign:'-webkit-center', alignSelf:'center'}}>
                                                            <IconButton
                                                            // className={classes.controlButtons}
                                                            onClick={()=> handleOpenConfirmationDialog(index, 'meetupWithoutDate')}
                                                            >
                                                                <MoreVertIcon/>
                                                            </IconButton>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                        <Dialog
                                        open={index === selectedMeetupIndexWithoutDate ? openMeetupConfirmation: false}
                                        TransitionComponent={Transition}
                                        keepMounted
                                        onClose={handleCloseDialog}
                                        aria-labelledby="alert-dialog-slide-title"
                                        aria-describedby="alert-dialog-slide-description"
                                        style={{}}
                                        >
                                            <DialogContent style={{padding:'9%', paddingTop:0, paddingRight:0}}>
                                                <Grid container>
                                                    <Grid item xs={12} style={{textAlign:'right'}}>
                                                        <IconButton
                                                        onClick={handleCloseDialog}
                                                        style={{margin:'1%'}}
                                                        >
                                                            <ClearIcon style={{width:45, height:45}}/>
                                                        </IconButton>
                                                    </Grid>
                                                    <Grid item xs={12} style={{textAlign:'center', marginBottom:'5%', paddingRight:'9%'}}>
                                                        <Typography style={{fontSize:20}}>
                                                            How was your meetup with John Doe?
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item container spacing={7} style={{ paddingRight:'9%'}}>
                                                        <Grid item xs={6} style={{textAlign:'-webkit-right'}}>
                                                            <Avatar alt="List"
                                                                src={RemoveMeetupIcon} 
                                                                className={classes.listAvatar} 
                                                                imgProps={{style:{objectFit:'contain',border:0}}}
                                                                style={{marginRight:'16%'}}
                                                            />
                                                            <Button 
                                                            style={{fontWeight:'bold', fontSize:18}}
                                                            onClick={()=> handleMeetupCancellation(55)}
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
                                                            onClick={()=> handleMeetupConfirmation(55)} 
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
                        })
                        : 'NO UPCOMING MEETUPS' 
                        }
                    </Grid>
            </Grid>
        </div>
    )
}


export default Invitations;


/* <Snackbar
            open={ openSuccessSnackbar || openErrorSnackbar ? true : false }
            handleClose={resetSnackBars}
            variant={openSuccessSnackbar ? "success" : openErrorSnackbar ? "error" : "success"}
            message={openSuccessSnackbar ? requestSuccessMsg : openErrorSnackbar ? requestErrorMsg : ""}
        />*/