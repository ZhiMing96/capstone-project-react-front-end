import React, { useEffect } from 'react'
import { Grid, makeStyles, Typography, Avatar, Box, Button, IconButton, Dialog, DialogActions, DialogContent, TextField, DialogContentText } from '@material-ui/core'
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';
import api from '../api'
import TelegramIcon from '@material-ui/icons/Telegram';
import { connect } from "react-redux";
import { updateSocialProfile } from '../redux/actions/socialProfile'
import FaceIcon from '@material-ui/icons/Face';
import Tooltip from '@material-ui/core/Tooltip';
import CameraAltIcon from '@material-ui/icons/CameraAlt';


//INCOMPLETE
const useStyles = makeStyles(theme => ({
  bigAvatar: {
    margin: 30,
    marginBottom: 20,
    width: 90,
    height: 90,
  },
  icon: {
    position: 'relative',
    margin: 30,
    marginBottom: 20,
    width: 90,
    height: 90,
    cursor: 'pointer',
  },
  button: {
    margin: theme.spacing(1.5),
    width: 180,
    height: 45
  },
  overlay:{
    position: 'absolute',
    top: 65,
    bottom: 0,
    left: 140,
    right: 0,
    height: 30,
    width: 30,
    opacity: 0,
    transition: '.3s ease',
    '&:hover': {
      cursor: 'pointer',
      title: 'Change profile picture',
      opacity:0.5
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

function Sidebar(props) {
  const classes = useStyles();
  const [name, setName] = React.useState('')
  const [dialog, setDialog] = React.useState(false)
  const [profileImageLink, setProfileImageLink] = React.useState('')
  

  useEffect(() => {
    api.profile.get().then(
      res => {
        setName(res.data.profile.first_name)
      }
    ).catch({})
    if (props.profile_image_link !== null) {
      setProfileImageLink(props.profile_image_link)
    }

    console.log(profileImageLink)
  }, [props.profile_image_link])

  const changeProfilePicture = () => {
    handleClose()
    props.updateSocialProfile({
      profile_image_link: profileImageLink,
      description: props.description,
      meetup_ind: props.meetup_ind,
      job_search_stage: props.job_search_stage
    })

  }
  const openDialog = () => {
    setDialog(true)
  }

  const handleClose = () => {
    setDialog(false)
  };

  const handleChange = event => {
    setProfileImageLink(event.target.value);
  };

  const revealIcon=()=>{
    revealIcon = true
  }
  return (
    <div>
      <Grid container alignItems="center" justify="center" style={{position:'relative'}}>
        {props.profile_image_link !== null && props.profile_image_link !== '' ?
          <Avatar src={props.profile_image_link} className={classes.bigAvatar} onClick={openDialog} /> :
          //<Avatar className={classes.bigAvatar}>
          //<Tooltip title="Change profile picture" placement="top">
          <div>
          <FaceIcon fontSize="large" className={classes.icon} onClick={openDialog} />
          <div className={classes.overlay}>
            <CameraAltIcon />
          </div>
          </div>
          //</Tooltip>
          //</Avatar>

        }
        <Grid container justify="center">
          <Typography>
            <Box fontWeight="fontWeightBold" fontSize={20}>
              {name.toUpperCase()}
              <br />
              <IconButton href={"https://telegram.me/testing20190820_bot"} target="_blank">
                <TelegramIcon />
              </IconButton>
            </Box>
          </Typography>
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
          <Button onClick={changeProfilePicture} color="primary" autoFocus>
            Confirm
        </Button>
        </DialogActions>
      </Dialog>
    </div>

  )
}
const mapStateToProps = (state) => {
  return {
    ...state.socialProfile
  }
}

export default connect(mapStateToProps, { updateSocialProfile })(Sidebar);