import React, { useState, useEffect } from 'react'
import axios from 'axios'

function ArticleView( ) {

    const [article, setArticle] = useState();

    useEffect(() => {
        // const catIds = getCategories();
        getArticle(setArticle);
        
    },[])

    console.log(article);

    if(article){
        return (
            <div className="Article">
                <br/>
                <h2>{article.title.rendered}</h2>
                <div className="">
                    <a href={article.link}>
                        <img src={article.acf.carousel_images[0].sizes["medium_large"]} />
                    </a>  
                </div>
                <div className="">
                    <p>{article.acf.seo_meta_description}</p>
                    <br/>
                    <p>Find Out More: </p>
                    <a href={article.acf["cta-url"]} style={{textDecoration: 'none', color: 'black'}}>{article.acf["text_-_hyperlinked"]}</a>
                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
    
}

function getArticle(setArticle){
    
    //get articles from backend 
    
        axios.get("https://content.mycareersfuture.sg/wp-json/wp/v2/posts?per_page=10") //insert Call to backend
        .then(res=>{
            const response = res.data;
            console.log(response);
            setArticle(response[1]);
        })
    
}

function getCategories (){
    var categoryIds = [];
    axios.get('https://content.mycareersfuture.sg/wp-json/wp/v2/categories')
    .then(res => {
        const results = res.data;
        for (let i=0;i<results.length;i++) {
            console.log(results[i].id + "\n" + results[i].name + "\n" + results[i].link)
            categoryIds.push(results[i].id);
        }
    })

    console.log(categoryIds);
    return categoryIds;
}

export default ArticleView;