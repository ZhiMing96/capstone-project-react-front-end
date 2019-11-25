import React,{Fragment}  from 'react';
import { Grid, Typography, Box, Button, IconButton } from '@material-ui/core'
import api from '../../../api.js'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CustomisedSuggestedSkillsChip from '../../../Components/CustomisedSuggestedSkillsChip'
import { connect } from "react-redux";
import { addSkill, updateSuggestedSkills } from '../../../redux/actions/skill'
import { withSnackbar } from 'notistack';
import ClearIcon from '@material-ui/icons/Clear'


const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})




class SuggestedSkillsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skill: {},
      description: [],
    };
    console.log("constructor" + this.props.suggestedSkills)
    this.handleAdd = this.handleAdd.bind(this)
    this.showDescription = this.showDescription.bind(this)
  }

  componentDidMount() {
    console.log("mount")
    api.skills.suggested().then(res=>{
      if (res.data.response_code===200){
        console.log('200')
        console.log(res.data.suggested_skills)
        res.data.suggested_skills.forEach(skill=>{
          skill.skill.id=parseInt(skill.id)
          
        })
        this.props.updateSuggestedSkills(res.data.suggested_skills) //return array
        
      }
    }).catch()
  }

  handleAdd(suggested, event) {
    const skillName = suggested.skill[0].skill
    const skillId = suggested.skill[0].id
    event.preventDefault()
    const action = key => (
      <Fragment>
          <IconButton onClick={() => { this.props.closeSnackbar(key) }} size="small" style={{ color:'white' }}>
              <ClearIcon/>
          </IconButton>
      </Fragment>
    );

    if (this.props.currentSkills.some(skill => skill.id === skillId)) {
      console.log(skillName + " is already in current skills");
      this.props.enqueueSnackbar(skillName + " is already in your current skills.", { variant: "warning", action })
    } else {
      console.log(skillName + " is now added to skills");
      
      api.skills.add({
        "skill_add": [skillName]
      }).then(response => {
        if (response.data.response_code ===200){
          this.props.addSkill({id: skillId, skill: skillName}); //store
          this.props.enqueueSnackbar(skillName + ' added to your skills.', { variant: "success", action })
          api.skills.suggested().then(res=>{
            if (res.data.response_code===200){
              console.log('200')
              res.data.suggested_skills.forEach(skill=>{
                skill.skill.id=parseInt(skill.id)
                
              })
              this.props.updateSuggestedSkills(res.data.suggested_skills) //return array
              
            }
          }).catch()
        }else {
          this.props.enqueueSnackbar('Error adding skills.', { variant: "error", action })
        }
      }).catch(error => {
        this.props.enqueueSnackbar('Error adding skills.', { variant: "error", action })
      })
    }
  }

  showDescription(jobSearchHistory) {
    this.setState({ description: jobSearchHistory })
    console.log(jobSearchHistory)
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.paper}>
        <Grid container direction="row" style={{ width: '100%' }}> 
          <Grid item xs={12} md={12}>
            <Typography component="div">
              <Box
                fontSize="h6.fontSize"
                m={2}
                letterSpacing={2}
                textAlign='left'
                color="primary.main"
                fontWeight="fontWeightBold"
              >

                SUGGESTED SKILLS

                  <Typography variant='body2' color='textSecondary' align='left' style={{fontSize:'medium'}}>
                  Based on your career interests, these are some skills that will get you further in your job hunt!
              </Typography>
              </Box>

            </Typography>

          </Grid>

        </Grid>
      {this.props.suggestedSkills !== null && 
        <Grid container style={{ padding: '1.5%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', }}>
          {
            this.props.suggestedSkills.length === 0 ?
              <Typography >
                <Box>
                  Oops! You have not searched for jobs in the past one month...
              </Box>
              </Typography>
              :
              <div>
                {this.props.suggestedSkills.map((skill, index) => { return <CustomisedSuggestedSkillsChip suggested={skill} handleAdd={this.handleAdd} showDescription={this.showDescription} /> })}
                {this.state.description.length !==0 ?
                <Box m={2} lineHeight='1'>
                  
                  <Typography variant='body2' color='textSecondary' display="inline">
                    
                    {"Because you searched for "}
                   </Typography>
                  
                  {this.state.description.map((desc, index) => {
                    return index !== this.state.description.length-1 ?  
                      index === this.state.description.length-2 ?//no comma
                      <span>
                        <Typography style={{ fontWeight: 'bold' }} variant='body2' color='textSecondary' display="inline">
                            {desc}
                        </Typography>
                        <Typography variant='body2' color='textSecondary' display="inline">
                        {" and "}
                        </Typography>
                      </span>
                        :

                        <span>
                        <Typography style={{ fontWeight: 'bold' }} variant='body2' color='textSecondary' display="inline">
                            {desc}
                        </Typography>
                        <Typography variant='body2' color='textSecondary' display="inline">     
                            {", "}
                        </Typography>
                        </span>
                      :
                        <Typography  style={{ fontWeight: 'bold' }} variant='body2' color='textSecondary' display="inline">
                          {desc}
                        </Typography>
                  }) 
                  }

                </Box>
                : <Box > <br/> </Box>}
                
              </div>
          }
        </Grid>}

      </div>


    );
  }
}

const mapStateToProps = state => {
  return {
    suggestedSkills: state.skill.suggestedSkills,
    currentSkills:state.skill.skills
  }

};

export default connect(
  mapStateToProps,
  { addSkill, updateSuggestedSkills }
)(withSnackbar
(withStyles(styles, { withTheme: true }) (SuggestedSkillsView)));