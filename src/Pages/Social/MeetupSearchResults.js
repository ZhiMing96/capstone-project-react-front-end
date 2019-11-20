import React, { useState, useEffect } from 'react'
import MeetupCard from '../../Components/MeetupCard'
import { Typography,Grid } from '@material-ui/core';


export default function MeetupSearchResults(props) {

    const [list, setList] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    console.log(props)

    useEffect(() => {
        if (props.searchResults !== null) {
            setList(props.searchResults)
            setIsLoaded(true)
        }
    })

    if (isLoaded) {
        return (
            <div style={{width:"-webkit-fill-available", marginTop: 10}}>
                {list.length>0 ?
                    [list.map(item => (
                        <Grid item xs={7} >
                        <MeetupCard item={item} redirectProfile={props.redirectProfile} />
                        </Grid>
                    ))]
                    :
                    <Typography color='textSecondary'>
                        Sorry, no users match your search. Try broadening your search.
                    </Typography>
                }
            </div>
        )
    }else{
        return null
    }
}