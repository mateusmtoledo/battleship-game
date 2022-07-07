import Ship from './Ship';

class GameBoard {
  constructor() {
    this.ships = [];
    this.board = (() => {
      const arr = [];
      for (let i = 0; i < 10; i += 1) {
        arr[i] = [];
        for (let j = 0; j < 10; j += 1) {
          arr[i][j] = '';
        }
      }
      return arr;
    })();
  }

  placeShip(coordinates, length, isVertical) {
    const ship = new Ship(coordinates, length, isVertical);
    const { x, y } = coordinates;
    if (isVertical) {
      for (let j = y; j < y + length; j += 1) {
        this.board[x][j] = {
          ship,
          position: j - y,
        };
      }
    } else {
      for (let i = x; i < x + length; i += 1) {
        this.board[i][y] = {
          ship,
          position: i - x,
        };
      }
    }
    this.ships.push(ship);
    return ship;
  }

  receiveAttack(coordinates) {
    const { x, y } = coordinates;
    const content = this.board[x][y];
    if (content.ship) {
      content.ship.hit(content.position);
    } else {
      this.board[x][y] = 'miss';
    }
  }

  allShipsAreSunk() {
    return !!this.ships.length && this.ships.reduce((prev, curr) => prev && curr.isSunk(), true);
  }
}

export default GameBoard;
