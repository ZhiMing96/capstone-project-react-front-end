import React, { useEffect, useState } from 'react'
import { Grid, Button, CssBaseline, IconButton, Paper, Typography, Divider, Box, InputBase, Container, ButtonBase, Snackbar, SnackbarContent, Avatar, Fab, FormControl, Fade, Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
  }));
  

function JobFilterSideBar({ handleSidebarSubmit }) {
    const classes = useStyles();
    const [expandedArea, setExpandedArea] = useState(false);
    const [selectedAreaIndex, setSelectedAreaIndex] = useState(null);
    const [governmentSchemes, setGovernmentSchemes] = useState([
        {   name: "For individuals between jobs", value: false, index:4 },
        {   name: "For mid-career switchers", value: false, index:2 },
        {   name: "For SME opportunities", value: false, index:1 },
        {   name: "For short-term trials", value: false, index:3 },
    ]);
    const [jobLevels, setJobLevels] = useState([
        {   name: "Senior Management", value: false, },
        {   name: "Middle Management",value: false, },
        {   name: "Manager",value: false, },
        {   name: "Professional",value: false, },
        {   name: "Senior Executive", value: false, },
        {   name: "Excutive", value: false, },
        {   name: "Junior Executive", value: false, },
        {   name: "Non-executive", value: false, },
        {   name: "Fresh/Entry Level", value: false, }, 
    ]);

    const [location, setLocation] = useState([
        { 
            area: "North",
            value : false,
            index : null,
            districts : [
                {name: "Serangoon Garden, Hougang, Sengkang, Punggol" , value: false, index: 19},
                {name: "Bishan, Ang Mo Kio" , value: false, index: 20},
                {name: "Kranji, Woodgrove, Woodlands" , value: false, index: 25},
                {name: "Upper Thomson, Springleaf" , value: false, index: 26},
                {name: "Yishun, Sembawang" , value: false, index: 27},
                {name: "Seletar" , value: false, index: 28},
            ]
        },
        { 
            area: "South",
            value : false,
            index : null,
            districts : [
                {name: "Queenstown, Tiong Bahru" , value: false, index: 3},
                {name: "Harbourfront,Telok Blangah, Sentosa Island" , value: false, index: 4},
                {name: "Clementi New Town, Hong Leong Garden, Pasir Panjang" , value: false, index: 5},
            ]
        },
        { 
            area: "East",
            value : false,
            index : null,
            districts : [
                {name: "Beach Road, High Street" , value: false, index: 6},
                {name: "Golden Mile, Middle Road" , value: false, index: 7},
                {name: "Geylang, Eunos" , value: false, index: 14},
                {name: "Katong, Joo Chiat, Amber Road" , value: false, index: 15},
                {name: "Upper East Coast, Bedok, Eastwood, Kew Drive" , value: false, index: 16},
                {name: "Loyang, Changi" , value: false, index: 17},
                {name: "Tampines, Pasir Ris" , value: false, index: 18},
            ]
        },
        { 
            area: "West",
            value : false,
            index : null,
            districts : [
                {name: "Upper Bukit Timah, Clementi Park, Ulu Pandan" , value: false, index: 21},
                {name: "Jurong, Jurong Island, Tuas" , value: false, index: 22},
                {name: "Hillview, Dairy Farm, Bukit Panjang, Choa Chu Kang" , value: false, index: 23},
                {name: "Lim Chu Kang, Tengah" , value: false, index: 24},
            ]
        },
        { 
            area: "Central",
            value : false,
            index : null,
            districts : [
                {name: "Cecil, Marina, People’s Park, Raffles Place" , value: false, index: 1},
                {name: "Anson, Tanjong Pagar" , value: false, index: 2},
                {name: "Little India" , value: false, index: 8},
                {name: "Cairnhill, Orchard, River Valley" , value: false, index: 9},
                {name: "Ardmore, Bukit Timah, Holland Road, Tanglin" , value: false, index: 10},
                {name: "Novena, Thomson, Watten Estate" , value: false, index: 11},
                {name: "Balestier, Serangoon, Toa Payoh" , value: false, index: 12},
                {name: "Macpherson, Braddell" , value: false, index: 13},
            ]
        },
        { 
            area: "Islandwide",
            value : false,
            index : 998,
            districts : null
        },
    ]);

    const handleSchemeChange = index => event => {
        console.log('*** ENTERED HANDLE SCHEME CHANGE METHOD  ***')
        console.log(index)
        console.log(event.target.value)
        var tempArray = [...governmentSchemes];
        tempArray[index].value = !tempArray[index].value;
        setGovernmentSchemes(tempArray)
        formQuery();
    };
    const handleJobLevelChange = (name , index) => event => {
        console.log('*** ENTERED HANDLE JOB LEVEL CHANGE METHOD  ***')
        console.log(name)
        console.log(event.target.value)
        var tempArray = [...jobLevels];
        tempArray[index].value = !tempArray[index].value;
        setJobLevels(tempArray)
        formQuery();
    };
    const handleDistrictChange = (areaIndex, districtIndex) => event => {
        console.log('*** ENTERED HANDLE LOCATION CHANGE METHOD  ***')
        console.log(areaIndex)
        console.log(districtIndex)
        console.log(event.target.value)
        var tempArray = [...location];
        tempArray[areaIndex].districts[districtIndex].value = !tempArray[areaIndex].districts[districtIndex].value;
        setLocation(tempArray)
        formQuery();
    };

    const handleShowAllDistrict = areaIndex => {
        setExpandedArea(!expandedArea);
        setSelectedAreaIndex(areaIndex);
    }

    const handleSelectArea = index => event => {
        console.log('*** ENTERED HANDLE SELECT AREA METHOD  ***')
        console.log(index)
        console.log(event.target.value)
        var tempArray = [...location];
        tempArray[index].value = !tempArray[index].value;

        if(tempArray[index].districts){
            for(let i=0 ; i< tempArray[index].districts.length ; i++ ) {
                tempArray[index].districts[i].value = tempArray[index].value
            }
        }
        setLocation(tempArray)
        setSelectedAreaIndex(index);
        setExpandedArea(true)
        formQuery();
    }

    const formQuery = () => {

        console.log("!!! ENTERED FORM QUERY METHOD ")


        var query = ''
        for (let i = 0; i < jobLevels.length ; i++) {
            if(jobLevels[i].value === true){
                query = query + `&positionLevel=${jobLevels[i].name}`
            }
        }
        for(let i = 0; i < governmentSchemes.length ;i++){
            if(governmentSchemes[i].value === true){
                query = query + `&schemeIds=${governmentSchemes[i].index}`
            }
        }
        for (let i = 0; i < location.length ; i++) {
            const districts = location[i].districts

            if(location[i].value === true && location[i].index ){
                query = query + `&districts=${location[i].index}`

            } else if (location[i].value === true) {
                for(let a=0 ; a<districts.length ; a++){
                    query = query + `&districts=${districts[a].index}`
                }

            } else if (districts !== null) {
                for(let a=0 ; a<districts.length ; a++){
                    if(districts[a].value === true){
                        query = query + `&districts=${districts[a].index}`
                    }
                }
            }
        }

        console.log(query)
        handleSidebarSubmit(query)
    }

     


    return (
        <Grid container style={{width:'100%', backgroundColor:'white', textAlign:'left'}}>
            <Grid item xs={12}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend"> Select Government Scheme</FormLabel>
                    <FormGroup>
                        {governmentSchemes.map((option, index) => (
                            <FormControlLabel
                                control={<Checkbox checked={option.value} 
                                onChange={handleSchemeChange(index)} value={option.index} />}
                                label={option.name}
                            />
                        ))}
                    </FormGroup>
                </FormControl>
            </Grid>
            <Divider style={{width:'85%', backgroundColor:'grey', height:1, marginLeft:'5%'}}/>
            <Grid item xs={12}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend"> Select Job Level </FormLabel>
                    <FormGroup>
                        {jobLevels.map((option, index) => (
                            <FormControlLabel
                                control={<Checkbox checked={option.value} 
                                onChange={handleJobLevelChange(option.name ,index)} value={option.name} />}
                                label={option.name}
                            />
                        ))}
                    </FormGroup>
                </FormControl>
            </Grid>
            <Divider style={{width:'85%', backgroundColor:'grey', height:1, marginLeft:'5%'}}/>
            <Grid item xs={12}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend"> Select Government Scheme</FormLabel>
                    <FormGroup>
                        {location.map((option, areaIndex) => (
                            <div>
                            <Checkbox checked={areaIndex === selectedAreaIndex  ? expandedArea : false} 
                            onChange={() => handleShowAllDistrict(areaIndex)}
                            indeterminate 
                            style={{paddingLeft:0}}
                            />
                            <FormControlLabel
                                control={
                                <Checkbox checked={option.value} 
                                onChange={handleSelectArea(areaIndex)} value={option.area} 
                                />}
                                label={option.area}
                            />
                                <div>
                                    <Collapse in={areaIndex === selectedAreaIndex  ? expandedArea : false}>
                                        <div>
                                            {option.districts !== null
                                            ?
                                            option.districts.map((district, districtIndex)=>(
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={district.value} 
                                                    onChange={handleDistrictChange(areaIndex,districtIndex)} value={district.index} 
                                                    />}
                                                    label={district.name}
                                                    style={{width:'100%', paddingLeft:'5%'}}
                                                />
                                            ))
                                            : ''
                                            }
                                        </div>
                                    </Collapse>
                                </div>
                            </div>
                        ))}
                    </FormGroup>
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default JobFilterSideBar
