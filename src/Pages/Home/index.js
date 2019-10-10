import React, { Component } from 'react';
import './Home.css';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';
import JobListingsView from './JobListingsView';
import ArticleView from './ArticleView';
import EventsView from './EventsView';
import homepageBG from '../../images/homepageBG.JPG'
import { Typography, Paper } from '@material-ui/core';

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
   

    if(this.state.sugguestedJobPosition != null) {
      return(
        <div className="" >
          <div style={{backgroundImage:`url(${homepageBG})`, backgroundPosition: 'center',backgroundSize: 'cover', width:'100%', height:'400px'}} >
          
            <Typography style={{color:"white", fontWeight:'bold', fontSize:40}}>
              DAILY DIGEST
            </Typography>
          
          </div>
          
          
          <div className="">
            <ArticleView />
          </div>
          <div className="">
            <JobListingsView sugguestedJobPosition= {this.state.sugguestedJobPosition} />
          </div>
          <div className="">
            <EventsView />

          </div>
           

        </div>
        
      )
    } else {
      return(
        <div>
          <h1> No Job Title </h1>
        </div>
      )
      
    }
    
  }
}


export default Home;