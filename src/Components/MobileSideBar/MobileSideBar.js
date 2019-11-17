import React, { useState, useEffect } from 'react'
import './MobileSideBar.css'
import { Grid, makeStyles, Typography, Avatar, Box, Button, Paper, IconButton } from '@material-ui/core'
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import EventsIcon from '@material-ui/icons/InsertInvitation';
import ArticlesIcon from '@material-ui/icons/MenuBook';
import JobsIcon from '@material-ui/icons/BusinessCenter';
import api from '../../api'
import TelegramIcon from '@material-ui/icons/Telegram';
import FaceIcon from '@material-ui/icons/Face';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 400,
    height:55,
  },
  bigAvatar: {
    margin: 30,
    width: 90,
    height: 90,
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
    ).catch({})
  }

  useEffect (()=>{
    getProfile();
  },[props])

  

  console.log('name = '+ name)

  if(props.show){
    sideBarClasses = 'mobileSideBar open' ;
  }

  const handleImageChange = e => {
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
          console.log(res.data.image_link)
          getProfile();
          // setProfileImageLink(res.data.image_link);
        }
      })
  }
  // console.log(file)
  console.log("PRINGING SAVED PROFILE IN MOBILE SIDEBARs")
  console.log(profile)

  return(
    <nav className={sideBarClasses}> 
      <Paper square className={classes.root} elevation={3}>
        <Tabs
          value={value}
          onChange={handleChange}
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
            ? <Avatar src={ profile.profile_image_link } className={classes.bigAvatar}/>
            :<Avatar src={ defaultImg } className={classes.bigAvatar}/>
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
export default MobileSideBar;
