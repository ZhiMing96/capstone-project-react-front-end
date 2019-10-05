
import React, { Fragment, useState, useEffect, useRef } from 'react'
import { Grid, Typography, Box, Button, CssBaseline, Paper, ButtonBase, Slide, IconButton, Snackbar, Hidden} from '@material-ui/core'
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {Bookmark as BookmarkIcon, Schedule as ScheduleIcon, Done as DoneIcon, NearMe as NearMeIcon, Event as EventIcon, Room as LocationIcon, PriorityHigh as PriorityHighIcon, Filter} from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import FilterSelect from '../../Components/FilterSelect';

const defaultIcon ="https://render.fineartamerica.com/images/rendered/default/print/7.875/8.000/break/images-medium-5/office-building-icon-vector-sign-and-symbol-isolated-on-white-background-office-building-logo-concept-urfan-dadashov.jpg";  


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      margin: 20,
    },
    image: {
        width: 'auto',
        height: 'auto',
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
    smallIcons: {
        width: 15,
        height: 12,
        margin: 2,
    }
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

    console.log("ENTERED JOBLISTING COMPONENT Props = ")
    console.log(props)
    const queueRef = useRef([]);
    const [open, setOpen] = useState(false); // for snackbar
    const [messageInfo, setMessageInfo] = useState(undefined);
    const [listings, setListings] = useState("");

    const lackingSkills = [
        'Account Management', 
        'Business Development', 
        'Customer Service'
    ]

    const classes = useStyles();

    
    
    useEffect(()=>{
        console.log("ENTERED USE EFFECT IN JOBLISTING");
        const results = props.searchResults
        console.log(results);
        setListings(results);
        window.scrollTo(0, 0);
    },[props.searchResults])

    const getDate =(date) => {
        const list = date.split('-')
        const month= list[1];
        switch(month) {
            case "1":
                return (`${list[2]} Jan ${list[0]}`)
            case "2":
                return (`${list[2]} Feb ${list[0]}`)
            case "3":
                return (`${list[2]} Mar ${list[0]}`)
            case "4":
                return (`${list[2]} Apr ${list[0]}`)
            case "5":
                return (`${list[2]} May ${list[0]}`)
            case "6":
                return (`${list[2]} Jun ${list[0]}`)
            case "7":
                return (`${list[2]} Jul ${list[0]}`)
            case "8":
                return (`${list[2]} Aug ${list[0]}`)
            case "9":
                return (`${list[2]} Sep ${list[0]}`)
            case "10":
                return (`${list[2]} Oct ${list[0]}`)
            case "11":
                return (`${list[2]} Nov ${list[0]}`)
            case "12":
                return (`${list[2]} Dec ${list[0]}`)
        }
    }
    
    
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
            <Typography>
                <Box>
                    Showing Results for <span style={{textDecorationLine: 'underline', fontWeight: 'bold'}}>{props.keyword}</span>
                </Box>
            </Typography>
            {/* <FilterSelect/> */}
        
        <Grid item xs={12}> 
        {listings
        ? listings.map((list,index) => (
            <div key={index}>
                <Paper className={classes.paper} elevation={2}>
                    <Box display="flex" flexWrap="wrap">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={2}>
                            <Box display={{ xs: 'none', sm: 'block' }}>
                                <ButtonBase className={classes.image} href={list.metadata.jobDetailsUrl} target="_blank" style={{padding:15, paddingTop:25}}>
                                        {list.postedCompany && list.postedCompany.logoUploadPath
                                        ? <img className={classes.img} src={list.postedCompany.logoUploadPath} />
                                        : <img className={classes.img} src={defaultIcon} />
                                        }
                                </ButtonBase>
                            </Box>
                        </Grid>
                        <Grid item container xs={12} sm={9} md={10} >
                            <Grid item xs={10} md={9}>
                                <Grid item xs>
                                    <Typography >
                                        <Box align="left" style={{marginLeft:10}} fontSize={12} fontWeight="fontWeightBold">  
                                            { list.postedCompany 
                                                ? 
                                                <a href={list.metadata.jobDetailsUrl} target="_blank" style={{textDecoration:"none", color:"inherit"}}>
                                                    {list.postedCompany.name} {list.skills_match}
                                                </a>
                                                : ""
                                            }
                                        </Box>
                                    </Typography>
                                    <Typography >
                                        <Box fontWeight="fontWeightBold" align="left"  style={{marginLeft:10, color:'#5E2CA5'}}>
                                            {list.title}
                                        </Box>
                                    </Typography>
                                    
                                    <Typography style={{fontSize:12}}>
                                        <Box align="left" style={{marginLeft:10, color:'#9F0D6E'}} display={{ 'xs':'none', 'sm':'block'}} >
                                        
                                        {
                                            list.address && list.address.postalCode != ""
                                            ? 
                                            
                                            <Grid container alignItems="flex-start">
                                                <Grid item>
                                                    <LocationIcon style={{width:15, height:15}} /> 
                                                </Grid>
                                                <Grid item>
                                                    {list.address.block} {list.address.street} S{list.address.postalCode}
                                                </Grid>
                                            </Grid>
                                           
                                            
                                            : ""
                                            }
                                        </Box>
                                    </Typography>
                                    <Typography variant="caption" display="inline" >
                                        <Box align="left" style={{marginLeft:10}}>
                                                <Grid item container lg={6} md={7} sm={10} xs={12} alignItems="flex-start" justify="flex-start" > 

                                                {list.address && list.address.districts.length !==0
                                                ?
                                                <Grid item sm={4} xs={5} container> <NearMeIcon className={classes.smallIcons} /> 
                                                    {list.address.districts[0].region}
                                                </Grid>
                                                : <span></span>
                                                }
                                                {list.employmentTypes.length !==0
                                                ?
                                                <Grid item sm={4} xs={6} container justify="flex-start"> <ScheduleIcon className={classes.smallIcons}/>
                                                    {list.employmentTypes[0].employmentType}
                                                </Grid>
                                                :
                                                <span></span>
                                                }
                                                {list.minimumYearsExperience
                                                ?
                                                <Grid item sm={4} xs={6} container justify="flex-start"> 
                                                <EventIcon className={classes.smallIcons} />
                                                    {list.minimumYearsExperience} years exp
                                                </Grid>
                                                :
                                                <span></span>
                                                }  
                                                </Grid>
                                        </Box>
                                    </Typography>
                                    <Typography variant="caption" >
                                        <Box align="left" style={{marginLeft:10}}>
                                            Competition Level: 
                                        </Box>
                                    </Typography>
                                    <Typography variant="body2">
                                        <Box align="left" style={{marginLeft:10, fontSize:12}}>
                                            Expiry Date: {getDate(list.metadata.expiryDate)}
                                        </Box>
                                    </Typography>
                                   
                                    
                                    <Typography variant="body2" >
                                        <Box align="left" style={{fontSize:12, marginTop:5}} alignItems="flex-start" display={{xs:'none', sm:'block'}}>
                                        
                                            <Grid container  style={{marginLeft:9}}>
                                                {list.skills_lacking
                                                ?
                                                // <Grid item sm={6}>
                                                //     <Grid item >
                                                <div>
                                                        <PriorityHighIcon className={classes.smallIcons} style={{margin:0, width:15, height:14}}/>
                                                        Lacking Skills: &nbsp;
                                                        </div>
                                                    
                                                : <span></span>
                                                }
                                                
                                                {
                                                list.skills_lacking && list.skills_lacking.length!==0
                                                ? 
                                                <div>
                                                    {list.skills_lacking.map((skill,index)=>(
                                                    <div key={skill.id}>
                                                        {index<3
                                                        ?
                                                        <div>
                                                            {skill.skill} &nbsp;
                                                        </div>
                                                        :""
                                                        }
                                                    </div>
                                                    ))}
                                                </div>
                                                :
                                                ""
                                                }
                                            
                                            </Grid>
                                        </Box>
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Hidden smUp>
                                <Grid item xs={2}>
                                    <Box display="flex" justifyContent="flex-end" display={{ xs: 'block', md: 'none' }}>
                                            <Button
                                                className={classes.button} 
                                                size="small"
                                                onClick={ () => handleClick(list)}
                                                style={{color:'#6738AA'}}
                                                >
                                                <BookmarkIcon className={classes.rightIcon} />
                                            </Button>
                                        </Box>
                                </Grid>
                            </Hidden>
                            
                            <Grid item xs={12} md={3} container>
                                    
                                <Grid item md={12} sm={6} xs>
                                    <Typography variant="subtitle1" align="left" style={{marginLeft:10}}>
                                        <Box display={{ xs: 'none', md: 'block' }}>
                                        
                                            {!list.salary || list.salary.minimum === '0' || list.salary.maximum === '0' 
                                            ? "Salary Undisclosed" 
                                            :
                                                <div>
                                                    <strong>${list.salary.minimum}</strong> to <strong> ${list.salary.maximum}
                                                    </strong> <span style={{fontSize:10}}>{list.salary.type.salaryType}</span>  
                                                </div>
                                            }
                                        </Box>
                                    </Typography>
                                    
                                    <Typography variant="caption">
                                        <Box align="left" style={{marginLeft:10}}>
                                        
                                            {list.schemes.length!=0
                                            ? //{list.schemes[0].scheme.scheme} 
                                                <div  tyle={{}}>
                                                    <a href="https://www.wsg.gov.sg/programmes-and-initiatives/wsg-career-support-programme-individuals.html" style={{textDecoration:"none", color:"green", fontWeight:"bold"}} target="_blank">
                                                        <Grid container item xs={12}>
                                                            <Box display="inline" alignContent="flex-start">
                                                                <DoneIcon className={classes.smallIcons} style={{height:18, margin:0}}/> Government Scheme Support
                                                            </Box>
                                                        </Grid>
                                                    </a>
                                                </div> 
                                            : ""
                                            }
                                        </Box>
                                    </Typography>
                                    
                                    <Typography variant="body2">
                                        <Box align="left" style={{marginLeft:10, fontSize:12, color:'#A71616', fontWeight:'bold'}}>
                                            { list.skills_match && list.skills_match>=0.4
                                            ? "Recommended"
                                            : ""
                                            }
                                        </Box>
                                    </Typography>
                                </Grid>

                                <Grid item md={12} sm={6} xs container alignItems="flex-end" justify="flex-end" direction="column">
                                    <Grid item>
                                        <Typography variant="subtitle1" align="left" style={{marginLeft:10}}>
                                            <Box display={{ xs: 'block', md: 'none' }} justifyContent="flex-end">
                                            
                                            {list.salary 
                                                ? 
                                                <div>
                                                    <p>
                                                    <strong>${list.salary.minimum}</strong> to <strong> ${list.salary.maximum}
                                                    </strong> <span style={{fontSize:10, margin:0}}>{list.salary.type.salaryType}</span>
                                                    </p>
                                                      
                                                </div>
                                                : "Salary Undisclosed"}
                                            </Box>
                                        </Typography>
                                        
                                    </Grid>
                                    <Grid item>
                                        <Box display="flex" justifyContent="flex-end" display={{ xs: 'none', sm: 'block' }}>
                                            <Button
                                                className={classes.button} 
                                                size="small"
                                                onClick={ () => handleClick(list)}
                                                style={{color:'#6738AA'}}
                                                variant="outlined"
                                                >
                                                Bookmark
                                                <BookmarkIcon className={classes.rightIcon} />
                                            </Button>
                                        </Box>
                                        
                                    </Grid>
                                </Grid>
                                <Box boxShadow={0}>
                                
                                </Box>
                                
                            </Grid>
                        </Grid>
                    </Grid>

                    </Box>
                    
                </Paper>
            </div>
        ))
        : <div></div>
        }
            
            </Grid>
        </Grid>
        <Snackbar
            key={messageInfo ? messageInfo.key : undefined}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            style={{boxShadow: "none"}}
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            onExited={handleExited}
            ContentProps={{
            'aria-describedby': 'message-id',
            }}
            message={<span style={{boxShadow:"none"}} id="message-id">{messageInfo ? messageInfo.message : undefined}</span>}
            action={[
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
        
    </Fragment>
    )
}
export default JobListings;