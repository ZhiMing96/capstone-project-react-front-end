import React, { useEffect, useState, Fragment } from 'react'
import { Grid, makeStyles, Typography, Avatar, Box, Button, IconButton, Dialog, DialogActions, DialogContent, TextField, DialogContentText } from '@material-ui/core'
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';
import api from '../api'
import TelegramIcon from '@material-ui/icons/Telegram';
import { connect } from "react-redux";
import { updateSocialProfile } from '../redux/actions/socialProfile'
import { updateProfile } from '../redux/actions/profile'
import FaceIcon from '@material-ui/icons/Face';
import Tooltip from '@material-ui/core/Tooltip';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import UploadPhoto from '../images/UploadPhoto.jpg'
import { useSnackbar } from 'notistack';

import ClearIcon from '@material-ui/icons/Clear'


//INCOMPLETE
const useStyles = makeStyles(theme => ({
  bigAvatar: {
    margin: 30,
    marginBottom: 20,
    width: 90,
    height: 90,
    backgroundImage: `url(${UploadPhoto})` ,
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
  icon: {
    position: 'relative',
    margin: 30,
    marginBottom: 20,
    width: 90,
    height: 90,
    cursor: 'pointer',
    title: 'Change profile picture'
  },
  button: {
    margin: theme.spacing(1.5),
    width: 165,
    height: 45
  },
  overlay: {
    position: 'absolute',
    top: 60,
    bottom: 0,
    left: 163,
    right: 0,
    height: 30,
    width: 30,
    opacity: 0,
    transition: '.3s ease',
    '&:hover': {
      cursor: 'pointer',
      opacity: 0.5
    }
  }
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

const revealIcon = false
const defaultImg = "https://image.flaticon.com/icons/svg/149/149071.svg"

function Sidebar(props) {
  const classes = useStyles();
  const [name, setName] = React.useState('')
  const [dialog, setDialog] = React.useState(false)
  const [profileImageLink, setProfileImageLink] = React.useState('')
  const [file, setFile] = useState();
  const [base64, setBase64] = useState();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const action = key => (
    <Fragment>
        <IconButton onClick={() => { closeSnackbar(key) }} size="small" style={{ color:'white' }}>
            <ClearIcon/>
        </IconButton>
    </Fragment>
);

  const getSidebarProfile = () => {
    api.profile.get().then(
      res => {
        console.log(res.data.profile)
        props.updateProfile(res.data.profile)
        console.log(props.profile)
        props.updateSocialProfile(res.data.social)
        //setProfileImageLink(res.data.social ? res.data.social.profile_image_link : null)
      }
    ).catch(err=>{
      
    })
  }

  
  
  useEffect(() => {
    getSidebarProfile();
    if (props.socialProfile.profile_image_link !== null) {
      setProfileImageLink(props.socialProfile.profile_image_link)
    }
    if(props.profile.first_name !== ''){
      setName(props.profile.first_name)
    }
    console.log(props)
  }, [props.socialProfile.profile_image_link, props.profile.first_name])

  
  const changeSideBarProfilePicture = () => {
    //handleClose()
    props.updateSocialProfile({
      profile_image_link: profileImageLink,
      description: props.socialProfile.description,
      meetup_ind: props.socialProfile.meetup_ind,
      job_search_stage: props.socialProfile.job_search_stage
    })

  }
  /*
  const openDialog = () => {
    setDialog(true)
  }

  const handleClose = () => {
    setDialog(false)
  };
  
  const handleChange = event => {
    setProfileImageLink(event.target.value);
  };
  */
  const handleSidebarImageChange = e => {
    console.log('ENTERED IMAGE CHANGE TO BASE 64 METHOD ')
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
        setBase64(reader.result)
        handleSubmitNewSidebarImg()
      };

    }
    e.target.value = null
  }
  const handleSubmitNewSidebarImg = () => {
    console.log('ENTERED HANDLE SUBMIT METHOD FOR IMAGE ')

      api.profile.uploadImage({ 
        "image" : base64
      })
      .then(res => {
        console.log(res.data)
        if(res.data.response_code === 200) {
          console.log(res.data.image_link)
          setProfileImageLink(res.data.image_link);
          changeSideBarProfilePicture();
          enqueueSnackbar('Profile Picture Updated',  { variant: "", action } );
        } else {
          console.log(res.data.response_message)
          enqueueSnackbar('Invalid File Type/File Size Too Large',  { variant: "error", action } );
        }
      }).catch(err=> {
       
      })
  }

  console.log(file)
  console.log(base64)
  console.log('RENDERING SIDEBAR COMPONENT')
  console.log(props);
  return (
    <div>
      <Grid container alignItems="center" justify="center" style={{ position: 'relative' }}>
        <div style={{textAlign:'-webkit-center'}}>
        <label for='image_upload'>
          <div title={'Change profile picture'}>
          { profileImageLink 
            ? <Avatar src={ profileImageLink } className={classes.bigAvatar}
            imgProps={{className: classes.imgProps}}/>
            : <Avatar src={ defaultImg } className={classes.bigAvatar}
            imgProps={{className: classes.imgProps}}/>
            
          }
            {/* <Avatar src={props.profile_image_link && props.profile_image_link !== ''? props.profile_image_link : defaultImg} className={classes.icon}/> */}
          </div>
        </label>
        <input type='file' onChange={handleSidebarImageChange} id='image_upload' style={{opacity:0, zIndex:"5px"}}/>
        </div>
          
            
          {/* <div title={'Change profile picture'} className={classes.overlay} onClick={openDialog}>
             <CameraAltIcon  fontSize="large"/>
          </div>  */}
          
        
        <Grid container justify="center" style={{marginTop:-15, marginBottom:20}}>
          <Grid item xs={12} >
            <Typography>
              <Box fontWeight="fontWeightBold" fontSize={20}>
                {name.toUpperCase()}
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={12} >
              <IconButton href={"https://telegram.me/testing20190820_bot"} target="_blank">
                <TelegramIcon />
              </IconButton>
          </Grid>
        </Grid>
        <Grid container justify="center">
          {profileArray.map((item, index) => (
            <div key={index}>
              <Button
                variant="outlined"
                className={classes.button}
                component={Link}
                to={item.url}
              >
                {item.name}
              </Button>
            </div>
          ))}

        </Grid>

      </Grid>

      {/*
      <Dialog
        open={dialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        BackdropProps={{ invisible: true }}
      //PaperProps ={{className :classes.paperbd}}

      >

        <DialogContent >

          <DialogContentText >
            Want to update your profile picture? Upload your image on an image hosting website (try Imgur) and let us know the link!
          </DialogContentText>
          <TextField
            id='imageLink'
            autofocus
            margin="normal"
            label="Image Link"
            fullWidth
            value={profileImageLink}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
        </Button>
          <Button onClick={changeSideBarProfilePicture} color="primary" autoFocus>
            Confirm
        </Button>
        </DialogActions>
      </Dialog>
      */}
    </div>

  )
}
const mapStateToProps = (state) => {
  return {
    socialProfile: {...state.socialProfile},
    profile: {...state.profile}
  }
}

export default connect(mapStateToProps, { updateSocialProfile, updateProfile })(Sidebar);