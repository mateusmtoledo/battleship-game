function scoreBoardFactory(player, computer) {
  const container = document.createElement('div');
  container.classList.add('scoreboard');

  const winnerText = document.createElement('p');
  winnerText.classList.add('winner-text');

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

  const scores = document.createElement('div');
  scores.append(playerScoreDiv, computerScoreDiv);
  scores.classList.add('scores');

  container.append(winnerText, scores);

  const update = () => {
    playerScore.textContent = player.score;
    computerScore.textContent = computer.score;
  };

  const displayWinner = (winnerName) => {
    winnerText.textContent = `${winnerName} won the round!`;
  };

  const hideWinner = () => {
    winnerText.textContent = '';
  };

  update();

  return {
    container,
    update,
    displayWinner,
    hideWinner,
  };
}

export default scoreBoardFactory;
