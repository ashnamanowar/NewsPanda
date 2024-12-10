import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import TopLoadingBar from 'react-top-loading-bar';

export default class News extends Component {

    static defaultProps = {
        country: "us",
        pageSize: 8,
        category: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props) {
        super(props);
        console.log("I am a constructor from news component");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            progress: 0 
        }
        document.title = this.props.category;
    }


    async componentDidMount() {
        this.setState({ progress: 10, loading: true }); 
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cdad64080a1d4ec2adfee9d6161c2da4&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalArticles: parsedData.totalResults,
            loading: false,
            progress: 100 
        });
        this.props.setProgress(100); 
    }


    async componentDidUpdate(prevProps) {

        if (this.props.category !== prevProps.category) {
            console.log('Category changed, fetching new data');
            this.setState({ page: 1, loading: true, progress: 10 }); 

            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cdad64080a1d4ec2adfee9d6161c2da4&page=1&pageSize=${this.props.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                articles: parsedData.articles,
                totalArticles: parsedData.totalResults,
                loading: false,
                progress: 100 
            });
            this.props.setProgress(100);
        }
    }

    handlePreviousClick = async () => {
        console.log("Previous");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cdad64080a1d4ec2adfee9d6161c2da4&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true, progress: 10 }); 
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false,
            progress: 100 
        });
        this.props.setProgress(100);
    }

    handleNextClick = async () => {
        console.log("Next");
        if (this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize)) {
            return;
        }
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cdad64080a1d4ec2adfee9d6161c2da4&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true, progress: 10 });  
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            loading: false,
            progress: 100 
        });
        this.props.setProgress(100); 
    };

    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center' style={{marginTop:"90px"}}>NewsPanda-{(this.props.category)} headlines</h1>
                <TopLoadingBar color="#f11946" height={2} progress={this.state.progress} />
                {this.state.loading && <Spinner />}
                <div className='row'>
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className='col-md-4' key={element.url}>
                            <NewsItem
                                title={element.title ? element.title : ""}
                                description={element.description ? element.description : ""}
                                imageUrl={element.urlToImage}
                                newsUrl={element.url}
                                author={element.author}
                                date={element.publishedAt}
                            />
                        </div>
                    })}
                </div>
                <div className='container'>
                    <div className="d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>
                </div>
            </div>
        )
    }
}
