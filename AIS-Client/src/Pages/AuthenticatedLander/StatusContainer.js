import React, { Component, Fragment } from "react";
import classes from "./Main.css";

export default (props) => {
console.log(props.devClick);
console.log(props.prodClick);
  return (
    <Fragment>
      <div class={`row ${classes["auth__main"]}`}>
        {/* <button
          type="button"
          class={`btn btn-primary ${classes["auth__btn"]}`}
          onClick={props.handleSubmit}
        >
          {props.btnName}
        </button> */}
        {props.renderButton}
        <div class={`col-sm-12 ${classes["auth__title"]}`}>{props.name}</div>
      </div>

      <div class={`row ${classes["auth__body"]}`}>
        {props.renderStartingApiStatus}
        {props.renderSuccess}
      </div>
    </Fragment>
  );
};