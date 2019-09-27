import React from "react";
import { Route, Redirect } from "react-router-dom";

export default ({ component: C, props: cProps, ...rest }) => {
    console.log(C)
    console.log(cProps)
    console.log(rest)
    return (
        <Route
          {...rest}
          render={props => console.log(props)||
            cProps.isAuthenticated ? (
              <C {...props} {...cProps} />
            ) : (
              <Redirect
                to={`/login?redirect=${props.location.pathname}`}
              />
            )
          }
        />
      );
}
