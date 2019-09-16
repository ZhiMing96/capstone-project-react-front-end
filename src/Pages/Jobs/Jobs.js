import React, { Component } from 'react'
import { EventEmitter } from 'events';

import JobsView from './JobsView';
import JobListings from './JobListings';
import { BrowserRouter as Router, Route, Link, StaticRouter, Redirect } from "react-router-dom";




class Jobs extends Component {
  
  constructor(props){

    super(props);
    this.load = false;
    this.state = {
      searchValue : "",
      minSalary: 0,
      employmentType: "fullTime",
      queryUrl: this.props.defaultUrl,
      
    }

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOnChange = event => {
    const name = event.target.name;
    const value = event.target.value
    // console.log(event.target.name);
    this.setState({
      [name] : value
    })
  }

  getJobsQuery = () => {
    var query = `localhost:3000/jobs/search?keyword=${this.state.searchValue}&limit=5&employmentType=${this.state.employmentType}&salary=${this.state.minSalary}`
    
    console.log("From get Jobs Query: " + query);

    const test_query = `https://api.mycareersfuture.sg/v2/jobs?search=${this.state.searchValue}&limit=10&page=0&sortBy=new_posting_date` 

    this.setState({
      urlChanged: true,
      queryUrl : test_query,
      // proceed: true,
    })
    this.load = true; 
    

  }

  resetLoadListings = () => {
    this.load = false;
  }

  handleSubmit = event => {
    console.log("Entered Handle Submit")
    alert(`${this.state.searchValue} with ${this.state.employmentType} with ${this.state.minSalary}`)
    const result = this.getJobsQuery();
    
  }

  render() {
    console.log("ENTERED RENDER")
    console.log(this.load)

    const { queryUrl, urlChanged } = this.state

    const loadListings = this.load;
    console.log("Props : " + loadListings)
    console.log("From Render Listings: " + queryUrl)
    console.log("Default URL: " + this.props.defaultUrl);

   
    if(!loadListings){
      console.log("LOADING Seach Jobs");
      return(
        
        <div>
          {/* <h2>Loading search Jobs..</h2> */}
          <JobsView handleOnChange= {this.handleOnChange} handleSubmit={this.handleSubmit} state={this.state}/>
        </div>
      )
    } else {
      console.log("LOADING Job Listings ");
      return(
        <div>
          <Redirect to="/jobs/jobListings" />
          <h2>TESTING</h2>
          <Route 
          path="/jobs/jobListings" render ={()=> <JobListings  jobListingsUrl={queryUrl} resetLoadListing={this.resetLoadListings}/>}
          />
        </div>
      )
      
    }
  }
}

export default Jobs;