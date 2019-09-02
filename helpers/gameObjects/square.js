const A_CHAR_CODE = 97 // letter 'a'

class Square {
    /**
     * @param {string} file
     * @param {string|number} rank
     */
    constructor(file, rank) {
        let lowerCaseFile = file.toLowerCase()
        if('abcdefgh'.indexOf(lowerCaseFile) === -1) {
            throw new Error("Invalid file")
        }

        let numericRank = parseInt(rank)
        if (numericRank < 1 || numericRank > 8) {
            throw new Error("Invalid rank")
        }

        this.file = lowerCaseFile
        this.rank = numericRank
    }

    /**
     * @returns {string}
     */
    toString() {
        return this.file + this.rank
    }

    /**
     * @returns {Array<number>}
     */
    getNumericCoords() {
        return [
            this.file.charCodeAt(0) - A_CHAR_CODE,
            this.rank - 1
        ]
    }

    /**
     * @returns {number}
     */
    getLinearArrayPosition() {
        let [file, rank] = this.getNumericCoords()
        // it's a linear array so we multiple rank by row length
        return file + (rank * 8)
    }

    /**
     * @param {string} squareStr
     * @return Square
     */
    static createFromString(squareStr) {
        return new Square(squareStr[0], squareStr[1])
    }
}

module.exports = Square