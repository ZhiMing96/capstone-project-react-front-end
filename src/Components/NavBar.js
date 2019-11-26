import React, { Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link, Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Home from '../Pages/Home'
import Jobs from '../Pages/Jobs/Jobs'
import JobListings from '../Pages/Jobs/JobListings'
import Events from '../Pages/Events'
import Articles from '../Pages/Articles'
import Login from '../Pages/Login'
import SignUp from '../Pages/SignUp'
import Profile from '../Pages/Profile'
import { connect } from "react-redux";
import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu'
import Logout from './Logout';
import { Hidden, Box, Snackbar, Popover } from '@material-ui/core';
import LoginIcon from '@material-ui/icons/Input';
import MobileSideBar from '../Components/MobileSideBar/MobileSideBar';
import Backdrop from '../Components/MobileSideBar/Backdrop';
import api from  '../api';
import {doLogin} from  '../redux/actions/auth'
import { withStyles,makeStyles } from '@material-ui/core/styles';
import { ImportantDevices } from '@material-ui/icons';
import { typography } from '@material-ui/system';
import DailyDigest from '../Pages/DailyDigest';
import logo from '../images/logo.png';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Fade from '@material-ui/core/Fade';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import Notifications from './Notifications/Notifications';
import Popper from '@material-ui/core/Popper';
import Badge from '@material-ui/core/Badge';
import CloseIcon from '@material-ui/icons/Close';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ClearIcon from '@material-ui/icons/Clear'
import { withSnackbar } from 'notistack';
import PublicSidebar from './MobileSideBar/PublicSidebar';

const useStyles = theme => ({
  notificationIcon: {
    '&:hover': {
      color: ''
    },
  },
  notificationPopover: {
    width:'500px',
    [theme.breakpoints.down('sm')]: {
      width:'350px'
    },
  },
});

class NavTabs extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      value: false,
      message: '',
      onProfilePage: false,
      sideBarOpen: false,
      notificationBoxOpen: false,
      anchorEl : null ,
      tabStyle:{
        jobs: 'light',
        events: 'light',
        articles: 'light',
      },
      alerts : [],
      open: false,
      messageInfo: "You have a new Notification!",
      notificationLoading: true, 
      fillAlertIcon:false,
    };
    console.log(this.props)
    console.log(this.props.location.pathname)
    this.notificationIcon = React.createRef();
    this.handleSnackbarClick = this.handleSnackbarClick.bind(this);
  }

  componentDidMount(){
    if(window.localStorage.getItem('authToken') !==null){
      api.profile.get() 
      .then(response => {
        if(response.data.profile!==undefined){
          let userId = response.data.profile.user_id
          this.props.doLogin(userId) //HYDRATE
        }
      }).catch(err => {
        if(err.response) {
          const status = err.response.status
          const statusText = err.response.statusText
          console.log(status);
          console.log(statusText);
          const action = key => (
            <Fragment>
                <IconButton size="small" onClick={() => { this.props.closeSnackbar(key) }} style={{ color:'white' }}>
                    <ClearIcon/>
                </IconButton>
            </Fragment>
          );
          this.props.enqueueSnackbar(`Error ${status}: ${statusText}`, {
            variant: 'error',
            autoHideDuration: 5000,
            action,
          });
        }
      })
    }
    if(this.props.location.pathname==="/jobs"){
      this.state.value= 0;
    } else if(this.props.location.pathname==="/events"){
      this.state.value= 1;
    } else if(this.props.location.pathname==="/articles"){
      this.state.value= 2;
    }else if (this.props.location.pathname.indexOf("/profile")!== -1){
      this.state.onProfilePage= true
    }else{
      this.state.value= false;
    }
      setTimeout(this.retrieveAlerts,5000);
      setInterval(this.retrieveAlerts, 16000);
    
  }

  
  updateAlerts = () =>{
    // this.setState({notificationLoading: true})
    console.log("Entered UPDATE ALERTS")

    if(window.localStorage.getItem('authToken') !== null){
      api.alerts.retrieve({"alert_type": ""})
      .then(res => {
          console.log(res.data)
          if (res.data.response_code === 200){
              console.log(res.data.alerts)
              if(res.data.alerts.length !== 0 || !res.data.alerts){
                  this.setState({alerts: res.data.alerts })
            } else {
              this.setState({alerts: null })
            }
          } else {
            const action = key => (
              <Fragment>
                  <IconButton size="small" onClick={() => { this.props.closeSnackbar(key) }} style={{ color:'white' }}>
                      <ClearIcon/>
                  </IconButton>
              </Fragment>
            );
            this.props.enqueueSnackbar("Unable to Retrieve Notifications!", {
              variant: 'error',
              autoHideDuration: 5000,
              action,
            });
          }
      }).catch(err => {
        if(err.response) {
          const status = err.response.status
          const statusText = err.response.statusText
          console.log(status);
          console.log(statusText);
          const action = key => (
            <Fragment>
                <IconButton size="small" onClick={() => { this.props.closeSnackbar(key) }} style={{ color:'white' }}>
                    <ClearIcon/>
                </IconButton>
            </Fragment>
          );
          this.props.enqueueSnackbar(`Error ${status}: ${statusText}`, {
            variant: 'error',
            autoHideDuration: 5000,
            action,
          });
        }
      })
    }

  }

  retrieveAlerts = () =>{
    // this.setState({notificationLoading: true})
    console.log("Entered RETRIEVE ALERTS")
    if(window.localStorage.getItem('authToken') !== null){
      api.alerts.retrieve({"alert_type": ""})
      .then(res => {
          console.log(res.data)
          if (res.data.response_code === 200){
              console.log(res.data.alerts)
              if(res.data.alerts.length !== 0 || !res.data.alerts){
                if(this.state.alerts.length === 0) {
                  const action = key => (
                    <Fragment>
                        <Button size="small" onClick={()=> { this.handleSnackbarClick() }} style={{color:'#57DFFF',  fontWeight:'bold', fontSize:12, }}>
                            View All
                        </Button>
                        <IconButton size="small" onClick={() => { this.props.closeSnackbar(key) }} style={{ color:'white'}}>
                            <ClearIcon/>
                        </IconButton>
                    </Fragment>
                  );
  
                  this.props.enqueueSnackbar("New Notification!", {
                    variant: '',
                    autoHideDuration: 5000,
                    action,
                  });
                  this.setState({alerts: res.data.alerts })
                } else {
                  const currentLength = this.state.alerts ? this.state.alerts.length : 0
                  const incomingLength = res.data.alerts.length
                  console.log('currentLength = ' + currentLength)
                  console.log('incomingLength = ' + incomingLength)
                  console.log(this.state.alerts[currentLength-1].alert_id)
                  console.log(res.data.alerts[incomingLength-1].alert_id)
                  if (this.state.alerts[0].alert_id !== res.data.alerts[0].alert_id || currentLength !== incomingLength){ //NEW ALERTS ARRAY DETECTED
                    console.log("NEW ALERTS DETECTED")
  
                    const action = key => (
                      <Fragment>
                        <Button size="small" onClick={()=> { this.handleSnackbarClick() }} style={{color:'#57DFFF',  fontWeight:'bold', fontSize:12, }}>
                            View All
                        </Button>
                        <IconButton size="small" onClick={() => { this.props.closeSnackbar(key) }} style={{ color:'white' }}>
                            <ClearIcon/>
                        </IconButton>
                      </Fragment>
                    );
  
                    this.props.enqueueSnackbar("New Notification!", {
                      variant: '',
                      autoHideDuration: 5000,
                      action,
                    });
  
                    this.setState({alerts: res.data.alerts })
                    this.setState({notificationLoading: false})
                  }
              }
            } else {
              this.setState({alerts: [] })
            }
          } else {
            const action = key => (
              <Fragment>
                  <IconButton size="small" onClick={() => { this.props.closeSnackbar(key) }} style={{ color:'white' }}>
                      <ClearIcon/>
                  </IconButton>
              </Fragment>
            );
            this.props.enqueueSnackbar("Unable to Retrieve Notifications!", {
              variant: 'error',
              autoHideDuration: 5000,
              action,
            });
          }
          
      }).catch(err => {
        console.log(err)
        if(err.response) {
          const action = key => (
            <Fragment>
                <IconButton onClick={() => { this.props.closeSnackbar(key) }} size="small" style={{ color:'white' }}>
                    <ClearIcon/>
                </IconButton>
            </Fragment>
          );
          this.props.enqueueSnackbar("Unable to Retrieve Notifications!", {
            variant: 'error',
            autoHideDuration: 5000,
            action,
          });
        }
      })
    }

    
  
  
  }

  componentShouldUpdate(nextProps, nextState){
    console.log("%%%%% THIS Props") 
    console.log(this.props)
    console.log("%%%%% NEXT Props") 
    console.log(nextProps)
    console.log("%%%%% THIS State")
    console.log(this.state) 
    console.log("%%%%% NEXT State")
    console.log(this.nextState) 

  //|| this.state !== nextState
    return (this.props !== nextProps  )
  }

  drawerTogglerClickHandler = () => {
    this.setState((prevState) => {
      return {
        sideBarOpen: !prevState.sideBarOpen
    }});
  }
  
  backdropClickHandler = () => {
    this.setState({sideBarOpen : false});
  }

  handleChange = (event, value) => {
    console.log(value)
    
    this.setState({ value });
    this.setState({onProfilePage: false})
  };

  handleChangeIndex = index => {
    this.setState({ value: index })
   
  };
  handleLogout = () => {
    this.props.history.push("/auth/signin");
  };

  handleClick = event => {
    console.log("***** ENTERED HANDLE CLICK ****")
    window.localStorage.setItem('viewAlert', false);
    console.log(event)
    console.log(event.currentTarget)

    this.setState({ anchorEl :  event.currentTarget });
    this.setState({ open : !this.state.open });
  
  };

  handleSnackbarClick = () => {
    console.log(this.notificationIcon.current)
    
    this.setState({ anchorEl : this.notificationIcon.current })
    this.setState({ open : true });
  }

  setAlertIcon = () => {
    this.setState({ fillAlertIcon : true })
  }
  resetAlertIcon = () => {
    this.setState({ fillAlertIcon : false })
  }

  handleClose = () => {
    console.log("====== ENTERED handleClose")
    // this.setState({ anchorEl: null })
    this.setState({ open : false })
  };



  render() {
    const { classes } = this.props;

    console.log(this.state.anchorEl)
    const token = window.localStorage.getItem('authToken');
    console.log(token)
    var showBadge = window.localStorage.getItem('viewAlert') !== null ? window.localStorage.getItem('viewAlert') : true

    
    console.log("PRINTING FROM NAV BAR PROPS")
    console.log(this.props)

    console.log("showBadge = " + showBadge)

    var isHomePage=false
    // const open = Boolean(this.state.anchorEl);
    // console.log(open)
    // const id = open ? 'transitions-popper' : undefined;


    if(this.props.location.pathname === '/'){
      isHomePage=true
    } 
    console.log(isHomePage)

    let responsiveSideBar;
    let backdrop;

    if(this.state.sideBarOpen){
      // responsiveSideBar = <MobileSideBar show={openSideBar}/>;
      backdrop = <Backdrop click={this.backdropClickHandler}/>
    }

    var jobsFont = 400;
    var eventsFont = 400;
    var articlesFont = 400;
    switch(this.state.value) {
      case 0:
        jobsFont = 600;
        eventsFont = 400;
        articlesFont = 400;
        break;
      case 1:
        jobsFont = 400;
        eventsFont = 600;
        articlesFont = 400;
      break;
      case 2:
        jobsFont = 400;
        eventsFont = 400;
        articlesFont = 600;
      break;
      
    }
    const id = this.state.open ? 'simple-popover' : undefined;

    console.log("this.state.open = " + this.state.open )
    console.log("this.state.anchorEl  = " )
    console.log(this.state.anchorEl )


    return (
      <div>
        <MobileSideBar show={this.state.sideBarOpen} backdropClickHandler={this.backdropClickHandler} handleChange={this.handleChange} tabState={this.state.value}/>
        {backdrop}

        <AppBar position="sticky" color="#FFFFFF" style={{zIndex:50}}>
        {/* <Toolbar style = {window.screen.width < 445 ? {marginBottom: 15} : {}}> */}
        <Toolbar>
        <Grid container direction="row" alignItems="center" justify="flex-start" >
          <Hidden smUp>
            {
              token 
              ?
              <Grid item sm={1}>
                <IconButton onClick={this.drawerTogglerClickHandler}>
                  <MenuIcon/>
                </IconButton>
              </Grid>
              : 
              <Grid item sm={1}>
                <PublicSidebar/>
              </Grid>
            }
            </Hidden>
          <Grid item xs={2} sm={3}>
            <Typography>
              <Box fontWeight={600} fontSize={20}>
                <Link to="/" >
                  <img src={logo} style={{width:130, marginBottom:-7 }}/>
                </Link>
              </Box>
            </Typography>
          </Grid>
          <Hidden xsDown>
          <Grid item xs={5} sm={6} md={7} container justify="flex-end">
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              textColor ="primary"
              variant ='fullWidth'
              indicatorColor=""
            >
              
                <Tab label={<span style={{color:'#0091ea',fontSize:18, fontWeight:jobsFont}}>JOBS</span>} component={Link} to="/jobs" />

                <Tab label={<span style={{color:'#0091ea', fontSize:18, fontWeight:eventsFont}}>EVENTS</span>} component={Link} to="/events" />

                <Tab label={<span style={{color:'#0091ea',fontSize:18, fontWeight:articlesFont}}>ARTICLES</span>} component={Link} to="/articles"/>
            </Tabs>
            <Grid item onClick = {()=> 
            
              {this.setState({value: false});
              this.setState({onProfilePage: true})
              }}>
              
            </Grid>
          </Grid>
          </Hidden>
          <Hidden smUp> 
            {/* <Grid item onClick = {()=> this.setState({value: false})} container xs={8} justify="flex-end" >  */}
            {this.props.userId ==='' 
              ? 
              <Grid item onClick = {()=> this.setState({value: false})} container xs={8} justify="flex-end" > 
                <IconButton variant="contained" color="primary" component={Link} to="/auth/signin">
                    <LoginIcon/>
                </IconButton>
              </Grid>
              : 
              <Grid item onClick = {()=> this.setState({value: false})} container xs={8} justify="flex-end" > 
                <Badge badgeContent={this.state.alerts  ? this.state.alerts.length : null} color="error" style={{marginRight:12, height:'fit-content', alignSelf:'center'}}>
                   <NotificationsNoneIcon onClick={this.handleClick} ref={this.notificationIcon} className={classes.notificationIcon}/>
                </Badge>
                <Logout handleLogout={this.handleLogout}/>
              </Grid>
            }
            
          </Hidden>
          <Hidden xsDown>
            <Grid item onClick = {()=> this.setState({value: false})} container xs={8} sm={3} md={2} justify="flex-end" >
              <Grid item>
                {this.props.userId ==='' 
                ? 
                <div>
                  <Hidden xsDown>
                    <Button variant="contained" color="primary" component={Link} to="/auth/signin" > Login 
                    </Button>
                  </Hidden>
                  {/* <Hidden smUp>
                    <IconButton variant="contained" color="primary" component={Link} to="/auth/signin">
                      <LoginIcon/>
                    </IconButton>
                  </Hidden> */}
                </div>
                :
                <div>
                <IconButton style={{marginRight:10}} color={this.state.onProfilePage? "primary":"inherit"} aria-label="menu" component={Link} to="/profile"  onClick = {()=> 
                {this.setState({value: false});
                this.setState({onProfilePage: true})
                }}>
                  <PersonIcon />
                </IconButton>
                <Badge badgeContent={this.state.alerts  ? this.state.alerts.length : null} color="error" style={{marginRight:12, height:'fit-content', alignSelf:'center'}}>
                   <NotificationsNoneIcon onClick={this.handleClick} ref={this.notificationIcon} className={classes.notificationIcon} />
                </Badge>
                
                <Logout handleLogout={this.handleLogout}/>
                </div>
                }
              </Grid>
            </Grid>
          </Hidden>
          {this.state.open 
          ? 
          // <div style={{ maxWidth:333 }}>
          <Popover
          id={id}
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          onClose={() => this.handleClose() }
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          // className = {classes.notificationPopover}
          // style={{ width:'100%' }}
          >
            <Notifications alerts={this.state.alerts} retrieveAlerts={this.updateAlerts} loading={this.state.notificationLoading} handleClosePopover={this.handleClose}/>
          </Popover>
          // </div>
          : ""
          }
        </Grid>
      </Toolbar>
      </AppBar>
      
      <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/jobs" component={Jobs} />
          <Route path="/events" component={Events} />
          <Route path="/articles" component={Articles} />
          <Route exact path="/dailydigest" component={DailyDigest} />
          <Route path="/auth/signin" component={Login} />
          {/* <Route exact path="/auth/signup" component={SignUp} /> */}
          <Route path="/auth/signup/:id" render={({match}) => (
            <SignUp id={match.params.id} />)} />
          <Route exact path="/auth/signup">
            <Redirect to={{
              pathname: '/auth/signin',
              state: { canSignUp: 'false'}
            }}/>
          </Route>
          <Route path="/profile" component={Profile} />
          <Route path="/jobs/listings/:queryString" component={Jobs} 
          />
          <Route path="/dailydigest/:token" component={DailyDigest} 
          />

          {/* <Route path="/profile" render={props => <Profile {...props} openSideBar={this.props.openSideBar} />} /> */}
          
      </Switch>

    </div>
      
    );
  }
}

const mapStateToProps = state => {
  return { 
    userId: state.auth.user_id,
   }
  
};

//export default (NavTabs);
export default connect(mapStateToProps, { doLogin })(withSnackbar(withStyles(useStyles, { withTheme: true}) (NavTabs)));
