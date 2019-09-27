import React, { Component } from "react";

import { API } from "aws-amplify";

import classes from "./Landing.css";

export default class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }


  renderLander() {
    return (
      <div className={classes["lander"]}>
        <h1>AIS-TESTER</h1>
        <p>Login To Test</p>
      </div>
    );
  }


  render() {
    return (
      <div className={classes["Home"]}>
        {this.renderLander()}
      </div>
    );
  }
}
