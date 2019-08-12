import React from "react";
import { connect } from "react-redux";
import * as gameActions from "../../redux/actions/gameActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import RuleEngine from "../../components/ruleEngine/RuleEngine";
import _ from "lodash";

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.ruleEngine = new RuleEngine();
    this.ruleEngine.addRules("rock", "scissor");
    this.ruleEngine.addRules("scissor", "paper");
    this.ruleEngine.addRules("paper", "rock");

    this.state = {
      currentPlayer: 1,
      currentRound: 1,
      playPlayerOne: null,
      playPlayerTwo: null,
      rounds: []
    };
  }

  setRoundWinner = (playPlayerOne, playPlayerTwo) => {
    const moveWinner = this.ruleEngine.checkRules(playPlayerOne, playPlayerTwo);
    if (moveWinner === "draw") return null;
    if (moveWinner === playPlayerOne) return this.props.game.playerOneId;
    return this.props.game.playerTwoId;
  };

  setNewRound = (currentRound, round) => {
    const currentPlayer = 1;
    const playPlayerOne = null;
    const playPlayerTwo = null;
    currentRound++;
    let rounds = this.state.rounds;
    rounds.push(round);
    this.setState({
      currentPlayer,
      currentRound,
      playPlayerOne,
      playPlayerTwo,
      rounds
    }, () => {
      let winner = this.checkWinner();
      if (winner) {
        let game = {
          ...this.props.game,
          playerWinnerId: winner
        }
        this.props.actions
          .updateGame(game)
          .catch(err => console.log("Update game failed " + err));
      }
    });
  };

  checkWinner = () => {
    const rounds = _.groupBy(this.state.rounds, "playerWinner.name");
    let winner = null;
    _.forEach(rounds, (round, key) => {
      if (rounds[key].length === 3 && key !== "undefined") {
        winner = round[0].playerWinner;
      }
    });
    return winner;
  };

  handlePlay = (play, turn) => {
    event.preventDefault();
    let currentPlayer = turn === 1 ? 2 : 1;
    let currentRound = this.state.currentRound;
    let playPlayerOne = this.state.playPlayerOne;
    let playPlayerTwo = this.state.playPlayerTwo;

    switch (turn) {
      case 1:
        this.setState(
          {
            currentPlayer,
            playPlayerOne: play
          });
        break;
      case 2:
        playPlayerTwo = play
        this.setState({ currentPlayer, playPlayerTwo }, () => {
          if (turn === 2) {
            this.setNewRound(currentRound, {
              currentRound,
              playPlayerOne,
              playPlayerTwo,
              playerWinner: this.setRoundWinner(playPlayerOne, playPlayerTwo)
            });
          }
        }
        );
        break;
    }
  };

  handlePlayAgain = (event) => {
    event.preventDefault();
    this.props.actions.cleanGame();
    this.props.history.push("/");
  }

  render() {
    return (
      <>
        <div className="row center-xs">
          <div className="col-xs-6">
            <h2>Round #{this.state.currentRound}</h2>
            <h3>
              {this.state.currentPlayer === 1
                ? this.props.game.playerOneId.name
                : this.props.game.playerTwoId.name}
            </h3>
            <label>Select your move</label>
            <br />
            <div className="button-container">
              <button className="form-btn" type="button" disabled={this.checkWinner() || !this.props.game._id}
                onClick={() => {
                  this.handlePlay("rock", this.state.currentPlayer);
                }}>Rock</button>

              <button className="form-btn" type="button" disabled={this.checkWinner() || !this.props.game._id}
                onClick={() => {
                  this.handlePlay("paper", this.state.currentPlayer);
                }}>Paper</button>

              <button className="form-btn" type="button" disabled={this.checkWinner() || !this.props.game._id}
                onClick={() => {
                  this.handlePlay("scissor", this.state.currentPlayer);
                }}>Scissor</button>
            </div>
          </div>
          <div className="col-xs-6">
            <h2>Score</h2>
            <div className="row center-xs">
              <div className="col-xs-6">
                <h3>Round #</h3>
              </div>
              <div className="col-xs-6">
                <h3>Winner</h3>
              </div>
            </div>
            {
              this.state.rounds.length > 0 &&
              this.state.rounds.map(round => (
                <div key={round.currentRound} className="row center-xs">
                  <div className="col-xs-6">
                    <label>{round.currentRound}</label>
                  </div>
                  <div className="col-xs-6">
                    <label>{round.playerWinner ? round.playerWinner.name : 'Draw'}</label>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {
          this.checkWinner() &&
          <div className="row">
            <div className="col-xs 6 center-xs">
              <h1>The Winner is: {this.checkWinner() && this.checkWinner().name}</h1>
              <button className="form-btn" type="button"
                onClick={this.handlePlayAgain}>Play Again</button>
            </div>
          </div>
        }
      </>
    );
  }
}

Game.propTypes = {
  actions: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    game: state.game.currentGame
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
)(Game);
