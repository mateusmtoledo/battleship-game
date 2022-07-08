import GameBoard from './GameBoard';

class Player {
  constructor(name) {
    this.name = name;
    this.gameBoard = new GameBoard();
    this.opponent = null;
    this.turn = null;
  }

  play(coordinates) {
    if (!this.turn || !this.opponent) return;
    this.opponent.gameBoard.receiveAttack(coordinates);
    this.passTurn();
  }

  setOpponent(opponent) {
    this.opponent = opponent;
    this.opponent.opponent = this;
    this.turn = true;
    this.opponent.turn = false;
  }

  passTurn() {
    if (!this.turn || !this.opponent) return;
    this.turn = false;
    this.opponent.turn = true;
  }
}

export default Player;
