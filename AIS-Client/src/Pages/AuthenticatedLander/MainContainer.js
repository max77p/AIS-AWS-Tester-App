import React, { Component } from "react";
import classes from "./Main.css";
import DevPage from "./DevPage";
import ProdPage from "./ProdPage";

export default () => {
  return <div className={`container ${classes["Home"]}`}><DevPage/><ProdPage/></div>
};
