import * as types from "../actions/actionTypes";

const initialState = {
  statistics: [],
  currentGame: {
    playerOneId: {
      name: "",
    },
    playerTwoId: {
      name: "",
    },
  }
};

const setRound = (state, round) => {
  let rounds;
  if (state.currentGame.rounds) {
    rounds = [...state.currentGame.rounds, round]
  } else { rounds = [round]; }
  let newState = {
    ...state,
    currentGame: {
      ...state.currentGame,
      rounds: rounds
    }
  };
  return newState;
};

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_GAME_SUCCESS:
      return { ...state, currentGame: action.game };
    case types.UPDATE_GAME_SUCCESS:
      return { ...state, currentGame: action.game };
    case types.LOAD_GAMES_SUCCESS:
      return { ...state, statistics: action.games };
    case types.ADD_ROUND_TO_GAME:
      return setRound(state, action.round);
    case types.CLEAN_GAME:
      return initialState;
    default:
      return state;
  }
}
