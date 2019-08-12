import gameReducer from "./gameReducer";
import * as actions from "../actions/gameActions";

it("should add game when passed CREATE_GAME_SUCCESS", () => {
  // arrange
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

  const newGame = {
    playerOneId: {
      name: "Carlos",
    },
    playerTwoId: {
      name: "Juan",
    },
  };

  const action = actions.createGameSuccess(newGame);

  // act
  const newState = gameReducer(initialState, action);

  // assert
  expect(newState.currentGame.playerOneId.name).toEqual("Carlos");
  expect(newState.currentGame.playerTwoId.name).toEqual("Juan");
});

it("should update game when passed UPDATE_GAME_SUCCESS", () => {
  // arrange
  const initialState = {
    statistics: [],
    currentGame: {
      _id: '5d50bee9bc7b3b05d4490dee',
      playerOneId: {
        _id: '5d50bee9bc7b3b05d4490dec',
        name: 'Juan',
      },
      playerTwoId: {
        _id: '5d50bee9bc7b3b05d4490ded',
        name: 'Camilo',
      },
    }
  }

  const game = {
    _id: '5d50bee9bc7b3b05d4490dee',
    playerOneId: {
      _id: '5d50bee9bc7b3b05d4490dec',
      name: 'Juan',
    },
    playerTwoId: {
      _id: '5d50bee9bc7b3b05d4490ded',
      name: 'Camilo',
    },
    playerWinnerId: {
      _id: '5d50bee9bc7b3b05d4490ded',
      name: 'Camilo',
    }
  };
  const action = actions.updateGameSuccess(game);

  // act
  const newState = gameReducer(initialState, action);
  const updatedGame = newState.currentGame;
  const untouchedPropery = newState.currentGame.playerOneId;

  // assert
  expect(updatedGame.playerWinnerId.name).toEqual("Camilo");
  expect(untouchedPropery.name).toEqual("Juan");
});
