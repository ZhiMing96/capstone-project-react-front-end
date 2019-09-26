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
import Skills from '../Pages/Skills'
import Login from '../Pages/Login'
import SignUp from '../Pages/SignUp'
import Profile from '../Pages/Profile'
import { connect } from "react-redux";
import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import Logout from './Logout'


class NavTabs extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      value: false,
      message: '',
      onProfilePage: false
    };
    console.log(this.props)
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

    return (
      <div>
      
        <AppBar position="sticky" color="default">
        <Toolbar style = {window.screen.width < 445 ? {marginBottom: 15} : {}}>
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
          <Grid item onClick = {()=> 
          
            {this.setState({value: false});
            this.setState({onProfilePage: true})
            }}>

            
            
          </Grid>

          <Grid item onClick = {()=> this.setState({value: false})}>
            {this.props.username ==='' ? 
          
            <Button variant="contained" color="primary" component={Link} to="/auth/signin" > Login </Button> :

            <div>
            <IconButton style={{margin:10}} color={this.state.onProfilePage? "primary":"inherit"} aria-label="menu" component={Link} to="/profile" size="large" onClick = {()=> 
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
      </Toolbar>
      </AppBar>


        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/jobs" component={Jobs}/>
            <Route path="/events" component={Events} />
            <Route path="/articles" component={Articles} />
            <Route path="/skills" component={Skills} />
            <Route path="/auth/signin" component={Login} />
            <Route path="/auth/signup" component={SignUp} />
            <Route path="/profile" component={Profile} />
            
        </Switch>
        </div>
      
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