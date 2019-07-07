const {
    MAKE_MOVE_ACTION,
    IS_SENDING_ACTIVE_GAME_ACTION
} = require('../constants/actionTypes')
const {
    PUT_MAKE_MOVE,
} = require('../constants/endpoints')
const api = require('../../../helpers/api')

const applyMove = (gameId, move) => {
    return {
        type: MAKE_MOVE_ACTION,
        move: move,
        game_id: gameId
    }
}

const setIsSending = (status) => {
    return {
        type: IS_SENDING_ACTIVE_GAME_ACTION,
        status: status
    }
}

module.exports = {
    submitMakeMove: async (dispatch, gameId, move) => {
        dispatch(setIsSending(true))
        let response
        try {
            response = await api(PUT_MAKE_MOVE.replace(':game_id', gameId))
            dispatch(applyMove(gameId, move))
        } catch (e) {
            console.error(e)
            response = e
        }
        dispatch(setIsSending(false))
        return response
    },

    applyMove: (dispatch, gameId, move) => {
        dispatch(applyMove(gameId, move))
    }
}