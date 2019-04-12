export const COLOURS: string[] = ['red', 'green', 'blue', 'yellow'];

class Block {
  public x: number;
  public y: number;
  public colour: string;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
  }
}

export default Block;
