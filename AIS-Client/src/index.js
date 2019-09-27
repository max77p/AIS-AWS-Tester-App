import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./Redux/store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Amplify from "aws-amplify";
import config from "./config";

import "./index.css";
import App from "./App";
// import async.js
const store = configureStore();
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  API: {
    endpoints: [
      {
        name: "ais",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      }
    ]
  }
});

ReactDOM.render(app, document.getElementById("root"));
