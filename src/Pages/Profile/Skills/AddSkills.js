import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autosuggest from 'react-autosuggest';
import api from '../../../api.js'
import InputAdornment from '@material-ui/core/InputAdornment';
import AddBoxIcon from '@material-ui/icons/AddBox';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import { Box } from '@material-ui/core';

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
            <IconButton
              edge="end">
              <AddBoxIcon />
            </IconButton>
          </InputAdornment>),
      }}
      {...other}

    />
  );
}

async function getSuggestions(value) {
  console.log('getting suggestions : ' + value)
  /*return [{
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
    "id": "1",
    "skill": "hello world"
  },] //(this works, dummy)
*/
  await api.skills.match(value)
    .then(response => {
      if (response.data.response_code === 200) {
        return response.data.skills
      } else {
        var error = response.data.response_message
        return []
      }
    }).catch(error => {
      var error = "Error retrieving data"
      return []
    })
};

export default function IntegrationAutosuggest(props) {
  const classes = useStyles();
  const [state, setState] = React.useState('');
  const [stateSuggestions, setSuggestions] = React.useState([]);
  const [currentSkills, setSkills] = React.useState(props.skills)
  /*React.useState([{
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
  },]);//dummy */

  const handleSuggestionsFetchRequested = async ({ value }) => {
    console.log("HandleSuggestionsFetchRequested")
    if(value === null || value ===''){
      return
    }
    setSuggestions(await getSuggestions(value).then(response => {return response}).catch(error => {return}));
  };

  const handleSuggestionsClearRequested = () => {
    console.log("handleSuggestionsClearRequest")
    setSuggestions([]);
  };

  const handleChange = () => (event, { newValue, method }) => {
    console.log("handleChange")
    setState(newValue)
  }

  const handleSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    console.log(suggestion.skill + " onSuggestionSelected");
    props.handleSelectedSkill(suggestion)
    setSkills(props.skills) //update skills state
  };

  const renderSuggestion = (suggestion, { query, isHighlighted }) => {
    console.log('rendering suggestion: ' + suggestion.skill)
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
        {currentSkills.some(skill => skill.id === suggestion.id) &&
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
    renderSuggestion,
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
