const React = require('react')
const { connect } = require('react-redux')
const GameSelector = require('../components/GameSelector')

class Play extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <h2>Play New Game</h2>
                <GameSelector />
            </div>
        )
    }
}


// Connecting with Redux ---------------------------------

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});


module.exports = connect(mapStateToProps, mapDispatchToProps)(Play)