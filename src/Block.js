export const COLOURS = ['red', 'green', 'blue', 'yellow'];

class Block {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
  }
}

export default Block;
