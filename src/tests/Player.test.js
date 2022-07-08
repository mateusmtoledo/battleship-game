import Player from '../Player';

describe('player.play', () => {
  it('calls the receiveAttack function on the enemy\'s gameBoard with correct arguments', () => {
    const player1 = new Player('Player 1');
    const player2 = new Player('Player 2');
    player1.opponent = player2;
    player2.opponent = player1;
    player1.turn = true;
    player2.turn = false;
    const mock = jest.spyOn(player2.gameBoard, 'receiveAttack');
    const playedCoordinates = { x: 3, y: 4 };
    player1.play(playedCoordinates);
    expect(mock).toHaveBeenCalledWith(playedCoordinates);
  });
});

describe('player.setOpponent', () => {
  it('correctly sets opponents', () => {
    const player1 = new Player('Player 1');
    const player2 = new Player('Player 2');
    player1.setOpponent(player2);
    expect(player1.opponent).toBe(player2);
    expect(player2.opponent).toBe(player1);
  });

  it('correctly sets turns', () => {
    const player1 = new Player('Player 1');
    const player2 = new Player('Player 2');
    player1.setOpponent(player2);
    expect(player1.turn).toBe(true);
    expect(player2.turn).toBe(false);
  });
});

describe('player.passTurn', () => {
  it('passes the turn', () => {
    const player1 = new Player('Player 1');
    const player2 = new Player('Player 2');
    player1.opponent = player2;
    player2.opponent = player1;
    player1.turn = true;
    player2.turn = false;
    player1.passTurn();
    expect(player1.turn).toBe(false);
    expect(player2.turn).toBe(true);
    player2.passTurn();
    expect(player1.turn).toBe(true);
    expect(player2.turn).toBe(false);
  });
});
