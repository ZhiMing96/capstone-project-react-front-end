import React, { useState, useEffect, Fragment }from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, StaticRouter, Redirect } from 'react-router-dom';
import ArticlesBG from '../../images/articlesBG.jpg'
import { Grid, Paper, Typography, ButtonBase, makeStyles, CssBaseline, Box, Tabs, Tab, Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, CardActions, Collapse, Divider } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import clsx from 'clsx';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin:'auto',
    padding:20,
  },
  background: {
    backgroundImage:`url(${ArticlesBG})`,
   
    width:'100%',
    maxWidth:'100%',
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
  cardLarge: {
    maxWidth: '90%',
    marginBlock:10
  },
  cardSmall:{

  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
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
  const [value, setValue] = useState(0);
  const [fontWeight, setFontWeight] = useState({
    featured: '600',
    recommended: '300',
    latest:'300'
  })
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (event,newValue) => {
    console.log(newValue) 
    switch(newValue) {
      case 0:
        setFontWeight({
          featured: '600',
          recommended: '300',
          latest:'300'
        })
        break;
      case 1:
        setFontWeight({
          featured: '300',
          recommended: '600',
          latest:'300'
        })
      break;
      case 2:
          setFontWeight({
            featured: '300',
          recommended: '300',
          latest:'600'
          })
      break;
      
    }setValue(newValue);
  };
  
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
    <Fragment>
      <CssBaseline/>
        <div style={{backgroundImage:`url(${ArticlesBG})`,backgroundPosition: 'center',backgroundSize: 'cover', width:'100%', height:'350px'}}>
          <Typography>
            <Box textAlign="left" fontWeight="fontWeightBold" fontSize={40} letterSpacing={2} style={{marginInlineStart:'11%', paddingTop:'100px',color:'#024966'}}>
              ARTICLES
            </Box>
            <Box textAlign="left" fontWeight="fontWeightBold" fontSize={15} letterSpacing={1} style={{marginInlineStart:'11%', paddingTop:'1px',color:'#024966'}}>
              <Grid container style={{}}>
                <Divider orientation="vertical" style={{width:7, height:30, backgroundColor :'#1382B9', marginRight:10}} />
                <Typography style={{marginTop:5, fontWeight:600}}>
                  One Stop Career Guidance Portal
                </Typography>
              </Grid>
            </Box>
          </Typography>
        </div>

        <div style={{maxWidth: '100%', marginTop:1, flex:'wrap',  overflow:"auto", position:'sticky', top:'64px', zIndex:100}}>
         
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor=""
              textColor=""
              centered
              style={{maxWidth:'100%', marginInline:30, paddingBlock:5, backgroundColor:'#e3f2fd',alignItems:'center'}}
            >
                <Tab disableRipple style={{minHeight:0, padding:'3px 12px', fontSize:18}}  label={<span style={{fontWeight:fontWeight.featured}}>Recommended</span>} />
                <Tab disableRipple style={{minHeight:0, padding:'3px 12px',fontSize:18}} label={<span style={{fontWeight:fontWeight.recommended}}>Top Picks</span>} />
                <Tab disableRipple style={{minHeight:0, padding:'3px 12px', fontSize:18}} label={<span style={{fontWeight:fontWeight.latest}}>Latest</span>} />
            </Tabs>
          </div>
          <Grid container style={{margin:18}}>
          {articles.map((article,index) => {
            if(index <= 1){
              return (
                <Grid item xs={6} style={{marginTop:'15px',}}>
                  <Card className={classes.cardLarge}>
                    <CardMedia
                      className={classes.media}
                      image='https://content-mycareersfuture-sg-admin.cwp.sg/wp-content/uploads/2019/03/shutterstock_683138257.jpg'
                      title="Paella dish"
                    />
                  </Card>
                </Grid>
              )
            } else {
              return (
                <Grid item xs={4} style={{marginTop:'15px',}}>
                  <Card className={classes.cardLarge}>
                    <CardMedia
                      className={classes.media}
                      image='https://content-mycareersfuture-sg-admin.cwp.sg/wp-content/uploads/2019/09/Masthead-1.jpg'
                      title="Paella dish"
                    />
                  </Card>
                </Grid>
              )
            }
          })}
           </Grid>
          
      
    </Fragment>
    
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


{/* <div className={classes.background}>
     
     <h1> TEST </h1>
     {articles.map((article,index) => (
         <div key={index}>
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
                       Keywords: {article.acf.seo_keywords}
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
           </div> 
         ))}
   </div> */}


  //  <div style={{margin:'',display:'flex'}}> 
  //                 <div style={{textAlign:'-webkit-center'}}>
  //                   <Card className={classes.cardLarge}>
  //                     <CardMedia
  //                       className={classes.media}
  //                       image='https://content-mycareersfuture-sg-admin.cwp.sg/wp-content/uploads/2019/03/shutterstock_683138257.jpg'
  //                       title="Paella dish"
  //                     />
  //                     <CardContent>
  //                       <Typography variant="body2" color="textSecondary" style={{textAlign:'left'}}>
  //                         {article.acf.seo_meta_description}
  //                       </Typography>
  //                     </CardContent>
  //                     <CardActions disableSpacing>
  //                       <IconButton aria-label="add to favorites">
  //                         <FavoriteIcon />
  //                       </IconButton>
  //                       <IconButton aria-label="share">
  //                         <ShareIcon />
  //                       </IconButton>
  //                       <IconButton
  //                         className={clsx(classes.expand, {
  //                           [classes.expandOpen]: expanded,
  //                         })}
  //                         onClick={handleExpandClick}
  //                         aria-expanded={expanded}
  //                         aria-label="show more"
  //                       >
  //                         <ExpandMoreIcon />
  //                       </IconButton>
  //                     </CardActions>
  //                   </Card>
  //                 </div>
  //               </div>