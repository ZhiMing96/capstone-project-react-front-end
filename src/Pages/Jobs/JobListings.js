import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles, Grid, Paper, Container, Typography, ButtonBase} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      margin:'auto',
      padding:20,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));

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
        
        const classes = useStyles();

        if(allListings != null){
            return (
                <div>
                    <h2> Job Listings </h2> 
                     
                {/* //         return (
                //             <div key={list.uuid} className="jobListing">
                //                 <h2>{list.title}</h2>
                //             </div>
                //         )
                //     })} */}
                {/* {allListings.map(list => { */}
                    <div className={classes.root}>
                        {allListings.map(list => (
                            <div key={list.uuid}>
                                <a href={list.metadata.jobDetailsUrl} style={{textDecoration: 'none', color: 'black'}}>
                                    <Paper className={classes.paper}>
                                    <Grid container spacing={2}>
                                        <Grid item>
                                        <ButtonBase className={classes.image}>
                                            <img className={classes.img} alt="complex" src="https://pbs.twimg.com/profile_images/784240735277060098/lhMmgjx6_400x400.jpg" />
                                        </ButtonBase>
                                        </Grid>
                                        <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item xs>
                                            <Typography gutterBottom variant="subtitle1">
                                                {list.title}
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                Expiry Date: {list.metadata.expiryDate}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                ID: 1030114
                                            </Typography>
                                            </Grid>
                                            <Grid item>
                                            <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                                Remove
                                            </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1">
                                                Up to ${list.salary.maximum}
                                            </Typography>
                                        </Grid>
                                        </Grid>
                                    </Grid>
                                    </Paper>
                                </a>
                                
                            </div>
                        // </div>
                        ))}
                    </div>
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
