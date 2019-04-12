import BlockGrid from './BlockGrid';
import Block from './Block';

describe('BlockGrid', () => {
  it('fills a multidimensional array of Blocks as its grid, according to the given width and height', () => {
    const grid = new BlockGrid(10, 10).grid;

    expect(grid.length).toBe(10);

    grid.forEach((column) => {
      expect(column.length).toBe(10);

      column.forEach((block) => {
        expect(block).toBeInstanceOf(Block);
      });
    });

    const gridB = new BlockGrid(3, 5).grid;

    expect(gridB.length).toBe(3);

    gridB.forEach((column) => {
      expect(column.length).toBe(5);
    });
  });

  xit('good luck, have fun!', () => {});
});
