import React from 'react'
import './MobileSideBar.css'
import { Grid, makeStyles, Typography, Avatar, Box, Button, Paper } from '@material-ui/core'
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import EventsIcon from '@material-ui/icons/InsertInvitation';
import ArticlesIcon from '@material-ui/icons/MenuBook';
import JobsIcon from '@material-ui/icons/BusinessCenter';

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

function MobileSideBar(props){
  const classes = useStyles();
  console.log("Props for Mobile Side Bar = " + props.show);
  let sideBarClasses='mobileSideBar';

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if(props.show){
    sideBarClasses = 'mobileSideBar open' ;
  }
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
        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" className={classes.bigAvatar} />
        <Grid container justify="center">
          <Typography>
            <Box 
              fontWeight="fontWeightBold"
              fontSize={20}s
            >
              JOHN DOE
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
