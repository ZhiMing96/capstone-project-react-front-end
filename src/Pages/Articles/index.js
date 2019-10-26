import React, { useState, useEffect, Fragment }from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, StaticRouter, Redirect } from 'react-router-dom';
import ArticlesBG from '../../images/articlesBG.jpg'
import { Grid, Paper, Typography, ButtonBase, makeStyles, CssBaseline, Box, Tabs, Tab, Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, CardActions, Collapse, Divider, CardActionArea, List, ListItem, ListItemAvatar, ListItemText, Fab, Button } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import clsx from 'clsx';
import styled from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos'
import { typography } from '@material-ui/system';
import { setSeconds } from 'date-fns/esm';
import api from '../../api';
import AddIcon from '@material-ui/icons/Add';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import './index.css'
import StarIcon from '@material-ui/icons/Star'
import CircularLoading from  '../../Components/LoadingBars/CircularLoading';

const Wrapper = styled.div`
    width:100%
`;

const Page = styled.div`
    width:100%
`;

const carouselStyles = makeStyles(theme => ({

}));

const CarouselArrowNext = (props) => {

  const classes = carouselStyles();
  
  const { className, style, onClick } = props;
  console.log(style)
  return (
    <div 
      className={className}
      style={{ display: "block",zIndex:60, marginRight:'1%',}}
      onClick={onClick}
    >
      <Fab
        className={className}
        size='medium'
        style={{display: "block",zIndex:60, marginRight:'6%',backgroundColor:'black', opacity:'0.6'}}
        onClick={onClick}
      > 
      <KeyboardArrowRightIcon style={{color:'white',marginTop:6}}/>
    </Fab>
    </div>
    
  );
}
const CarouselArrowPrev = (props) => {
  const classes = useStyles();
  const { className, onClick, style } = props;
  return (
    <div 
      className={className}
      style={{ ...style, display: "block",zIndex:60,marginLeft:'1%',content:'none'}}
      onClick={onClick}
    >
      <Fab
        size='medium'
        style={{backgroundColor:'black', opacity:'0.6'}}
      > 
      <KeyboardArrowLeftIcon style={{color:'white',}}/>
    </Fab>

    </div>
    
  );
}
const miniCarouselSettings = {
  accessibiliy: true,
  speed:1800,
  slidesToShow: 4,
  slidesToScroll: 2,
  infinite:true,
  dots:false,
  arrows:true,
  autoplaySpeed:7500,
  draggable:true,
  lazyLoad: "progressive",
  pauseOnHover: true,
  nextArrow: <CarouselArrowNext />,
  prevArrow: <CarouselArrowPrev />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
        dots: false
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false
      }
    }]
};

const largeCarouselSettings = {
  accessibiliy: true,
  speed:1800,
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite:true,
  autoplay: true,
  arrows:true,
  autoplaySpeed:5000,
  draggable:true,
  lazyLoad: "progressive",
  pauseOnHover: true,
};

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
  fab: {
    margin: theme.spacing(1),
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
    maxWidth: '98%',
    marginBlock:10
  },
  cardSmall:{
    maxWidth: '95%',
    marginBlock:10
  },
  mediaLarge: {
    height: 0,
    paddingTop: '40.25%',
  },
  mediaSmall: {
    height: 0,
    paddingTop: '56.25%',
  },
  articleHeading: {
    textAlign:'Left', 
    fontWeight:'lighter',
    overflow:'hidden',
    textOverflow:'ellipsis', 
    display:'-webkit-box',
    WebkitLineClamp:2,
    WebkitBoxOrient:'vertical',
    '&:hover': {
  
    }
  },
  articleDescription:{
    textAlign:'Left', 
    overflow:'hidden',
    textOverflow:'ellipsis', 
    display:'-webkit-box',
    WebkitLineClamp:4,
    WebkitBoxOrient:'vertical'
  },
  tabArea: {
    maxWidth: '100%', 
    flex:'wrap',  
    overflow:"auto",
    position:'sticky', 
    zIndex:10,
    [theme.breakpoints.down('sm')]: {
      top:'57px',
    },
    [theme.breakpoints.up('md')]: {
      top:'64px',
    },
  },
  individualTab: {
    minHeight:0, 
    padding:'3px 12px', 
    [theme.breakpoints.down('sm')]: {
      fontSize:12,
    },
    [theme.breakpoints.up('md')]: {
      fontSize:18,
    },

    
  },
  articleList: {
    marginTop:'15px', 
    overflowY:'auto',
    [theme.breakpoints.down('sm')]: {
      height:'290px',
    },
    [theme.breakpoints.up('md')]: {
      height:'370px',
    },
    [theme.breakpoints.up('lg')]: {
      height:'450px',
    },
    [theme.breakpoints.up('xl')]: {
      height:'570px',
    },
  },
  ListTitle:{
    fontWeight:'lighter',
    [theme.breakpoints.up('lg')]: {
      fontSize:'20px' 
    },
    [theme.breakpoints.down('md')]: {
      fontSize:'16px' 
    },
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
  sectionHeading: {
    fontSize:'large',
    fontWeight:'bold',
    backgroundColor:'#fafafa', 
    position:'sticky', 
    top:0, 
    textAlign:'left', 
    zIndex:10, 
    padding:10, 
    paddingTop:0,
    color:'#024966e'
  }
}));

function Articles()
{
  console.log("Entered GetArticles Function");
  const [articles, setArticles] = useState([]);
  const [recommendedArticles, setRecommendedArticles] = useState([]);
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [fontWeight, setFontWeight] = useState({
    featured: '600',
    recommended: '300',
    latest:'300'
  })
  const [expanded, setExpanded] = useState(false);
  const [selectedIndex, setselectedIndex] = useState(null);
  const [selectedRecommendedIndex, setSelectedRecommendedIndex] = useState(null);
  const token = window.localStorage.getItem('authToken');
  const [loading, setLoading] = useState(false);


  const handleRecommendedExpandClick = (index) => {
    console.log(index);
    setSelectedRecommendedIndex(index);
    setselectedIndex(null);
    setExpanded(!expanded);
  };
  const handleExpandClick = (index) => {
    console.log(index);
    setselectedIndex(index);
    setSelectedRecommendedIndex(null);
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
  
  useEffect(() => {
    // setLoading(true)
    api.articles.get()
    .then(res => {
      const results = res.data;
      console.log(results);
      //console.log(results[0]._links['wp:attachment'][0].href);
      if(results.response_code === 200){
        console.log('*** LATEST ARTICLES ARE')
        console.log(results.articles)
        setArticles(results.articles);
      } else {
        console.log('RESPONSE CODE' + results.response_code);
      }
    }).catch(err => {
      console.log(err);
    });

    if(token){
      api.dailyDigest.get()
      .then(res => {
        const results = res.data;
        console.log(results);
        if(results.response_code===200){
          console.log('RECOMMENDED ARTICLES ARE')
          console.log(results.articles)
          setRecommendedArticles(results.articles);
        } 
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
      })
    } else {
      api.dailyDigest.getPublic()
      .then(res=>{
        const results = res.data;
        console.log(results);
        if(results.response_code===200){
          console.log('RECOMMENDED ARTICLES ARE')
          console.log(results.articles)
          setRecommendedArticles(results.articles);
        } 
        setLoading(false);
      }).catch(err => console.error(err))
    }
  }, []);

  const formatDate = (dateString) => {
    var date = new Date(dateString);
    var month = date.toLocaleString('en-GB', {month: 'short'});
    //console.log(month);
    var day = date.getMonth();
    //console.log(day);
    var year = date.getFullYear();

    return(`${day} ${month} ${year}`)
  }
  console.log('Selected Index = ' + selectedIndex)
  console.log(recommendedArticles);

  // function next() {
  //   slider.slickNext();
  // }
  // function previous() {
  //   slider.slickPrev();
  // }

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

        {/* <div className={classes.tabArea}>
         
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor=""
              textColor=""
              centered
              style={{maxWidth:'100%', marginInline:30, paddingBlock:5, backgroundColor:'#e3f2fd',alignItems:'center'}}
            >
              
                <Tab disableRipple className={classes.individualTab} label={<span style={{fontWeight:fontWeight.featured}}>Career Growth</span>} />
                <Tab disableRipple className={classes.individualTab} label={<span style={{fontWeight:fontWeight.recommended}}>Job Searching</span>} />
                <Tab disableRipple className={classes.individualTab} label={<span style={{fontWeight:fontWeight.latest}}>Land a Job</span>} />
            </Tabs>
          </div> */}
           { loading 
            ? <CircularLoading/>
            : <div>
          <Grid container style={{padding:18}}>
              <Grid item xs={12} sm={6} style={{marginTop:'15px',}}>
                <Typography className={classes.sectionHeading}>
                  Recommended For You 
                </Typography>
                <Wrapper style={{}}>
                  <Slider {...largeCarouselSettings}>
                  {recommendedArticles.map((list,index) => (
                    <Page>
                    <Card className={classes.cardLarge} style={{boxShadow:'none'}}>
                      <CardActionArea href={list[0].link} target='._blank'>
                        <CardMedia
                          className={classes.mediaLarge}
                          image={list[0].imagelink}
                          title={list[0].title}
                        />
                      </CardActionArea>
                      <CardContent style={{height:'fit-content', paddingBottom:10}}>
                        <Grid container display='flex'>
                          <Grid item xs={12} container style={{}} direction='column' justify="space-between">
                            <Grid item>
                              <Typography style={{fontWeight:'bold', fontSize:12, textAlign:'left'}}>
                                  {list[0].jobtag}
                              </Typography>
                              <Typography className={classes.articleHeading} gutterBottom variant="body1">
                                {list[0].title}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} container style={{}} justify='space-between'>
                            <Grid item xs={7} style={{alignSelf:'center'}}>
                              <Typography style={{textAlign:'left', fontSize:11,}}>
                                Posted on: {formatDate(list[0].article_date)}
                              </Typography>
                            </Grid>
                            <Grid item xs={4} style={{alignSelf:'center'}}>
                              <Typography style={{fontSize:11,textAlign:'right'}}>
                                 {list[0].readtime} Min Read 
                              </Typography>
                            </Grid>
                            <Grid item xs={1}>
                              <IconButton
                                className={clsx(classes.expand, {
                                  [classes.expandOpen]: expanded,
                                })}
                                onClick={() => handleRecommendedExpandClick(index)}
                                aria-expanded={expanded}
                                aria-label="show more"
                                size='small'
                              >
                                <ExpandMoreIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Grid>
                      </CardContent>
                      <Collapse in={index===selectedRecommendedIndex ?expanded:false} timeout="auto" unmountOnExit>
                        <CardContent style={{paddingTop:5, paddingBottom:5}}>
                          <Typography className={classes.articleDescription} variant="body2" color="textSecondary" gutterBottom>
                            {list[0].bestparagraph}
                          </Typography>
                          <Typography variant='overline' style={{textAlign:'right'}}>
                            <span style={{paddingRight:'1%'}}>{list[0].tag1 ? `#${list[0].tag1}` :''}</span><span style={{paddingRight:'1%'}}>{list[0].tag2 ? `#${list[0].tag2}` :''}</span><span style={{paddingRight:'1%'}}>{list[0].tag3 ? `#${list[0].tag3}` :''}</span><span style={{paddingRight:'1%'}}>{list[0].tag4 ? `#${list[0].tag4}` :''}</span><span style={{paddingRight:'1%'}}>{list[0].tag5 ? `#${list[0].tag5}` :''}</span> 
                          </Typography>
                        </CardContent>
                      </Collapse>
                    </Card>
                    </Page>
                  ))}
                  </Slider>
                </Wrapper>
                </Grid>
            
            <Grid item xs={12} sm={6} className={classes.articleList}>
            <Typography className={classes.sectionHeading}>
              Latest
            </Typography>
              <List style={{paddingTop:0, width:'95%'}}>
                {articles.map((article,index) => {
                  if(index<=6){
                    return (
                      <Fragment>
                            <ListItem alignItems="flex-start">
                              <ListItemText>
                              <a href={article.link} target='._blank' style={{textDecoration:'none', color:'inherit'}}>
                                <Typography>
                                  <Box fontWeight='fontWeightBold' fontSize={12}>
                                    {article.jobtag}
                                  </Box>
                                </Typography>
                                <Typography className={classes.ListTitle} variant='h6' style={{}} gutterBottom>
                                  <Box>
                                    {article.title}
                                  </Box>
                                </Typography>
                                </a>
                                <Grid container justify='space-between'>
                                  <Grid item xs={7} style={{alignSelf:'center'}}>
                                    <Typography style={{textAlign:'left', fontSize:11}}>
                                      Posted on: {formatDate(article.article_date)}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={4} style={{textAlign:'right', alignSelf:'center'}}>
                                    <Typography style={{fontSize:11,}}>
                                        {article.readtime} Min Read
                                    </Typography>
                                  </Grid>
                                
                                  <Grid item xs={1}>
                                  <IconButton
                                    className={clsx(classes.expand, {
                                      [classes.expandOpen]: index === selectedIndex? expanded : false,
                                    })}
                                    onClick={() => handleExpandClick(index)}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                    size='small'
                                  >
                                    <ExpandMoreIcon />
                                  </IconButton>
                                  </Grid>
                                </Grid>
                                <Collapse in={index===selectedIndex?expanded:false} timeout="auto" unmountOnExit>
                                    <Typography className={classes.articleDescription} variant="body2" color="textSecondary" gutterBottom>
                                      {article.bestparagraph}
                                    </Typography>
                                    <Typography variant='overline' style={{textAlign:'center'}}>
                                      <span style={{paddingRight:'1%'}}>#{article.tag1}</span><span style={{paddingRight:'1%'}}>#{article.tag2}</span><span style={{paddingRight:'1%'}}>#{article.tag3}</span><span style={{paddingRight:'1%'}}>#{article.tag4}</span><span style={{paddingRight:'1%'}}>#{article.tag5}</span> 
                                    </Typography>
                                </Collapse>
                              </ListItemText>
                            </ListItem>
                            <Divider style={{marginLeft:15}}  component="li" />
                          </Fragment>
                          )
                        }
                      })}
                  </List> 
            </Grid>
          </Grid>
          <div style={{padding:18}}>
            <Typography className={classes.sectionHeading}>
                Job Searching
            </Typography>                 
            <Wrapper style={{marginInlineStart:15, marginInlineEnd:15, zIndex:0}}>
              <Slider {...miniCarouselSettings} >
                  {articles.map((article,index) => {
                    if(index > 6 && article.jobtag ==='SEARCH_JOB'){
                      return (
                        <Page>
                          <Card className={classes.cardSmall}>
                            <CardActionArea href={article.link} target='._blank'>
                              <CardMedia
                                className={classes.mediaSmall}
                                image={article.imagelink}
                                title={article.title}
                              />
                            </CardActionArea>
                            <CardContent style={{height:150}}>
                              <Grid container direction='column' justify="space-between" style={{height:'-webkit-fill-available'}}>
                                <Grid item xs={12}>
                                  <Typography style={{fontWeight:'bold', fontSize:12, textAlign:'left'}}>
                                    {article.jobtag}
                                  </Typography>
                                  <Typography className={classes.articleHeading} gutterBottom variant="body1" >
                                    {article.title}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} container direction='row' justify="space-between">
                                  <Grid item>
                                    <Typography style={{textAlign:'left', fontSize:11}}>
                                      Posted on: {formatDate(article.article_date)}
                                    </Typography>
                                  </Grid>
                                  <Grid item>
                                    <Typography style={{fontSize:11}}>
                                     {article.readtime} min read
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </CardContent>
                          </Card>
                        </Page>
                      )
                    }
                  })}
                </Slider>
              </Wrapper>
            </div>
    
          <div style={{padding:18}}>
            <Typography className={classes.sectionHeading}>
                Grow Your Career 
            </Typography>                 
            <Wrapper style={{marginInlineStart:15, marginInlineEnd:15, zIndex:0}}>
              <Slider {...miniCarouselSettings}>
                  {articles.map((article,index) => {
                    if(index > 6 && article.jobtag==="GROW_CAREER"){
                      return (
                        <Page>
                          <Card className={classes.cardSmall}>
                            <CardActionArea href={article.link} target='._blank'>
                              <CardMedia
                                className={classes.mediaSmall}
                                image={article.imagelink}
                                title={article.title}
                              />
                            </CardActionArea>
                            <CardContent style={{height:150}}>
                              <Grid container direction='column' justify="space-between" style={{height:'-webkit-fill-available'}}>
                                <Grid item xs={12}>
                                  <Typography style={{fontWeight:'bold', fontSize:12, textAlign:'left'}}>
                                    {article.jobtag}
                                  </Typography>
                                  <Typography className={classes.articleHeading} gutterBottom variant="body1" >
                                    {article.title}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} container direction='row' justify="space-between">
                                  <Grid item>
                                    <Typography style={{textAlign:'left', fontSize:11}}>
                                      Posted on: {formatDate(article.article_date)}
                                    </Typography>
                                  </Grid>
                                  <Grid item>
                                    <Typography style={{fontSize:11}}>
                                      {article.readtime} Min Read
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </CardContent>
                          </Card>
                        </Page>
                      )
                    }
                  })}
                </Slider>
              </Wrapper>
            </div>
            </div>
           }
    </Fragment>
    
  )
  
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