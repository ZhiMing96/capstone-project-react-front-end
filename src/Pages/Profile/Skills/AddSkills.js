import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Autosuggest from 'react-autosuggest';
import api from '../../../api.js'
import InputAdornment from '@material-ui/core/InputAdornment';
import AddBoxIcon from '@material-ui/icons/AddBox';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { connect } from "react-redux";
import { addSkill, removeSkill, updateSuggestedSkills } from '../../../redux/actions/skill'
import { useSnackbar } from 'notistack';
import ClearIcon from '@material-ui/icons/Clear'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
    overflowY: 'scroll',
    maxHeight: '300px',
    ['@media (min-height:920px)']: {
      maxHeight: '60%'
    }
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing(1),
  },

}));

const suggestions = [];

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => { }, ref, ...other } = inputProps;


  return (
    <TextField
      variant="outlined"
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
        endAdornment: (
          <InputAdornment position="end">
            <AddBoxIcon edge="end" />
          </InputAdornment>),
      }}
      {...other}

    />
  );
}

function IntegrationAutosuggest(props) {
  const classes = useStyles();
  const [state, setState] = React.useState('');
  const [stateSuggestions, setSuggestions] = React.useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const action = key => (
    <Fragment>
      <IconButton onClick={() => { closeSnackbar(key) }} size="small" style={{ color: 'white' }}>
        <ClearIcon />
      </IconButton>
    </Fragment>
  );

  const handleSuggestionsFetchRequested = ({ value }) => {
    if (value === null || value === '') {
      handleSuggestionsClearRequested()
    }
    console.log(value)
    api.skills.match({ "skill": value })
      .then(response => {
        if (response.data.response_code === 200) {
          setSuggestions(response.data.skills)
        } else {
          var error = response.data.response_message
          setSuggestions([])
        }
      }).catch(error => {
        var error = "Error retrieving data"
        setSuggestions([])
      })

  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = () => (event, { newValue, method }) => {
    setState(newValue)
  }


  const handleSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    console.log(suggestion)
    console.log(props.currentSkills)
    if (props.currentSkills.some(skill => skill.id === suggestion.id)) {
      console.log(suggestion.skill + " is already in current skills");
      enqueueSnackbar(suggestion.skill + " is already in your current skills.",  { variant: "warning", action } );

    } else {
      console.log(suggestion.skill + " is now added to skills");

      api.skills.add({
        "skill_add": [suggestion.skill]
      }).then(response => {
        if (response.data.response_code === 200) {
          props.addSkill(suggestion); //store
          api.skills.suggested().then(res => {
            if (res.data.response_code === 200) {
              console.log('200')
              res.data.suggested_skills.forEach(skill => {
                skill.skill.id = parseInt(skill.id)

              })
              props.updateSuggestedSkills(res.data.suggested_skills) //return array

            }
          }).catch()
        } else {
          enqueueSnackbar('Error adding skills.',  { variant: "error", action } );
        }
      }).catch(error => {
        enqueueSnackbar('Error adding skills.',  { variant: "error", action } );
      })

    }
  };

  const renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const matches = match(suggestion.skill, query);
    const parts = parse(suggestion.skill, matches);

    return (
      <MenuItem selected={isHighlighted} >
        <span>
          {parts.map(part => (
            <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
              {part.text}
            </span>
          ))}

        </span>
        {props.currentSkills.some(skill => skill.id === suggestion.id) &&
          <span style={{ marginLeft: '10px' }}>
            <Chip label="Added" color='primary' size='small' />
          </span>
        }
      </MenuItem>
    )
  };

  const autosuggestProps = {
    renderInputComponent,
    suggestions: stateSuggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    getSuggestionValue: () => { return state },
    renderSuggestion: renderSuggestion,
    alwaysRenderSuggestions: true,
    onBlur: handleSuggestionsClearRequested,
    onSuggestionSelected: handleSuggestionSelected,
  };

  return (
    <div className={classes.root}>
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          classes,
          id: 'react-autosuggest-simple',
          placeholder: 'Add your new skill',
          value: state,
          onChange: handleChange(),
        }}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderSuggestionsContainer={options => (
          <Paper {...options.containerProps} square>
            {options.children}
          </Paper>
        )}
      />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentSkills: state.skill.skills,
  }

};

export default connect(
  mapStateToProps,
  { addSkill, removeSkill, updateSuggestedSkills }
)(IntegrationAutosuggest); 
