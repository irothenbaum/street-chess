class Piece {
    /**
     * @param {string} color
     * @param {string} pieceCode
     */
    constructor(color, pieceCode) {
        if ( Piece.PIECE_COLORS.indexOf(color) === -1 ) {
            throw new Error("Invalid piece color")
        }
        if ( Piece.PIECE_CODES.indexOf(pieceCode) === -1 ) {
            throw new Error("Invalid piece code")
        }

        this.color = color
        this.pieceCode = pieceCode
    }

    /**
     * @returns {string}
     */
    toString() {
        return `${this.color}:${this.pieceCode}`
    }

    /**
     * @param {Piece} piece1
     * @param {Piece} piece2
     */
    static isSame(piece1, piece2) {
        return piece1.toString() === piece2.toString()
    }

    /**
     * @param {string} pieceStr
     * @return {Piece}
     */
    static createFromString(pieceStr) {
        let parts = pieceStr.split(':')
        return new Piece(parts[0], parts[1])
    }
}

Piece.PAWN = 'P'
Piece.ROOK = 'R'
Piece.KNIGHT = 'N'
Piece.BISHOP = 'B'
Piece.QUEEN = 'Q'
Piece.KING = 'K'

Piece.COLOR_WHITE = 'white'
Piece.COLOR_BLACK = 'black'

Piece.PIECE_CODES = [ Piece.PAWN, Piece.ROOK, Piece.KNIGHT, Piece.BISHOP, Piece.QUEEN, Piece.KING ]
Piece.PIECE_COLORS = [ Piece.COLOR_WHITE, Piece.COLOR_BLACK ]

module.exports = Piece