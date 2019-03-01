import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import { Container } from "reactstrap";

import Header from "./components/ui/Header/Header";
import Home from "./components/pages/Home/Home";
import MerryGoRound from "./components/pages/MerryGoRound/MerryGoRound";
import Registration from "./components/pages/Registration/Registration";
import "./App.sass";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />

        <Container className="wrapper">
          <Switch>
            <Route exact path="/register" component={Registration} />
            <Route exact path="/merry-go-round" component={MerryGoRound} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Container>
      </div>
    );
  }
}

export default App;
