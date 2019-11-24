import React,{useEffect} from 'react';
import Sidebar from '../../Components/Sidebar';
import Grid from '@material-ui/core/Grid';
import { Hidden, makeStyles } from '@material-ui/core';
import Bookmarks from '../Bookmarks';
import Skills from './Skills/';
import Profile from './UserProfile'
import Social from '../Social'
import PublicProfile from '../PublicProfile/PublicProfile'
import { Route, Switch, Redirect } from 'react-router-dom';
import './index.css';
import { connect } from "react-redux";
import Drawer from '@material-ui/core/Drawer';
import api from '../../api'
import {updateSocialProfile} from '../../redux/actions/socialProfile'
import {updateProfile} from '../../redux/actions/profile'


const useStyles = makeStyles(() => ({
  drawer: {
    width: '18%',
    flexShrink: 0,
    //position:'relative',
    //zIndex: 40
  },
  drawerPaper: {
    width: '18%',
    flexShrink: 0,
    zIndex: 40,
    marginTop: 64//appbar height
  },
}))

function Main(props) {
  const classes = useStyles();
  console.log("PRINTING PROPS OF PROFILE PAGE")
  console.log(props);

  //initialise
  useEffect(() => {
    console.log('useEffect')
    api.profile.get().then(res => {
      const { first_name, last_name, username, email } = res.data.profile
      const { profile_image_link, description, meetup_ind, job_search_stage } = res.data.social
      props.updateProfile({
        first_name: first_name,
        last_name: last_name,
        username: username,
        email: email
      })
      props.updateSocialProfile({
        profile_image_link: profile_image_link,
        description: description,
        meetup_ind: meetup_ind,
        job_search_stage: job_search_stage
      })
    }).catch(err => {
      console.log('error initialising w user details')
    })
  }, [])

  // const[openSideBar, setOpenSideBar] = useState(false);
  // const drawerTogglerClickHandler = () =>{
  //   setOpenSideBar(!openSideBar);
  // }
  console.log(props.userId)

  // const backdropClickHandler = () => {
  //   setOpenSideBar(false);
  // }

  // let responsiveSideBar;
  // let backdrop;

  // if(openSideBar){
  //   // responsiveSideBar = <MobileSideBar show={openSideBar}/>;
  //   backdrop = <Backdrop click={backdropClickHandler}/>
  // }
  console.log(props.userId)
  if (window.localStorage.getItem('authToken') === null) {
    return (
      <Redirect to={{
        pathname: '/auth/signin',
        state: { from: props.location }
      }} />)
  }
  return (
    <div style={{ height: '100%' }}>

      {/* <MobileSideBar show={openSideBar} backdropClickHandler={backdropClickHandler}/> */}
      {/* {backdrop} */}
      <Grid container xs={12} justify="space-evenly">
        <Grid item sm={2} >
          <Hidden xsDown>
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <Sidebar />
            </Drawer>
          </Hidden>
        </Grid>
        {/*

               <Hidden smUp>
                <Grid item sm={1}>
                  <IconButton onClick={drawerTogglerClickHandler}>
                    <MenuIcon/>
                  </IconButton>
                </Grid>
              </Hidden> */}
        <Grid item sm={10} xs={12} style={{ width: '100%', paddingRight: '5%', paddingLeft: '5%' }}>
          {/*<Typography component="div">
                  <Box 
                    fontSize="h6.fontSize" 
                    m={1} 
                    letterSpacing={3}
                    fontWeight="fontWeightBold" 
                  >
                    PROFILE
                  </Box>
                </Typography>*/}

          <Switch>
            <Route exact path="/profile" component={Profile} />
            <Route path="/profile/bookmarks" component={Bookmarks} />
            <Route path="/profile/skills" component={Skills} />
            <Route path="/profile/social/:index" component={Social} />
            <Route path="/profile/social" component={Social} />
            <Route path="/profile/public" component={PublicProfile} />
          </Switch>
        </Grid>

      </Grid>
    </div>
  );


}

const mapStateToProps = state => {
  return {
    userId: state.auth.user_id,
  }

};

export default connect(mapStateToProps, { updateSocialProfile, updateProfile })(Main);

