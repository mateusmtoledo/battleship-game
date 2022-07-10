class Ship {
  constructor(coordinates, length, isVertical) {
    this.length = length;
    this.isVertical = isVertical;
    this.hits = new Array(length).fill(false);
    this.coordinates = coordinates;
  }

  hit(position) {
    this.hits[position] = true;
  }

  isSunk() {
    return this.hits.every((hit) => hit);
  }
}

export default Ship;
