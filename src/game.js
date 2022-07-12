import OwnBoard from './OwnBoard';
import EnemyBoard from './EnemyBoard';
import Player from './Player';
import Computer from './Computer';
import pubSub from './pubSub';

function scoreBoardFactory(player, computer) {
  const container = document.createElement('div');
  container.classList.add('scoreboard');

  const playerScoreDiv = document.createElement('div');
  const playerName = document.createElement('div');
  playerName.textContent = player.name;
  const playerScore = document.createElement('p');
  playerScoreDiv.append(playerName, playerScore);

  const computerScoreDiv = document.createElement('div');
  const computerName = document.createElement('div');
  computerName.textContent = computer.name;
  const computerScore = document.createElement('p');
  computerScoreDiv.append(computerName, computerScore);

  const update = () => {
    playerScore.textContent = player.score;
    computerScore.textContent = computer.score;
  };
  update();

  container.append(playerScoreDiv, computerScoreDiv);

  return { container, update };
}

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
  startGameButton.textContent = 'Start';
  startGameButton.setAttribute('type', 'button');
  startGameButton.addEventListener('click', () => {
    playerBoard.toggleEditPhase();
    computerBoard.toggleAttackListener();
    startGameButton.setAttribute('disabled', 'true');
  });

  const scoreBoard = scoreBoardFactory(player, computer);

  document.body.append(startGameButton, scoreBoard.container);

  pubSub.subscribe('gameFinished', (sender) => {
    let winner;
    if (sender === playerBoard.gameBoard) winner = computer;
    else winner = player;
    winner.score += 1;
    scoreBoard.update(player.score, computer.score);
    console.log(`Winner: ${winner.name}`);
  });
}

export default newGame;
