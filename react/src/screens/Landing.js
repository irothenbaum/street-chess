const css = require('./Landing.scss')
const { syncExampleAction } = require('../actions')
const React = require('react')
const { connect } = require('react-redux')
const GameSelector = require('../components/GameSelector')

class Landing extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatchExample()
    }

    render() {
        return (
            <div>
                <h2>Landing</h2>
                <GameSelector />
            </div>
        )
    }
}


// Connecting with Redux ---------------------------------

const mapStateToProps = (state) => ({
    exampleData: state.Example.data
});

const mapDispatchToProps = (dispatch) => ({
    dispatchExample: () => syncExampleAction(dispatch),
});


module.exports = connect(mapStateToProps, mapDispatchToProps)(Landing)