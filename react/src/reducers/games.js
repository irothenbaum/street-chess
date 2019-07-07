const {
    SYNC_GAME_MODES_ACTION,
    GAMES_IS_LOADING
} = require('../constants/actionTypes')
const activeGame = require('./activeGame')
const { combineReducers } = require('redux')

const initialState = combineReducers({
    models : {},
    modes: [],
    ActiveGame: activeGame,
    isLoading: false
})

function setGameModes(state, data) {
    return {...state, modes: data}
}

function setIsLoading(state, status) {
    return {...state, isLoading: status}
}

// Reducers should export a single function which takes the state object and the action that was dispatched
module.exports = function(state = initialState, action) {
    switch (action.type) {
        case SYNC_GAME_MODES_ACTION:
            return setGameModes(state, action.value);

        case GAMES_IS_LOADING:
            return setIsLoading(state, status)
    }

    return state
}