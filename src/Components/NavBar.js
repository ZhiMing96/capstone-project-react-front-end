import React from 'react';
import PropTypes from 'prop-types';
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
import JobListings from '../Pages/Jobs/JobListings'
import Events from '../Pages/Events'
import Articles from '../Pages/Articles'
import Skills from '../Pages/Skills'
import Login from '../Pages/Login'
import SignUp from '../Pages/SignUp'
import Profile from '../Pages/Profile'
import { connect } from "react-redux";
import PersonIcon from '@material-ui/icons/Person';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle'



class NavTabs extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      value: false,
      message: '',
    };
    console.log(this.props)
  }


  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {

    return (

      <BrowserRouter>
        <AppBar position="sticky" color="default">
        <Toolbar style = {window.screen.width < 445 ? {marginBottom: 15} : {}}>
        <IconButton edge="start" style={{marginRight: 2}} color="inherit" aria-label="menu" component={Link} to="/profile"> 
            <AccountCircle />
        </IconButton>
        <Grid container direction="row" alignItems="center" justify="flex-end" >
          <Grid item >
              
          </Grid>
          <Grid item >
        
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
              {this.props.username ==='' ? null:
              <Tab label="Skills" component={Link} to="/skills" />
              }
          
            </Tabs>
          </Grid>
          <Grid item onClick = {()=> this.setState({value: false})}>
            {this.props.username ==='' ? 
          
            <Button variant="contained" color="primary" component={Link} to="/auth/signIn" > Login </Button> :
            <Fab size="small" color="primary" aria-label="profile" component={Link} to="/profile" style={{margin:10}}>
            <PersonIcon />
            </Fab>        
            }
          </Grid>
        </Grid>
      </Toolbar>
      </AppBar>


        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/jobs" component={Jobs}/>
            <Route path="/events" component={Events} />
            <Route path="/articles" component={Articles} />
            <Route path="/skills" component={Skills} />
            <Route path="/auth/signin" component={Login} />
            <Route path="/auth/signup" component={SignUp} />
            <Route path="/profile" component={Profile} />
            
        </Switch>
      
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return { 
    first_name: state.auth.first_name,
    last_name: state.auth.last_name,
    username: state.auth.username,
    email: state.auth.email
    
   }
  
};

//export default (NavTabs);
export default connect(mapStateToProps)(NavTabs);
