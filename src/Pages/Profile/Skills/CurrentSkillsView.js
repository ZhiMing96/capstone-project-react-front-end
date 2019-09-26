import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Box } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { borders } from '@material-ui/system';
import api from '../../../api.js'
import SnackBar from '../../../Components/Snackbar'
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core';
import AddSkills from './AddSkills'


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
    this.deleteState = this.deleteState.bind(this);
    this.handleSelectedSkill = this.handleSelectedSkill.bind(this);
    this.state = {
      message:'' ,
      variant:'',
      skills: [],
      delete:false,
      openDialog:false,
      newSkills:[]
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
        },
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
        }
      ]}) 
    }).catch(error => {
      
      console.log('issue w token')          
    })
  }

  componentDidMount(){
    this.getSkills();
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

  handleSelectedSkill(newSkill){ 
    var id = newSkill.id
    var currentSkills = this.state.skills
    if(currentSkills.some(skill => skill.id === id)){
      console.log(newSkill.skill + " is already in current skills");
    }else{
      console.log(newSkill.skill + " is now added to skills");
      this.setState(prevState=>({ skills: prevState.skills.push(newSkill)}))
      this.setState(prevState=>({ newSkills: prevState.newSkills.push(newSkill)}))
    }

  }

  deleteState(){
    this.setState(prevState=>({ delete: !prevState.delete}))
    console.log(this.state.delete)
  }
 
  render () {
  const { classes } = this.props;
  return(
    <div>
      <Grid container direction="row" style={{width:'100%'}}> {/*for your skills and search box and delete icon*/}
        <Grid item xs={12} md ={12}>
          <Typography component="div">
              <Box 
                fontSize="h6.fontSize" 
                m={2}
                letterSpacing={2}
                textAlign='left'
              >
              
              YOUR SKILLS 
              </Box>
              </Typography>
          </Grid>

          <Grid item style={{ width:'100%', paddingLeft:'2.5%', paddingRight:'2.5%'}}>
            <Grid container style={{justifyContent:'space-between'}}> {/*for search box and delete icon*/}
              <Grid item xs={9} md={9} style={{textAlign:'left'}}>
                <AddSkills handleSelectedSkill={this.handleSelectedSkill} skills={this.state.skills}/>
              </Grid>
              <Grid item>
                <IconButton className={classes.button} aria-label="delete" onClick={this.deleteState} style={{textAlign:'right'}}>
                  <DeleteIcon fontSize="large" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>

        </Grid>

        <Grid container className={classes.root} style={{ padding:'2.5%'}}>
          {this.state.delete ? 
            this.state.skills.map(skill =>(
              <Chip variant="outlined" color="primary" label={skill.skill}  clickable='false' style={{ margin:4}} onDelete={event=>this.handleRemove(skill.skill,event)}/>))
            :
            this.state.skills.map(skill =>(
              <Chip variant="outlined" color="primary" label={skill.skill} clickable='false' style={{ margin:4}} />
          ))}  
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

