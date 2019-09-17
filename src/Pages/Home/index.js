import React, { Component } from 'react';
import './Home.css';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';


class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      sugguestedJobPosition:"",
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
      .then(() => this.getListings())

  }

  getDate = (data) =>{
      const date = new Date(data)
      const dateParsed = date.toString().split(" ");
      const processedDate = `${dateParsed[1]} ${dateParsed[2]} ${dateParsed[3]}`;
      return (processedDate);
  }
  

  getListings = ()  => {

    var storage  = []; //temperary Storage for this.state.joblisting
    const jobTitle = this.state.sugguestedJobPosition;
    console.log('jobTitle = ' + jobTitle)

    if(jobTitle != ""){
      axios.get(`https://api.mycareersfuture.sg/v2/jobs?search=${jobTitle}&limit=10&page=0&sortBy=new_posting_date`)
        .then(response => {
      
        const listing = response.data.results;
        console.log(listing);
        

        for(let i=0 ; i<3 && i<listing.length; i++){
          var list = {};
          const date = this.getDate(listing[i].metadata.expiryDate);

          if(listing[i].schemes[0] != undefined){
            
            list = {
              key : i,
              jobTitle : listing[i].title,
              minSalary : listing[i].salary.minimum,
              maxSalary : listing[i].salary.maximum,
              employmentType : listing[i].employmentTypes[0].employmentType,
              schemeEligible : listing[i].schemes[0].scheme.scheme,  
              jobsLinkUrl : listing[i].metadata.jobDetailsUrl,
              companyName : listing[i].postedCompany.name,
              skillsMatch : listing[i].metadata.matchedSkillsScore,
              numVacancies : listing[i].numberOfVacancies,
              expiryDate : date
            }
          } else {

            list = {
              key : i,
              jobTitle : listing[i].title,
              minSalary : listing[i].salary.minimum,
              maxSalary : listing[i].salary.maximum,
              employmentType : listing[i].employmentTypes[0].employmentType,
              schemeEligible : "NIL" ,
              jobsLinkUrl : listing[i].metadata.jobDetailsUrl,
              companyName : listing[i].postedCompany.name,
              skillsMatch : listing[i].metadata.matchedSkillsScore,
              numVacancies : listing[i].numberOfVacancies,
              expiryDate : date
            }
          }
          storage.push(list);
          console.log("storage at iteration " +i + " = " )
          console.log(storage);
          
          console.log(storage[i].jobTitle + "\n" + storage[i].minSalary + "\n" + storage[i].maxSalary + "\n" + storage[i].employmentType  + "\n" + storage[i].schemeEligible  + "\n" + storage[i].jobsLinkUrl + "\n" + storage[i].expiryDate);    
        }
        this.setState({ jobListing: storage}) 
        console.log('jobListing after assignment =' );
        console.log(this.state.jobListing) 
      })
    } 
  }

  componentDidMount(){
    this.getJobTitle();
    
    
    // const test = this.state.jobListing[0].key;
  }

  render() {
    const listings = this.state.jobListing;
    console.log("Listings vairable consist of: ")
    console.log(listings);
   // this.getArticles();
   
    if(listings){
      const test = listings.map(list => (
      <div key={list.key}>
        <a href={list.jobsLinkUrl} style={{textDecoration: 'none', color: 'black'}}>
          <div className="jobListing" >
            <h2>{list.jobTitle}</h2>
            <h3> Company: {list.companyName}</h3>
            <p> 
              Deadline: {list.expiryDate} <br/>
              Expected Salary: ${list.minSalary} - ${list.maxSalary} <br/>
              Available Schemes: {list.schemeEligible}
            </p>
          </div>
        </a>
      </div>
       
      ));

      return (
        <div className="Digest">
          <h1> Daily Digest </h1>
           { test }
         </div>
      )
    }
    
  }
}


export default Home;