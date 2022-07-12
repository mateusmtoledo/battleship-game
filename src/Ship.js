class Ship {
  constructor(coordinates, length, isVertical) {
    this.length = length;
    this.isVertical = isVertical;
    this.hits = new Array(this.length).fill(false);
    this.coordinates = coordinates;
  }

  hit(position) {
    this.hits[position] = true;
  }

  isSunk() {
    return this.hits.every((hit) => hit);
  }

  clearHits() {
    this.hits = new Array(this.length).fill(false);
  }
}

export default Ship;
