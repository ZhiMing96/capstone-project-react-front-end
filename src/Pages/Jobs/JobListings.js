import React, { useState, useEffect } from 'react';
import axios from 'axios';

function JobListings(props) {

        // console.log("From JobListingsJS - Jobs Lisiting Url: " + props.jobListingsUrl);

        const [allListings, setAllListings] = useState([]);
        
        useState(() => {
            axios.get(`${props.jobListingsUrl}`)
                .then(response => {
                // console.log(response.data)
                const results = response.data.results;
                console.log("results from job listing");
                console.log(results);
                setAllListings(results);
                props.resetLoadListing();
                })
                .catch(err => {
                console.error(err);
            
            });      
        })
        
        console.log("allListings: ")
        console.log(allListings);



        // if(allListings != null){
        //     console.log("All Listings : ")
        //     console.log(allListings);
        //     const listings = allListings.map(list => {
        //         console.log("List : ")
        //         console.log(list);
        //         return (
        //             <div key={list.uuid}>
        //                 <h2>{list.title}</h2>
        //             </div>
        //         )
        //     });

        // }
        
        

        if(allListings != null){
            return (
                <div>
                    <h2> Job Listings </h2>
                    {allListings.map(list => {
                        return (
                            <div key={list.uuid} className="jobListing">
                                <h2>{list.title}</h2>
                            </div>
                        )
                    })}
                    {
                        
                    }
                    
                </div>
            )
        } else {
            return (
            <div>
                <h1> No Job Listings</h1>
            </div>);
        }

    
}

export default JobListings;
