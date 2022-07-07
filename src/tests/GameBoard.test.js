import GameBoard from '../GameBoard';

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
