import React, { Fragment, useState, useEffect } from 'react'
import { Grid, Typography, Box, Button, CssBaseline, Paper, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, ButtonBase} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {ExpandMore as ExpandMoreIcon} from '@material-ui/icons';

const defaultIcon ="https://render.fineartamerica.com/images/rendered/default/print/7.875/8.000/break/images-medium-5/office-building-icon-vector-sign-and-symbol-isolated-on-white-background-office-building-logo-concept-urfan-dadashov.jpg";  

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      marginRight: 30
    },
    image: {
        width: 128,
        height: 128,
      },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
  }));

function getBookmarks(setBookmarks){

    const token = window.localStorage.getItem('authToken');
    console.log(token);
    const options ={
        headers: {"Authorization" : "Token " + token}
    }
      
    //axios.get('https://api.mycareersfuture.sg/v2/jobs?search=Business%20Analyst&limit=5&page=0&sortBy=new_posting_date')
    axios.get('http://localhost:3000/jobs/bookmarks/all',{},options)
    .then(response=>{
        const data = response.data
        console.log(data.results)
        const list = data.results
        setBookmarks(list);
    })
    .catch(err=>{
        console.error(err)
    })
}

function Bookmarks() {
    const classes = useStyles();
    
    const [bookmarks, setBookmarks] = useState([]);
    
    useEffect(() => {
        getBookmarks("",setBookmarks);
    },[])

    const deleteBookmark = (index,bookmark) => {
        console.log('before remove = ');
        console.log(bookmarks);

        const updatedList = [...bookmarks.slice(0,index),...bookmarks.slice(index+1,bookmarks.length)]
        console.log("after remove = ");
        console.log(updatedList);
        const token = window.localStorage.getItem('authToken');

        const options ={
            headers: {"Authorization" : "Token " + token}
        }
        axios.post('http://localhost:3000/jobs/bookmarks/remove',{
                "bookmark_id": bookmark.bookmarkId //to be implemented
        }, options)
        .then(response => {
            console.log(response)
            if(response.data.response_code === '200'){
                setBookmarks(updatedList);
                console.log('bookmark deleted successfully')
            }
        })
        .catch(err => {
            console.error(err)
        })
    }

    return (
        <Fragment>
            <CssBaseline />
            <Grid container spacing={1} >
                <Typography component="div">
                    <Box 
                        fontSize="h6.fontSize" 
                        m={1} 
                        letterSpacing={3}
                    >
                        BOOKMARKS 
                    </Box>
                </Typography>
            </Grid>
            
            <Grid item xs={12}> 
            {bookmarks
            ? bookmarks.map((list,index) => (
                <div key={index}>
                    <Paper className={classes.paper} elevation={2}>
                        <Grid container spacing={2}>
                            <Grid item>                                   
                                <ButtonBase className={classes.image}>
                                    {list.postedCompany.logoUploadPath
                                    ? <img className={classes.img} src={list.postedCompany.logoUploadPath} />
                                    : <img className={classes.img} src={defaultIcon} />
                                    }
                                    
                                </ButtonBase>
                            </Grid>
                            <Grid item container xs={12} sm >
                                <Grid item xs={9}>
                                    <Grid item xs>
                                        <Typography variant="body1">
                                            <Box fontWeight="fontWeightBold" align="left"  style={{marginLeft:10}}>
                                                { list.postedCompany 
                                                    ? list.postedCompany.name
                                                    : ""
                                                }
                                            </Box>
                                        </Typography>
                                        <Typography>
                                            <Box letterSpacing={2} align="left" style={{marginLeft:10}} >
                                                {list.title}
                                            </Box>
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs>
                                    <Button size="small" colour="inherit" onClick={()=>{
                                        deleteBookmark(index,list)
                                    }}>
                                        Remove
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                    <br/>
                </div>
            ))
            : <div></div>
            }
                
                
            </Grid>
            
            
        </Fragment>
    )
}
export default Bookmarks;
