class BoardUi {
  constructor() {
    this.node = document.createElement('div');
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
      }
    }
    this.node.classList.add('board');
    document.body.append(this.node);
  }
}

export default BoardUi;
