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
    this.rotateListener = false;
    this.moveListeners = false;
    this.draggedShip = null;
    this.previewElement = null;
    this.update = this.update.bind(this);
    this.rotateHandler = this.rotateHandler.bind(this);
    this.dragStartHandler = this.dragStartHandler.bind(this);
    this.dropHandler = this.dropHandler.bind(this);
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
    this.node.addEventListener('dragover', OwnBoard.dragOverHandler);
    this.node.addEventListener('drop', this.dropHandler);
    this.toggleRotateListener();
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
        const oldShip = square.querySelector('.ship');
        if (oldShip) oldShip.remove();
        if (content.ship && content.position === 0) {
          const shipElement = document.createElement('div');
          shipElement.classList = 'ship';
          const dimension = content.ship.isVertical ? 'height' : 'width';
          shipElement.style[dimension] = `${content.ship.length * 40 - 2}px`;
          shipElement.setAttribute('draggable', 'true');
          square.append(shipElement);
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
    this.addMoveListeners();
  }

  rotateHandler(event) {
    if (!event.target.classList.contains('ship')) return;
    const path = event.composedPath();
    const x = path[1].dataset.column;
    const y = path[1].dataset.row;
    const { ship } = this.gameBoard.board[x][y];
    this.gameBoard.rotateShip(ship);
    this.update();
  }

  toggleRotateListener() {
    if (this.rotateListener === false) {
      this.rotateListener = true;
      this.node.addEventListener('click', this.rotateHandler);
    } else {
      this.rotateListener = false;
      this.node.removeEventListener('click', this.rotateHandler);
    }
  }

  addMoveListeners() {
    const ships = this.node.querySelectorAll('.ship');
    ships.forEach((ship) => {
      ship.addEventListener('dragstart', this.dragStartHandler);
    });
  }

  dragStartHandler(event) {
    const { target } = event;
    if (target.classList.contains('square')) {
      this.draggedShip = null;
      return;
    }
    target.style.backgroundColor = '#ffff0033';
    target.style.border = '2px solid #ffff00ff';
    const { x, y } = OwnBoard.getCoordinates(event);
    this.draggedShip = this.gameBoard.board[x][y].ship;
    this.draggedPosition = this.gameBoard.board[x][y].position;
  }

  static dragOverHandler(event) {
    event.preventDefault();
  }

  dropHandler(event) {
    if (!this.draggedShip) return;
    const ship = this.draggedShip;
    const { x, y } = OwnBoard.getCoordinates(event);
    const coordinates = {
      x: ship.isVertical ? x : x - this.draggedPosition,
      y: ship.isVertical ? y - this.draggedPosition : y,
    };
    if (this.gameBoard.canPlaceShip(ship, coordinates)) this.gameBoard.moveShip(ship, coordinates);
    this.update();
  }

  static getCoordinates(event) {
    let coordinates;
    if (event.target.classList.contains('ship')) {
      const path = event.composedPath();
      const x = Number(path[1].dataset.column);
      const y = Number(path[1].dataset.row);
      coordinates = {
        x: x + Math.floor(event.offsetX / 40),
        y: y + Math.floor(event.offsetY / 40),
      };
    } else if (event.target.classList.contains('square')) {
      const x = Number(event.target.dataset.column);
      const y = Number(event.target.dataset.row);
      coordinates = { x, y };
    }
    return coordinates;
  }
}

export default OwnBoard;
