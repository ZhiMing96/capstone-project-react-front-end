import React, { Component } from 'react'
import { EventEmitter } from 'events';

import JobsView from './JobsView';
import JobListings from './JobListings';




class Jobs extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      searchValue : "",
      minSalary: 0,
      employmentType: "fullTime",
      queryUrl: "",
      proceed: false,
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
      queryUrl : test_query,
      proceed: true,
    })

  }

  // componentDidMount(){
  //   this.getJobsQuery();
  //   console.log("From Component Did Mount: " + this.state.queryUrl)
  // }

  
  
  handleSubmit = event => {
    
    alert(`${this.state.searchValue} with ${this.state.employmentType} with ${this.state.minSalary}`)
    this.getJobsQuery();
  }

  // componentDidMount(){
  //   this.setState({
  //     proceed : false
  //   })
  // }
  // updateStatus(){

  //   const status = this.state.proceed;
  //   if(status){
  //     this.setState({
  //       proceed : false
  //     })
  //   }
  // }

  render() {
    const listingsUrl = this.state.queryUrl;
    console.log("From Render Listings: " + listingsUrl)
    const proceed = this.state.proceed;

    if(proceed){
      return(
        <div>
          {/* <div>
            <JobsView handleOnChange= {this.handleOnChange} handleSubmit={this.handleSubmit} state={this.state}/>
          </div> */}
          <div>
            <JobListings jobListingsUrl={ listingsUrl }></JobListings>
          </div>
        </div>
      )
    } else {
      return(
        <div>
          <div>
            <JobsView handleOnChange= {this.handleOnChange} handleSubmit={this.handleSubmit} state={this.state}/>
          </div>
        </div>
      )
    }
   



    // var proceed = this.state.proceed;
    // console.log(proceed);

    // if(!proceed){
    //   return (
    //     <div>   
    //       <JobsView handleOnChange= {this.handleOnChange} handleSubmit={this.handleSubmit} state={this.state}/>
    //     </div>
    //   )
    // } else {
    //   const listingsUrl = this.state.queryUrl;
    //   console.log("From Render Listings: " + listingsUrl);
      
    //   return(
    //     <div>
    //       <JobListings jobListingsUrl={ listingsUrl }></JobListings>
    //     </div>
    //   )
    // }
  }
}

export default Jobs;