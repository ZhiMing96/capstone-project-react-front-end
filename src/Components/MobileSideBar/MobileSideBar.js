import React from 'react'
import './MobileSideBar.css'
import { Grid, makeStyles, Typography, Avatar, Box, Button } from '@material-ui/core'
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
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

  if(props.show){
    sideBarClasses = 'mobileSideBar open' ;
  }
  return(
    <nav className={sideBarClasses}> 
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
