import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";

import { BrowserRouter, Route, Switch } from "react-router-dom";

export default class App extends Component {
  pageSize = 10;
  apiKey = process.env.REACT_APP_API_KEY;
  render() {
    return (
      <div className="">
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/general">
              <News
                key="general"
                pageSize={this.pageSize}
                country="in"
                category="general"
                apiKey={this.apiKey}
              />
            </Route>
            <Route exact path="/business">
              <News
                key="business"
                pageSize={this.pageSize}
                country="in"
                category="business"
                apiKey={this.apiKey}
              />
            </Route>
            <Route exact path="/entertainment">
              <News
                key="entertainment"
                pageSize={this.pageSize}
                country="in"
                category="entertainment"
                apiKey={this.apiKey}
              />
            </Route>
            <Route exact path="/science">
              <News
                key="science"
                pageSize={this.pageSize}
                country="in"
                category="science"
                apiKey={this.apiKey}
              />
            </Route>
            <Route exact path="/health">
              <News
                key="health"
                pageSize={this.pageSize}
                country="in"
                category="health"
                apiKey={this.apiKey}
              />
            </Route>
            <Route exact path="/sports">
              <News
                key="sports"
                pageSize={this.pageSize}
                country="in"
                category="sports"
                apiKey={this.apiKey}
              />
            </Route>
            <Route exact path="/technology">
              <News
                key="technology"
                pageSize={this.pageSize}
                country="in"
                category="technology"
                apiKey={this.apiKey}
              />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
