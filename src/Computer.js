import Player from './Player';
import pubSub from './pubSub';

class Computer extends Player {
  constructor() {
    super('Computer');
    this.score = 0;
    this.play = this.play.bind(this);
    pubSub.subscribe('played', (data) => {
      if (data.player === this.opponent && this.opponent.constructor !== Computer) this.play();
    });
  }

  static generateRandomCoordinates() {
    const randomX = Math.floor(Math.random() * 10);
    const randomY = Math.floor(Math.random() * 10);
    return { x: randomX, y: randomY };
  }

  setOpponent(opponent) {
    this.opponent = opponent;
    this.opponent.opponent = this;
    this.turn = true;
    this.opponent.turn = false;
  }

  play() {
    if (!this.turn || !this.opponent) return;
    let randomCoordinates;
    let attacked;
    do {
      randomCoordinates = Computer.generateRandomCoordinates();
      attacked = this.opponent.gameBoard.receiveAttack(randomCoordinates);
    } while (attacked === false);
    if (attacked === 'finished') return;
    this.passTurn();
    pubSub.publish('played', { player: this });
  }
}

export default Computer;
