import React, { Fragment, useState, useEffect } from 'react'
import { Grid, Typography, Box, Button, CssBaseline, Paper, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, ButtonBase} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {ExpandMore as ExpandMoreIcon} from '@material-ui/icons';



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

function getBookmarks(token, setBookmarks){
      //call API To get a list of Jobs
      
    axios.get('https://api.mycareersfuture.sg/v2/jobs?search=Product%20Management&limit=5&page=0&sortBy=new_posting_date')
    .then(response=>{
        const data = response.data
        console.log(data.results)
        const list = data.results
        setBookmarks(list);
    })
}

function Bookmarks() {
    const classes = useStyles();
    
    const [bookmarks, setBookmarks] = useState([]);
    
    useEffect(() => {
        getBookmarks("",setBookmarks);
    },[])

    const deleteBookmark = (index) => {
        console.log('before remove = ');
        console.log(bookmarks);

        const updatedList = [...bookmarks.slice(0,index),...bookmarks.slice(index+1,bookmarks.length)]
        console.log("after remove = ");
        console.log(updatedList);
        
    
        
        axios.post('',{newList:updatedList})
        .then(response => {
            console.log(response)
            //IF RESPONSE CODE IS OKAY THEN UPDATE LIST
            setBookmarks(updatedList);
            //ELSE THROW ERROR 
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
                                    <img className={classes.img} alt="complex" src="https://s3-ap-southeast-1.amazonaws.com/ojmp-data/68881d549ee1afe9975b6c43de876af4.jpg" />
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
                                        deleteBookmark(index)
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
