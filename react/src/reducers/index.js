const { combineReducers } = require('redux')
const games = require('./games')

module.exports = combineReducers({
    /*
    debug: (state = {}, action) => {
        console.log(action)
        return state
    },
    */
    Games: games
});