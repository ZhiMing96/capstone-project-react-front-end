import React from 'react'

function JobListings(props) {

        console.log("From JobListingsJS - Jobs Lisiting Url: " + props.jobListingsUrl);

        function getJobListings() {
            const results = [];
            fetch(`${props.jobListingsUrl}`)
            .then(res => res.json())
            .then(response => {
                const results = response.results;
                console.log("results from job listing");
                console.log(results);
                }); 
            
            return results;
        }
    
        const listings = getJobListings(); 
        console.log(listings);

        const allListings = getJobListings();
        const litings = allListings.map(list => (
            <div key={list.uuid}>
                <h2>{list.title}</h2>
            </div>
        ));
    
        return (
            <div>
                <h2> Job Listings </h2>
                <h2>  </h2>
            </div>
        )

    
}

export default JobListings;
