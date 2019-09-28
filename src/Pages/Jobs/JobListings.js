
import React, { Fragment, useState, useEffect, useRef } from 'react'
import { Grid, Typography, Box, Button, CssBaseline, Paper, ButtonBase, Slide, IconButton, Snackbar} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {Bookmark as BookmarkIcon, BookmarkOutlined as BookmarkOutlinedIcon} from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';

const defaultIcon ="https://render.fineartamerica.com/images/rendered/default/print/7.875/8.000/break/images-medium-5/office-building-icon-vector-sign-and-symbol-isolated-on-white-background-office-building-logo-concept-urfan-dadashov.jpg";  

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      margin: 30
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
    close: {
        padding: theme.spacing(0.5),
    },
  }));

function addBookmark(job){
    const token = window.localStorage.getItem('authToken');
    console.log(token);

    const options ={
        headers: { 'Authorization' : 'Token '+ token }
    }
    console.log("Entered Add Bookmarks");
    console.log(`adding bookmark for ${job.title}`)
    axios.post("http://localhost:3000/jobs/bookmarks/add", {
        job_uuid: job.uuid
        }, options)
        .then(response => {
            console.log(response);
            if(response.data.response_code==="200"){
                console.log("BOOKMARK ADDED SUCCESSFULLY ");
            }
        })
        .catch(error =>{
            console.log(error);
        })
}

function removeBookmark(listing){
   
        console.log(`REMOVING BOOKMARK with uuid ${listing.uuid} and title ${listing.title} `);
        
        axios.get(`localhost:3000/bookmarks/remove?uuid=${listing.uuid}`)
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.error(err)
        })

    }


 function JobListings(props) {
    console.log("ENTERED JOBLISTING COMPONENT")
    console.log(props)
    const queueRef = useRef([]);
    const [open, setOpen] = useState(false);
    const [messageInfo, setMessageInfo] = useState(undefined);

    const listings = props.listings

    const classes = useStyles();
    console.log(listings);

    
    
   

    const processQueue = () => {
        if (queueRef.current.length > 0) {
            setMessageInfo(queueRef.current.shift());
            setOpen(true);
        }
    };
    
    const handleClick = (listing) => {
        console.log("Entered Handle Click open")
        console.log(listing);
        addBookmark(listing);

        const message = `${listing.title} added to bookmarks!`

        queueRef.current.push({
            message,
            key: new Date().getTime(),  
        });

        if (open) {
            // immediately begin dismissing current message
            // to start showing new one
            setOpen(false);
        } else {
            processQueue();
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleExited = () => {
        processQueue();
    };
        
    return (
        <Fragment>
        <CssBaseline />
        <Grid container>
        
        <Grid item xs={12}> 
        {listings
        ? listings.map((list,index) => (
            <div key={index}>
                <Paper className={classes.paper} elevation={2}>
                    <Grid container spacing={2}>
                        <Grid item>                                   
                            <ButtonBase className={classes.image} href={list.metadata.jobDetailsUrl}>
                                {list.postedCompany && list.postedCompany.logoUploadPath
                                ? <img className={classes.img} src={list.postedCompany.logoUploadPath} />
                                : <img className={classes.img} src={defaultIcon} />
                                }
                                
                            </ButtonBase>
                        </Grid>
                        <Grid item container xs={12} sm >
                            <Grid item xs={9}>
                                <Grid item xs>
                                    <Typography variant="body1">
                                        <Box fontWeight="fontWeightBold" align="left"  style={{marginLeft:10}}>
                                            { list.postedCompany 
                                                ? list.postedCompany.name
                                                : ""
                                            }
                                        </Box>
                                    </Typography>
                                    <Typography>
                                        <Box letterSpacing={2} align="left" style={{marginLeft:10}} >
                                            {list.title}
                                        </Box>
                                    </Typography>
                                    <Typography variant="body2" align="left" style={{marginLeft:10}}>
                                        Expiry Date: {list.metadata.expiryDate}
                                    </Typography>
                                    <Typography variant="subtitle1" align="left" style={{marginLeft:10}}>
                                        {list.salary ? `Up to $${list.salary.maximum}` : "Amount Unavailable"}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs>
                                <Button
                                    className={classes.button} 
                                    size="small"
                                    onClick={ () => handleClick(list)}
                                    >
                                    Bookmark
                                    <BookmarkIcon className={classes.rightIcon} />
                                </Button>
                                <Snackbar
                                    key={messageInfo ? messageInfo.key : undefined}
                                    anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                    }}
                                    open={open}
                                    autoHideDuration={5000}
                                    onClose={handleClose}
                                    onExited={handleExited}
                                    ContentProps={{
                                    'aria-describedby': 'message-id',
                                    }}
                                    message={<span id="message-id">{messageInfo ? messageInfo.message : undefined}</span>}
                                    action={[

                                    // <Button color="secondary" size="small" onClick={() => removeBookmark(list)}>
                                    //     UNDO
                                    // </Button>,
                                    <Button color="secondary" size="small" href="/profile/bookmarks">
                                        View
                                    </Button>,
                                    <IconButton
                                        key="close"
                                        aria-label="close"
                                        color="inherit"
                                        className={classes.close}
                                        onClick={handleClose}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                    ]}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        ))
        : <div></div>
        }
            
            </Grid>
        </Grid>
        
        
    </Fragment>
    )
}
export default JobListings;