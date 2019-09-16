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
import Home from '../Pages/Home/Home.js'
import Jobs from '../Pages/Jobs/Jobs.js'
import Events from '../Pages/Events/Events.js'
import Articles from '../Pages/Articles/Articles.js'
import Skills from '../Pages/Skills/Skills.js'
import Login from '../Pages/Login/Login.js'
import SignUp from '../Pages/SignUp/SignUp.js'
import { connect } from "react-redux";



function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

class NavTabs extends React.Component {

  state = {
    value: false,
    message: ''
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    return (

      <BrowserRouter>
        <AppBar position="static" color="default" >
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
            <Tab label="Skills" component={Link} to="/skills" />

          
          </Tabs>
          </Grid>
        <Grid item   >

      {/* the tab indicator disappears when login button is clicked */}
        <Button variant="contained" color="primary" component={Link} to="/auth/signIn" onClick = {()=> this.setState({value: false})}> Login </Button>
        </Grid>
      </Grid>
      </Toolbar>
      </AppBar>


        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/jobs" render={() => <Jobs loadListings = {false} /> }/>
            <Route path="/events" component={Events} />
            <Route path="/articles" component={Articles} />
            <Route path="/skills" component={Skills} />
            <Route path="/auth/signin" component={Login} />
            <Route path="/auth/signup" component={SignUp} />
            
        </Switch>
      
      </BrowserRouter>
    );
  }
}

NavTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return { articles: state.articles };
};

//export default (NavTabs);
export default connect(mapStateToProps)(NavTabs);
