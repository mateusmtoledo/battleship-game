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

export default scoreBoardFactory;
