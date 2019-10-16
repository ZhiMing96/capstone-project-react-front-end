import React, { Component, Fragment } from 'react';
import './Home.css';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';
import JobListingsView from './JobListingsView';
import ArticleView from './ArticleView';
import EventsView from './EventsView';
import homepageBG from '../../images/homepageBG.JPG'
import { Typography, Paper, Button, CssBaseline, Fab, Grid, Avatar } from '@material-ui/core';
import { fontWeight } from '@material-ui/system';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      sugguestedJobPosition:"",
      // suggestedArticleReference:"",
      jobListing : []
    }
  }

  getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getJobTitle = () => {
    //Send Get Request to Backend to get Suggested Job Ttile based on User
    
    // OR 

    //Generic Template 
    axios.get('https://api.mycareersfuture.sg/popular-job-titles')
      .then(res => {
        const popularJobs = res.data;
        const num = this.getRandomInt(5)
        const jobTitle = popularJobs[num].icmsJobTitle
        this.setState({
          sugguestedJobPosition: jobTitle
        })
      })
      // .then(() => this.getListings())

  }

  getDate = (data) =>{
      const date = new Date(data)
      const dateParsed = date.toString().split(" ");
      const processedDate = `${dateParsed[1]} ${dateParsed[2]} ${dateParsed[3]}`;
      return (processedDate);
  }

  componentDidMount(){
    this.getJobTitle();
    
  }
  render() {
    const listings = this.state.jobListing;
    console.log("Listings variable consist of: ")
    console.log(listings);

    // if(this.state.sugguestedJobPosition != null) {
    //   return(
    //     <div className='root'>
    //       <div className='backgroundImg' style={{backgroundImage:`url(${homepageBG})`}} >
    //         <div className='tagLine'>
    //           <Typography style={{color:"#1382B9", fontWeight:'bold', fontSize:25, textAlign:'left', paddingLeft:10, paddingRight:10}}>
    //             Hey,
    //           </Typography>
    //           <Typography style={{color:"#024966", fontWeight:'medium', fontSize:11, textAlign:'left', paddingLeft:10,paddingRight:10}}>
    //           Never miss a career opportunity with Jopify 
    //           </Typography>
    //           <div style={{textAlign:"end"}}>
    //             <Button size='small' style={{textAlign:'end', fontSize:10, fontWeight:'bold', color:"#1382B9"}} disableRipple href="https://telegram.me/testing20190820_bot" target="_blank">
    //               Sign Up
    //             </Button>
    //           </div>
    //         </div>

            
    //       </div>
    //     </div>
    //   )
    // } else {
    //   return(
    //     <div>
    //       <h1> No Job Title </h1>
    //     </div>
    //   )
    // }
//backgroundColor:'#EDF7FA'
    return(
      <Fragment>
        <CssBaseline/>
        <Paper elevation={0} style={{height:'40vh', paddingTop:50, backgroundColor:'#039be5' }}>
          {/* <Typography style={{fontWeight:'bold', fontSize:35, textAlign:'center', marginLeft:20, color:'#FFFFFF'}}> */}
          <Typography variant="h4" gutterBottom style={{fontWeight:'lighter', textAlign:'center', marginLeft:20, color:'#FFFFFF'}}>
            Never Miss a <span style={{}}>Career</span> Opportunity
          </Typography>
          <Typography variant="subtitle1" gutterBottom style={{fontWeight:'normal', textAlign:'center', marginLeft:20, color:'#FFFFFF'}} >
            Cross Platform Access to Government Schemes, Jobs, Courses 
          </Typography>

          <Button variant="contained" style={{backgroundColor:'#FFFFFF' ,color:'#024966', fontWeight:'bold', borderRadius:25, marginTop:50}} disableRipple href="https://telegram.me/testing20190820_bot" target="_blank">
            SIGN UP NOW
          </Button>
        </Paper>

        <Grid container style={{height:'50vh', margin:30}} spacing={1} justify="space-between" >
          <Grid item xs={12} sm={4} style={{}}>
            <Paper style={{width:'80%', height:'100%', textAlign: '-webkit-center', padding:15, borderRadius:15}}>
              <Avatar alt="Remy Sharp" src="" style={{width:110, height:110}}/>
              <Typography style={{marginTop:30, fontWeight:'lighter', fontSize:23}}>
                Optimised Search
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4} style={{}}>
            <Paper style={{width:'80%', height:'100%', textAlign: '-webkit-center', padding:15, borderRadius:15}}>
              <Avatar alt="Remy Sharp" src="" style={{width:110, height:110}}/>
              <Typography style={{marginTop:30, fontWeight:'lighter', fontSize:23}}>
                Career Guidance
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4} style={{}}>
            <Paper style={{width:'80%', height:'100%', textAlign: '-webkit-center', padding:15, borderRadius:15}}>
              <Avatar alt="Remy Sharp" src="" style={{width:110, height:110}}/>
              <Typography style={{marginTop:30, fontWeight:'lighter', fontSize:23}}>
                Expand Network
              </Typography>
            </Paper>
          </Grid>
          
        </Grid>
      </Fragment>
    );


  }
}


export default Home;