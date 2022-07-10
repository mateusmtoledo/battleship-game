import Player from './Player';

class Computer extends Player {
  constructor() {
    super('Computer');
  }

  static generateRandomCoordinates() {
    const randomX = Math.floor(Math.random() * 10);
    const randomY = Math.floor(Math.random() * 10);
    return { x: randomX, y: randomY };
  }

  play() {
    if (!this.turn || !this.opponent) return;
    let randomCoordinates;
    let attacked;
    do {
      randomCoordinates = Computer.generateRandomCoordinates();
      attacked = this.opponent.gameBoard.receiveAttack(randomCoordinates);
    } while (!attacked);
    this.passTurn();
  }
}

export default Computer;
