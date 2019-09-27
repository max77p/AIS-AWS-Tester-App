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
        devClick: false
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
        gettingApi: true,
        devClick:true
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
    return API.get("ais", "/aisdev");
  }

  renderStartingApiStatus() {
    const { startingApi, successApi, errorApi, userClick } = this.state.status;

    if (!startingApi && !successApi && !errorApi) {
      return <div class="col-sm-12">Waiting</div>;
    } else if (startingApi && !successApi && !errorApi) {
      return (
        <div class="col-sm-12">
          <i class="fas fa-spinner fa-spin"></i> <span>Initializing</span>
        </div>
      );
    } else if (!startingApi && successApi) {
      return (
        <div class="col-sm-12">
          <i class={`fas fa-check ${classes["auth__done"]}`}></i> Initialized
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

  renderButton() {
    if (!this.state.status.devClick) {
      return (
        <button
          type="button"
          class={`btn btn-primary ${classes["auth__btn"]}`}
          onClick={this.handleSubmit}
        >
          DEV
        </button>
      );
    }
    else{
      return (
        <button
          type="button"
          class={`btn btn-primary ${classes["auth__btn"]}`}
          onClick={this.handleSubmit}
          disabled
        >
          Test Complete. Check result.
        </button>
      );
    }
  }
  render() {
    return (
        <StatusContainer
          name="DEV AIS TEST"
          devClick={this.state.status.devClick}
          renderStartingApiStatus={this.renderStartingApiStatus()}
          renderSuccess={this.renderSuccess()}
          renderButton={this.renderButton()}
        />
    );
  }
}
