import React from "react";
import { connect } from "react-redux";
import * as gameActions from "../../redux/actions/gameActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { unset } from 'lodash';
import PlayersForm from './PlayersForm'

class HomePage extends React.Component {
  state = {
    game: {
      playerOneName: "",
      playerTwoName: ""
    },
    errors: {}
  };

  setErrors = (errors) => {
    this.setState({ errors });
  }

  formIsValid = () => {
    const { playerOneName, playerTwoName } = this.state.game;
    const errors = {};

    if (!playerOneName) errors.playerOneName = "Player one name is required.";
    if (!playerTwoName) errors.playerTwoName = "Player two name is required";

    this.setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  inputIsValid = (name, value) => {
    const errors = this.state.errors;
    if (!value) {
      errors[name] = "this field is required.";
    }
    else {
      unset(errors, name);
    }
    this.setErrors(errors);
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    const game = { ...this.state.game, [name]: value };
    this.setState({ game });
  };

  handleBlur = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.inputIsValid(name, value);
  }

  handleSubmit = event => {
    event.preventDefault();
    if (!this.formIsValid()) return;
    this.props.actions
      .createGame(this.state.game)
      .then(() => this.props.history.push("/game"))
      .catch(err => console.log("Create game failed " + err));
  };

  render = () => (
    <>
      <div className="row center-xs middle-xs">
        <div className="col-xs-6">
          <h2> Enter Players Names </h2>
          <PlayersForm
            game={this.state.game}
            onSubmit={this.handleSubmit}
            errors={this.state.errors}
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
          />
        </div>
      </div>
    </>
  );
}

HomePage.propTypes = {
  actions: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    game: state.game
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(gameActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
