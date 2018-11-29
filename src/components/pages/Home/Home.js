import React from "react";
import { Jumbotron } from "reactstrap";

import "./Home.css";
import groupImage from "../../../assets/images/group.svg";

const home = () => {
  return (
    <div className="Home">
      <Jumbotron className="text-center">
        <img src={groupImage} height="300" alt="Chama Group" />
        <h1 className="display-6">Welcome to Chama App</h1>
        <p className="lead">This is a platform for Chamas</p>
        <hr className="my-4" />
        <p>Want to Register and move your Chama online?</p>
        <a className="btn btn-primary btn-lg mr-2" href="/register" role="button">
          Register your Chama Now!
        </a>&nbsp;
        <a className="btn btn-outline-primary btn-lg" href="/register" role="button">
          Login
        </a>
      </Jumbotron>
    </div>
  );
};

export default home;
