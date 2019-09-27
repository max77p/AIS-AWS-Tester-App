import React, { Component, Fragment } from "react";
import { API } from "aws-amplify";
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
        doneAPI: false
      }
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    setTimeout(() => {
      this.setState(prevState => ({
        status: {
          ...prevState.status,
          startingAPI: true
        }
      }));
    }, 1000);
    setTimeout(() => {
      this.setState(prevState => ({
        status: {
          ...prevState.status,
          loadingAPI: true
        }
      }));
    }, 2000);

    try {
      let data = await this.getAis();
      console.log(data);
      // setTimeout(()=>{
      this.setState(prevState => ({
        status: {
          ...prevState.status,
          doneAPI: true
        }
      }));
      // }, 3000);
    } catch (e) {
      alert(e);
      // this.setState(prevState => ({
      //   status: {
      //     ...prevState.status,
      //     start: true,
      //     api: true
      //   },
      //   done: {
      //     ...prevState.done,
      //     done: false
      //   }
      // }));
    }
  };

  getAis() {
    console.log("test");
    return API.post("ais", "/ais", { body: "test" });
  }

  render() {
    return (
      <Fragment>
        <div class={`row ${classes["auth__main"]}`}>
          <button
            type="button"
            class={`btn btn-primary ${classes["auth__btn"]}`}
            onClick={this.handleSubmit}
          >
            DEV
          </button>
          <div class={`col-sm-12 ${classes["auth__title"]}`}>DEV AIS TEST</div>
        </div>

        <div class={`row ${classes["auth__main"]}`}>
          <div class="col-sm-4">Waiting</div>
          <div class="col-sm-4">Waiting</div>
          <div class="col-sm-4">Waiting</div>
        </div>
      </Fragment>
    );
  }
}
