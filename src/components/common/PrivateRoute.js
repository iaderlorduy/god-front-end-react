import React from "react";
import {
  Route,
  Redirect,
} from "react-router-dom";
import PropTypes from "prop-types";

function PrivateRoute({ condition: condition, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        condition ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          )
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  condition: PropTypes.any
}

export default PrivateRoute;