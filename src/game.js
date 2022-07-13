import OwnBoard from './OwnBoard';
import EnemyBoard from './EnemyBoard';
import Player from './Player';
import Computer from './Computer';
import pubSub from './pubSub';
import scoreBoardFactory from './scoreBoard';

function newGame() {
  const boardsContainer = document.createElement('div');
  boardsContainer.id = 'boards-container';
  document.body.append(boardsContainer);

  const playerBoard = new OwnBoard();
  const player = new Player('Player 1');
  playerBoard.setPlayer(player);

  const computerBoard = new EnemyBoard();
  const computer = new Computer();
  computerBoard.setPlayer(computer);

  player.setOpponent(computer);

  const startGameButton = document.createElement('button');
  startGameButton.textContent = 'Start Game';
  startGameButton.setAttribute('type', 'button');

  const newGameButton = document.createElement('button');
  newGameButton.textContent = 'New Game';
  newGameButton.setAttribute('type', 'button');
  newGameButton.setAttribute('disabled', 'true');

  const randomizeButton = document.createElement('button');
  randomizeButton.textContent = 'Randomize';
  randomizeButton.setAttribute('type', 'button');

  const scoreBoard = scoreBoardFactory(player, computer);

  document.body.append(startGameButton, newGameButton, randomizeButton, scoreBoard.container);

  pubSub.subscribe('gameFinished', (sender) => {
    let winner;
    if (sender === playerBoard.gameBoard) winner = computer;
    else winner = player;
    winner.score += 1;
    scoreBoard.update();
    scoreBoard.displayWinner(winner.name);
    computerBoard.toggleAttackListener();
    newGameButton.removeAttribute('disabled');
  });

  startGameButton.addEventListener('click', () => {
    playerBoard.toggleEditPhase();
    computerBoard.toggleAttackListener();
    startGameButton.setAttribute('disabled', 'true');
    randomizeButton.setAttribute('disabled', 'true');
    if (computer.turn) computer.play();
  });

  newGameButton.addEventListener('click', () => {
    playerBoard.gameBoard.reset();
    computerBoard.gameBoard.reset();
    playerBoard.toggleEditPhase();
    newGameButton.setAttribute('disabled', 'true');
    startGameButton.removeAttribute('disabled');
    randomizeButton.removeAttribute('disabled');
    computerBoard.gameBoard.randomize();
    scoreBoard.hideWinner();
    playerBoard.update();
    computerBoard.update();
  });

  randomizeButton.addEventListener('click', () => {
    playerBoard.gameBoard.randomize();
    playerBoard.update();
  });
}

export default newGame;
