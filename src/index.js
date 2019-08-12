import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import "./theme/index.scss";
import configureSore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";

const store = configureSore();

render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById("app")
);
