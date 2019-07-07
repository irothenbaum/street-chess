const {
    SYNC_GAME_DATA_ACTION,
    MAKE_MOVE_ACTION,
} = require('../constants/actionTypes')
const activeGame = require('./activeGame')
const { combineReducers } = require('redux')
const { PLAYER_ONE, PLAYER_TWO } = require('../constants/modelStates')

const initialState = combineReducers({
    id: undefined,
    game_mode_id: undefined,
    starting_position: undefined,
    current_position: undefined,
    moves: [],
    starting_player: PLAYER_ONE,
    player_1: undefined,
    player_2: undefined,
    player_on_move: PLAYER_ONE,

    isSending: false,
    isLoading: false
})

function setActiveGame(state, gameId, gameModeId, player1, player2, startingPosition, currentPosition, moves, startingPlayer, playerOnMove) {
    return {
        ...state,
        id: gameId,
        game_mode_id: gameModeId,
        player_1: player1,
        player_2: player2,
        moves: moves,
        starting_position: startingPosition,
        current_position: currentPosition,
        starting_player: startingPlayer,
        player_on_move: playerOnMove
    }
}

function makeMove(state, move) {
    return {
        ...state,
        player_on_move: state.player_on_move === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE,
        moves: [...state.moves, move]
    }
}

// Reducers should export a single function which takes the state object and the action that was dispatched
module.exports = function(state = initialState, action) {
    switch (action.type) {
        case SYNC_GAME_DATA_ACTION:
            return setActiveGame(
                state,
                action.gameData.id,
                action.gameData.game_mode_id,
                action.gameData.player_1,
                action.gameData.player_2,
                action.gameData.starting_position,
                action.gameData.current_position,
                action.gameData.moves,
                action.gameData.starting_player,
                action.gameData.player_on_move
            )

        case MAKE_MOVE_ACTION:
            return makeMove(state, action.move)
    }

    return state
}