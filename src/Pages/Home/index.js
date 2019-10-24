import React, { Component, Fragment } from 'react';
import './Home.css';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';
import JobListingsView from './JobListingsView';
import ArticleView from './ArticleView';
import EventsView from './EventsView';
import homepageBG from '../../images/homepageBG.JPG'
import { Typography, Paper, Button, CssBaseline, Fab, Grid, Avatar, IconButton } from '@material-ui/core';
import { fontWeight } from '@material-ui/system';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      sugguestedJobPosition:"",
      jobListing : [],
      modalOpen : false,
    }
  }

  handleOpen = () => {
    this.setState({modalOpen : true});
  }

  handleClose = () => {
    this.setState({modalOpen : false});
  };


  getDate = (data) =>{
      const date = new Date(data)
      const dateParsed = date.toString().split(" ");
      const processedDate = `${dateParsed[1]} ${dateParsed[2]} ${dateParsed[3]}`;
      return (processedDate);
  }

  // handleClickProceed = () => {

  // }
  componentDidMount(){
    setTimeout( this.handleOpen, 1000)
  }
  
  render() {
    const token = window.localStorage.getItem('authToken');
    const listings = this.state.jobListing;
    console.log("Listings variable consist of: ")
    console.log(listings);

    return(
      <div style={{backgroundColor:'#FFFFFF'}}>
        <CssBaseline/>
        <Paper elevation={0} style={{height:'40vh', paddingTop:50, background: `linear-gradient(#039be5,#43BDF8 )`, zIndex:50}}>
          {/* <Typography style={{fontWeight:'bold', fontSize:35, textAlign:'center', marginLeft:20, color:'#FFFFFF'}}> */}
          <Typography variant="h4" gutterBottom style={{fontWeight:'lighter', textAlign:'center', marginLeft:20, color:'#FFFFFF'}}>
            Never Miss a <span style={{}}>Career</span> Opportunity
          </Typography>
          <Typography variant="subtitle1" gutterBottom style={{fontWeight:'normal', textAlign:'center', marginLeft:20, color:'#FFFFFF'}} >
            Cross Platform Access to Government Schemes, Jobs, Courses 
          </Typography>
          {token
          ?
          <Button variant="contained" style={{backgroundColor:'#FFFFFF' ,color:'#024966', fontWeight:'bold', borderRadius:25, marginTop:50}} disableRipple href="/profile">
            View Profile
          </Button>
          :
          <Button variant="contained" style={{backgroundColor:'#FFFFFF' ,color:'#024966', fontWeight:'bold', borderRadius:25, marginTop:50}} disableRipple href="https://telegram.me/testing20190820_bot" target="_blank">
            SIGN UP NOW
          </Button>
          }
          
        </Paper>
        <Grid container style={{margin:30 , marginBottom:'8%',padding:'10%' }} spacing={1} justify="space-between" >
          <Grid item xs={12} sm={4} style={{backgroundColor:'#FFFFFF'}}>
            <Paper style={{width:'80%', height:'80%', textAlign: '-webkit-center', padding:15, borderRadius:15}} elevation={0}>
              <Avatar alt="Remy Sharp" src="" style={{width:160, height:160}}/>
              <Typography style={{marginTop:30, fontWeight:'lighter', fontSize:23}}>
                Optimised Search
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4} style={{}}>
            <Paper style={{width:'80%', height:'80%', textAlign: '-webkit-center', padding:15, borderRadius:15}} elevation={0}>
              <Avatar alt="Remy Sharp" src="" style={{width:160, height:160}}/>
              <Typography style={{marginTop:30, fontWeight:'lighter', fontSize:23}}>
                Career Guidance
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4} style={{}}>
            <Paper style={{width:'80%', height:'80%', textAlign: '-webkit-center', padding:15, borderRadius:15}} elevation={0}>
              <Avatar alt="Remy Sharp" src="" style={{width:160, height:160}}/>
              <Typography style={{marginTop:30, fontWeight:'lighter', fontSize:23}}>
                Expand Network
              </Typography>
            </Paper>
          </Grid>
          
        </Grid>

        <div style={{height:'50vh', display:'block', paddingLeft:'5%',textAlign:'left', padding:'10%', backgroundColor:'whitesmoke'}}>

          <Typography gutterBottom variant='h3' style={{textAlign:'left', fontWeight:'bolder'}}>
            Daily Curated Content.
          </Typography>
          <div style={{ textAlign:'right'}}>
            <Button
              size='large'
              variant='contained'
              href='/dailydigest'
              style={{fontWeight:'bold', fontSize:18, borderRadius:25, color:'#0091ea', backgroundColor:'white', margin:'7%'}}
            >
              View Daily Digest Now! 
            </Button>
          </div>
          

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
            PaperProps= {{style:{minWidth:'315px',minHeight:390}}}
            
          >
            <DialogContent>
              <Grid container direction='column' style={{padding:'5%', paddingTop:'8%'}}>
                <Grid item style={{alignSelf:'center', paddingBottom:'5%'}}>
                  <Avatar
                    style={{width:100, height:100,}}
                  />
                </Grid>
                <Grid item style={{alignSelf:'center', textAlign:'center'}}>
                  <Typography gutterBottom variant='h3' style={{fontWeight:'bold'}}>
                    Daily Digest. 
                  </Typography>
                  <Typography variant='h6' color='textSecondary' style={{}}>
                    Stay Ahead of your Competition
                  </Typography>
                  
                  <Button
                    style={{fontSize:20,fontWeight:'bold', textAlign:'center', marginTop:'20%'}}
                    href='/dailydigest'
                    color='secondary'
                  >
                    Proceed
                  </Button>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        </div>

      </div>
    );


  }
}


export default Home;