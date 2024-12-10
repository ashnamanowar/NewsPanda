import React, { Component } from 'react'

export class NewsItem extends Component {


  render() {
    let {title,description, imageUrl, newsUrl, author, date}= this.props;
    return (
      <div className="my-3">
        <div className="card">
          <img src={!imageUrl ? "https://cdn.wccftech.com/wp-content/uploads/2024/12/Apple-custom-5G-modem.jpg" : imageUrl}
            onError={(e) => { 
              e.target.onerror = null; 
              e.target.src = "https://ak.picdn.net/shutterstock/videos/1418746/thumb/5.jpg";
            }}
            className="card-img-top" 
            alt="News"
 />
             <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small class="text-body-secondary">by {!author?"Unknown":author} on {date}</small></p>
                <a rel="noreferrer" href={newsUrl} className="btn btn-sn btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
