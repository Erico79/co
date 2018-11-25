import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import { Container } from "reactstrap";

import Header from "./components/ui/Header/Header";
import Home from "./components/pages/Home/Home";
import MerryGoRound from "./components/pages/MerryGoRound/MerryGoRound";
import "./App.css";

class App extends Component {
  loadComponent;

  render() {
    return (
      <div className="App">
        <Header />

        <Container>
          <Switch>
            <Route exact path="/merry-go-round" component={MerryGoRound} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Container>
      </div>
    );
  }
}

export default App;
