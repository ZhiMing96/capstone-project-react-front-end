import React, { useEffect } from 'react'
import { Grid, makeStyles, Typography, Avatar, Box, Button } from '@material-ui/core'
import { AccountBox, BookmarksIcon, ListAlt, Group }from '@material-ui/icons'
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';
import api from '../api'

//INCOMPLETE
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


function Sidebar(props) {
  const classes = useStyles();
  const [name,setName] = React.useState('')

  useEffect(()=>{
    api.profile.get().then(
      res=>{
        setName(res.data.profile.first_name)
      }
    ).catch({})
  
  })
  
   return(
    
     <Grid container alignItems="center" justify="center">
        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" className={classes.bigAvatar} />
        <Grid container justify="center">
          <Box 
              fontWeight="fontWeightBold"
              fontSize={20}
          >
            <Typography>
              {name.toUpperCase()}
            </Typography>
          </Box>
        </Grid>
        <Grid container justify="center">
          {profileArray.map((item,index)=>(
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
   )  
}
export default Sidebar;