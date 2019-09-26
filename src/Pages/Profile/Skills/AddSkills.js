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

const suggestions =  //add in-demand skills
[
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
];

function renderInputComponent(inputProps) {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps;
  
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
                    <AddBoxIcon/>
                </IconButton>
            </InputAdornment>),
        }}
        {...other}

      />
    );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.skill, query);
    const parts = parse(suggestion.skill, matches);
  
    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map(part => (
            <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
              {part.text}
            </span>
          ))}
        </div>
      </MenuItem>
    );
}


async function getSuggestions(value) {
    console.log('getting suggestions')
    //return suggestions (this works)

    await api.skills.match({'skill': value})
    .then(response=>{
        if (response.data.response_code===200){
            return response.data.skills
        }else{
            var error = response.data.response_message
            return []
        }
    }).catch(error=>{
        var error = "Error retrieving data"
        return []
    })
};

function getSuggestionValue(suggestion) {
    //no need to populate input, straight away adds to chips
    return suggestion.skill
};

export default function IntegrationAutosuggest() {
    const classes = useStyles();
    const [state, setState] = React.useState('');
  
    const [stateSuggestions, setSuggestions] = React.useState([]);
  
    const handleSuggestionsFetchRequested = async ({ value }) => {
      setSuggestions(await getSuggestions(value));
    };
  
    const handleSuggestionsClearRequested = () => {
      setSuggestions([]);
    };
  
    const handleChange = (event)  => {
      setState(event.target.value);
    };
  
    const autosuggestProps = {
      renderInputComponent,
      suggestions: stateSuggestions,
      onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
    };
  
    return (
      <div className={classes.root}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            id: 'react-autosuggest-simple',
            placeholder: 'Add your new skill',
            value:state,
            onChange: (event )=>handleChange(event),
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
  