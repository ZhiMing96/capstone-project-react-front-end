import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Box } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { borders } from '@material-ui/system';
import api from '../../api.js'
import SnackBar from '../../Components/Snackbar'
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';


const styles = makeStyles(theme=>({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

}));


class CurrentSkillsView extends React.Component {
  constructor (props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.deleteState = this.deleteState.bind(this);
    this.addState = this.addState.bind(this);
    this.state = {
      message:'' ,
      variant:'',
      skills: [],
      delete:false,
      add:false
    }
  }

  async getSkills() {
    await api.skills.get(window.localStorage.getItem('authToken'))
    .then(response => {
      this.setState({skills:[
        {
            "id": "1232",
            "skill": "Cellular"
        },
        {
            "id": "8493",
            "skill": "Sporting Goods"
        },
        {
            "id": "4433",
            "skill": "Information Security Policy"
        },
        {
            "id": "34",
            "skill": "ABR"
        },{
        
        "id": "1232",
        "skill": "Cellular"
        },
        {
            "id": "8493",
            "skill": "Sporting Goods"
        },
        {
            "id": "4433",
            "skill": "Information Security Policy"
        },
        {
            "id": "34",
            "skill": "ABR"
        }
      ]}) 
    }).catch(error => {
      
      console.log('issue w token')          
    })
  }

  componentDidMount(){
    this.getSkills();
  }

  handleClick(event,skill){
    event.preventDefault()
    event.stopPropagation()
    
  }



  async handleRemove (skillName,event) {
    event.preventDefault()
    console.log("Skill to remove: "+ skillName)
    await api.skills.remove({"skill_remove": skillName})
    .then((response) => {
      console.log(response.data.response_code)
  
      if(response.data.response_code === 200){
        this.setState({variant:'success'})
        this.setState({message: skillName + ' removed from your skills.'})
        this.setState(prevState=>({ skills: prevState.skills.filter(function(value, index, arr){
          return value.skill !== skillName;
      })}))
        
      } else if (response.data.response_code === 400){
        this.setState({variant:'error'})
        this.setState({message: response.data.response_message})
        
      } else {
        this.setState({variant:'error'})
        this.setState({message: 'Error in removing skill.'})
        
      }
  
    })
    .catch(error => {
      this.setState({variant:'error'})
      this.setState({message: 'Error in removing skill.'})
      
    })
  
  };
  
  handleClose (reason){
    if (reason === 'clickaway') {
      return;
    }
    this.setState({message: ''})
  
  };

  deleteState(){
    this.setState(prevState=>({ delete: !prevState.delete}))
    console.log(this.state.delete)
  }
  addState(){
    this.setState(prevState=>({ add: !prevState.add}))
    console.log(this.state.add)
  }

  
  render () {
  const { classes } = this.props;
  return(
    <div>
      <Grid container direction="column" spacing ={2}>
        <Grid item>
          <Grid container  justify="space-between">
          <Grid item>
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
          <Grid item>  
            <IconButton className={classes.button} aria-label="delete" onClick={this.addState}>
              <AddBoxIcon />
            </IconButton>
            <IconButton className={classes.button} aria-label="delete" onClick={this.deleteState}>
              <DeleteIcon />
            </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.root}>
        {this.state.delete ? 
          this.state.skills.map(skill =>(
            <Chip variant="outlined" color="primary" label={skill.skill}  clickable='false' style={{ margin:4}} onDelete={event=>this.handleRemove(skill.skill,event)}/>))
          :
          this.state.skills.map(skill =>(
            <Chip variant="outlined" color="primary" label={skill.skill} clickable='false' style={{ margin:4}}/>
        ))}  
        
        </Grid>
      
      </Grid>

      <SnackBar
        open={this.state.message!==''}
        handleClose={this.handleClose}
        variant={this.state.variant}
        message={this.state.message}
      />

    </div>
    
  );
}
}

export default withStyles(styles)(CurrentSkillsView);

