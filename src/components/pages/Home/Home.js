import React from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Row, Col, Button } from "reactstrap";

import "./Home.sass";
import groupImage from "../../../assets/images/group.svg";

const home = props => {
  const { history } = props;

  return (
    <div className="Home">
      <Jumbotron className="text-center">
        <img src={groupImage} className="mb-3" height="250" alt="Chama Group" />
        <h3 className="display-6">Welcome to Chama App</h3>
        <p className="lead">The smartest way to manage your Chama.</p>
        <hr className="my-4" />
        <p><Link to="/register">Register now</Link> and manage your Chama online?</p>
        <Row>
          <Col md="6" className="mb-2">
            <Button
              className="btn btn-primary btn-block btn-lg mr-2"
              onClick={() => { history.push("/register")}}
              role="button"
            >
              Register your Chama Now!
            </Button>
          </Col>
          <Col md="6">
            <Button
              className="btn btn-outline-primary btn-block btn-lg"
              onClick={() => { history.push("/login")}}
              role="button"
            >
              Login
            </Button>
          </Col>
        </Row>
      </Jumbotron>
    </div>
  );
};

export default home;
