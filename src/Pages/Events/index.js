import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Grid, Paper, Typography, ButtonBase, makeStyles } from '@material-ui/core';

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
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

function Events() {
  const classes = useStyles();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    Axios.get('https://portal.ssg-wsg.gov.sg/content/web/eventsfeed/eventlisting.xml')
    .then(res => {
      //console.log(res.data)
      const data = res.data
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(data, 'text/xml')

      const length = xmlDoc.getElementsByTagName("event").length;
      // console.log(length);

      for (let i=0; i<length;i++){
        const eventName = xmlDoc.getElementsByTagName("eventName")[i].innerHTML
        const eventUrl = xmlDoc.getElementsByTagName("eventURL")[i].innerHTML
        const eventDescription = xmlDoc.getElementsByTagName("summary")[i].innerHTML
        const eventImgUrl = xmlDoc.getElementsByTagName("eventImageURL")[i].innerHTML
        const eventStartDate = xmlDoc.getElementsByTagName("eventStartDate")[i].innerHTML
        const eventEndDate = xmlDoc.getElementsByTagName("eventEndDate")[i].innerHTML
        const eventSegment = xmlDoc.getElementsByTagName("eventSegment")[i].innerHTML
        const eventPrice = xmlDoc.getElementsByTagName("price")[i].innerHTML
        const eventVenue = xmlDoc.getElementsByTagName("venueName")[i].innerHTML
        const location = xmlDoc.getElementsByTagName("locationType")[i].innerHTML
        const postalCode = xmlDoc.getElementsByTagName("postalcode")[i].innerHTML
        const targetAudience = xmlDoc.getElementsByTagName("targetAudience")[i].innerHTML

        const eventGathered = {
          eventName: eventName,
          eventUrl: eventUrl,
          eventDescription: eventDescription,
          eventImgUrl: eventImgUrl,
          eventStartDate: eventStartDate,
          eventEndDate: eventEndDate,
          eventSegment: eventSegment,
          eventPrice: eventPrice,
          eventVenue: eventVenue,
          location: location,
          postalCode: postalCode,
          targetAudience: targetAudience,
        }

        setEvents(events => [...events, eventGathered]);

        
        
        // console.log(eventName + "\n" + eventUrl + "\n" + eventDescription + "\n" + eventImgUrl + "\n" + eventStartDate + "\n" + eventEndDate + "/\n" + eventSegment + "\n" + eventPrice + "\n" + eventVenue + "\n" + location + "\n" + postalCode);
      }
      console.log(xmlDoc);
    })
  },[]);



  return(
    <div>
      <h2> Events </h2>

      <div className={classes.root}>
          {events.map((event, index) => (
              <div key={index}>
                  <a href={event.eventUrl} style={{textDecoration: 'none', color: 'black'}}>
                      <Paper className={classes.paper}>
                      <Grid container spacing={2}>
                          <Grid item>
                          <ButtonBase className={classes.image}>
                              <img className={classes.img} alt="complex" src={event.eventImgUrl} />
                          </ButtonBase>
                          </Grid>
                          <Grid item xs={12} sm container>
                          <Grid item xs container direction="column" spacing={2}>
                              <Grid item xs>
                              <Typography gutterBottom variant="subtitle1">
                                  {event.eventName}
                              </Typography>
                              <Typography variant="body2" gutterBottom>
                                  Expiry Date: {event.eventEndDate}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                  ID: 1030114
                              </Typography>
                              </Grid>
                              <Grid item>
                              <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                  Event is Suitable for: {
                                    (event.targetAudience === "N/A") ? "No Match" : `${event.targetAudience}`
                                  }
                              </Typography>
                              </Grid>
                          </Grid>
                          <Grid item>
                              <Typography variant="subtitle1">
                                {
                                  (event.eventPrice === "$0.00") 
                                  ? "FREE"
                                  : `Cost: ${event.eventPrice}`
                                }
                              </Typography>
                          </Grid>
                          </Grid>
                      </Grid>
                      </Paper>
                  </a>
                  
              </div>
          // </div>
          ))}
      </div>
    </div>
  
  );
}

export default Events;