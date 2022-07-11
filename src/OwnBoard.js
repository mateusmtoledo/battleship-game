import pubSub from './pubSub';

class OwnBoard {
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
    this.update = this.update.bind(this);
    pubSub.subscribe('played', this.update);
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
    this.node.classList.add('own', 'board');
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
        square.classList.add('square');
        const content = this.gameBoard.board[i][j];
        if (content.ship && content.position === 0) {
          const shipElement = document.createElement('div');
          shipElement.classList = 'ship';
          const dimension = content.ship.isVertical ? 'height' : 'width';
          shipElement.style[dimension] = `${content.ship.length * 40 - 2}px`;
          const oldShip = square.querySelector('.ship');
          if (oldShip) square.replaceChild(shipElement, oldShip);
          else square.append(shipElement);
          for (let k = 0; k < content.ship.length; k += 1) {
            if (content.ship.hits[k]) {
              if (content.ship.isVertical) this.squares[i][j + k].classList.add('hit');
              else this.squares[i + k][j].classList.add('hit');
            }
          }
        } else if (content === 'miss') {
          square.classList.add('miss');
        }
      }
    }
  }
}

export default OwnBoard;
