import BlockGrid from './BlockGrid';
import Block from './Block';

const createAndInsertGridDiv = () => {
  const div = document.createElement('div');
  div.setAttribute('id', 'gridEl');
  document.getElementsByTagName('body')[0].appendChild(div);
};

describe('BlockGrid', () => {
  it('fills a multidimensional array of Blocks as its grid, according to the given width and height', () => {
    const grid = new BlockGrid(10, 10).grid;

    expect(grid.length).toBe(10);

    grid.forEach(column => {
      expect(column.length).toBe(10);

      column.forEach(block => {
        expect(block).toBeInstanceOf(Block);
      });
    });

    const gridB = new BlockGrid(3, 5).grid;

    expect(gridB.length).toBe(3);

    gridB.forEach(column => {
      expect(column.length).toBe(5);
    });
  });

  describe('If block is clicked', () => {
    createAndInsertGridDiv();
    let blockGrid;

    beforeEach(() => {
      blockGrid = new BlockGrid();
      blockGrid.render();
    });

    afterEach(() => {
      blockGrid.resetGrid();
    });

    const setColour = (blockCoordinates, colour) =>
      blockCoordinates.forEach(
        ([x, y]) => (blockGrid.grid[x][y].colour = colour)
      );

    const isColour = (blockCoordinates, colour) =>
      blockCoordinates.every(
        ([x, y]) => blockGrid.grid[x][y].colour === colour
      );

    it('should be removed', () => {
      document.getElementById('block_0x0').click();

      expect(document.getElementById('block_0x9').style.background).toBe('');
    });

    it('neighbours of the same color should be removed', () => {
      setColour(
        [
          [0, 1],
          [0, 2],
          [0, 3],
        ],
        'blue'
      );
      blockGrid.render();

      document.getElementById('block_0x1').click();

      expect(
        isColour(
          [
            [0, 7],
            [0, 8],
            [0, 9],
          ],
          null
        )
      ).toBe(true);
    });

    it('blocks above with non-matching colour should shift down', () => {
      setColour(
        [
          [0, 0],
          [1, 0],
          [2, 0],
        ],
        'red'
      );
      setColour(
        [
          [0, 1],
          [1, 1],
          [2, 1],
        ],
        'green'
      );
      blockGrid.render();

      document.getElementById('block_1x0').click();

      expect(
        isColour(
          [
            [0, 0],
            [1, 0],
            [2, 0],
          ],
          'green'
        )
      ).toBe(true);
    });
  });
});
