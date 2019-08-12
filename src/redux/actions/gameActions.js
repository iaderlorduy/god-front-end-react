import * as types from "./actionTypes";
import * as gameApi from "../../api/gameApi";

export function addRounToGame(round) {
  return { type: types.ADD_ROUND_TO_GAME, round };
}

export function loadGameSuccess(games) {
  return { type: types.LOAD_GAMES_SUCCESS, games };
}

export function createGameSuccess(game) {
  return { type: types.CREATE_GAME_SUCCESS, game };
}

export function updateGameSuccess(game) {
  return { type: types.UPDATE_GAME_SUCCESS, game };
}

export function cleanGame() {
  return { type: types.CLEAN_GAME };
}

export function loadGames() {
  return function (dispatch) {
    return gameApi
      .getGames()
      .then(games => {
        dispatch(loadGameSuccess(games));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function createGame(game) {
  return function (dispatch) {
    return gameApi
      .createOrUpdateGame(game)
      .then(game => {
        dispatch(createGameSuccess(game));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function updateGame(game) {
  return function (dispatch) {
    return gameApi
      .createOrUpdateGame(game)
      .then(game => {
        dispatch(updateGameSuccess(game))
      })
      .catch(error => {
        throw error;
      });
  };
} 