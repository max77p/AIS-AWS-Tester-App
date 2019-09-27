import React from "react";
import classes from "./LoaderButton.css";

export default ({
  isLoading, //loading state
  text, //text passed in
  loadingText, //loading text passed in
  className = "",
  disabled,
  ...props
}) => {
  console.log(disabled);
  console.log(isLoading)
  return (
    <button
      class="btn btn-lg btn-primary"
      type="submit"
      class={`btn btn-primary ${classes["LoaderButton"]} ${className}}`}
      disabled={disabled || isLoading} //if one is true then disabled will be set to true, if both are false then disabled will be set to false
      {...props}
    >
      {isLoading && <i class="fas fa-spinner"></i>}
      {!isLoading ? text : loadingText}
    </button>
    // <button
    // // disabled={false}
    //   type="button"
    //   class={`btn btn-primary ${classes["LoaderButton"]} ${className}}`}
    //   disabled //if one is true then disabled will be set to true, if both are false then disabled will be set to false
    //   {...props}
    // >
    //   {/* {isLoading && <i class="fas fa-spinner"></i>}
    //   {!isLoading ? text : loadingText} */}
    //   Login
    // </button>
  );
};
