import pubSub from './pubSub';
import Ship from './Ship';

class GameBoard {
  constructor() {
    this.gameIsOver = false;
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
    pubSub.subscribe('played', () => {
      if (this.allShipsAreSunk()) {
        pubSub.publish('gameFinished', this);
      }
    });
    pubSub.subscribe('gameFinished', () => {
      this.gameIsOver = true;
    });
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
    if (!this.ships.includes(ship)) this.ships.push(ship);
    return ship;
  }

  receiveAttack(coordinates) {
    if (this.gameIsOver) return 'finished';
    const { x, y } = coordinates;
    if (!this.isValidAttack(coordinates)) return false;
    const content = this.board[x][y];
    if (content.ship) {
      content.ship.hit(content.position);
      return 'ship';
    }
    this.board[x][y] = 'miss';
    return 'miss';
  }

  allShipsAreSunk() {
    return !!this.ships.length && this.ships.every((ship) => ship.isSunk());
  }

  isValidSquare(coordinates, ship) {
    const { x, y } = coordinates;
    if (x < 0 || x > 9 || y < 0 || y > 9) return false;
    for (let i = x - 1; i <= x + 1 && i < 10; i += 1) {
      if (i < 0) i += 1;
      for (let j = y - 1; j <= y + 1 && j < 10; j += 1) {
        if (j < 0) j += 1;
        if (typeof this.board[i][j] !== 'string' && this.board[i][j].ship !== ship) return false;
      }
    }
    return true;
  }

  canPlaceShip(ship, newCoordinates) {
    const coordinates = newCoordinates || ship.coordinates;
    for (let i = 0; i < ship.length; i += 1) {
      let x;
      let y;
      if (ship.isVertical) {
        x = coordinates.x;
        y = coordinates.y + i;
      } else {
        x = coordinates.x + i;
        y = coordinates.y;
      }
      if (!this.isValidSquare({ x, y }, ship)) return false;
    }
    return true;
  }

  removeShip(ship) {
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        if (this.board[i][j].ship === ship) this.board[i][j] = '';
      }
    }
    const index = this.ships.indexOf(ship);
    this.ships.splice(index, 1);
  }

  moveShip(ship, newCoordinates) {
    const { length, isVertical } = ship;
    if (!this.canPlaceShip(ship, newCoordinates)) return false;
    this.removeShip(ship);
    return this.placeShip(newCoordinates, length, isVertical);
  }

  rotateShip(ship) {
    const newIsVertical = !ship.isVertical;
    const oldIsVertical = ship.isVertical;
    const { length, coordinates } = ship;
    this.removeShip(ship);
    const newShip = new Ship(coordinates, length, newIsVertical);
    if (!this.canPlaceShip(newShip)) {
      return this.placeShip(coordinates, length, oldIsVertical);
    }
    return this.placeShip(coordinates, length, newIsVertical);
  }

  isValidAttack(coordinates) {
    const { x, y } = coordinates;
    const content = this.board[x][y];
    if (content.ship) {
      if (content.ship.hits[content.position] === true) return false;
    } else if (content === 'miss') return false;
    return true;
  }
}

export default GameBoard;
