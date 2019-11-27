import React, { useState, useEffect, useRef } from 'react';
import { Typography, Grid, Box } from '@material-ui/core';
import MeetupCard from '../../Components/MeetupCard'
import api from '../../api'
import { makeStyles } from '@material-ui/core/styles';
import CircularLoading from '../../Components/LoadingBars/CircularLoading'

const result = [
    {
        user: {
            profile: {
                user_id: 12,
                first_name: "erntekgg",
                last_name: "teoh",
                username: "teoherntek"
            },
            social: {
                profile_image_link: null,
                description: null,
                facebook_profile: null,
                linkedin_profile: null,
                meetup_ind: 1,
                preferred_locations: [
                    {
                        district_id: 6,
                        code: "D06",
                        location: "Beach Road, High Street",
                        sector: "17"
                    },
                    {
                        district_id: 14,
                        code: "D14",
                        location: "Geylang, Eunos",
                        sector: "38, 39, 40, 41"
                    }
                ]
            }
        }
    },
    {
        user: {
            profile: {
                user_id: 73,
                first_name: "test name",
                last_name: "test name 2",
                username: "testuser"
            },
            social: {
                profile_image_link: null,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                facebook_profile: null,
                linkedin_profile: null,
                meetup_ind: 1,
                preferred_locations: [
                    {
                        district_id: 6,
                        code: "D06",
                        location: "Beach Road, High Street",
                        sector: "17"
                    },
                    {
                        district_id: 12,
                        code: "D12",
                        location: "Balestier, Serangoon, Toa Payoh",
                        sector: "31, 32, 33"
                    },
                    {
                        district_id: 14,
                        code: "D14",
                        location: "Geylang, Eunos",
                        sector: "38, 39, 40, 41"
                    }
                ]
            }
        }
    }
]

const useStyles = makeStyles(theme => ({
    col: {
        maxWidth: 400
    },
}))


export default function MeetupSuggestions(props) {
    const classes = useStyles()
    const [locationSuggestions, setLocationSuggestions] = useState(null)
    const [stageSuggestions, setStageSuggestions] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    console.log('******CHECK PROPS')
    console.log(props)

    const fetchData=() =>{
        api.meetups.by_location()
            .then(res => {
                if (res.data.response_code === 200) {
                    setLocationSuggestions(res.data.results)
                }
            }).catch(err => {
                console.log(err)
            })
        api.meetups.by_stage()
            .then(res => {
                if (res.data.response_code === 200) {
                    setStageSuggestions(res.data.results)
                }
            }).catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        //for testing- pre load of fake data
        
        //setLocationSuggestions(result)
        //setStageSuggestions(result)
        //setIsLoaded(true)
        //api
        fetchData();
    },[])
    
    useEffect(()=>{
        if(stageSuggestions!==null && locationSuggestions!== null){
            setIsLoaded(true)
            console.log('****************')
            console.log("loaded")
        }else{
            console.log('****************')
            console.log(" not loaded")
        }
    },[stageSuggestions, locationSuggestions])



    if (isLoaded) {
        if (locationSuggestions.length > 0 || stageSuggestions.length > 0) {

            return (
                <div style={{ width: "-webkit-fill-available", marginTop: 20 }}>
                    <Grid container justify="space-around">
                        {stageSuggestions.length > 0 ?
                        <Grid item xs={12} sm={6} className={classes.col}>
                            <Typography component="div">
                                <Box
                                    fontSize="h6.fontSize"
                                    style={{ fontSize: 'medium' }}
                                    letterSpacing={1}
                                    textAlign='left'
                                    color="text.secondary"
                                    fontWeight="fontWeightBold"
                                >
                                    YOU MIGHT BE INTERESTED IN
                            </Box>
                            </Typography>
                            
                                {stageSuggestions.map(item => (
                                    <MeetupCard item={item} redirectProfile={props.redirectProfile} fetchData={fetchData}/>
                                ))}
                            
                        </Grid>
                        :
                        null}
                        {locationSuggestions.length > 0 ?
                        <Grid item xs={12} sm={6} className={classes.col}>
                            <Typography component="div" >
                                <Box
                                    fontSize="h6.fontSize"
                                    style={{ fontSize: 'medium' }}
                                    letterSpacing={1}
                                    textAlign='left'
                                    color="text.secondary"
                                    fontWeight="fontWeightBold"
                                >
                                    NEAR YOUR PREFERRED LOCATIONS
                            </Box>
                            </Typography>
                            
                                {locationSuggestions.map(item => (
                                    <MeetupCard item={item} redirectProfile={props.redirectProfile} fetchData={fetchData}/>
                                ))}
                        </Grid>
                        :
                        null}
                    </Grid>
                </div>
            )
        } else {
            return (
                <Typography color='textSecondary'>
                    Set up your social profile so we can suggest users you may be interested in meeting!
          </Typography>)
        }
    } else {
        return (
            <Grid container justify='center'>
            <CircularLoading />
          </Grid>
        )
    }
}