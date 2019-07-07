const css = require('./currentUser.scss')
const {
    startNewGame,
    loadGameModes
} = require('../actions')
const {
    ROUTE_GAME
} = require('../constants/routes')
const React = require('react')
const { connect } = require('react-redux')
const LoadingSpinner = require('./LoadingSpinner')

class GameSelector extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatchLoadGameModes()
    }

    async startGame(gameModeId) {
        await this.props.dispatchStartNewGame(gameModeId)
        this.props.history.push(ROUTE_GAME.replace(':id', newGame.id))
    }

    render() {
        return this.props.isLoading ? <LoadingSpinner /> : (
            <ul className="game-selector">
                {this.props.modes.map(g => {
                    return (
                        <li onClick={() => this.startGame(g.id)}>
                            {g.label}
                        </li>
                    )
                })}
            </ul>
        )
    }
}




// Connecting with Redux ---------------------------------

const mapStateToProps = (state) => ({
    isLoading: state.Games.isLoading,
    modes: state.Games.modes
});

const mapDispatchToProps = (dispatch) => ({
    dispatchLoadGameModes: () => loadGameModes(dispatch),
    dispatchStartNewGame: (gameModeId) => startNewGame(dispatch, gameModeId),
});


module.exports = connect(mapStateToProps, mapDispatchToProps)(GameSelector)