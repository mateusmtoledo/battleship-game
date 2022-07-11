class EnemyBoard {
  constructor() {
    this.node = document.createElement('div');
    this.gameBoard = null;
    this.squares = (() => {
      const arr = [];
      for (let i = 0; i < 10; i += 1) {
        arr[i] = [];
      }
      return arr;
    })();
    this.init();
  }

  init() {
    for (let j = 0; j < 10; j += 1) {
      for (let i = 0; i < 10; i += 1) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.dataset.column = i;
        square.dataset.row = j;
        this.node.append(square);
        this.squares[i][j] = square;
      }
    }
    this.node.classList.add('enemy', 'board');
    document.getElementById('boards-container').append(this.node);
  }

  setPlayer(player) {
    this.player = player;
    this.gameBoard = this.player.gameBoard;
    this.update();
  }

  update() {
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        const square = this.squares[i][j];
        square.classList = 'square';
        const content = this.gameBoard.board[i][j];
        if (content.ship) {
          if (content.ship.hits[content.position]) square.classList.add('hit');
        } else if (content === 'miss') square.classList.add('miss');
      }
    }
  }
}

export default EnemyBoard;
