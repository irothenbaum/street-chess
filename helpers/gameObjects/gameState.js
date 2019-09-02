const Move = require('./move')
const Piece = require('./piece')
const Square = require('./square')
const Player = require('./player')

// defining the structure of a game state object
class GameState {
    /**
     * @param {string} id
     * @param {string} gameModeId
     * @param {Player} player1
     * @param {Player} player2
     * @param {Array<Piece>} startingPosition
     * @param {Array<Move>} movesHistory
     */
    constructor(
        id,
        gameModeId,
        player1,
        player2,
        startingPosition,
        movesHistory,
    ) {
        this.id = id
        this.game_mode_id = gameModeId
        this.player_1 = player1
        this.player_2 = player2
        this.starting_position = startingPosition
        this.moves_history = movesHistory || []

        // we'll calculate the current_position on our first call to getCurrentPosition()
        this._current_position = null
        this._captured_pieces = []
    }

    /**
     * @returns {string}
     */
    getColorOnMove() {
        return this.moves_history.length % 2 === 0 ? Piece.COLOR_WHITE : Piece.COLOR_BLACK
    }

    /**
     * @returns {Player}
     */
    getPlayerOnMove() {
        return this.getColorOnMove() === Piece.COLOR_WHITE ? this.player_1 : this.player_2
    }

    /**
     * @return {Array<Piece>}
     */
    getCurrentPosition() {
        if (this._current_position) {
            return this._current_position
        }

        // this must be our first call, so we're going to apply all the moves from move_history to our starting position
        // make sure to clone our array first
        // NOTE: it's important that we modify the current_position variable directly (and not surrogate)
        // because some of the putMoveOnBoard sub routines will need to refer to the current board position
        // i.e., when checking isLegalMove
        this._current_position = [...this.starting_position]

        this.moves_history.forEach(m => {
            this.putMoveOnBoard(m)
        })
    }

    /**
     * @returns {Array<Piece>}
     */
    getCapturedPieces() {
        // make sure our position is up to date
        this.getCurrentPosition()

        return this._captured_pieces
    }

    /**
     * @param {string|Move} move
     * @param {Piece?} promoteToPiece
     */
    putMoveOnBoard(move, promoteToPiece) {
        if (typeof move === 'string') {
            move = Move.createFromString(move)
        } else if (!move instanceof Move) {
            throw new Error("Unrecognized Move")
        }

        // make sure the piece is indeed on that square
        let fromPiece = GameState.getPieceOnSquare(this.getCurrentPosition(), move.from)
        let toPiece = GameState.getPieceOnSquare(this.getCurrentPosition(), move.to)
        if (!Piece.isSame(fromPiece, move.piece)) {
            throw new Error("Invalid Piece")
        }

        // make sure the piece we're moving is the player on move
        if (this.getColorOnMove() !== fromPiece.color) {
            throw new Error("Invalid Piece")
        }

        // make sure it's a legal move
        if (!this.isLegalMove(move)) {
            throw new Error("Illegal Move")
        }

        // add our move to our moves_history array
        this.moves_history.push(move)

        // update our cached position
        let fromIndex = move.from.getLinearArrayPosition()
        let toIndex = move.to.getLinearArrayPosition()

        // update our current position array
        this._current_position[fromIndex] = null
        this._current_position[toIndex] = move.promoteToPiece ? move.promoteToPiece : move.piece

        // if the square we landed on had a piece, it must have been captured
        if (toPiece) {
            this._captured_pieces.push(toPiece)
        }
    }

    /**
     * @param {Move} move
     * @returns {boolean}
     */
    isLegalMove(move) {
        switch (move.piece.pieceCode) {
            case Piece.PAWN:
                return this._isLegalPawnMove(move)

            case Piece.ROOK:
                return this._isLegalRookMove(move)

            case Piece.KNIGHT:
                return this._isLegalKnightMove(move)

            case Piece.BISHOP:
                return this._isLegalBishopMove(move)

            case Piece.QUEEN:
                return this._isLegalQueenMove(move)

            case Piece.KING:
                return this._isLegalKingMove(move)
        }

        // obviously can't be a legal move lol
        return false
    }

// ------------------------------------------------------------------------------------------------------------------
// Private functions
// ------------------------------------------------------------------------------------------------------------------
    /**
     * @param {Move} move
     * @returns {boolean}
     * @private
     */
    _isLegalPawnMove(move) {
        let currentPos = this.getCurrentPosition()
        let toCoords = move.to.getNumericCoords()
        let fromCoords = move.from.getNumericCoords()
        let pieceColor = move.piece.color

        // TODO:

        // To handle the different color logic, had an idea of flipping the board so only have to write it once
    }

    /**
     * @param {Move} move
     * @returns {boolean}
     * @private
     */
    _isLegalRookMove(move) {

    }

    /**
     * @param {Move} move
     * @returns {boolean}
     * @private
     */
    _isLegalKnightMove(move) {

    }

    /**
     * @param {Move} move
     * @returns {boolean}
     * @private
     */
    _isLegalBishopMove(move) {

    }

    /**
     * @param {Move} move
     * @returns {boolean}
     * @private
     */
    _isLegalQueenMove(move) {

    }

    /**
     * @param {Move} move
     * @returns {boolean}
     * @private
     */
    _isLegalKingMove(move) {

    }

// ------------------------------------------------------------------------------------------------------------------
// Static functions
// ------------------------------------------------------------------------------------------------------------------

    /**
     * @param {Array<Piece>} position
     * @param {Square} square
     * @return {Piece}
     * @private
     */
    static getPieceOnSquare(position, square) {
        return position[square.getLinearArrayPosition()]
    }
}

module.exports = GameState