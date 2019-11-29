import React, { useState, useEffect } from 'react'
import MeetupCard from '../../Components/MeetupCard'
import { Typography,Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
/*
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
*/

const useStyles = makeStyles(theme => ({
    col: {
        maxWidth: 400
    },
}))

export default function MeetupSearchResults(props) {
    const classes = useStyles()
    const [list, setList] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    console.log(props)

    useEffect(() => {
        
        if (props.searchResults !== null) {
            setList(props.searchResults)
            setIsLoaded(true)
        }
        
       //setList (result)
       //setIsLoaded(true)

    })

    if (isLoaded) {
        return (
            <div style={{width:"-webkit-fill-available", marginTop: 10}}>
                <Grid container justify="space-around">
                {list.length>0 ?
                <Grid item item xs={12} sm={6} className={classes.col} >
                    {list.map(item => (
                        
                        <MeetupCard item={item} redirectProfile={props.redirectProfile} fetchData={props.fetchData}/>
                        
                    ))}
                    </Grid>
                    :
                    <Typography color='textSecondary'>
                        Sorry, no users match your search. Try broadening your search.
                    </Typography>
                }
                </Grid>
            </div>
        )
    }else{
        return null
    }
}