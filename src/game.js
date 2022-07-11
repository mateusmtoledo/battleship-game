import OwnBoard from './OwnBoard';
import EnemyBoard from './EnemyBoard';
import Player from './Player';
import Computer from './Computer';

const newGame = () => {
  const boardsContainer = document.createElement('div');
  boardsContainer.id = 'boards-container';
  document.body.append(boardsContainer);

  const playerBoard = new OwnBoard();
  const player = new Player();
  playerBoard.setPlayer(player);
  const pGameBoard = playerBoard.gameBoard;
  pGameBoard.placeShip({ x: 0, y: 0 }, 5, true);
  pGameBoard.placeShip({ x: 3, y: 2 }, 4, false);
  pGameBoard.placeShip({ x: 8, y: 2 }, 3, true);
  pGameBoard.placeShip({ x: 3, y: 9 }, 3, false);
  pGameBoard.placeShip({ x: 5, y: 5 }, 2, true);
  pGameBoard.receiveAttack({ x: 0, y: 1 });
  pGameBoard.receiveAttack({ x: 1, y: 1 });
  playerBoard.update();

  const computerBoard = new EnemyBoard();
  const computer = new Computer();
  computerBoard.setPlayer(computer);
  const cGameBoard = computerBoard.gameBoard;
  cGameBoard.placeShip({ x: 0, y: 0 }, 5, true);
  cGameBoard.placeShip({ x: 3, y: 2 }, 4, false);
  cGameBoard.placeShip({ x: 8, y: 2 }, 3, true);
  cGameBoard.placeShip({ x: 3, y: 9 }, 3, false);
  cGameBoard.placeShip({ x: 5, y: 5 }, 2, true);
  cGameBoard.receiveAttack({ x: 0, y: 1 });
  cGameBoard.receiveAttack({ x: 1, y: 1 });
  computerBoard.update();
};

export default newGame;
