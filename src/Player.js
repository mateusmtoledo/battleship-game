import GameBoard from './GameBoard';
import pubSub from './pubSub';

class Player {
  constructor(name) {
    this.name = name;
    this.gameBoard = new GameBoard();
    this.opponent = null;
    this.turn = null;
  }

  play(coordinates) {
    if (!this.turn || !this.opponent) return false;
    const attacked = this.opponent.gameBoard.receiveAttack(coordinates);
    if (attacked) {
      this.passTurn();
      pubSub.publish('played', { player: this });
    }
    return attacked;
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
