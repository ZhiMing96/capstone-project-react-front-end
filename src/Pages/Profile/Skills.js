import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Box } from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { borders } from '@material-ui/system';
import api from '../../api.js'
import SnackBar from '../../Components/Snackbar'



const useStyles = makeStyles(theme => ({
  root: {   
    background: 'linear-gradient(45deg, #3f51b5bf 30%, rgba(63, 81, 181, 0.5) 90%)',
    border: 0,
    borderRadius: 5,
    color: 'white',
  },
}));



function Skills(props) {
  const classes = useStyles()
  const [message, setMessage] = React.useState('')
  const [snackBarVariant, setVariant] = React.useState('')

  const handleRemove = async (skillName) => {
    console.log("Skill to remove: "+ skillName)
    await api.skills.remove({"skill_remove": skillName})
    .then((response) => {
      console.log(response.data.response_code)
  
      if(response.data.response_code === 200){
        setMessage('Skill removed.')
        setVariant('success')
        
      } else if (response.data.response_code === 400){
        setMessage(response.data.response_message)
        setVariant('error')
      } else {
        setMessage('Error in removing skill.')
        setVariant('error')
      }
  
    })
    .catch(error => {
      setMessage('Error in removing skill.')
      setVariant('error')
    })
  
  };
  
  const handleClose =(reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setMessage('')
    
  
  };
  const skillsArray = [
    {
      id: 1,
      name: "HTML"
    },
    {
      id: 2,
      name: "CSS"
    },
    {
      id: 3,
      name: "Python"
    },
    {
      id: 4,
      name: "Software Engineering"
    },
    {
      id: 5,
      name: "Data Analytics"
    },
  ] //dummy, props.skills

  return(
    <div>
      <Typography component="div">
          <Box 
            fontSize="h5.fontSize" 
            m={3.5} 
            letterSpacing={3}
            fontWeight="fontWeightBold" 
          >
            SKILLS
          </Box>
      </Typography>
    
      <Grid container direction="column" spacing ={4}>
        <Grid item>
          <Grid container >
            <Typography component="div">
              <Box 
                fontSize="h6.fontSize" 
                m={1} 
                letterSpacing={2}
              >
              YOUR SKILLS 
              </Box>
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" justify="center" spacing ={5} style={{ width: '100%'}}>
            {skillsArray.map(skill => (
              <Grid item key={skill.id} xs={12} md={6} style={{marginTop:"-20px", marginBottom:"-20px"}}>
                <List  >
                  <ListItem className={classes.root}>
                    <ListItemText 
                      primary={skill.name}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon onClick={(event) =>handleRemove(skill.name)}/>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
                
              </Grid>
            ))}
          </Grid>
        </Grid>
      
      </Grid>

      <SnackBar
        open={message!==''}
        handleClose={handleClose}
        variant={snackBarVariant}
        message={message}
      />
    </div>
    
  );
}

export default Skills;

//style={{backgroundColor: 'rgba(0, 0, 0, 0.05)', borderRadius:16}}

{/*<List >
              {generate(
                <ListItem>
                  <ListItemText
                    primary="Single-line item"
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List>
          */}