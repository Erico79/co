import React, { Component } from 'react';
import { 
  Container,
  Jumbotron
} from "reactstrap";

import Header from "./components/ui/Header/Header";
import group from './assets/images/group.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        
        <Container>
          <Jumbotron className="text-center">
            <img src={group} height="350" alt="Chama Group" />
            <h1 class="display-4">Welcome to Chama App</h1>
            <p class="lead">This is a platform for Chamas</p>
            <hr class="my-4"/>
            <p>Want to Register and move your Chama online?</p>
            <a className="btn btn-primary btn-lg" href="/register" role="button">Register your Chama Now!</a>
          </Jumbotron>
        </Container>
      </div>
    );
  }
}

export default App;
