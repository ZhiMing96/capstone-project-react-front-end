import React, { useState, useEffect } from 'react'
import axios from 'axios'


 function JobListingsView({ sugguestedJobPosition }) {

    const [listings, setListings] = useState([]);

    var tempArray  = []; //temperary Storage for this.state.joblisting
    const jobTitle = sugguestedJobPosition;
    console.log('jobTitle = ' + jobTitle)

    const getDate = (data) =>{
        const date = new Date(data)
        const dateParsed = date.toString().split(" ");
        const processedDate = `${dateParsed[1]} ${dateParsed[2]} ${dateParsed[3]}`;
        return (processedDate);
    }

    useEffect(() => {
      
        axios.get(`https://api.mycareersfuture.sg/v2/jobs?search=${jobTitle}&limit=10&page=0&sortBy=new_posting_date`)
          .then(response => {
        
            const listing = response.data.results;
            console.log(listing);
          
            for(let i=0 ; tempArray.length<3 && i<listing.length; i++){
              var list = {};
              console.log(listing[i].metadata.expiryDate);
              const date = getDate(listing[i].metadata.expiryDate);
    
              if(listing[i].salary === null || listing[i].postedCompany === null ){
                console.log("SKIPS");
    
              } else if(listing[i].schemes[0] != undefined  ){
                console.log("ENTERED 1");
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
                tempArray.push(list);
                console.log("storage at iteration " +i + " = " )
                console.log(tempArray);
              } else {
                console.log("ENTERED 2");
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
                tempArray.push(list);
                console.log("storage at iteration " +i + " = " )
                
              }
              
              
              // console.log(storage[i].jobTitle + "\n" + storage[i].minSalary + "\n" + storage[i].maxSalary + "\n" + storage[i].employmentType  + "\n" + storage[i].schemeEligible  + "\n" + storage[i].jobsLinkUrl + "\n" + storage[i].expiryDate);    
            }
            console.log(tempArray);
            setListings(tempArray) 

          })
          .catch(err => {
            console.error(err);
          }) 
    }, [])

    console.log('jobListing after assignment = ' );
    console.log(listings) 

    return (
        <div>
            {listings.map((list) => (
              <div key={list.key} className="">
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
            ))}
        </div>
    )
}

export default JobListingsView