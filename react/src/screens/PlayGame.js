//const css = require('./PlayGame.scss')
const { loadGameData, applyMove } = require('../actions')
const React = require('react')
const { connect } = require('react-redux')
const GameStateObject = require('../../../helpers/gameObjects/gameState')

class PlayGame extends React.Component {
    constructor(props) {
        super(props)

        this.makeMove = this.makeMove.bind(this)
    }

    async componentDidMount() {
        await this.props.dispatchLoadGame()
        this.gameState = new GameStateObject(
            this.props.game_id,
            this.props.game_mode_id,
            this.props.player_1,
            this.props.player_2,
            this.props.starting_position,
            this.props.moves_history
        )
    }

    async makeMove(move) {
        await this.dispatchApplyMove(move)
    }

    render() {
        return (
            <div>
                <h2>Game</h2>
                <Game state={this.gameState} applyMove={this.makeMove} />
            </div>
        )
    }
}


// Connecting with Redux ---------------------------------

const mapStateToProps = (state) => ({
    game_id: state.ActiveGame.game_id,
    game_mode_id: state.ActiveGame.game_mode_id,
    player_1: state.ActiveGame.player_1,
    player_2: state.ActiveGame.player_2,
    starting_position: state.ActiveGame.starting_position,
    moves_history: state.ActiveGame.moves_history,

    isLoading: state.ActiveGame.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
    dispatchLoadGame: () => loadGameData(dispatch),
    dispatchApplyMove: (move) => applyMove(dispatch, move)
});


module.exports = connect(mapStateToProps, mapDispatchToProps)(PlayGame)