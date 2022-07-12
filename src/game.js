import OwnBoard from './OwnBoard';
import EnemyBoard from './EnemyBoard';
import Player from './Player';
import Computer from './Computer';
import pubSub from './pubSub';

const newGame = () => {
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
  document.body.append(startGameButton);

  pubSub.subscribe('gameFinished', (sender) => {
    let winner;
    if (sender === playerBoard.gameBoard) winner = computer;
    else winner = player;
    console.log(`Winner: ${winner.name}`);
  });
};

export default newGame;
