import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from '../Pages/Home'
import Jobs from '../Pages/Jobs/Jobs'
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
import { Hidden } from '@material-ui/core';
import LoginIcon from '@material-ui/icons/Input';
import MobileSideBar from '../Components/MobileSideBar/MobileSideBar';
import Backdrop from '../Components/MobileSideBar/Backdrop';
import api from  '../api';
import {doLogin} from  '../redux/actions/auth'


class NavTabs extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      value: false,
      message: '',
      onProfilePage: false,
      sideBarOpen: false,
    };
    console.log(this.props)
    
  }

  componentDidMount(){
    if(window.localStorage.getItem('authToken') !==null){
      api.profile.get() 
      .then(response => {
      let userId = response.data.profile.user_id
      this.props.doLogin(userId) //HYDRATE
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

    let responsiveSideBar;
    let backdrop;

    if(this.state.sideBarOpen){
      // responsiveSideBar = <MobileSideBar show={openSideBar}/>;
      backdrop = <Backdrop click={this.backdropClickHandler}/>
    }

    return (
      <div>
        <MobileSideBar show={this.state.sideBarOpen} backdropClickHandler={this.backdropClickHandler}/>
        {backdrop}
        <AppBar position="sticky" color="default" style={{zIndex:50}}>
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
              LOGO
          </Grid>
          <Hidden xsDown>
          <Grid item xs={5} sm={6} md={7} container justify="flex-end">
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor ="primary"
              variant ='fullWidth'
              
            >
              
                <Tab label="Jobs" component={Link} to="/jobs" />
                <Tab label="Events" component={Link} to="/events" />
                <Tab label="Articles" component={Link} to="/articles" />
              
              {/* <Hidden smUp>
                <Tab icon={<JobsIcon/>} style={{minWidth:0}} component={Link} to="/jobs" />
                <Tab icon={<EventsIcon/>} style={{minWidth:0}} component={Link} to="/events" />
                <Tab icon={<ArticlesIcon/>} style={{minWidth:0}} component={Link} to="/articles" />
              </Hidden> */}
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
            <Route path="/auth/signin" component={Login} />
            <Route path="/auth/signup" component={SignUp} />
            <Route path="/profile" component={Profile} />
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
export default connect(mapStateToProps, { doLogin })(NavTabs);