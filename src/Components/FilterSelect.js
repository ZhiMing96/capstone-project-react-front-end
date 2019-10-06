import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: 0,
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

const filters = [
  {name: "Relevance",
    value: "skills_match"
  },
  {name: "Salary",
    value: "minimum"
  },
  {name: "Experience Level",
    value: "minimumYearsExperience"
  },
  {name: "Vacancies",
    value: "numberOfVacancies"
  },
  {name: "Posting Date",
    value: "newPostingDate" //metadata.newPostingDate
  },
  {name: "Popularity",
    value: "totalNumberOfView" //metadata.totalNumberOfView
  },
]


 const FilterSelect = ({submitFilter}) => {
  console.log("ENTERED FILTER SELECT COMPONENT");
  console.log(submitFilter)
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({
      filter:'',
      order:'' //or desc
    })
  
    const handleChange = name => (event) => {
      setState({...state, [name]: event.target.value});
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    useEffect(()=>{
      submitFilter(state.filter, state.order)
    },[state])
  
    const handleOpen = () => {
      setOpen(true);
    };

    const handleSubmit = event =>{
      console.log("Entered Handle Submit")
    }  
    return (
        <form className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel>Sort Results</InputLabel>
          <Select
            value={state.filter}
            onChange={handleChange('filter')}
          >
            {filters.map((filter)=>(
              <MenuItem value={filter.value}>{filter.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Divider orientation="vertical" style={{border:'2px', borderBlockColor:'black', width:"10px"}} />
        <FormControl className={classes.formControl}>
          <InputLabel>Order By</InputLabel>
          <Select
            value={state.order}
            onChange={handleChange('order')}
          >
            <MenuItem value='asc'>Ascending</MenuItem>
            <MenuItem value='desc'>Descending</MenuItem>
          </Select>
        </FormControl>
        </form>
    );
  }

  export default FilterSelect;