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
    }

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOnChange = event => {
    const name = event.target.name;
    const value = event.target.value
    console.log(event.target.name);
    this.setState({
      [name] : value
    })
  }

  getJobsHandle = () => {
    var query = `localhost:3000/jobs/search?keyword=${this.state.searchValue}&limit=5&employmentType=${this.state.employmentType}&salary=${this.state.minSalary}`
    console.log(query);

    fetch('https://api.mycareersfuture.sg/v2/jobs?search=Product%20Management&limit=10&page=0&sortBy=new_posting_date')
      .then(res => res.json())
      .then(response => {
        return response.results;
      })

  }

  
  
  handleSubmit = event => {
    
    alert(`${this.state.searchValue} with ${this.state.employmentType} with ${this.state.minSalary}`)
    this.getJobsHandle();
  }

  render() {
    return (
      <div>   
        <JobsView handleOnChange= {this.handleOnChange} handleSubmit={this.handleSubmit} state={this.state}/>
        <JobListings getJobs={this.getJobsHandle}></JobListings>
      </div>
      
    )
  }
}

export default Jobs;