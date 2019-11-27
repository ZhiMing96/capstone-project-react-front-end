import React, { useState, useEffect, useRef } from 'react';
import { Grid, Typography, Box, Checkbox, Select, FormControlLabel, InputLabel, MenuItem, FormControl, Paper, Divider, InputBase, IconButton, Input, ListItemText } from '@material-ui/core'
import { Search as SearchIcon, Directions as DirectionsIcon, FilterList as FilterListIcon, Class } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import categoryDataSource from '../../data/categories'
import clsx from 'clsx';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import api from '../../api'
import MeetupSearchResults from './MeetupSearchResults'
import { connect } from "react-redux";
import { updateSocialSearch } from '../../redux/actions/socialSearch'
import MeetupSuggestions from './MeetupSuggestions'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "-webkit-fill-available",
    },
    margin: {
        margin: theme.spacing(1),
    },
    iconButton: {
        padding: 15.5,
    },
    button:{
        marginLeft:theme.spacing(2),
        paddingTop:14,
        paddingBottom:14
    }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function Search(props) {
    console.log(props)
    const classes = useStyles()
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    const [newSearch, setNewSearch] = React.useState({
        keyword: '',
        objective: '',
        category: '',
        locations: []
    })
    const [open, setOpen] = React.useState(false)
    const [searchResults, setSearchResults] = React.useState(null)

    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
        setNewSearch(
            {
                keyword: props.keyword,
                objective: props.objective,
                category: props.category,
                locations: props.locations
            }
        )
        setSearchResults(props.results)
        if(window.localStorage.getItem('authToken') ===null){ //log out
            setNewSearch({
                keyword: '',
                objective: '',
                category: '',
                locations: []
            })
            setSearchResults(null)
        }
    },[props.keyword, props.objective, props.category, props.locations,props.results])

    const handleChange = name => (event) => {
        setNewSearch({
            ...newSearch,
            [name]: event.target.value
        })
    }

    const locationsList = ["North", "South", "East", "West", "Central"]

    const handleSubmit = (event) => {
        event.preventDefault()
        api.meetups.search({
            keyword: newSearch.keyword,
            objective: newSearch.objective,
            category: newSearch.category,
        })
            .then(res => {
                if (res.data.response_code === 200) {
                    console.log(res.data.results)
                    //filter for locations
                    var arr = res.data.results
                    if (newSearch.locations.length > 0) {
                        arr = res.data.results.filter((value) => (
                            value.user.social.preferred_locations.filter(district => (
                                newSearch.locations.includes(district.area)
                            )).length > 0

                        ))
                    }
                    setSearchResults(arr)
                    props.updateSocialSearch({ //update Store for retrieval for back button
                        keyword: newSearch.keyword,
                        objective: newSearch.objective,
                        category: newSearch.category,
                        locations: newSearch.locations,
                        results: arr
                    })

                } else {
                    console.log("Error searching")
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleDialogOpen = () => {
        setOpen(true)
    }
    const handleDialogClose = () => {
        setOpen(false)
    }
    const handleClear=(e)=>{
        setNewSearch({
            keyword: '',
            objective: '',
            category: '',
            locations: []
        })
        setSearchResults(null)
        console.log(e)
        e.preventDefault()
    }

    return (
        <div>
            <form className={classes.form} onSubmit={(event) => { handleSubmit(event) }}>
                <Grid container xs={12} className={classes.root} justify="center" alignItems="center">
                    <Grid item xs={12} md={6}>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" required>
                            <InputLabel >
                                Keyword(s)
                            </InputLabel>
                            <OutlinedInput
                                placeholder={"Software engineer"}
                                value={newSearch.keyword}
                                onChange={handleChange('keyword')}
                                maxLength = {200}
                                endAdornment={<InputAdornment position="end">
                                    <IconButton onClick={handleDialogOpen}>
                                        <FilterListIcon />
                                    </IconButton>
                                </InputAdornment>}
                                required
                                labelWidth={90}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <FormControl variant="outlined" className={clsx(classes.margin, classes.textField)} required>
                            <InputLabel ref={inputLabel} >
                                Objective
                            </InputLabel>
                            <Select
                                value={newSearch.objective}
                                onChange={handleChange('objective')}
                                labelWidth={80}
                                required
                            >
                                <MenuItem value={"MENTOR"}>Mentor</MenuItem>
                                <MenuItem value={"NETWORK"}>Network</MenuItem>
                                <MenuItem value={"LEARN"}>Learn</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4} style={{ textAlign: "end" }} alignItems="center" >
                        <Button type="submit" size="large" color="primary" variant="contained" className={classes.iconButton}>
                            <SearchIcon />
                        </Button>
                        <Button type="clear" size="large" color="primary" variant="contained" onClick={handleClear} className={classes.button}>
                            Clear
                        </Button>
                    </Grid>
                </Grid>
                <Dialog
                    // disableBackdropClick 
                    disableEscapeKeyDown
                    open={open}
                    onClose={handleDialogClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>{"Refine Your Search!"}</DialogTitle>
                    <DialogContent >
                        <form className={classes.container} noValidate autoComplete="off">
                            <TextField
                                select
                                label="Job Category"
                                className={classes.textField}
                                value={newSearch.category}
                                onChange={handleChange("category")}
                                //SelectProps={{
                                //MenuProps: {
                                //className: classes.menu,
                                //},
                                //}}
                                margin="normal"
                                fullWidth
                            >
                                {categoryDataSource.map(option => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <FormControl className={classes.textField}>
                                <InputLabel >Preferred Locations</InputLabel>
                                <Select
                                    multiple
                                    value={newSearch.locations}
                                    onChange={handleChange("locations")}
                                    input={<Input />}
                                    renderValue={selected => selected.join(', ')}
                                    MenuProps={MenuProps}
                                >
                                    {locationsList.map(name => (
                                        <MenuItem key={name} value={name}>
                                            <Checkbox checked={newSearch.locations.indexOf(name) > -1} />
                                            <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose} color="primary">
                            Continue
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
            <Grid container xs={12} justify="center" style={{ textAlign: "-webkit-center"}}>
                {searchResults?
                <MeetupSearchResults searchResults={searchResults} redirectProfile={props.redirectProfile} />
                :
                <MeetupSuggestions redirectProfile={props.redirectProfile}/>
                }
            </Grid>
        </div>

    )
}


const mapStateToProps = state => {
    return {
        keyword: state.socialSearch.keyword,
        objective: state.socialSearch.objective,
        category: state.socialSearch.category,
        locations: state.socialSearch.locations,
        results: state.socialSearch.results
    }

};

export default connect(mapStateToProps, { updateSocialSearch })(Search)