const { startNewGame, loadGameModes, loadGameData } = require('./games')
const { submitMakeMove, applyMove } = require('./activeGame')

module.exports = {
    startNewGame,
    loadGameModes,
    loadGameData,

    submitMakeMove,
    applyMove,
};