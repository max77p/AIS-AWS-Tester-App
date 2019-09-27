import React, { Component } from "react";
import classes from "./Main.css";
import AuthPage from "./AuthPage";

export default () => {
  return <div className={`container ${classes["Home"]}`}><AuthPage/></div>
};
