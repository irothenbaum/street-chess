const { startNewGame, loadGameModes } = require('./games')
const { submitMakeMove, applyMove } = require('./activeGame')

module.exports = {
    startNewGame,
    loadGameModes,

    submitMakeMove,
    applyMove,
};