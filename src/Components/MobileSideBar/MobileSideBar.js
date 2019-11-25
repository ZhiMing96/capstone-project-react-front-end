import React, { useState, useEffect, Fragment } from 'react'
import './MobileSideBar.css'
import { Grid, makeStyles, Typography, Avatar, Box, Button, Paper, IconButton } from '@material-ui/core'
import { Link, Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import EventsIcon from '@material-ui/icons/InsertInvitation';
import ArticlesIcon from '@material-ui/icons/MenuBook';
import JobsIcon from '@material-ui/icons/BusinessCenter';
import api from '../../api'
import TelegramIcon from '@material-ui/icons/Telegram';
import FaceIcon from '@material-ui/icons/Face';
import  { updateSocialProfile } from '../../redux/actions/socialProfile'
import { connect } from "react-redux";
import UploadPhoto from '../../images/UploadPhoto.jpg'
import { useSnackbar } from 'notistack';
import ClearIcon from '@material-ui/icons/Clear'

import Jobs from '../../Pages/Jobs/Jobs'
import Events from '../../Pages/Events'
import Articles from '../../Pages/Articles'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 400,
    height:55,
  },
  bigAvatar: {
    margin: 30,
    width: 90,
    height: 90,backgroundImage: `url(${UploadPhoto})` ,
    backgroundSize: 'cover',
  },
  imgProps: {
    objectFit:'contain',
    width: "inherit",
    border: 0,
    // height:'100%',
    height:'fit-content',
    '&:hover': {
        opacity: 0.55,
    }
  },
  button: {
    margin: theme.spacing(2),
    width: 180 ,
    height: 50
  },
}));

const profileArray = [
  {
  name: "PROFILE",
  url: "/profile"
  },
  {
  name: "BOOKMARKS",
  url: "/profile/bookmarks"
  },
  {
  name: "SKILLS",
  url: "/profile/skills"
  },
  {
  name: "SOCIAL ACTIVITY",
  url: "/profile/social"
  },
]

const defaultImg = "https://image.flaticon.com/icons/svg/149/149071.svg"

function MobileSideBar(props){
  const classes = useStyles();
  console.log("Props for Mobile Side Bar = " + props.show);
  let sideBarClasses='mobileSideBar';
  
  const [value, setValue] = React.useState(0);
  const [name, setName] = React.useState("");
  const [file, setFile] = useState();
  const [base64, setBase64] = useState();
  const [ profile, setProfile ] = useState();
  const [profileImageLink, setProfileImageLink] = React.useState();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const action = key => (
    <Fragment>
        <IconButton onClick={() => { closeSnackbar(key) }} size="small" style={{ color:'white' }}>
            <ClearIcon/>
        </IconButton>
    </Fragment>
);

  const handleChange = (event, newValue) => {
    event.preventDefault()
    setValue(newValue);
  };

  const getProfile = () => {
    console.log("ENTERED GET PROFILE IN  MOBILE SIDEBAR")
    api.profile.get().then(
      res=>{
        console.log(res.data)
        if(res.data.profile){
          console.log(res.data.profile.first_name)
          const firstName = res.data.profile.first_name
          // setName(firstName);
          setProfile(res.data.social);
        }
      } 
    ).catch(err => {
        if(err.response) {
          const status = err.response.status
          const statusText = err.response.statusText
          console.log(status);
          console.log(statusText);
          enqueueSnackbar(`Error ${status}: ${statusText}`,  { variant: "error", action } );
        }
    })
  }

  useEffect (()=>{
    getProfile();
    if (props.profile_image_link !== null) {
      setProfileImageLink(props.profile_image_link)
    }
  },[props])

  const changeSideBarProfilePicture = (imgLink) => {
    props.updateSocialProfile({
      profile_image_link: imgLink,
      description: props.description,
      meetup_ind: props.meetup_ind,
      job_search_stage: props.job_search_stage
    })

  }

  

  console.log('name = '+ name)

  if(props.show){
    sideBarClasses = 'mobileSideBar open' ;
  }

  const handleImageChange = e => {
    console.log("Entered Handle Change");
    console.log(e.target.files[0]);
    e.preventDefault();
    let file = e.target.files[0];
    console.log(file)
    if(file){
      let reader = new FileReader();
      console.log(reader)
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        console.log(reader.result)
        setFile(file)
        const base64String = reader.result.substring(23)
        setBase64(base64String)
        handleSubmitNewImg(base64String)
      };

    }
    e.target.value = null
  }
  const handleSubmitNewImg = (base64String) => {
    console.log('ENTERED HANDLE SUBMIT METHOD FOR IMAGE ')
      console.log(base64String)
      api.profile.uploadImage({ 
        "image" : base64String
      })
      .then(res => {
        console.log(res.data)
        if(res.data.response_code === 200) {
          console.log(res.data.image_link);
          setProfileImageLink(res.data.image_link);
          // getProfile();
          changeSideBarProfilePicture(res.data.image_link);
          enqueueSnackbar('Profile Picture Updated',  { variant: "", action } );
        } else {
          console.log(res.data.response_message)
          enqueueSnackbar('Unable to Perform Operation',  { variant: "error", action } );
        }
      }).catch(err=> {
        if(err.response) {
          const status = err.response.status
          const statusText = err.response.statusText
          console.log(status);
          console.log(statusText);
          if(status  === 413){
            enqueueSnackbar('File Size Too Large',  { variant: "error", action } );
          } else {
            enqueueSnackbar(`Error ${status}: ${statusText}`,  { variant: "error", action } );
          }
        }
      })
  }
  // console.log(file)
  console.log("PRINTING PROPS.IMG LINK  IN MOBILE SIDEBARs")
  console.log(props.profile_image_link)

  return(
    <nav className={sideBarClasses}> 
      <Paper square className={classes.root} elevation={3}>
        <Tabs
          value={value}
          onChange={props.handleChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          aria-label="icon tabs example"
        >
          <Tab icon={<JobsIcon/>} style={{minWidth:0}} component={Link} to="/jobs" onClick={props.backdropClickHandler} />
          <Tab icon={<EventsIcon/>} style={{minWidth:0}} component={Link} to="/events" onClick={props.backdropClickHandler} />
          <Tab icon={<ArticlesIcon/>} style={{minWidth:0}} component={Link} to="/articles" onClick={props.backdropClickHandler} />
        </Tabs>
      </Paper>
      <Grid container alignItems="center" justify="center">
        <label for='image_upload' style={{width:'100%', textAlign:'-webkit-center',}}>
          <div title={'Change profile picture'} style={{}}>
            { profile && profile.profile_image_link 
            ? <Avatar src={ profile.profile_image_link } className={classes.bigAvatar} imgProps={{className: classes.imgProps}}/>
            :<Avatar src={ defaultImg } className={classes.bigAvatar} imgProps={{className: classes.imgProps}}/>
            }
          </div>
        </label>
        <input type='file' onChange={handleImageChange} id='image_upload' style={{opacity:0, zIndex:"5px"}}/>

        <Grid container justify="center">
          <Typography>
            <Box 
              fontWeight="fontWeightBold"
              fontSize={20}
            >
              {/* {name ? name.toUpperCase() : 'USER'} */}
              {profile && profile.first_name ? profile.first_name.toUpperCase() : 'USER'}
              <br/>
              <IconButton href={"https://telegram.me/testing20190820_bot"} target="_blank">
              <TelegramIcon />
              </IconButton>
            </Box>
          </Typography>
        </Grid>
        <Grid container justify="center">
          {profileArray.map((item,index)=>(
            <div key={index}>
              <Button
                variant="outlined" 
                className={classes.button}
                onClick={props.backdropClickHandler}
                component={Link}  
                to={item.url}
              >
                {item.name}
              </Button>
            </div>
          ))}
        </Grid>
      </Grid>
      
    </nav>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state.socialProfile
  }
}

export default connect(mapStateToProps, { updateSocialProfile })(MobileSideBar);
