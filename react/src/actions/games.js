const {
    SYNC_GAME_DATA_ACTION,
    SYNC_GAME_MODES_ACTION,
} = require('../constants/actionTypes')
const {
    POST_START_NEW_GAME,
    GET_EXISTING_GAME
} = require('../constants/endpoints')
const api = require('../../../helpers/api')

const syncGameData = (data) => {
    return {
        type: SYNC_GAME_DATA_ACTION,
        gameData: data
    }
}

export const setGameModesData = (data) => {
    return {
        type: SYNC_GAME_MODES_ACTION,
        modes: data
    }
}

module.exports = {
    loadGameModes: async (dispatch) => {
        // TODO: Load from server
        dispatch(setGameModesData([
            {
                id: 'normal',
                label: 'Normal',
                position: []
            }
        ]))
    },
    startNewGame: async (dispatch, gameModeId) => {
        try {
            let response = await api.post(POST_START_NEW_GAME, {
                mode_id: gameModeId
            })
            dispatch(syncGameData(response.data))
        } catch (e) {
            console.error(e)
        }
    },

    loadGameData: async (dispatch, gameId) => {
        try {
            let response = await api.get(GET_EXISTING_GAME.replace(':game_id', gameId))
            dispatch(syncGameData(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}