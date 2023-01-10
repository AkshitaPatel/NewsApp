import React from "react";
import NewsItem from "./NewsItem";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

const News = (props) => {
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(false);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState(0);

  // document.title = `${capitalizeFirstLetter(
  //   props.category
  // )} - NewsMonkey`;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const update = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setloading(true);
    let data = await fetch(url);
    let parsedData = await data.json(data);
    setarticles(parsedData.articles);
    settotalResults(parsedData.totalResults);
    setloading(false);
  };

  useEffect(() => {
    update();
  }, []);

  const handleNextClick = async () => {
    if (Math.ceil(page + 1 > totalResults / 20)) {
    } else {
      setpage(page + 1);
      update();
    }
  };

  const handlePrevClick = async () => {
    setpage(page - 1);
    update();
  };

  return (
    <div className="container my-3">
      <h2 className="text-center" style={{ margin: "3px" }}>
        NewsMonkey - Top {capitalizeFirstLetter(props.category)}
        Headlines
      </h2>
      {loading && <Spinner />}

      <div className="row">
        {!loading &&
          articles.map((element) => {
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
          disabled={page <= 1}
          className="btn btn-dark"
          onClick={handlePrevClick}
        >
          &larr; Previous
        </button>
        <button
          type="button"
          disabled={Math.ceil(page + 1 > totalResults / props.pageSize)}
          className="btn btn-dark"
          onClick={handleNextClick}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};
News.defaultProps = {
  country: "in",
  pageSize: 5,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
