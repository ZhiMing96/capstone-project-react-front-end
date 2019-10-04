import React, {useState} from 'react';
import { Grid, Box, Paper } from '@material-ui/core';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {

    console.log("ENTERED PAGINATION props = ");
    console.log("postsPerPage" + postsPerPage)
    console.log("totalPosts" + totalPosts)
    console.log(paginate)
    const pageNumbers = [];
    const [selectedPage, setSelectedPage] = useState(1);

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleClick = (number) => {
        paginate(number);
        setSelectedPage(number);
    }

    return (
            <Grid container xs={12} spacing={3} justify='center'>
                {pageNumbers.map(number => (
                    <Grid item>
                    {
                        number === selectedPage 
                        ? 
                        <a onClick={() => handleClick(number)} className='page-link' style={{textDecoration:"none", color:"purple", fontWeight:"bold", fontSize:20}}>
                        {number==pageNumbers.length ? 'Last' : number} </a>
                        : 
                        <a onClick={() => handleClick(number)} className='page-link'> 
                        {number==pageNumbers.length ? 'Last' : number} </a>
                       
                    }
                    </Grid>
                    
                ))}
            </Grid>
    );
};

export default Pagination;