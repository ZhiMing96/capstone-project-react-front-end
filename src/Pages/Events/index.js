import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography, ButtonBase, makeStyles, CssBaseline, Box, Divider, Tabs, Tab, Hidden, Button, DialogContent, DialogContentText, createMuiTheme } from '@material-ui/core';
import EventsBG from '../../images/eventsBG.jpg'
import IconButton from '@material-ui/core/IconButton';
import Map from './Mapbox'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LaunchIcon from '@material-ui/icons/Launch';
import Slide from '@material-ui/core/Slide';
import MapGL, { GeolocateControl, Marker } from 'react-map-gl';
import api from '../../api';
import EventListingComponent from '../../Components/EventsComponent/EventListingComponent';
import { useSnackbar } from 'notistack';
import ClearIcon from '@material-ui/icons/Clear'


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
  descriptionArea: {
    position: 'sticky',
    top:'15%',
    maxHeight: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 20,
      marginBottom: 20
    },
    eventListArea: {
      maxHeight:'250vh',
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
  const [allEvents, setAllEvents] = useState();
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [dailyPicks, setDailyPicks] = useState([]);
  const [value, setValue] = React.useState(0);
  const [fontWeight, setFontWeight] = useState({
    recommended: '600',
    topPicks: '300',
    latest: '300'
  })
  const [selectedEventLocation, setSelectedEventLocation] = useState("Please Select An Event");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [markerAddress, setMarkerAddress] = useState('Singapore')
  const [selectedUrl, setSelectedUrl] = useState('');
  const [selectedIndex, setselectedIndex] = useState(null);
  const [selectedRecommendedIndex, setSelectedRecommendedIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(7);
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = React.useState(false);
  const token = window.localStorage.getItem('authToken');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const action = key => (
      <Fragment>
          <IconButton onClick={() => { closeSnackbar(key) }} size="small" style={{ color:'white' }}>
              <ClearIcon/>
          </IconButton>
      </Fragment>
  );

 

  useEffect(() => {
    // console.log('*** MARKER ADDRESS ***')
    // console.log(markerAddress);
    api.events.get()
    .then(res=>{
      const results = res.data;
      // console.log('******* RESULTS FROM EVENTS API CALL ********')
      // console.log(results);
      if(results.response_code === 200){
        setAllEvents(results.events)
      } else {
        enqueueSnackbar("Unable to Retrieve All Events!",  { variant: "error", action } );
      }
    }).catch(err=>{
        enqueueSnackbar("Unable to Retrieve All Events!",  { variant: "error", action } );

    })

    if(token){
      api.dailyDigest.get()
      .then(res=>{
        const results = res.data;
        if(results.response_code === 200){
          // console.log('**** RESULTS FROM DAILY DIGEST W TOKEN  *****')
          // console.log(results);
          setRecommendedEvents(results.events);
        } else {
          enqueueSnackbar("Unable to Retrieve Recommended Events!",  { variant: "error", action } );
        }
        
      }).catch(err=>{
          enqueueSnackbar("Unable to Retrieve Recommended Events in Catch!",  { variant: "error", action } );
      })
    } else {
      api.dailyDigest.getPublic()
      .then(res=>{
        const results = res.data;
        if(results.response_code === 200){
          // console.log('**** RESULTS FROM DAILY DIGEST W/O TOKEN  *****')
          // console.log(results);
          setRecommendedEvents(results.events);
        } else {
          enqueueSnackbar("Unable to Retrieve Recommended Events!",  { variant: "error", action } );
        }
      }).catch(err=>{
          enqueueSnackbar("Unable to Retrieve Recommended Events!",  { variant: "error", action } );
      })
    }
  }, []);

  //get current page lisitngs
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = events.slice(indexOfFirstPost, indexOfLastPost);

  //Change Page 
  const paginate = pageNumber => setCurrentPage(pageNumber);
  // console.log("CURRENT PAGE NUMBER = " + currentPage)

  const handleHrefClick = url => {
    window.open(url, '_blank');
  }

  const handleSelectedEvent = (event) => {
    const venueArray = event && event.venue ? event.venue.split('·') : null
    // console.log(venueArray)

    const formattedVenue = venueArray ? venueArray[0] +', Singapore' : null
    // console.log(formattedVenue)
    
    setMarkerAddress(formattedVenue);
    setSelectedEventLocation(event && event.venue ? event.venue :null);
    setSelectedUrl(event && event.url ? event.url : null);
    setSelectedEvent(event)
  }

  

  // console.log("!!!! EVENT = ")
  // console.log(allEvents)

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
        <Grid item container lg={7} md={7} sm={6} xs={12} className={classes.eventListArea} >
          <Grid item xs={12}>
            <Typography variant='h4' gutterBottom color='secondary' style={{ textAlign: 'left', fontWeight: 550, paddingLeft: 20, marginBottom: '2%' }}>
              Recommended
              </Typography>
              { recommendedEvents 
              ?
              <div style={{ maxHeight: '100%', overflowY: 'auto', }}>
              {recommendedEvents.map((recommendedEvent, index) => (
                <div key={index}>
                  <EventListingComponent key={index} event={recommendedEvent} handleSelectedEvent={handleSelectedEvent} handleHrefClick={handleHrefClick} recommended={true}/> 
                </div>
              ))}
            </div>
              : 
              <div>
                <Typography variant='h6' style={{margin:'5%'}}>
                    No Recommended Events 
                </Typography>
              </div>
            }
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h4' gutterBottom color='secondary' style={{ textAlign: 'left', fontWeight: 550, paddingLeft: 20, marginTop: '7%', marginBottom: '2%' }}>
              Latest
              </Typography>
            <div style={{ maxHeight: '70vh', overflowY: 'auto', }}>
              {allEvents 
              ? 
              allEvents.map((list, index) => (
                // <div key={index}>
                  <EventListingComponent key={index} event={list} handleSelectedEvent={handleSelectedEvent} handleHrefClick={handleHrefClick} />
                  
                // </div>
              ))
              : ""
            }
            </div>
          </Grid>
        </Grid>
        <Hidden xsDown>
          <Grid item lg={5} md={5} sm={6} xs={12} className={classes.descriptionArea} style={{}}>
            <Map markerAddress={markerAddress} style={{ width: '100%', }} />
            <Paper style={{ width: '100%', padding: 20 }}>
              <Grid container justify="space-between">
                <Grid item xs={12}>
                  <Typography className={classes.descriptionTitles} variant="h5" gutterBottom >
                    {selectedEvent ? selectedEvent.event_title : "LOCATION"}
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