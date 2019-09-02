const Square = require('./square')
const Piece = require('./piece')

class Move {
    /**
     * @param {Piece} piece
     * @param {Square} from
     * @param {Square} to
     * @param {Piece?} promoteToPiece
     */
    constructor(piece, from, to, promoteToPiece) {
        if (
            piece.pieceCode === Piece.PAWN
            && (
                (piece.color === Piece.COLOR_WHITE && to.rank === 8)
                || (piece.color === Piece.COLOR_BLACK && to.rank === 1)
            )
            && !promoteToPiece
        ) {
            throw new Error("Move requires a promotion piece")
        }

        this.piece = piece
        this.from = from
        this.to = to
        this.promoteToPiece = promoteToPiece
    }

    /**
     * @returns {string}
     */
    toString() {
        let str = `${this.piece}-${this.from}-${this.to}`
        if (this.promoteToPiece) {
            str += `-${this.promoteToPiece}`
        }
        return str
    }

    /**
     * @param {string} moveStr
     * @returns {Move}
     */
    static createFromString(moveStr) {
        let parts = moveStr.split('-')
        return new Move(
            Piece.createFromString(parts[0]),
            Square.createFromString(parts[1]),
            Square.createFromString(parts[2]),
            parts.length > 3 ? Piece.createFromString(parts[3]) : undefined
        )
    }
}

module.exports = Move