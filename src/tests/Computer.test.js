import Computer from '../Computer';

describe('computer.play', () => {
  it('attacks enemy board', () => {
    const computer1 = new Computer();
    const computer2 = new Computer();
    computer1.setOpponent(computer2);
    for (let i = 0; i < 100; i += 1) {
      computer1.play();
      computer2.play();
    }
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        expect(computer1.gameBoard.board[i][j]).toBe('miss');
        expect(computer2.gameBoard.board[i][j]).toBe('miss');
      }
    }
  });
});
