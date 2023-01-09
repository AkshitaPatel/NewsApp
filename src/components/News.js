import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  async update() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json(data);

    this.setState({
      articles: parsedData.articles,
      page: this.state.page,
      loading: false,
    });
  }

  async componentDidMount() {
    this.update();
  }

  handleNextClick = async () => {
    if (Math.ceil(this.state.page + 1 > this.state.totalResults / 20)) {
    } else {
      this.setState({ page: this.state.page + 1 });
    }
  };

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.update();
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center" style={{ margin: "3px" }}>
          NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)}
          Headlines
        </h2>
        {this.state.loading && <Spinner />}

        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={!element.title ? "" : element.title.slice(0, 45)}
                    description={
                      !element.description
                        ? ""
                        : element.description.slice(0, 88)
                    }
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://a57.foxnews.com/static.foxbusiness.com/foxbusiness.com/content/uploads/2022/12/0/0/TESLA-PRICES-e1672173644348.jpg?ve=1&tl=1"
                    }
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt.slice(0, 10)}
                    source={element.source.name}
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
            disabled={Math.ceil(
              this.state.page + 1 >
                this.state.totalResults / this.props.pageSize
            )}
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
