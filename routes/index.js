const express = require('express')
const auth = require('../config/auth')
const WebpackStats = require('../react/webpack-stats.json')
const TwigRender = require('../helpers/twigRender')
const asyncHandler = require('express-async-handler')
const respondsWithJSON = require('../middlewares/respondsWithJSON')

const router = express.Router()

// TODO: Refactor with latest versions of express-react-base

router.get('/example', asyncHandler(async function(req, res, next){
    res.json([
        'some', 'example', 'data'
    ])
}))

// Load our controllers here
router.get('/games', (req, res, next) => {
    TwigRender(res, 'game', {
        // on Dev, we don't have a bundle hash so we need to bust the client cache with a timestamp
        appFile: WebpackStats.chunks.main[0].name + ( auth.environment === 'development'
            ? ( '?t=' + Date.now() )
            : '')
    })
})

router.post('/games/create', respondsWithJSON, asyncHandler(async (req, res, next) => {
    // TODO: do something relating to starting a new game and return the game data

    res.json({
        id: 123123
    })
}))

router.put('/games/:game_id/move', respondsWithJSON, asyncHandler(async (req, res, next) => {
    // TODO: use the socket to report the move to the other player
}))

// Handle root route
router.get('/', (req, res) => {
    TwigRender(res, 'landing')
})

module.exports = router