import React from 'react';
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
import { Hidden, Box } from '@material-ui/core';
import LoginIcon from '@material-ui/icons/Input';
import MobileSideBar from '../Components/MobileSideBar/MobileSideBar';
import Backdrop from '../Components/MobileSideBar/Backdrop';
import api from  '../api';
import {doLogin} from  '../redux/actions/auth'
import { withStyles,makeStyles } from '@material-ui/core/styles';
import { ImportantDevices } from '@material-ui/icons';
import { typography } from '@material-ui/system';
import DailyDigest from '../Pages/DailyDigest';


const styles = theme => ({
  root: {
    //position:'relative',
    //zIndex: 1400
  },
})

class NavTabs extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      value: false,
      message: '',
      onProfilePage: false,
      sideBarOpen: false,
      tabStyle:{
        jobs: 'light',
        events: 'light',
        articles: 'light',
      },
    };
    console.log(this.props)
    console.log(this.props.location.pathname)
  }

  componentDidMount(){
    if(window.localStorage.getItem('authToken') !==null){
      api.profile.get() 
      .then(response => {
        if(response.data.profile!==undefined){
          let userId = response.data.profile.user_id
          this.props.doLogin(userId) //HYDRATE
        }
      })
    }
    
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


  render() {
    const token = window.localStorage.getItem('authToken');
    console.log(token)
    var isHomePage=false

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

    return (
      <div>
        <MobileSideBar show={this.state.sideBarOpen} backdropClickHandler={this.backdropClickHandler}/>
        {backdrop}
        <AppBar position="sticky" color="#FFFFFF" style={{zIndex:50}}>
        {/* <Toolbar style = {window.screen.width < 445 ? {marginBottom: 15} : {}}> */}
        <Toolbar>
        <Grid container direction="row" alignItems="center" justify="flex-start" >
          {
            token 
            ?
            <Hidden smUp>
              <Grid item sm={1}>
                <IconButton onClick={this.drawerTogglerClickHandler}>
                  <MenuIcon/>
                </IconButton>
              </Grid>
            </Hidden>
            : <div></div>
          }
          <Grid item xs={2} sm={3}>
            <Typography>
              <Box fontWeight={600} fontSize={20} >
                <Link to="/" style={{textDecoration:'none', color:'#0091ea'}}>
                  JOPIFY
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
              <Grid item onClick = {()=> this.setState({value: false})} container xs={10} justify="flex-end" > 
                <IconButton variant="contained" color="primary" component={Link} to="/auth/signin">
                    <LoginIcon/>
                </IconButton>
              </Grid>
              : 
              <Grid item onClick = {()=> this.setState({value: false})} container xs={8} justify="flex-end" > 
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
                <Logout handleLogout={this.handleLogout}/>
                </div>
                }
              </Grid>
            </Grid>
          </Hidden>
          
        </Grid>
      </Toolbar>
      </AppBar>


        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/jobs" render={()=> (<Jobs searchResults={[]}/> )}/>
            <Route path="/events" component={Events} />
            <Route path="/articles" component={Articles} />
            <Route path="/dailydigest" component={DailyDigest} />
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
            <Route  path="/jobs/listings/:queryString" component={Jobs} 
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
export default connect(mapStateToProps, { doLogin })(withStyles(styles, { withTheme: true}) (NavTabs));