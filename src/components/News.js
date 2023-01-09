import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=4ca8050060df40a7b91172d6dce49e72&page=1&pageSize=20";
    let data = await fetch(url);
    let parsedData = await data.json(data);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }

  handleNextClick = async () => {
    if (Math.ceil(this.state.page + 1 > this.state.totalResults / 20)) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=4ca8050060df40a7b91172d6dce49e72&page=${
        this.state.page + 1
      }&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json(data);
      this.setState({ articles: parsedData.articles });
      this.setState({ page: this.state.page + 1 });
    }
  };

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=4ca8050060df40a7b91172d6dce49e72&page=${
      this.state.page - 1
    }&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json(data);
    this.setState({ articles: parsedData.articles });
    this.setState({ page: this.state.page - 1 });
  };

  render() {
    return (
      <div className="container my-3">
        <h2>NewsMonkey - Top Headlines</h2>

        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={!element.title ? "" : element.title.slice(0, 45)}
                  description={
                    !element.description ? "" : element.description.slice(0, 88)
                  }
                  imageUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://a57.foxnews.com/static.foxbusiness.com/foxbusiness.com/content/uploads/2022/12/0/0/TESLA-PRICES-e1672173644348.jpg?ve=1&tl=1"
                  }
                  newsUrl={element.url}
                ></NewsItem>
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            // disabled={}
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
