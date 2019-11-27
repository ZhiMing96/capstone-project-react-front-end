import React, { useState, useEffect, Fragment } from 'react';
import { Grid, Paper, Typography, ButtonBase, makeStyles, CssBaseline, Box, Divider, Tabs, Tab, Hidden, Button, DialogContent, DialogContentText, createMuiTheme, IconButton, Dialog } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import { ThemeProvider } from '@material-ui/styles';
import clsx from 'clsx';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Map from '../../Pages/Events/Mapbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
        backgroundColor:'whitesmoke',
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

export default function EventListingComponent(props) {
  const classes = useStyles();
  const { event, handleHrefClick, handleSelectedEvent, recommended } = props
  const [ open, setOpen ] = useState(false);
  const [ expanded, setExpanded] = useState(false);
  const [ markerAddress, setMarkerAddress ] = useState();

  useEffect(()=>{
    handleFormatVenue();

  },[props])

  const handleExpandClick = () => {
    console.log("Entered handleExpandClick in events listing component");
    setExpanded(!expanded);
  };

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const viewDetails = () => {
    if(recommended){
      handleSelectedEvent(event);
    } else {
      handleSelectedEvent(event);
    }
    
  }

  const handleFormatVenue = () => {
    const venueArray = event.venue ? event.venue.split('·') : null
    // console.log(venueArray)

    const formattedVenue = venueArray ? venueArray[0] +', Singapore' : null
    // console.log(formattedVenue)
    
    setMarkerAddress(formattedVenue);
  }



  const getDate =(dateString) => {
    var date = new Date(dateString);
    //console.log(date)

    var time = date.getHours();
    //console.log(time)
    if (time <= 12) {
      time = `${time}am`
      //console.log(time);
    } else {
      time = `${time - 12}pm`
      //console.log(time);
    }

    var month = date.toLocaleString('en-GB', { month: 'short' });
    //console.log(month)

    var day = date.getDate();
    //console.log(day)

    var year = date.getFullYear();
    return(`${day} ${month} ${year}: ${time}`);
  }

  

console.log("PRINTING EVENT IN LISTING COMPONENT")
console.log(event)
    return (
        <div>
            <Card className={classes.eventLisiting}
                  onMouseEnter={() => viewDetails()}>
                  <div style={{ display: 'inline-flex', width: '100%' }}>
                    <CardMedia
                      className={classes.cover}
                      image = { event && recommended && event.logo ? event.logo : event && !recommended && event.logo ? event.logo : defaultImg }
                      title={event.event_title}
                    />
                    <CardContent style={{ paddingLeft: 20, width: '100%' }}>
                      <Grid container style={{ height: '100%', alignContent: 'center', }}>
                        
                        <Grid item xs={12} container style={{}} justify="space-between">
                          <Grid item xs={11}>
                            <Typography style={{ fontWeight: 'bold', fontSize: 12, textAlign: 'left' }}>
                              { event && recommended 
                              ? event.job_phase === "GROW_CAREER" ? 'Grow Your Career' : 'Searching For Jobs'
                              : event && !recommended 
                              ? event.job_phase === "GROW_CAREER" ? 'Grow Your Career' : 'Searching For Jobs'
                              : ""}
                            </Typography>
                            <Typography style={{ paddingTop: 1 }}>
                              <Box className={classes.eventTitle}>
                                {event && recommended ? event.event_title : event && !recommended ? event.event_title : ""}
                              </Box>
                              <Box textAlign="left" fontWeight={550} fontSize={13} style={{ color: '#607d8b' }}>
                                
                                {getDate(event && recommended ? event.date_time : event && !recommended ? event.date_time:null)}
                              </Box>
                              <Box textAlign="left" fontWeight={510} fontSize={12}>
                                {event && recommended ? event.venue : event && !recommended ? event.venue :""}
                              </Box>
                              <Grid
                                container
                                direction="column"
                                justify="flex-end"
                                alignItems="flex-start"
                              >
                                <Grid item>
                                  <Box textAlign="left" fontWeight={530} fontSize={12} color='textSecondary'>
                                    {event && recommended ? event.cost : event && !recommended ? event.cost : "Free"}
                                  </Box>
                                </Grid>
                              </Grid>
                            </Typography>
                          </Grid>
                          <Grid item xs={1} container justify='center' style={{ alignContent: 'space-between' }}>
                            <Hidden smUp>
                              <IconButton
                                onClick={() => handleClickOpen()}
                                disableRipple={true}
                                color='Secondary'
                                style={{}}
                              >
                                <MoreVertIcon />
                              </IconButton>
                            </Hidden>
                            <IconButton
                              className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded 
                              })}
                              size='small'
                              onClick={() => handleExpandClick()}
                              aria-expanded={expanded}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>

                  </div>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent style={{ padding: 0 }}>
                      <div style={{ width: '95%', margin: 9, marginTop: 15, backgroundColor: '#EDF7FA', height: 'fit-content', padding: 10, maxHeight: '100%' }}>
                        <Grid container style={{ maxHeight: '100%' }}>
                          <Grid item xs={1}>
                            <Divider display='inline' orientation='vertical' style={{ width: 5, height: '100%', backgroundColor: '#1382B9' }} />
                          </Grid>
                          <Grid item xs={11}>
                            <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                              <Typography className={classes.eventDescription} variant="subtitle1" noWrap={true} style={{}}>
                                {event && recommended ? event.summary : event && !recommended ? event.summary : "No Description Available"}
                              </Typography>
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                    </CardContent>
                  </Collapse>
                </Card>
                <ThemeProvider theme={theme}>
                  <Dialog open={ open } onClose={handleClose} style={{ boxShadow: 0, opacity: 1, margin: '7px', width: '100vw'}} fullWidth>
                    <DialogContent style={{ textAlign: 'center' }}>
                      <Map markerAddress={markerAddress} style={{ width: '98%', }} />
                      <Typography className={classes.descriptionTitles} variant="h5" gutterBottom >
                        {event && recommended && event.event_title ? event.event_title  : event && !recommended && event.event_title ? event.event_title : "LOCATION"}
                      </Typography>
                      <Typography style={{ fontWeight: "bold", textAlign: 'left', }} color='textSecondary'>
                        {event && recommended && event.venue ? event.venue : event && !recommended && event.venue ? event.venue : 'Singapore'}
                      </Typography>
                      <Button
                        fullWidth
                        variant="contained"
                        href={event && recommended ? event.url  : event && recommended ? event.url :"http://www.meetup.com"}
                        target="_blank"
                        style={{ fontWeight: 'bold', fontSize: 17, marginTop: 10, marginBottom: 10, backgroundColor: '#0091ea', color: '#FFFFFF' }}
                      >
                        Sign Up
                    </Button>
                    </DialogContent>
                  </Dialog>
                </ThemeProvider>
              
        </div>
    )
}
