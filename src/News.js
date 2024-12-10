import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {

    constructor(){
        super();
        console.log("I am a constructor from news component");
        this.state={
            articles:[],
            loading:false,
            page:1
        }
    }

    async componentDidMount(){
        let url=`https://newsapi.org/v2/top-headlines?country=us&apiKey=3dcc616655b04623ae6576d4b1a2a0bd&page=1&pageSize=${this.props.pageSize}`
        let data= await fetch(url);
        let parsedData=await data.json()
        console.log(parsedData);
        this.setState({articles:parsedData.articles, totalArticles: parsedData.totalResults});
    }   

    handlePreviousClick=async ()=>{
        console.log("Previous");

        let url=`https://newsapi.org/v2/top-headlines?country=us&apiKey=3dcc616655b04623ae6576d4b1a2a0bd&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        let data= await fetch(url);
        let parsedData=await data.json()
        console.log(parsedData);
        this.setState({
            page: this.state.page-1,
            articles:parsedData.articles
        })
    }

    

    handleNextClick = async () => {
        console.log("Next");
        if (this.state.page + 1 > Math.ceil(this.state.totalResults /this.props.pageSize)) {
            return;
        }
        else{
            let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=3dcc616655b04623ae6576d4b1a2a0bd&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
            });
    }
    };


  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>NewsPanda- Top headlines</h1>
        <div className='row'>
        {this.state.articles.map((element)=>{
            return <div className='col-md-4' key={element.url}>
            <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}/>
        </div>
        })}

        </div>
        <div className='container'>
        <div className="d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
        </div>
      </div>
    )
  }
}
