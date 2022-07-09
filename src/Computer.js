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
    do {
      randomCoordinates = Computer.generateRandomCoordinates();
    } while (!this.opponent.gameBoard.isValidAttack(randomCoordinates));
    this.opponent.gameBoard.receiveAttack(randomCoordinates);
    this.passTurn();
  }
}

export default Computer;
