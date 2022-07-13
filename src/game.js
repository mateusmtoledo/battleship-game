import OwnBoard from './OwnBoard';
import EnemyBoard from './EnemyBoard';
import Player from './Player';
import Computer from './Computer';
import pubSub from './pubSub';
import scoreBoardFactory from './scoreBoard';

function newGame() {
  const container = document.createElement('div');

  const playerBoard = new OwnBoard();
  const player = new Player('Player');
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

  const playerBoardContainer = document.createElement('div');
  playerBoardContainer.append(playerBoard.node, randomizeButton);

  const computerBoardContainer = document.createElement('div');
  computerBoardContainer.append(computerBoard.node);

  const gameButtons = document.createElement('div');
  gameButtons.classList.add('game-buttons');
  gameButtons.append(startGameButton, newGameButton);

  const boardsContainer = document.createElement('div');
  boardsContainer.id = 'boards-container';
  boardsContainer.append(playerBoardContainer, computerBoardContainer);

  container.append(boardsContainer, gameButtons, scoreBoard.container);

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

  return container;
}

export default newGame;
