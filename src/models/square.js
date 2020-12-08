export default class Square {
  constructor(index, row, column, piece = null) {
    this.index = index;
    this.row = row;
    this.column = column;
    this.piece = piece;
    this.bgColor = this.defaultBgColor();
  }

  defaultBgColor() {
    if (this.row % 2 === 0) {
      return this.column % 2 === 0 ? 'bg-dark' : 'bg-light';
    } else {
      return this.column % 2 === 0 ? 'bg-light' : 'bg-dark';
    }
  }

  possibleMoves(squares, options = {}) {
    if (this.piece) {
      return this.piece.possibleMoves(squares, this.index, options);
    }

    return false;
  }
}
