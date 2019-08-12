import React from "react";
import { connect } from "react-redux";
import * as gameActions from "../../redux/actions/gameActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import moment from 'moment';

class Statistics extends React.Component {

  componentDidMount() {
    this.props.actions
      .loadGames()
      .catch(err => console.log("Loading games failed " + err));
  }


  render() {
    return (
      <div className="table-container">
        <header className="table-header">
          <h2 className="table-header--title">Games Statistis </h2>
        </header>
        <div className="table-wrapper">
          <div className="row center-xs table-wrapper--header">
            <div className="col-xs-1">
              <h3>#</h3>
            </div>
            <div className="col-xs-2">
              <h3>Player one</h3>
            </div>
            <div className="col-xs-2">
              <h3>Player Two</h3>
            </div>
            <div className="col-xs-2">
              <h3>Winner</h3>
            </div>
            <div className="col-xs-4">
              <h3>Date</h3>
            </div>
          </div>
          {this.props.statistics.length > 0 &&
            this.props.statistics.map((game, index) => (
              <div key={game._id} className="row center-xs middle-xs table-content">
                <div className="col-xs-1">
                  <label>{index}</label>
                </div>
                <div className="col-xs-2">
                  <label>{game.playerOneId && game.playerOneId.name}</label>
                </div>
                <div className="col-xs-2">
                  <label>{game.playerTwoId && game.playerTwoId.name}</label>
                </div>
                <div className="col-xs-2">
                  <label>{game.playerWinnerId && game.playerWinnerId.name}</label>
                </div>
                <div className="col-xs-4">
                  <label>{game.createdOn && moment(game.createdOn).format('MMMM Do YYYY, h:mm:ss a')}</label>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

Statistics.propTypes = {
  actions: PropTypes.object.isRequired,
  statistics: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    statistics: state.game.statistics
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
)(Statistics);
