import React, { useState, useEffect }from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, StaticRouter, Redirect } from 'react-router-dom';

import { Grid, Paper, Typography, ButtonBase, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin:'auto',
    padding:20,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 700,
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

function Articles() {
  const [articles, setArticles] = useState([]);
  const classes = useStyles();
  

  return(
    <div>
      <GetArticles setArticles={setArticles} articles={articles} classes={classes}/> 
    </div>
  );
}


function GetArticles({setArticles, articles, classes})
{
  console.log("Entered GetArticles Function");
  console.log(articles);
  useEffect(() => {
    axios.get('https://content.mycareersfuture.sg/wp-json/wp/v2/posts?per_page=10')
    .then(res => {
      const results = res.data;
      console.log(results);

      //console.log(results[0]._links['wp:attachment'][0].href);
      setArticles(results);
    })
  }, []);

  return(

    <div className={classes.root}>
      <h1> Articles </h1>
      {articles.map((article,index) => (
          <div key={index}>
            {/* <a href={article.link} style={{textDecoration: 'none', color: 'black'}}> */}
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase className={classes.image} href={article.link} style={{textDecoration: 'none', color: 'black'}}>
                    <GetImage url={article._links['wp:featuredmedia'][0].href} classes={classes}/>
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        {article.title.rendered}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {article.acf.seo_meta_description}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2" style={{ cursor: 'pointer' }} >
                        <a href={article.acf['cta-url']} style={{textDecoration: 'none', color: 'black'}}>
                          {article.acf['text_-_hyperlinked']}
                        </a>
                        
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">Status: {article.type}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            {/* </a> */}
            </div> 
          ))}
    </div>
  )
  
} 

// OpenLink = (link) => {
//   const url = link; 
//   return(
//     <Redirect to={url}/>  
//   )
// }

function GetImage({url, classes}){
  console.log("ENTERED GET IMAGE");
  console.log(url)
  const [imgUrl, setImgUrl] = useState("");

  // useEffect(() => {
    axios.get(url)
      .then(res => {
        // console.log("IMG LINK = ")
        // console.log(res.data.guid.rendered);
        const img = res.data.guid.rendered;
        // console.log(imgUrl)
        setImgUrl(img)
      })

    return (
      <div >
        <img className={classes.img} src={imgUrl} />
      </div>
      
    )
      
    // });

    return(
      <div>
        <h1>Image Not Loaded</h1>
      </div>
    )
    
}

function getPersonalisationInformation() {
  axios.get('localhost:3000/..') //Insert backend API 
    .then(res => {
      console.log(res.data);

    })
}
export default Articles