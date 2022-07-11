import pubSub from './pubSub';

class EnemyBoard {
  constructor() {
    this.node = document.createElement('div');
    this.gameBoard = null;
    this.player = null;
    this.squares = (() => {
      const arr = [];
      for (let i = 0; i < 10; i += 1) {
        arr[i] = [];
      }
      return arr;
    })();
    this.attackHandler = this.attackHandler.bind(this);
    this.update = this.update.bind(this);
    pubSub.subscribe('played', this.update);
    this.init();
  }

  init() {
    this.node.addEventListener('click', this.attackHandler);
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

  attackHandler(event) {
    const data = event.target.dataset;
    const coordinates = { x: data.column, y: data.row };
    this.player.opponent.play(coordinates);
  }
}

export default EnemyBoard;
