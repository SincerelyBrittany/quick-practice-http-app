import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import Raven from "raven-js";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

// Raven.config("@sentry.io", {
//   release: "0-0-0",
//   environment: "development-rest",
// }).install;

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
