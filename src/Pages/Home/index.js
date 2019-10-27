import React, { Component, Fragment, Suspense } from 'react';
import './Home.css';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';
import JobListingsView from './JobListingsView';
import ArticleView from './ArticleView';
import EventsView from './EventsView';
import homepageBG from '../../images/homepageBG.JPG'
import { Typography, Paper, Button, CssBaseline, Fab, Grid, Avatar, IconButton, CircularProgress } from '@material-ui/core';
import { fontWeight } from '@material-ui/system';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import searchImg from '../../images/search.svg'
import guideImg from '../../images/guide.svg'
import networkImg from '../../images/network1.svg'
import contentImg from '../../images/content.svg'
import dialogImg from '../../images/dialog.svg'
import { withStyles, makeStyles } from '@material-ui/core/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = theme => ({
  button: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    margin: theme.spacing(5),
    color: "#024966",
    borderColor: "#024966",
    '&:hover': {
      backgroundColor: '#ffffff',
      color: '#024966',
      fontWeight: 'bold',
      borderColor: "#ffffff",
    }
  },
  progress: {
    margin: theme.spacing(2),
  },
})

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sugguestedJobPosition: "",
      jobListing: [],
      modalOpen: false,
      tokenInvalid: false,
      imgLoaded:false
    }


  }

  handleOpen = () => {
    this.setState({ modalOpen: true });
  }

  handleClose = () => {
    this.setState({ modalOpen: false });
  };


  getDate = (data) => {
    const date = new Date(data)
    const dateParsed = date.toString().split(" ");
    const processedDate = `${dateParsed[1]} ${dateParsed[2]} ${dateParsed[3]}`;
    return (processedDate);
  }

  // handleClickProceed = () => {

  // }
  componentDidMount() {
    if (localStorage.getItem('dailyDigestDialog') !== 'shown') {
      setTimeout(this.handleOpen, 1000)
      localStorage.setItem('dailyDigestDialog', 'shown')
    }
    if (this.props.history.location.state) {
      console.log('******* ENTERED METHODDDDDD *********')
      console.log(this.props.history.location.state.tokenInvalid);
      const invalid = this.props.history.location.state.tokenInvalid;
      console.log('******* INVALID = ' + invalid)
      this.setState({ tokenInvalid: invalid })
    }
    console.log(searchImg)
    var imgArray = [searchImg,guideImg,networkImg,contentImg,dialogImg ]
    imgArray.forEach((image)=>{
      console.log(image)
      const img  = new Image()
      img.src = image
      img.onload = ()=>{
        this.setState({imgLoaded: true})
        console.log('loaded')
      }
    })
    

  }

  render() {
    const { classes } = this.props;
    const token = window.localStorage.getItem('authToken');
    const listings = this.state.jobListing;
    console.log("Listings variable consist of: ")
    console.log(listings);
    if(this.state.imgLoaded === false){
      console.log('unloaded')
      return null
    }

    return (
      <Suspense fallback={<CircularProgress className={classes.progress} />}>
        <div style={{ backgroundColor: '#FFFFFF' }}>
          <CssBaseline />

          <Paper style={{ height: '60vh', paddingTop: "10%", background: `linear-gradient(#039be5,#43BDF8 )`, width: '100%' }}>
            {/* <Typography style={{fontWeight:'bold', fontSize:35, textAlign:'center', marginLeft:20, color:'#FFFFFF'}}> */}
            <Typography variant="h3" gutterBottom style={{ fontWeight: 'bold', textAlign: 'center', marginLeft: 20, color: '#FFFFFF', letterSpacing: '0.01em' }}>
              Welcome to Jopify
          </Typography>
            <Typography component='div' variant="h6" gutterBottom style={{ fontWeight: 'lighter', textAlign: 'center', marginLeft: 20, color: '#FFFFFF' }} >
              Cross Platform Access to Government Schemes, Jobs, Courses
          </Typography>

            <Button size='large' variant="outlined" className={classes.button} disableRipple href="/dailydigest">
              Today's Daily Digest
          </Button>
          </Paper>

          <div style={{ maxHeight: '100vh', display: 'flex', padding: '5%', textAlign: 'left', paddingTop: '10%' }}>
            <Grid container >
              <Grid item style={{ textAlign: 'right' }} xs={12} >

                <img src={searchImg} style={{ width: '60%' }} />
                <Typography gutterBottom variant='h3' style={{ textAlign: 'left', fontWeight: 'bolder', paddingBottom: '10px', marginTop: '-22%', paddingRight: '10%' }}>
                  Optimised Search
              </Typography>
                <Typography gutterBottom variant='h6' style={{ textAlign: 'justify', paddingBottom: '10px', color: 'grey', width: '40%' }}>
                  We optimise your search results to factor in the competition level and your skills fit for the job, so that you see job openings that are most suited for you.
              </Typography>
              </Grid>
            </Grid>

          </div>

          <div style={{ maxHeight: '100vh', display: 'block', textAlign: 'left', padding: '5%', backgroundColor: 'whitesmoke', paddingTop: '10%' }}>
            <Grid container spacing={5} justify="space-between" >
              <Grid item style={{ textAlign: 'left' }} xs={7} >
                <img src={guideImg} style={{ width: '100%' }} />
              </Grid>
              <Grid item xs={5} style={{ paddingTop: '20%' }}>
                <Typography gutterBottom variant='h3' style={{ textAlign: 'left', fontWeight: 'bolder', paddingBottom: '10px' }}>
                  Career Guidance
              </Typography>
                <Typography gutterBottom variant='h6' style={{ paddingBottom: '10px', color: 'grey', textAlign: 'justify' }}>
                  We show you articles and events based on your objectives, whether it is searching for a job, or wanting to grow your career.
                  We also let you know what skills to improve in, so that you can land your dream job.
              </Typography>
              </Grid>
            </Grid>

          </div>

          <div style={{ maxHeight: '100vh', display: 'inline-block', padding: '5%', textAlign: 'left', paddingTop: '10%' }}>
            <Grid container spacing={2.5}>

              <Grid item xs={5} style={{ paddingTop: '20%' }}>
                <Typography gutterBottom variant='h3' style={{ textAlign: 'left', fontWeight: 'bolder', paddingBottom: '10px' }}>
                  Expand Network
              </Typography>
                <Typography gutterBottom variant='h6' style={{ paddingBottom: '10px', color: 'grey', textAlign: 'justify' }}>
                  Let us know what kind of experienced individuals you would like to hit up for conversations over coffee, and we will link you up with the people we know.
              </Typography>
              </Grid>
              <Grid item style={{ textAlign: 'right' }} xs={7} >
                <img src={networkImg} style={{ width: '100%' }} />
              </Grid>
            </Grid>


          </div>



          {/*
        <Grid container style={{ margin: 30, marginBottom: '8%', padding: '10%' }} spacing={1} justify="space-between" >
          <Grid item xs={12} sm={4} style={{ backgroundColor: '#FFFFFF' }}>
            <Paper style={{ width: '80%', height: '80%', textAlign: '-webkit-center', padding: 15, borderRadius: 15 }} elevation={0}>
              <Avatar alt="Remy Sharp" src="" style={{ width: 160, height: 160 }} />
              <Typography style={{ marginTop: 30, fontWeight: 'lighter', fontSize: 23 }}>
                Optimised Search
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4} style={{}}>
            <Paper style={{ width: '80%', height: '80%', textAlign: '-webkit-center', padding: 15, borderRadius: 15 }} elevation={0}>
              <Avatar alt="Remy Sharp" src="" style={{ width: 160, height: 160 }} />
              <Typography style={{ marginTop: 30, fontWeight: 'lighter', fontSize: 23 }}>
                Career Guidance
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4} style={{}}>
            <Paper style={{ width: '80%', height: '80%', textAlign: '-webkit-center', padding: 15, borderRadius: 15 }} elevation={0}>
              <Avatar alt="Remy Sharp" src="" style={{ width: 160, height: 160 }} />
              <Typography style={{ marginTop: 30, fontWeight: 'lighter', fontSize: 23 }}>
                Expand Network
              </Typography>
            </Paper>
          </Grid>

        </Grid>
*/}
          <div style={{ maxHeight: '100vh', display: 'block', textAlign: 'left', padding: '5%', backgroundColor: 'whitesmoke', paddingTop: '10%' }}>
            <Grid container spacing={5} justify="space-between" >
              <Grid item style={{ textAlign: 'left' }} xs={7} >
                <img src={contentImg} style={{ width: '90%' }} />
              </Grid>
              <Grid item xs={5} style={{ paddingTop: '18%' }}>
                <Typography gutterBottom variant='h3' style={{ textAlign: 'left', fontWeight: 'bolder', paddingBottom: '10px' }}>
                  Daily Personalised Content
              </Typography>
                <Typography gutterBottom variant='h6' style={{ paddingBottom: '10px', color: 'grey', textAlign: 'justify' }}>
                  We start your day with Telegram notifications on the latest recommended jobs, articles and events based on your profile.
                  The more you do with Jopify, the better we can serve you.
              </Typography>
              </Grid>
            </Grid>

          </div>

          <div>
            <Dialog
              open={this.state.modalOpen}
              TransitionComponent={Transition}
              keepMounted
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
              fullWidth
              PaperProps={{ style: { minWidth: '315px', minHeight: 390 } }}

            >
              <DialogContent>
                <Grid container direction='column' style={{ padding: '5%', paddingTop: '8%' }}>
                  <Grid item style={{ paddingBottom: '5%', textAlign: 'center' }}>
                    <img src={dialogImg} style={{ width: '40%' }} />
                  </Grid>
                  <Grid item style={{ alignSelf: 'center', textAlign: 'center' }}>
                    <Typography gutterBottom variant='h4' style={{ fontWeight: 'bold' }}>
                      Daily Digest
                  </Typography>
                    <Typography component='div' variant='subtitle1' color='textSecondary' style={{}}>
                      Stay Ahead of your Competition
                  </Typography>

                    <Button
                      style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: '20%' }}
                      href='/dailydigest'
                      color='secondary'
                    >
                      Read now
                  </Button>
                  </Grid>
                </Grid>
              </DialogContent>
            </Dialog>
          </div>

        </div>
      </Suspense>
    );


  }
}


export default (withStyles(styles, { withTheme: true })(Home));