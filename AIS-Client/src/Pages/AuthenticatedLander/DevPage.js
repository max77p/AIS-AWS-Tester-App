import React, { Component, Fragment } from "react";
import { API } from "aws-amplify";
import StatusContainer from "./StatusContainer";
import classes from "./Main.css";

export default class AuthPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      status: {
        startingApi: false,
        loadingApi: false,
        gettingApi: false,
        successApi: false,
        errorApi: false,
        userClick: 0
      }
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState(prevState => ({
      status: {
        ...prevState.status,
        userClick: 1,
        startingApi: true,
        loadingApi: true,
        gettingApi: true
      }
    }));

    try {
      let data = await this.getAis();
      console.log(data);
      this.setState(prevState => ({
        status: {
          ...prevState.status,
          startingApi: false,
          successApi: true
        }
      }));
    } catch (e) {
      alert(e);
      this.setState(prevState => ({
        status: {
          ...prevState.status,
          startingApi: false,
          errorApi: true
        }
      }));
    }
  };

  getAis() {
    console.log("test");
    return API.post("ais", "/ais", { body: "test" });
  }

  renderStartingApiStatus() {
    const { startingApi, successApi, errorApi, userClick } = this.state.status;

    if (!startingApi && !successApi && !errorApi) {
      return <div class="col-sm-12">Waiting</div>;
    } else if (startingApi && !successApi && !errorApi) {
      return (
        <div class="col-sm-12">
          <i class="fas fa-spinner fa-spin"></i> <span>Starting</span>
        </div>
      );
    } else if (!startingApi && successApi) {
      return (
        <div class="col-sm-12">
          <i class={`fas fa-check ${classes["auth__done"]}`}></i> Done Starting
        </div>
      );
    } else if (!startingApi && errorApi) {
      return <div class="col-sm-12">Could not complete</div>;
    }
  }

  renderSuccess() {
    const { successApi, errorApi } = this.state.status;
    if (successApi) {
      return (
        <div class="col-sm-12">
          <i class={`fas fa-check ${classes["auth__success"]}`}></i> Success!
        </div>
      );
    } else if (errorApi) {
      return (
        <div class="col-sm-12">
          <i class={`fas fa-check ${classes["auth__error"]}`}></i>{" "}
          <span>Error!</span>
        </div>
      );
    }
  }
  render() {
    return (
        <StatusContainer
          handleSubmit={this.handleSubmit}
          btnName="DEV"
          name="DEV AIS TEST"
          renderStartingApiStatus={this.renderStartingApiStatus()}
          renderSuccess={this.renderSuccess()}
        />
    );
  }
}
