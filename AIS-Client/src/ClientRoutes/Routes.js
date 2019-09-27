import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Landing from "../Pages/Landing/Landing";
import NotFound from "../containers/NotFound/NotFound";
import AppliedRoute from "../components/AppliedRoute";
import AuthenticatedRoute from "../components/AuthenticatedRoute";
import UnauthenticatedRoute from "../components/UnauthenticatedRoute";
import AuthContainer from "../Pages/AuthenticatedLander/AuthContainer";


export default ({childProps}) => {
  console.log(childProps);

  return (
    <Switch>
      <AppliedRoute path="/" exact component={Landing} props={childProps} />
      <UnauthenticatedRoute
        path="/login"
        exact
        component={Login}
        props={childProps}
      />
     
      <AuthenticatedRoute
        path="/auth/home"
        exact
        component={AuthContainer}
        props={childProps}
      />

      {/* Finally, catch all unmatched routes */}
      <Route component={NotFound} />
    </Switch>
  );
};
