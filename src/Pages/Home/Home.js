import React, { Component } from 'react';
import './Home.css';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { Link as RouterLink, Route, BrowserRouter, Switch } from 'react-router-dom';


class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      jobListing : []
    }
  }
  

  getArticles = ()  => {
    // const preferred_job_listing = "Business Analyst"
    // fetch(`https://api.mycareersfuture.sg/v2/jobs?search=${preferred_job_listing}&limit=10&page=0&sortBy=new_posting_date`)
    //   .then(res => res.json())
    //   .then(response => {
    //     console.log(response);
    //     const listing = response;
    //     var storage  = [];

    //     for(let i=0 ; i<3 || i<listing.length; i++){
    //       var list = {};
    //       if(listing.results[i].schemes[0] != undefined){
    //         list = {
    //           key : i,
    //           jobTitle : listing.results[i].title,
    //           minSalary : listing.results[i].salary.minimum,
    //           maxSalary : listing.results[i].salary.maximum,
    //           employmentType : listing.results[i].employmentTypes[0].employmentType,
    //           schemeEligible : listing.results[i].schemes[0].scheme.scheme,  
    //           jobsLinkUrl : listing.results[i].metadata.jobDetailsUrl,
    //           companyName : listing.results[i].postedCompany.name,
    //           skillMatch : listing.results[i].metadata.matchedSkillsScore
    //         }
    //       } else {
    //         list = {
    //           key : i,
    //           jobTitle : listing.results[i].title,
    //           minSalary : listing.results[i].salary.minimum,
    //           maxSalary : listing.results[i].salary.maximum,
    //           employmentType : listing.results[i].employmentTypes[0].employmentType,
    //           schemeEligible : "No Schemes Available" ,
    //           jobsLinkUrl : listing.results[i].metadata.jobDetailsUrl,
    //           companyName : listing.results[i].postedCompany.name,
    //           skillMatch : listing.results[i].metadata.matchedSkillsScore
    //         }
    //       }
        
    //       console.log(list)
    //         storage.push(list);
          
    //       console.log(this.state.jobListing[i].jobTitle + "\n" + this.state.jobListing[i].minSalary + "\n" + this.state.jobListing[i].maxSalary + "\n" + this.state.jobListing[i].employmentType  + "\n" + this.state.jobListing[i].schemeEligible  + "\n" + this.state.jobListing[i].jobsLinkUrl);    
    //       }
        // console.log(storage);
        // this.setState({ jobListing: storage}) 
        //console.log(this.state.jobListing) 
      // })
    
  }

  componentDidMount(){
    this.getArticles();
    // const test = this.state.jobListing[0].key;
  }

  render() {
    console.log(this.state.jobListing);
   // this.getArticles();
   

    return (
      <div>
         {/* { test } */}
       </div>
    )
  }
}


export default Home;