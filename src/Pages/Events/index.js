import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography, ButtonBase, makeStyles, CssBaseline, Box, Divider, Tabs, Tab, Hidden, Button, DialogContent, DialogContentText, createMuiTheme } from '@material-ui/core';
import EventsBG from '../../images/eventsBG.jpg'
import IconButton from '@material-ui/core/IconButton';
import Map from './Mapbox'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LaunchIcon from '@material-ui/icons/Launch';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { ThemeProvider } from '@material-ui/styles';
import MapGL, { GeolocateControl, Marker } from 'react-map-gl';
import api from '../../api';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const theme = createMuiTheme({
  overrides: {
    MuiDialog: {
      paper: {
        margin: '0px',
        marginRight: '12px'
      }
    },
    palette: {
      primary: {
        main: '#0091ea'

      },
      secondary: {
        main: '#024966'
      }
    }
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 'auto',
    padding: 20,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 700,
  },
  image: {
    maxWidth: '90%',
    maxHeight: '90%',
  },
  img: {
    width: '70%',
    height: '80%',
    maxWidth: '90%',
    maxHeight: '115px'
  },
  tabStyle: {
    minHeight: 0,
    padding: '3px 12px',
    fontSize: 18,
    [theme.breakpoints.up('xs')]: {
      fontSize: 18,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 13,
    },
  },
  descriptionTitles: {
    marginTop: 15,
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      fontSize: 17,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 23,
    },
    fontWeight: 'bold',
  },
  eventTitle: {
    textAlign: 'Left',
    fontWeight: 'lighter',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    [theme.breakpoints.down('md')]: {
      fontSize: 15,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 20,
    },
  },
  eventDescription: {
    whiteSpace: 'normal',
    maxHeight: 100,
    textAlign: 'left',
    verflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  // firstTab: {
  //   maxWidth: '100%', 
  //   flex:'wrap',  
  //   overflow:"auto",
  //   position:'sticky', 
  //   zIndex:10,
  //   [theme.breakpoints.down('sm')]: {
  //     top:'57px',
  //   },
  //   [theme.breakpoints.up('md')]: {
  //     top:'64px',
  //   },
  // },
  descriptionArea: {
    position: 'sticky',
    // paddingRight:20,
    maxHeight: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 20,
      marginBottom: 20
    },
    eventListArea: {
      [theme.breakpoints.down('xs')]: {
        marginRight: 20,
      },
    }
  },
  eventLisiting: {
    marginInlineStart: 20,
    marginInlineEnd: 20,
    marginBottom: 20,
    padding: 20,
    paddingRight: 0,
    marginRight: 20,
    paddingTop: 17,
    boxShadow: 'none',
    height: 'auto',
    '&:hover': {
      boxShadow: '0px 1px 8px 0px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14)',
    },
    [theme.breakpoints.down('sm')]: {
      padding: 5,
      marginRight: 0,

    },
    [theme.breakpoints.down('xs')]: {
      padding: 5,
      marginRight: 0,

    },
  },
  card: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  cover: {
    marginTop: 16,
    width: '40%',
    height: 'inherit',
    [theme.breakpoints.down('xs')]: {
      height: '10vh',
    },
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  eventsArea: {
    zIndex: 0,
    padding: 20,
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
}));

const defaultImg = 'https://portal.ssg-wsg.gov.sg/content/dam/eventCatalog/products/import/categories/events/E-0000981/E-0000981.jpg'

function Events() {
  const classes = useStyles();
  const [events, setEvents] = useState([]);
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [dailyPicks, setDailyPicks] = useState([]);
  const [value, setValue] = React.useState(0);
  const [fontWeight, setFontWeight] = useState({
    recommended: '600',
    topPicks: '300',
    latest: '300'
  })
  const [selectedEventLocation, setSelectedEventLocation] = useState("Please Select An Event");
  const [selectedEventDescription, setSelectedEventDescription] = useState("");
  const [markerAddress, setMarkerAddress] = useState('Singapore')
  const [selectedUrl, setSelectedUrl] = useState('');
  const [selectedIndex, setselectedIndex] = useState(null);
  const [selectedRecommendedIndex, setSelectedRecommendedIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(7);
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = React.useState(false);
  const token = window.localStorage.getItem('authToken');

  const doGeocoding = (long, lat) => {
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + long + ',' + lat + '.json?access_token=' + process.env.REACT_APP_MAPBOX_TOKEN
    axios.get(url).then(res => {
      return res.data.features[0].place_name
    })
  } 

  const handleRecommendedClickOpen = (event, index) => {
    setselectedIndex(null);
    setSelectedRecommendedIndex(index);

    const venue = doGeocoding(event.longitude, event.latitude)

    if(venue != null){
      setMarkerAddress(venue);
    }  else  {
      setMarkerAddress(null);
    }

    // if (event.sessions[0].buildingName !== '-' && event.sessions[0].buildingName !== '0') {
    //   setMarkerAddress(event.sessions[0].buildingName);
    // } else if (event.sessions[0].eventVenue !== 'NIL') {
    //   setMarkerAddress(event.sessions[0].eventVenue);
    // } else {
    //   setMarkerAddress(null);
    // }

    setOpen(true);
    // const location = formatVenue(event.sessions[0].buildingName, event.sessions[0].eventVenue, event.sessions[0].streetName, event.sessions[0].postalCode)

    // setSelectedEventLocation(location);


    setSelectedEventLocation(venue ? venue : 'Singapore');

  }

  const handleClickOpen = (event, index) => {
    setSelectedRecommendedIndex(null);
    setselectedIndex(index);
    if (event.sessions[0].buildingName !== '-' && event.sessions[0].buildingName !== '0') {
      setMarkerAddress(event.sessions[0].buildingName);
    } else if (event.sessions[0].eventVenue !== 'NIL') {
      setMarkerAddress(event.sessions[0].eventVenue);
    } else {
      setMarkerAddress(null);
    }
    setOpen(true);
    const location = formatVenue(event.sessions[0].buildingName, event.sessions[0].eventVenue, event.sessions[0].streetName, event.sessions[0].postalCode)
    setSelectedEventLocation(location);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const handleExpandRecommendedClick = (index) => {
    console.log(index);
    setselectedIndex(null);
    setSelectedRecommendedIndex(index);
    setExpanded(!expanded);
  };
  const handleExpandClick = (index) => {
    console.log(index);
    setSelectedRecommendedIndex(null);
    setselectedIndex(index);
    setExpanded(!expanded);
  };

  useEffect(() => {
    api.events.get()
    .then(res=>{
      const results = res.data;
      console.log('******* RESULTS FROM EVENTS API CALL ********')
      console.log(results);
      if(results.response_code === 200){
        setEvents(results.events)
      } else {

      }
    }).catch(err=>{
      console.error(err);
    })

    if(token){
      api.dailyDigest.get()
      .then(res=>{
        const results = res.data;
        console.log('**** RESULTS FROM DAILY DIGEST W TOKEN  *****')
        console.log(results);
        setRecommendedEvents(results.events);
      }).catch(err=>{
        console.error(err);
      })
    } else {
      api.dailyDigest.getPublic()
      .then(res=>{
        const results = res.data;
        console.log('**** RESULTS FROM DAILY DIGEST W/O TOKEN  *****')
        console.log(results);
        setRecommendedEvents(results.events);
      }).catch(err=>{
        console.error(err);
      })
    }
  }, []);

  const handleChange = (event, newValue) => {
    console.log(newValue)
    switch (newValue) {
      case 0:
        setFontWeight({
          recommended: '600',
          topPicks: '300',
          latest: '300'
        })
        break;
      case 1:
        setFontWeight({
          recommended: '300',
          topPicks: '600',
          latest: '300'
        })
        break;
      case 2:
        setFontWeight({
          recommended: '300',
          topPicks: '300',
          latest: '600'
        })
        break;

    }setValue(newValue);
  };

  const getDate =(dateString) => {
    var date = new Date(dateString);
    var time = date.getHours();
    if (time <= 12) {
      time = `${time}am`
      //console.log(time);
    } else {
      time = `${time - 12}pm`
      //console.log(time);
    }

    var month = date.toLocaleString('en-GB', { month: 'short' });
    var day = date.getMonth();
    var year = date.getFullYear();
    return(`${day} ${month} ${year}: ${time}`);
  }

  // const getDate = (startDate, endDate) => {
  //   var newStartDate = new Date(startDate);
  //   var newEndDate = new Date(endDate);
  //   //console.log(newStartDate.getHours());
  //   var startTime = newStartDate.getHours()
  //   var endTime = newEndDate.getHours()

  //   if (startTime <= 12) {
  //     startTime = `${startTime}am`
  //     //console.log(startTime);
  //   } else {
  //     startTime = `${startTime - 12}pm`
  //     //console.log(startTime);
  //   }
  //   if (endTime <= 12) {
  //     endTime = `${endTime}am`
  //     //console.log(endTime);
  //   } else {
  //     endTime = `${endTime - 12}pm`
  //     //console.log(endTime);
  //   }

  //   var month = newStartDate.toLocaleString('en-GB', { month: 'short' });
  //   console.log(month);
  //   var startDay = newStartDate.getMonth();
  //   var endDay = newEndDate.getMonth();
  //   var startYear = newStartDate.getFullYear();

  //   var day = startDay
  //   if (startDay != endDay) {
  //     day = `${startDay}-${endDay}`
  //   }

  //   return (`${day} ${month} ${startYear}: ${startTime}-${endTime}`)



  //   //  5-6 Oct 2019: 1pm-5pm
  //   // var parsedStartDate = newStartDate.toLocaleString('en-GB', {
  //   //   day: 'numeric',
  //   //   month: 'short',
  //   //   year: 'numeric',
  //   //   hour: '2-digit',
  //   //   minute: '2-digit',
  //   // })
  //   //var startTime = `${newStartDate.getTime}`
  //   //console.log(parsedDate)
  //   // console.log(newDate.getMonth());
  //   // console.log(newDate.getDate());
  //   // console.log(newDate.getFullYear());
  //   //
  // }

  const formatVenue = (building, venue, streetName, postalCode) => {
    //Lifelong Learning Center: Training Room 2-1, Eunos Road 9 S123456
    console.log('ENTERED FORMAT VENUE')
    var venueString = '';
    if (building !== '0' && building !== '-') {
      venueString += building + ': ';
    }
    if (venue !== 'NIL')
      venueString += venue + ', ';
    if (streetName !== '-' && streetName !== '0') {
      venueString += streetName + ', ';
    }
    if (postalCode !== '000000') {
      venueString += 'S' + postalCode;
    }

    console.log(venueString)
    if (venueString === '') {
      return ('Location Unavailable')
    } else {
      return venueString
    }
  }

  const viewRecommended = (event, index) => {
    console.log('Recommended Article Selected')
    setselectedIndex(null);
    setSelectedRecommendedIndex(index);

    console.log(event)

    const venue = doGeocoding(event.longitude, event.latitude)

    if(venue != null){
      setMarkerAddress(venue);
    }  else  {
      setMarkerAddress(null);
    }

    // if (event.sessions[0].buildingName !== '-' && event.sessions[0].buildingName !== '0') {
    //   setMarkerAddress(event.sessions[0].buildingName);
    // } else if (event.sessions[0].eventVenue !== 'NIL') {
    //   setMarkerAddress(event.sessions[0].eventVenue);
    // } else {
    //   setMarkerAddress('Singapore');
    // }

    setSelectedUrl(event.url);

    if (event.summary !== '') {
      setSelectedEventDescription(event.summary);
    } else {
      setSelectedEventDescription('No Description Available')
    }
    // const location = formatVenue(event.sessions[0].buildingName, event.sessions[0].eventVenue, event.sessions[0].streetName, event.sessions[0].postalCode)
    setSelectedEventLocation(venue ? venue : 'Singapore');
    
  }


  const viewDetails = (event, index) => {
    console.log('ENTERED VIEW DETAILS METHOD for Others Section')
    setSelectedRecommendedIndex(null);
    setselectedIndex(index);
    console.log(index);
    console.log(event);

    const venue = doGeocoding(event.longitude, event.latitude)

    if(venue != null){
      setMarkerAddress(venue);
    }  else  {
      setMarkerAddress(null);
    }

    // if (event.venue !== null) {
    //   setMarkerAddress(event.sessions[0].buildingName);
    // } else if (event.sessions[0].eventVenue !== 'NIL') {
    //   setMarkerAddress(event.sessions[0].eventVenue);
    // } else {
    //   setMarkerAddress('Singapore');
    // }

    setSelectedUrl(event.url);

    if (event.summary !== '') {
      setSelectedEventDescription(event.summary);
    } else {
      setSelectedEventDescription('No Description Available')
    }
    // const location = formatVenue(event.sessions[0].buildingName, event.sessions[0].eventVenue, event.sessions[0].streetName, event.sessions[0].postalCode)

    setSelectedEventLocation(venue ? venue : 'Singapore');
    console.log('Exiting view Event Details')
    // window.scrollTo(0,document.body.scrollHeight);
  }

  //get current page lisitngs
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = events.slice(indexOfFirstPost, indexOfLastPost);

  //Change Page 
  const paginate = pageNumber => setCurrentPage(pageNumber);
  console.log("CURRENT PAGE NUMBER = " + currentPage)

  const handleHrefClick = url => {
    window.open(url, '_blank');
  }

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>

      <CssBaseline />
      <div style={{ backgroundImage: `url(${EventsBG})`, backgroundPosition: 'center', backgroundSize: 'cover', width: '100%', height: '350px' }}>
        <Typography>
          <Box textAlign="left" fontWeight="fontWeightBold" fontSize={40} letterSpacing={2} style={{ marginInlineStart: '11%', paddingTop: '150px', color: '#024966' }}>
            EVENTS
              </Box>
          <Box textAlign="left" fontWeight="fontWeightBold" fontSize={15} letterSpacing={1} style={{ marginInlineStart: '11%', paddingTop: '1px', color: '#024966' }}>
            <Grid container style={{}}>
              <Divider orientation="vertical" style={{ width: 7, height: 30, backgroundColor: '#1382B9', marginRight: 10 }} />
              <Typography style={{ marginTop: 5, fontWeight: 600 }}>
                One Stop Career Guidance Portal
                  </Typography>
            </Grid>
          </Box>
        </Typography>
      </div>
      <div>
      </div>
      <Grid container className={classes.eventsArea} style={{ marginTop: '3%' }}>
        <Grid item lg={7} md={7} sm={6} xs={12} className={classes.eventListArea} >
          <Typography variant='h4' gutterBottom color='secondary' style={{ textAlign: 'left', fontWeight: 550, paddingLeft: 20, marginBottom: '2%' }}>
            Recommended
            </Typography>
            { recommendedEvents 
            ?
            <div style={{ maxHeight: 300, overflowY: 'auto', }}>
            {recommendedEvents.map((event, index) => (
              <div key={index}>
                <Card className={classes.eventLisiting} style={selectedRecommendedIndex === index ? { backgroundColor: 'whitesmoke' } : {}}
                  onMouseEnter={() => viewRecommended(event, index)}>
                  <div style={{ display: 'inline-flex', width: '100%' }}>
                    <CardMedia
                      className={classes.cover}
                      image={event.logo? event.logo : defaultImg}
                      title={event.event_title}
                    />
                    {/* <div className={classes.details}> */}
                    <CardContent style={{ paddingLeft: 20, width: '100%' }}>
                      <Grid container style={{ height: '100%', alignContent: 'center', }}>
                        {/* <Hidden smDown>
                        <Grid item sm={2} style={{backgroundImage:`url(${event.eventImgUrl})`, backgroundSize: 'cover'}}>
                        </Grid>
                      </Hidden> */}
                        <Grid item xs={12} container style={{}} justify="space-between">
                          <Grid item xs={11}>
                            <Typography style={{ fontWeight: 'bold', fontSize: 12, textAlign: 'left' }}>
                              {event.job_phase}
                            </Typography>
                            <Typography style={{ paddingTop: 1 }}>
                              <Box className={classes.eventTitle}>
                                {event.event_title}
                              </Box>
                              <Box textAlign="left" fontWeight={550} fontSize={13} style={{ color: '#607d8b' }}>
                                {/* {getDate(event.start_date, event.end_date)} */}
                                {getDate(event.date_time)}
                              </Box>
                              <Box textAlign="left" fontWeight={510} fontSize={12}>
                                {/* {event.sessions[0].buildingName !== '0' && event.sessions[0].buildingName !== '-'
                                  ? `${event.sessions[0].buildingName}, Singapore`
                                  : 'Singapore'
                                } */}
                                {doGeocoding(event.longitude,event.latitude)? doGeocoding(event.longitude,event.latitude)  : 'Singapore'}
                              </Box>
                              <Grid
                                container
                                direction="column"
                                justify="flex-end"
                                alignItems="flex-start"
                              >
                                <Grid item>
                                  <Box textAlign="left" fontWeight={530} fontSize={12} color='textSecondary'>
                                    {event.cost}
                                  </Box>
                                </Grid>
                              </Grid>
                            </Typography>
                          </Grid>
                          <Grid item xs={1} container justify='center' style={{ alignContent: 'space-between' }}>
                            <Hidden smUp>
                              <IconButton
                                onClick={() => handleRecommendedClickOpen(event, index)}
                                disableRipple={true}
                                color='Secondary'
                                style={{}}
                              >
                                <MoreVertIcon />
                              </IconButton>
                            </Hidden>
                            <IconButton
                              className={clsx(classes.expand, {
                                [classes.expandOpen]: index === selectedRecommendedIndex ? expanded : false,
                              })}
                              size='small'
                              onClick={() => handleExpandRecommendedClick(index, event)}
                              aria-expanded={expanded}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </IconButton>
                          </Grid>
                          {/* <Hidden smDown>
                          <Grid item md={3} sm={4} style={{marginTop:1,textAlign:'end'}}>
                            <Button
                            disableRipple={true}
                            size='small'
                            onClick={() => viewDetails(event,index)}
                            color='primary'
                            disableTouchRipple={true}
                            disableFocusRipple={true}
                            style={{fontWeight:'bold', fontSize:12}}
                            
                            >
                              View Details
                            </Button>
                            <Typography style={{fontSize:11, fontWeight:500}}>
                              {event.targetNationality}
                            </Typography>
                          </Grid>
                        </Hidden> */}
                          {/* <Grid item sm={1} style={{marginTop:1,textAlign:'end'}}>
                          <IconButton
                            className={clsx(classes.expand, {
                              [classes.expandOpen]: index === selectedIndex? expanded : false,
                            })}
                            size='small'
                            onClick={() => handleExpandClick(index)}
                            aria-expanded={expanded}
                            aria-label="show more"
                          >
                            <ExpandMoreIcon />
                          </IconButton>
                        </Grid> */}
                        </Grid>
                      </Grid>
                    </CardContent>

                  </div>

                  {/* </div> */}
                  <Collapse in={index === selectedRecommendedIndex ? expanded : false} timeout="auto" unmountOnExit>
                    <CardContent style={{ padding: 0 }}>
                      <div style={{ width: '95%', margin: 9, marginTop: 15, backgroundColor: '#EDF7FA', height: 'fit-content', padding: 10, maxHeight: '100%' }}>
                        <Grid container style={{ maxHeight: '100%' }}>
                          <Grid item xs={1}>
                            <Divider display='inline' orientation='vertical' style={{ width: 5, height: '100%', backgroundColor: '#1382B9' }} />
                          </Grid>
                          <Grid item xs={11}>
                            <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                              <Typography className={classes.eventDescription} variant="subtitle1" noWrap={true} style={{}}>
                                {event.summary}
                              </Typography>
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                    </CardContent>
                  </Collapse>
                </Card>
                <ThemeProvider theme={theme}>
                  <Dialog open={selectedRecommendedIndex === index ? open : false} onClose={handleClose} style={{ boxShadow: 0, opacity: 1, margin: '7px', width: '100vw' }}>
                    <DialogContent style={{ textAlign: 'center' }}>
                      <Map markerAddress={markerAddress} style={{ width: '98%', }} />
                      <Typography className={classes.descriptionTitles} variant="h5" gutterBottom >
                        LOCATION
                      </Typography>
                      <Typography style={{ fontWeight: "bold", textAlign: 'left', }} color='textSecondary'>
                        {selectedEventLocation}
                      </Typography>
                      <Button
                        fullWidth
                        variant="contained"
                        href={selectedUrl}
                        target="_blank"
                        style={{ fontWeight: 'bold', fontSize: 17, marginTop: 10, marginBottom: 10, backgroundColor: '#0091ea', color: '#FFFFFF' }}
                      >
                        Sign Up
                    </Button>
                    </DialogContent>
                  </Dialog>
                </ThemeProvider>
              </div>
            ))}
          </div>
            : 
            <div>
              <Typography variant='h6' style={{margin:'5%'}}>
                  No Recommended Articles 
              </Typography>
            </div>
            }
        

          <Typography variant='h4' gutterBottom color='secondary' style={{ textAlign: 'left', fontWeight: 550, paddingLeft: 20, marginTop: '7%', marginBottom: '2%' }}>
            Latest
            </Typography>
          <div style={{ maxHeight: 500, overflowY: 'auto', }}>
            {events.map((event, index) => (
              <div key={index}>
                <Card className={classes.eventLisiting} style={selectedIndex === index ? { backgroundColor: 'whitesmoke' } : {}}
                  onMouseEnter={() => viewDetails(event, index)}>
                  <div style={{ display: 'inline-flex', width: '100%' }}>
                    <CardMedia
                      className={classes.cover}
                      image='https://content-mycareersfuture-sg-admin.cwp.sg/wp-content/uploads/2019/03/shutterstock_683138257.jpg'
                      title={event.logo}
                    />
                    {/* <div className={classes.details}> */}
                    <CardContent style={{ paddingLeft: 20, width: '100%' }}>
                      <Grid container style={{ height: '100%', alignContent: 'center', }}>
                        {/* <Hidden smDown>
                        <Grid item sm={2} style={{backgroundImage:`url(${event.eventImgUrl})`, backgroundSize: 'cover'}}>
                        </Grid>
                      </Hidden> */}
                        <Grid item xs={12} container style={{}} justify="space-between">
                          <Grid item xs={11}>
                            <Typography style={{ fontWeight: 'bold', fontSize: 12, textAlign: 'left' }}>
                              {event.job_phase}
                            </Typography>
                            <Typography style={{ paddingTop: 1 }}>
                              <Box className={classes.eventTitle}>
                                {event.event_title}
                              </Box>
                              <Box textAlign="left" fontWeight={550} fontSize={13} style={{ color: '#607d8b' }}>
                                {/* {getDate(event.eventStartDate, event.eventEndDate)} */}
                                {getDate(event.date_time)}
                              </Box>
                              <Box textAlign="left" fontWeight={510} fontSize={12}>
                                {/* {event.sessions[0].buildingName !== '0' && event.sessions[0].buildingName !== '-'
                                  ? `${event.sessions[0].buildingName}, Singapore`
                                  : 'Singapore'
                                } */}
                                {doGeocoding(event.longitude,event.latitude)? doGeocoding(event.longitude,event.latitude)  : 'Singapore'}
                              </Box>
                              <Grid
                                container
                                direction="column"
                                justify="flex-end"
                                alignItems="flex-start"
                              >
                                <Grid item>
                                  <Box textAlign="left" fontWeight={530} fontSize={12} color='textSecondary'>
                                      {event.cost} 
                                  </Box>
                                </Grid>
                              </Grid>
                            </Typography>
                          </Grid>
                          <Grid item xs={1} container justify='center' style={{ alignContent: 'space-between' }}>
                            <Hidden smUp>
                              <IconButton
                                onClick={() => handleClickOpen(event, index)}
                                disableRipple={true}
                                color='Secondary'
                                style={{}}
                              >
                                <MoreVertIcon />
                              </IconButton>
                            </Hidden>
                            <IconButton
                              className={clsx(classes.expand, {
                                [classes.expandOpen]: index === selectedIndex ? expanded : false,
                              })}
                              size='small'
                              onClick={() => handleExpandClick(index, event)}
                              aria-expanded={expanded}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </IconButton>
                          </Grid>
                          {/* <Hidden smDown>
                          <Grid item md={3} sm={4} style={{marginTop:1,textAlign:'end'}}>
                            <Button
                            disableRipple={true}
                            size='small'
                            onClick={() => viewDetails(event,index)}
                            color='primary'
                            disableTouchRipple={true}
                            disableFocusRipple={true}
                            style={{fontWeight:'bold', fontSize:12}}
                            
                            >
                              View Details
                            </Button>
                            <Typography style={{fontSize:11, fontWeight:500}}>
                              {event.targetNationality}
                            </Typography>
                          </Grid>
                        </Hidden> */}
                          {/* <Grid item sm={1} style={{marginTop:1,textAlign:'end'}}>
                          <IconButton
                            className={clsx(classes.expand, {
                              [classes.expandOpen]: index === selectedIndex? expanded : false,
                            })}
                            size='small'
                            onClick={() => handleExpandClick(index)}
                            aria-expanded={expanded}
                            aria-label="show more"
                          >
                            <ExpandMoreIcon />
                          </IconButton>
                        </Grid> */}
                        </Grid>
                      </Grid>
                    </CardContent>

                  </div>

                  {/* </div> */}
                  <Collapse in={index === selectedIndex ? expanded : false} timeout="auto" unmountOnExit>
                    <CardContent style={{ padding: 0 }}>
                      <div style={{ width: '95%', margin: 9, marginTop: 15, backgroundColor: '#EDF7FA', height: 'fit-content', padding: 10, maxHeight: '100%' }}>
                        <Grid container style={{ maxHeight: '100%' }}>
                          <Grid item xs={1}>
                            <Divider display='inline' orientation='vertical' style={{ width: 5, height: '100%', backgroundColor: '#1382B9' }} />
                          </Grid>
                          <Grid item xs={11}>
                            <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                              <Typography className={classes.eventDescription} variant="subtitle1" noWrap={true} style={{}}>
                                {event.summary}
                              </Typography>
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                    </CardContent>
                  </Collapse>
                </Card>
                <ThemeProvider theme={theme}>
                  <Dialog open={selectedIndex === index ? open : false} onClose={handleClose} style={{ boxShadow: 0, opacity: 1, margin: '7px', width: '100vw' }}>
                    <DialogContent style={{ textAlign: 'center' }}>
                      <Map markerAddress={markerAddress} style={{ width: '98%', }} />
                      <Typography className={classes.descriptionTitles} variant="h5" gutterBottom >
                        LOCATION
                      </Typography>
                      <Typography style={{ fontWeight: "bold", textAlign: 'left', }} color='textSecondary'>
                        {selectedEventLocation}
                      </Typography>
                      <Button
                        fullWidth
                        variant="contained"
                        href={selectedUrl}
                        target="_blank"
                        style={{ fontWeight: 'bold', fontSize: 17, marginTop: 10, marginBottom: 10, backgroundColor: '#0091ea', color: '#FFFFFF' }}
                      >
                        Sign Up
                    </Button>
                    </DialogContent>
                  </Dialog>
                </ThemeProvider>
              </div>
            ))}
          </div>

        </Grid>
        <Hidden xsDown>
          <Grid item lg={5} md={5} sm={6} xs={12} className={classes.descriptionArea} style={{}}>
            <Map markerAddress={markerAddress} style={{ width: '100%', }} />
            <Paper style={{ width: '100%', padding: 20 }}>
              <Grid container justify="space-between">
                <Grid item xs={12}>
                  <Typography className={classes.descriptionTitles} variant="h5" gutterBottom >
                    LOCATION
                      </Typography>
                  <Typography style={{ fontWeight: "bold", textAlign: 'left', }} color='textSecondary'>
                    {selectedEventLocation}
                  </Typography>
                </Grid>
                {selectedEventLocation !== 'Please Select An Event'
                  ?
                  <Grid item xs={12} style={{ textAlign: 'end', marginTop: 15 }}>
                    <Button
                      variant='contained'
                      size="small"
                      fullWidth
                      color='primary'
                      target="_blank"
                      style={{ fontWeight: 'bold', fontSize: 17 }}
                      onClick={() => handleHrefClick(selectedUrl)}
                    >
                      Sign Up
                          </Button>

                    <Hidden smUp>
                      <IconButton
                        color='secondary'
                        href={selectedUrl}
                        target="_blank"
                      >
                        <LaunchIcon />
                      </IconButton>
                    </Hidden>
                  </Grid>
                  : ''
                }
              </Grid>
            </Paper>
          </Grid>
        </Hidden>

      </Grid>
    </div>

  );
}

export default Events;