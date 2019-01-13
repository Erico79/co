import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
} from "reactstrap";

import "./Header.sass";
import logo from "../../../assets/images/logo.svg";

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      authenticated: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentWillReceiveProps() {
    this.setState({isOpen: false});
  }

  render() {
    const { history } = this.props;


    return (
      <div className="Header">
        <Navbar fixed="top" color="dark" dark expand="md">
          <Container>
          <NavbarBrand href="#" onClick={() => history.push("/")}>
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Chama App Logo"
            />{" "}
            Chama App
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  onClick={() => {
                    history.push("/register");
                  }}
                >
                  Register your Chama
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  onClick={() => {
                    history.push("/merry-go-round");
                  }}
                >
                  Merry go Round
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <i className="fa fa-user text-light" />
                </DropdownToggle>
                {this.state.authenticated ? (
                  <DropdownMenu right>
                    <DropdownItem>Profile</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Sign Out of Chama App</DropdownItem>
                  </DropdownMenu>
                ) : (
                  <DropdownMenu right>
                    <DropdownItem
                      onClick={() => {
                        history.push("/register");
                      }}
                    >
                      Register
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Login</DropdownItem>
                  </DropdownMenu>
                )}
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

Header.propType = {
  history: PropTypes.shape().required
};

export default withRouter(Header);
