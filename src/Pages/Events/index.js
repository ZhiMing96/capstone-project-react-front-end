import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography, ButtonBase, makeStyles, CssBaseline, Box, Divider, Tabs, Tab, Hidden, Button, Card } from '@material-ui/core';
import { wrap } from 'module';
import { light } from '@material-ui/core/styles/createPalette';
import { maxHeight } from '@material-ui/system';
import {Info as InfoIcon}  from '@material-ui/icons';
import EventsBG from '../../images/eventsBG.jpg'
import IconButton from '@material-ui/core/IconButton';
import Map from './Mapbox'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LaunchIcon from '@material-ui/icons/Launch';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin:'auto',
    padding:20,
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
    maxWidth:'90%',
    maxHeight:'115px'
  },
  tabStyle: {
    minHeight:0, 
    padding:'3px 12px',
    fontSize:18,
    [theme.breakpoints.up('xs')]: {
      fontSize:18,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize:13,
    },
  },
  descriptionTitles: {
    textAlign:'left',
    [theme.breakpoints.down('sm')]: {
      fontSize:17,
    },
    [theme.breakpoints.up('md')]: {
      fontSize:23,
    },
    fontWeight:'bold',
  },
  eventTitle: {
    textAlign:'Left', 
    fontWeight:'bold', 
    overflow:'hidden',
    textOverflow:'ellipsis', 
    display:'-webkit-box',
    WebkitLineClamp:1,
    WebkitBoxOrient:'vertical',
    [theme.breakpoints.down('sm')]: {
      fontSize:15,
    },
    [theme.breakpoints.up('md')]: {
      fontSize:20,
    },
  },
  eventDescription:{
    whiteSpace:'normal', 
    maxHeight:100, 
    textAlign:'left',
    verflow:'hidden',
    textOverflow:'ellipsis',
    display:'-webkit-box',
    WebkitLineClamp:3,
    WebkitBoxOrient:'vertical',
  },
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  firstTab: {
    maxWidth: '100%', 
    flex:'wrap',  
    overflow:"auto",
    position:'sticky', 
    zIndex:10,
    [theme.breakpoints.down('sm')]: {
      top:'57px',
    },
    [theme.breakpoints.up('md')]: {
      top:'64px',
    },
  },
  descriptionArea: {
    position:'sticky', 
    paddingRight:20,
    maxHeight: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft:20,
      marginBottom:20
    }, 
    eventListArea: {
      [theme.breakpoints.down('xs')]: {
        marginRight:20,
      }, 
    }
  }
  
}));

function Events() {
  const classes = useStyles();
  const [events, setEvents] = useState([]);
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [dailyPicks, setDailyPicks] = useState([]);   
  const [value, setValue] = React.useState(0);
  const [fontWeight, setFontWeight] = useState({
    recommended: '600',
    topPicks: '300',
    latest:'300'
  })
  const [selectedEventLocation, setSelectedEventLocation] = useState("Please Select An Event");
  const [selectedEventDescription, setSelectedEventDescription] = useState("");
  const [markerAddress, setMarkerAddress] = useState('Singapore')
  const [selectedUrl, setSelectedUrl] = useState('');

  
  useEffect(() => {
    var filter= '';
    if(value===0){
      filter='recommended'
    } else if (value===1){
      filter='top-picks'
    } else {
      filter='latest'
    }
    console.log(filter);

    axios.get('https://portal.ssg-wsg.gov.sg/content/web/eventsfeed/eventlisting.xml')
    .then(res => {
      //console.log(res.data)
      const data = res.data
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(data, 'text/xml')
      const docLength = xmlDoc.getElementsByTagName("event").length;
      // console.log(length);

      for (let i=0; i<docLength;i++){
        const sessionsXML = xmlDoc.getElementsByTagName("sessions")[i];
        console.log(sessionsXML)
        const sessionsLength = sessionsXML.getElementsByTagName("session").length;
        console.log(sessionsLength);
        var sessions=[];

        for(let a=0;a<sessionsLength;a++){
          console.log('Loop Count: ' + a)
          const eventVenue = sessionsXML.getElementsByTagName("venueName")[a].innerHTML
          console.log(eventVenue);
          const buildingName = sessionsXML.getElementsByTagName("buildingName")[a].innerHTML
          console.log(buildingName);
          const postalCode = sessionsXML.getElementsByTagName("postalcode")[a].innerHTML
          console.log(postalCode);
          const streetName = sessionsXML.getElementsByTagName("streetName")[a].innerHTML
          console.log(streetName);
          const session={
            eventVenue: eventVenue,
            buildingName: buildingName,
            postalCode: postalCode,
            streetName: streetName,
          }
          sessions.push(session)
        }
        const eventName = xmlDoc.getElementsByTagName("eventName")[i].innerHTML
        const eventUrl = xmlDoc.getElementsByTagName("eventURL")[i].innerHTML
        const eventDescription = xmlDoc.getElementsByTagName("summary")[i].innerHTML
        const eventImgUrl = xmlDoc.getElementsByTagName("eventImageURL")[i].innerHTML
        const eventStartDate = xmlDoc.getElementsByTagName("eventStartDate")[i].innerHTML
        const eventEndDate = xmlDoc.getElementsByTagName("eventEndDate")[i].innerHTML
        const eventSegment = xmlDoc.getElementsByTagName("eventSegment")[i].innerHTML
        const eventPrice = xmlDoc.getElementsByTagName("price")[i].innerHTML
        const targetAudience = xmlDoc.getElementsByTagName("targetAudience")[i].innerHTML
        
        const targetNationality = xmlDoc.getElementsByTagName("targetNationality")[i].innerHTML

        const eventGathered = {
          eventName: eventName,
          eventUrl: eventUrl,
          eventDescription: eventDescription,
          eventImgUrl: eventImgUrl,
          eventStartDate: eventStartDate,
          eventEndDate: eventEndDate,
          eventSegment: eventSegment,
          eventPrice: eventPrice,
          targetAudience: targetAudience,
          targetNationality: targetNationality,
          sessions: sessions,
        }

        setEvents(events => [...events, eventGathered]);
        
        // console.log(eventName + "\n" + eventUrl + "\n" + eventImgUrl + "\n" + eventStartDate + "\n" + eventEndDate + "/\n" + eventSegment + "\n" + eventPrice + "\n" + eventVenue + "\n" + buildingName + "\n" + postalCode + "\n" + streetName);
      }
      // console.log(xmlDoc);
    })
  },[value]);

  const handleChange = (event, newValue) => {
    console.log(newValue) 
    switch(newValue) {
      case 0:
        setFontWeight({
          recommended: '600',
          topPicks: '300',
          latest:'300'
        })
        break;
      case 1:
        setFontWeight({
          recommended: '300',
          topPicks: '600',
          latest:'300'
        })
      break;
      case 2:
          setFontWeight({
            recommended: '300',
            topPicks: '300',
            latest:'600'
          })
      break;
      
    }setValue(newValue);
  };

  const getDate =(startDate, endDate) => {
    var newStartDate = new Date(startDate);
    var newEndDate = new Date(endDate);
    //console.log(newStartDate.getHours());
    var startTime = newStartDate.getHours()
    var endTime = newEndDate.getHours()

    if(startTime <= 12){
      startTime = `${startTime}am`
      //console.log(startTime);
    } else {
      startTime = `${startTime-12}pm`
      //console.log(startTime);
    }
    if(endTime <= 12){
      endTime = `${endTime}am`
      //console.log(endTime);
    } else {
      endTime = `${endTime-12}pm`
      //console.log(endTime);
    }

    var month = newStartDate.toLocaleString('en-GB', {month: 'short'});
    console.log(month);
    var startDay = newStartDate.getMonth();
    var endDay = newEndDate.getMonth();
    var startYear = newStartDate.getFullYear();

    var day = startDay
    if(startDay != endDay){
      day = `${startDay}-${endDay}`
    }
    
    return (`${day} ${month} ${startYear}: ${startTime}-${endTime}`)



    //  5-6 Oct 2019: 1pm-5pm
    // var parsedStartDate = newStartDate.toLocaleString('en-GB', {
    //   day: 'numeric',
    //   month: 'short',
    //   year: 'numeric',
    //   hour: '2-digit',
    //   minute: '2-digit',
    // })
    //var startTime = `${newStartDate.getTime}`
    //console.log(parsedDate)
    // console.log(newDate.getMonth());
    // console.log(newDate.getDate());
    // console.log(newDate.getFullYear());
    //
  }

  const formatVenue = (building, venue, streetName, postalCode) =>{
    //Lifelong Learning Center: Training Room 2-1, Eunos Road 9 S123456
    console.log('ENTERED FORMAT VENUE')
    var venueString ='';
    if(building!=='0' && building!=='-' ){
      venueString += building +': ';
    }
    if(venue !== 'NIL')
      venueString += venue + ', ' ;
    if(streetName!=='-' && streetName!=='0' ){
      venueString += streetName + ', ' ;
    }
    if (postalCode!=='000000'){
      venueString += 'S'+ postalCode ;
    }

    console.log(venueString)
    if(venueString ==='') {
      return ('Location Unavailable')
    } else {
      return venueString
    }
  }


  const viewDetails = (event) =>{
    console.log('ENTERED VIEW DETAILS METHOD')
    console.log(event.sessions)
    if(event.sessions[0].buildingName!=='-' && event.sessions[0].buildingName!=='0'){
      setMarkerAddress(event.sessions[0].buildingName);
    } else if (event.sessions[0].eventVenue!=='NIL'){
      setMarkerAddress(event.sessions[0].eventVenue);
    } else  {
      setMarkerAddress('Singapore');
    } 

    setSelectedUrl(event.eventUrl);

    if(event.eventDescription !== ''){
      setSelectedEventDescription(event.eventDescription);
    } else {
      setSelectedEventDescription('No Description Available')
    }
    const location = formatVenue(event.sessions[0].buildingName,event.sessions[0].eventVenue,event.sessions[0].streetName,event.sessions[0].postalCode)
    setSelectedEventLocation(location);
    console.log('Exiting view Event Details')
    window.scrollTo(0,document.body.scrollHeight);
  }

  return(
    <div>
        <CssBaseline/>
          <div style={{backgroundImage:`url(${EventsBG})`,backgroundPosition: 'center',backgroundSize: 'cover', width:'100%', height:'350px'}}>
            <Typography>
              <Box textAlign="left" fontWeight="fontWeightBold" fontSize={40} letterSpacing={2} style={{marginInlineStart:'11%', paddingTop:'150px',color:'#024966'}}>
                EVENTS
              </Box>
              <Box textAlign="left" fontWeight="fontWeightBold" fontSize={15} letterSpacing={1} style={{marginInlineStart:'11%', paddingTop:'1px',color:'#024966'}}>
                <Grid container style={{}}>
                  <Divider orientation="vertical" style={{width:7, height:30, backgroundColor :'#1382B9', marginRight:10}} />
                  <Typography style={{marginTop:5, fontWeight:600}}>
                    One Stop Career Guidance Portal
                  </Typography>
                </Grid>
              </Box>
            </Typography>
          </div>
          {/* <div style={{maxWidth: '100%', flex:'wrap',  overflow:"auto",position:'sticky', top:'64px', zIndex:100}}> */}
         <div className={classes.firstTab}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor=""
              textColor=""
              centered
              style={{maxWidth:'100%', marginInline:30, paddingBlock:5, backgroundColor:'#e3f2fd',alignItems:'center', marginBottom:15}}
            >
                <Tab disableRipple className={classes.tabStyle} label={<span style={{fontWeight:fontWeight.recommended}}>Recommended</span>} />
                <Tab disableRipple className={classes.tabStyle} label={<span style={{fontWeight:fontWeight.topPicks}}>Top Picks</span>} />
                <Tab disableRipple className={classes.tabStyle} label={<span style={{fontWeight:fontWeight.latest}}>Latest</span>} />
            </Tabs>
          </div>
          
        <Grid container style={{zIndex:0}}>
          <Grid item lg={7} sm={6} xs={12} className={classes.eventListArea} style={{maxHeight: 700,overflowY:'auto',}}>
          {events.map((event, index) => (
              <div key={index}>
                <Paper elevation={2} style={{marginInlineStart:20, height:130, marginInlineEnd:20, marginBottom:10, padding:10}}>
                  <Grid container style={{height:'100%', alignContent:'center', }}>
                    <Hidden mdDown>
                      <Grid item sm={2} style={{backgroundImage:`url(${event.eventImgUrl})`, backgroundSize: 'cover'}}>
                      </Grid>
                    </Hidden>
                    <Grid item lg={10} xs={12} container  style={{paddingInlineStart:15, paddingInlineEnd:15}} justify="space-between">
                      <Grid item lg={8} sm={11} xs={11}>
                        <Typography style={{paddingTop:1}}>
                          <Box className={classes.eventTitle}>
                            {event.eventName}
                          </Box>
                          <Box textAlign="left" fontWeight={550} fontSize={13} style={{color:'#607d8b'}}>
                            {getDate(event.eventStartDate,event.eventEndDate )}
                          </Box>
                          <Box textAlign="left" fontWeight={510} fontSize={12}>
                            {event.sessions[0].buildingName !=='0' && event.sessions[0].buildingName !=='-'
                            ? `${event.sessions[0].buildingName}, Singapore`
                            : 'Singapore'
                            }
                          </Box>
                          <Grid
                            container
                            direction="column"
                            justify="flex-end"
                            alignItems="flex-start"
                          >
                            <Grid item>
                              <Box textAlign="left" fontWeight={530} fontSize={10} color='textSecondary'>
                                {event.eventPrice !== '$0.00'
                                ? event.eventPrice
                                : 'Free'
                                }
                              </Box>
                            </Grid>
                          </Grid>
                        </Typography>
                      </Grid>
                      <Hidden lgUp>
                        <Grid item xs={1}>
                          <IconButton
                          onClick={() => viewDetails(event)}
                          disableRipple={true}
                          color='Secondary'
                          >
                            <MoreVertIcon/>
                          </IconButton>
                        </Grid>
                      </Hidden>
                      <Hidden mdDown>
                        <Grid item sm={4} style={{marginTop:1,textAlign:'end'}}>
                          <Button
                          disableRipple={true}
                          size='small'
                          onClick={() => viewDetails(event)}
                          color='primary'
                          disableTouchRipple={true}
                          disableFocusRipple={true}>
                            View Details
                          </Button>
                          <Typography style={{fontSize:11, fontWeight:500}}>
                            {event.targetNationality}
                          </Typography>
                          <Typography style={{fontSize:11, fontWeight:500}}>
                            {event.eventSegment}
                          </Typography>
                        </Grid>
                      </Hidden>
                    </Grid>
                  </Grid>
                </Paper>
              </div>
          ))}
          </Grid>
          <Grid item lg={5} sm={6} xs={12} className={classes.descriptionArea} style={{}}>
            <Map markerAddress={markerAddress}/>
              <Paper style={{width:'100%', height:'50%', padding:20}}>
                <Grid container justify="space-between">
                  <Grid item xs={9}>
                    <Typography className={classes.descriptionTitles} variant="h5" gutterBottom >
                      DETAILS OF LOCATION 
                    </Typography>
                    <Typography style={{fontWeight:"bold",textAlign:'left',}} color='textSecondary'>
                      {selectedEventLocation}
                    </Typography>
                  </Grid>
                  {selectedEventLocation !== 'Please Select An Event'
                  ?
                  <Grid item xs={3} style={{textAlign:'end'}}> 
                    <Hidden xsDown>
                      <Button
                        size="small"
                        variant="outlined"
                        color='secondary'
                        style={{borderRadius:10}}
                        href={selectedUrl}
                        target="_blank"
                        >
                          Sign Up
                        </Button>
                    </Hidden>
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
                  :
                  ''
                  }
                </Grid>
                { selectedEventDescription !==''
                ?
                <div>
                  <Typography className={classes.descriptionTitles} variant="h5"  style={{marginTop:20}}>
                    DESCRIPTION 
                  </Typography>
              
                  <div style={{width:'95%', margin:9, backgroundColor:'#EDF7FA', height:'fit-content', padding:10, maxHeight:'100%'}}>
                    <Grid container style={{maxHeight:'100%'}}>
                      <Grid item xs={1}>
                        <Divider display='inline' orientation='vertical' style={{width:5, height:'100%', backgroundColor :'#1382B9'}} />
                      </Grid>
                      <Grid item xs={11}>
                      <div style={{overflow: "hidden", textOverflow: "ellipsis"}}>
                        <Typography className={classes.eventDescription} variant="subtitle1" noWrap={true} style={{}}>
                            {selectedEventDescription} 
                        </Typography>
                      </div>
                      </Grid>
                    </Grid>
                  </div>
                </div>
                :''
                }
            </Paper>
          </Grid>
        </Grid>      
      
    </div>
  
  );
}

export default Events;