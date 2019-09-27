import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Auth } from "aws-amplify";
// require('dotenv').config()

import classes from "./App.css";
import ClientRoutes from "./ClientRoutes/Routes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    this.setState({ isAuthenticating: false });
  }
  

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  handleLogout = async event => {
    await Auth.signOut();
    this.userHasAuthenticated(false);
  }
  

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating &&
      <div className={`container ${classes["app-main-container"]}`}>
        <nav class="navbar  navbar-expand-lg navbar-light bg-light">
          <Link to="/">
            <a class="navbar-brand" href="#">
              AIS-TEST
            </a>
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${
              classes["navbar-signlog-container"]
            }`}
            id="navbarNavAltMarkup"
          >
            <div class="navbar-nav">
              {this.state.isAuthenticated ? (
                <Link to="#" onClick={this.handleLogout}>
                  <a class="nav-item nav-link" href="#">
                    SignOut
                  </a>
                </Link>
              ) : (
                <Link to="/login">
                  <a class="nav-item nav-link" href="#">
                    Login
                  </a>
                </Link>
              )}
            </div>
          </div>
        </nav>

        <ClientRoutes test="testing" childProps={childProps} />
      </div>
    );
  }
}

export default App;
