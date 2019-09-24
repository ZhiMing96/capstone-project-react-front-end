import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles, Grid, Paper, Container, Typography, ButtonBase, Button, CssBaseline} from '@material-ui/core'
import { Bookmark as BookmarkIcon, Delete as DeleteIcon} from '@material-ui/icons';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import api from '../../api';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      margin:'auto',
      padding:20,
    //   backgroundColor: "transparent",
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    //   boxShadow: "none",
    //   overflow: "hidden"
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
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
  }));

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function addBookmark(job){
    console.log("Entered Add Bookmarks");

    axios.post("/users/bookmarks/add", {
        newBookmark: {job},
        token: "" //GET USER TOKEN
        })
        .then(response => {
            console.log("BOOKMARK ADDED SUCCESSFULLY ");
        })
        .catch(error =>{
            console.log(error);
        })
}

function JobListings(props) {

    // console.log("From JobListingsJS - Jobs Lisiting Url: " + props.jobListingsUrl);

    const [allListings, setAllListings] = useState([]);
    const [bookmarkedJob, setBookmarkedJob] = useState({});
    const [open, setOpen] = useState(false);
    console.log(props)
    
    useEffect(() => {
        axios.get(`${props.jobListingsUrl}`)
            .then(response => {
            console.log(response.data)
            const results = response.data.results;
            console.log("results from job listing");
            console.log(results);
           setAllListings(results);
            props.resetLoadListing();
            })
            .catch(err => {
            console.error(err);
            });      
    }, [])

    function handleClickOpen(listing) {
        setOpen(true);
        console.log("Entered Handle Click open")
        console.log(listing);
        addBookmark(listing);
    };
    
    const handleClose = () => {
        setOpen(false);
        };
    
    const classes = useStyles();

    if(allListings != null){
        return (
            <div>
                <h2> Job Listings </h2> 
                
                <div className={classes.root}>
                    {allListings.map(list => (
                        <div key={list.uuid}>
                            <CssBaseline />
                            <Paper className={classes.paper}>
                                <Grid container spacing={2}>
                                    <Grid item>
                                    <a href={list.metadata.jobDetailsUrl} style={{textDecoration: 'none', color: 'black'}}>
                                    <ButtonBase className={classes.image}>
                                        <img className={classes.img} alt="complex" src="https://pbs.twimg.com/profile_images/784240735277060098/lhMmgjx6_400x400.jpg" />
                                    </ButtonBase>
                                    </a>
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
                                            {list.salary ? `Up to $${list.salary.maximum}` : "Amount Unavailable"}
                                        </Typography>
                                        <Button 
                                            variant="contained" 
                                            color="primary" 
                                            className={classes.button} 
                                            size="small"
                                            onClick={ () =>handleClickOpen(list)}
                                            >
                                            Bookmark
                                            <BookmarkIcon className={classes.rightIcon} />
                                        </Button>
                                        <Dialog
                                        open={open}
                                        TransitionComponent={Transition}
                                        keepMounted
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-slide-title"
                                        aria-describedby="alert-dialog-slide-description"
                                        // BackdropProps={{
                                        //     classes: {
                                        //         root: classes.root
                                        //         }
                                        // }}
                                        // PaperProps ={{
                                        //     classes: {
                                        //         root: classes.paper
                                        //     }
                                        // }}
                                    >
                                        <DialogTitle id="alert-dialog-slide-title">{`${list.title} has been added to you bookmarks!`}</DialogTitle>
                                        <DialogActions>
                                        
                                        <Button 
                                            nClick={handleClose} 
                                            color="primary" 
                                            href="/profile/bookmarks">
                                        View Bookmarks 
                                        </Button>
                                        
                                        <Button onClick={handleClose} color="primary" >
                                        Continue
                                        </Button>
                                
                                        </DialogActions>
                                    </Dialog>
                                    </Grid>
                                    </Grid>
                                </Grid>
                                </Paper>
                                
                        </div>
                        
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
