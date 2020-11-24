import React from 'react';
import Board from './board';
import Knight from '../models/knight';
import Bishop from '../models/bishop';
import King from '../models/king';
import Queen from '../models/queen';
import Rook from '../models/rook';
import Pawn from '../models/pawn';
import Player from '../models/player';

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    const players = this.setPlayers();

    this.state = {
      squares: this.initializeBoard(),
      message: 'Welcome! White\'s turn.',
      players: players,
      current: players['white'],
      selectedPiece: null,
      whiteGraveyard: [],
      blackGraveyard: []
    };
  }

  initializeBoard() {
    let squares = Array(64).fill(null);

    // Black pieces
    squares[0] = new Rook('black', 0);
    squares[1] = new Knight('black', 1);
    squares[2] = new Bishop('black', 2);
    squares[3] = new Queen('black', 3);
    squares[4] = new King('black', 4);
    squares[5] = new Bishop('black', 5);
    squares[6] = new Knight('black', 6);
    squares[7] = new Rook('black', 7);

    // Black pawns
    squares[8]= new Pawn('black', 8);
    squares[9]= new Pawn('black', 9);
    squares[10]= new Pawn('black', 10);
    squares[11]= new Pawn('black', 11);
    squares[12]= new Pawn('black', 12);
    squares[13]= new Pawn('black', 13);
    squares[14]= new Pawn('black', 14);
    squares[15]= new Pawn('black', 15);

    // White pieces
    squares[56] = new Rook('white', 56);
    squares[57] = new Knight('white', 57);
    squares[58] = new Bishop('white', 58);
    squares[59] = new Queen('white', 59);
    squares[60] = new King('white', 60);
    squares[61] = new Bishop('white', 61);
    squares[62] = new Knight('white', 62);
    squares[63] = new Rook('white', 63)

    // White pawns
    squares[48] = new Pawn('white', 48);
    squares[49] = new Pawn('white', 49);
    squares[50] = new Pawn('white', 50);
    squares[51] = new Pawn('white', 51);
    squares[52] = new Pawn('white', 52);
    squares[53] = new Pawn('white', 53);
    squares[54] = new Pawn('white', 54);
    squares[55] = new Pawn('white', 55);

    return squares;
  }

  setPlayers() {
    let players = {};
    players['white'] = new Player('white');
    players['black'] = new Player('black');
    return players;
  }

  validateMove(selectedSquare, index) {
    return this.state.selectedPiece.possibleMoves().includes(index);
  }

  validateSelectedPiece(piece) {
    return piece.color === this.state.current.color;
  }

  handleClick(index) {
    let selectedSquare = this.state.squares[index];
    let squares = [...this.state.squares];
    let currentPlayer = this.state.current;
    let message = this.state.message;
    let selectedPiece = this.state.selectedPiece;

    // Make move if piece is already selected and valid move
    if (selectedPiece && this.validateMove(selectedSquare, index)) {
      // Physically move the piece
      squares[index] = selectedPiece;
      squares[selectedPiece.currentPosition] = null;
      // Mark piece as having moved and update its currentPosition
      selectedPiece.makeMove(index);

      // Setting up for the next player's turn
      selectedPiece = null;
      currentPlayer = this.state.current.color === 'white' ? this.state.players['black'] : this.state.players['white'];

      message = `${currentPlayer.color}'s turn.`;
    // Move was invalid
    } else if (selectedPiece) {
      message = 'You cannot move there.'
    // Check if user is allowed to select the piece
    } else if (selectedSquare && this.validateSelectedPiece(selectedSquare)){
      selectedSquare.selected = true;
      squares[index] = selectedSquare;
      message = `Select where to move ${selectedSquare.name}`;

      selectedPiece = selectedSquare;
    // User wasn't allowed to click the piece
    } else {
      message = `Please select one of the ${currentPlayer.color} pieces.`
    }

    this.setState(oldState => ({
      squares: squares,
      current: currentPlayer,
      message: message,
      selectedPiece: selectedPiece
    }));
  }

  render() {
    return (
      <main className="d-flex flex-column align-items-center vw-100">
        <Board squares={this.state.squares} onClick={(index) => this.handleClick(index) }/>

        <section>
          <p>{this.state.message}</p>
        </section>
      </main>
    );
  }
}
