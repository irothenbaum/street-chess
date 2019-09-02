const {
    SYNC_GAME_DATA_ACTION,
    MAKE_MOVE_ACTION,
} = require('../constants/actionTypes')
const { combineReducers } = require('redux')

const initialState = combineReducers({
    game_id: undefined,
    game_mode_id: undefined,
    starting_position: undefined,
    moves_history: [],
    player_1: undefined,
    player_2: undefined,

    isSending: false,
    isLoading: false
})

function setActiveGame(state, gameId, gameModeId, player1, player2, startingPosition, currentPosition, moves) {
    return {
        ...state,
        game_id: gameId,
        game_mode_id: gameModeId,
        player_1: player1,
        player_2: player2,
        moves_history: moves,
        starting_position: startingPosition,
    }
}

function makeMove(state, move) {
    return {
        ...state,
        moves_history: [...state.moves_history, move]
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
                action.gameData.moves_history,
            )

        case MAKE_MOVE_ACTION:
            return makeMove(state, action.move)
    }

    return state
}