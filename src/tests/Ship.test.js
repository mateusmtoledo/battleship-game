import Ship from '../Ship';

describe('ship.isSunk', () => {
  it('sinks', () => {
    const ship = new Ship({ x: 4, y: 3 }, 4, true);
    expect(ship.isSunk()).toBe(false);
    ship.hit(0);
    expect(ship.isSunk()).toBe(false);
    ship.hit(1);
    ship.hit(2);
    ship.hit(3);
    expect(ship.isSunk()).toBe(true);
  });
});

describe('ship.hit', () => {
  it('gets hit', () => {
    const ship = new Ship({ x: 4, y: 3 }, 4, true);
    expect(ship.hits[3]).toBe(false);
    ship.hit(3);
    expect(ship.hits[3]).toBe(true);
  });
});
