import GameBoard from '../GameBoard';
import Ship from '../Ship';

describe('gameboard.placeShip', () => {
  it('places a vertical ship', () => {
    const gameBoard = new GameBoard();
    const x = 4;
    const y = 3;
    const shipLength = 5;
    const shipIsVertical = true;
    gameBoard.placeShip({ x, y }, shipLength, shipIsVertical);
    expect(gameBoard.board[x][y]).not.toBe('');
    expect(gameBoard.board[x][y + shipLength - 1]).not.toBe('');
    expect(gameBoard.board[x][y + shipLength]).toBe('');
  });

  it('places a horizontal ship', () => {
    const gameBoard = new GameBoard();
    const x = 2;
    const y = 1;
    const shipLength = 3;
    const shipIsVertical = false;
    gameBoard.placeShip({ x, y }, shipLength, shipIsVertical);
    expect(gameBoard.board[x][y]).not.toBe('');
    expect(gameBoard.board[x + shipLength - 1][y]).not.toBe('');
    expect(gameBoard.board[x + shipLength][y]).toBe('');
  });
});

describe('gameboard.receiveAttack', () => {
  it('registers a miss', () => {
    const gameBoard = new GameBoard();
    const x = 3;
    const y = 8;
    gameBoard.receiveAttack({ x, y });
    expect(gameBoard.board[x][y]).toBe('miss');
  });

  it('registers a hit', () => {
    const gameBoard = new GameBoard();
    const x = 5;
    const y = 2;
    const shipLength = 2;
    const shipIsVertical = true;
    const ship = gameBoard.placeShip({ x, y }, shipLength, shipIsVertical);
    const hitMock = jest.spyOn(ship, 'hit');
    gameBoard.receiveAttack({ x, y });
    expect(hitMock).toHaveBeenCalled();
    expect(hitMock).toHaveBeenLastCalledWith(0);
    gameBoard.receiveAttack({ x, y: y + shipLength - 1 });
    expect(hitMock).toHaveBeenCalledTimes(2);
    expect(hitMock).toHaveBeenLastCalledWith(shipLength - 1);
    expect(gameBoard.board[x][y]).not.toBe('miss');
  });
});

describe('gameboard.allShipsAreSunk', () => {
  it('works', () => {
    const gameBoard = new GameBoard();
    expect(gameBoard.allShipsAreSunk()).toBe(false);
    gameBoard.placeShip({ x: 3, y: 4 }, 5, true);
    expect(gameBoard.allShipsAreSunk()).toBe(false);
    gameBoard.placeShip({ x: 2, y: 1 }, 4, false);
    gameBoard.receiveAttack({ x: 3, y: 4 });
    gameBoard.receiveAttack({ x: 3, y: 5 });
    gameBoard.receiveAttack({ x: 3, y: 6 });
    gameBoard.receiveAttack({ x: 3, y: 7 });
    gameBoard.receiveAttack({ x: 3, y: 8 });
    gameBoard.receiveAttack({ x: 2, y: 1 });
    gameBoard.receiveAttack({ x: 3, y: 1 });
    gameBoard.receiveAttack({ x: 4, y: 1 });
    expect(gameBoard.allShipsAreSunk()).toBe(false);
    gameBoard.receiveAttack({ x: 5, y: 1 });
    expect(gameBoard.allShipsAreSunk()).toBe(true);
  });
});

describe('gameboard.canPlaceShip', () => {
  it('returns true when ship position is valid', () => {
    const gameBoard = new GameBoard();
    const newShip = new Ship({ x: 0, y: 0 }, 5, true);
    expect(gameBoard.canPlaceShip(newShip)).toBe(true);
  });

  it('returns false if ship would go outside the board', () => {
    const gameBoard = new GameBoard();
    const newShip = new Ship({ x: 3, y: 8 }, 5, true);
    expect(gameBoard.canPlaceShip(newShip)).toBe(false);
  });

  it('returns false if at least one of the positions are already occupied', () => {
    const gameBoard = new GameBoard();
    const fakeShip = {};
    gameBoard.board[5][3] = fakeShip;
    gameBoard.board[5][4] = fakeShip;
    gameBoard.board[5][5] = fakeShip;
    gameBoard.board[5][6] = fakeShip;
    gameBoard.board[5][7] = fakeShip;
    const newShip = new Ship({ x: 3, y: 6 }, 5, false);
    expect(gameBoard.canPlaceShip(newShip)).toBe(false);
  });

  it('returns false if it is next to another ship', () => {
    const gameBoard = new GameBoard();
    const fakeShip = {};
    gameBoard.board[4][5] = fakeShip;
    gameBoard.board[5][5] = fakeShip;
    gameBoard.board[6][5] = fakeShip;
    gameBoard.board[7][5] = fakeShip;
    gameBoard.board[8][5] = fakeShip;
    const newShip = new Ship({ x: 3, y: 2 }, 3, true);
    expect(gameBoard.canPlaceShip(newShip)).toBe(false);
  });
});

describe('gameBoard.moveShip', () => {
  it('moves ship', () => {
    const gameBoard = new GameBoard();
    const ship = gameBoard.placeShip({ x: 2, y: 5 }, 5, true);
    const newShip = gameBoard.moveShip(ship, { x: 3, y: 5 });
    expect(gameBoard.board[3][5].ship).toBe(newShip);
    expect(gameBoard.board[3][9].ship).toBe(newShip);
    expect(gameBoard.board[2][5].ship).not.toBe(ship);
    expect(gameBoard.board[2][9].ship).not.toBe(ship);
    expect(gameBoard.ships.length).toBe(1);
    expect(gameBoard.ships.includes(newShip)).toBe(true);
    expect(gameBoard.ships.includes(ship)).toBe(false);
  });

  it('does not move ship if new position is invalid', () => {
    const gameBoard = new GameBoard();
    const ship = gameBoard.placeShip({ x: 2, y: 5 }, 5, true);
    gameBoard.placeShip({ x: 4, y: 4 }, 5, true);
    const newShip = gameBoard.moveShip(ship, { x: 3, y: 5 });
    expect(gameBoard.board[2][5].ship).toBe(ship);
    expect(gameBoard.board[2][9].ship).toBe(ship);
    expect(gameBoard.board[3][5].ship).toBeFalsy();
    expect(gameBoard.board[3][9].ship).toBeFalsy();
    expect(gameBoard.ships.length).toBe(2);
    expect(gameBoard.ships.includes(newShip)).toBe(false);
    expect(gameBoard.ships.includes(ship)).toBe(true);
  });
});

describe('gameBoard.rotateShip', () => {
  it('rotates ship', () => {
    const gameBoard = new GameBoard();
    const ship = gameBoard.placeShip({ x: 2, y: 5 }, 5, true);
    const newShip = gameBoard.rotateShip(ship);
    expect(gameBoard.board[2][5].ship).toBe(newShip);
    expect(gameBoard.board[6][5].ship).toBe(newShip);
    expect(gameBoard.board[2][6].ship).toBeFalsy();
    expect(gameBoard.board[2][9].ship).toBeFalsy();
    expect(gameBoard.ships.length).toBe(1);
    expect(gameBoard.ships.includes(newShip)).toBe(true);
    expect(gameBoard.ships.includes(ship)).toBe(false);
  });
});

describe('gameBoard.isValidAttack', () => {
  it('returns true when attack is valid', () => {
    const gameBoard = new GameBoard();
    const coordinates = { x: 5, y: 2 };
    gameBoard.placeShip(coordinates, 3, false);
    expect(gameBoard.isValidAttack(coordinates)).toBe(true);
    expect(gameBoard.isValidAttack({ x: 1, y: 1 })).toBe(true);
  });

  it('returns false when attacking an invalid ship coordinate', () => {
    const gameBoard = new GameBoard();
    const coordinates = { x: 5, y: 2 };
    gameBoard.placeShip(coordinates, 3, false);
    expect(gameBoard.isValidAttack(coordinates)).toBe(true);
    gameBoard.receiveAttack(coordinates);
    expect(gameBoard.isValidAttack(coordinates)).toBe(false);
  });

  it('returns false when attacking an invalid missed coordinate', () => {
    const gameBoard = new GameBoard();
    const coordinates = { x: 5, y: 2 };
    expect(gameBoard.isValidAttack(coordinates)).toBe(true);
    gameBoard.receiveAttack(coordinates);
    expect(gameBoard.isValidAttack(coordinates)).toBe(false);
  });
});
