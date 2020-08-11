import Block from './Block';

class BlockGrid {
  constructor(width = 10, height = 10) {
    this.width = width;
    this.height = height;
    this.grid = [];

    for (let x = 0; x < this.width; x++) {
      const col = [];
      for (let y = 0; y < this.height; y++) {
        col.push(new Block(x, y));
      }

      this.grid.push(col);
    }
  }

  render(el = document.getElementById('gridEl')) {
    for (let x = 0; x < this.width; x++) {
      const id = 'col_' + x;
      const colEl = document.createElement('div');
      colEl.id = id;
      colEl.className = 'col';
      el.appendChild(colEl);

      for (let y = this.height - 1; y >= 0; y--) {
        const block = this.grid[x][y];
        const id = `block_${x}x${y}`;
        const blockEl = document.createElement('div');

        blockEl.id = id;
        blockEl.className = 'block';
        blockEl.style.background = block.colour;
        blockEl.addEventListener('click', evt => this.blockClicked(evt, block));
        colEl.appendChild(blockEl);
      }
    }
  }

  blockClicked(e, block) {
    console.log(e, block);
    const { x, y, colour } = block;
    if (colour !== null) {
      let matchedCoordinates = [];
      this.removeConnectedBlocks(x, y, colour, matchedCoordinates)
        .shiftBlocksDownward(matchedCoordinates)
        .resetGrid()
        .render();
    }
  }

  removeConnectedBlocks(x, y, colour, matchedCoordinates = []) {
    let directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    let visited = new Set();
    let stack = [];
    stack.push([x, y]);

    while (stack.length > 0) {
      let [row, col] = stack.pop();
      if (
        row < 0 ||
        col < 0 ||
        row >= this.width ||
        col >= this.height ||
        visited.has([row, col])
      ) {
        continue;
      }
      visited.add([row, col]);

      if (
        this.grid[row] &&
        this.grid[row][col] &&
        this.grid[row][col].colour === colour
      ) {
        this.grid[row][col].colour = null;
        matchedCoordinates.push([row, col]);

        directions.forEach(([x_offset, y_offset]) => {
          stack.push([row + x_offset, col + y_offset]);
        });
      }
    }
    return this;
  }

  shiftBlocksDownward(matchedCoordinates) {
    matchedCoordinates.forEach(elem => {
      let x = elem[0];
      for (let y = this.height - 1; y >= 0; y--) {
        let curr = y;

        while (this.grid[x][curr].colour === null && this.grid[x][curr + 1]) {
          this.grid[x][curr].colour = this.grid[x][curr + 1].colour;
          this.grid[x][curr + 1].colour = null;
          curr++;
        }
      }
    });
    return this;
  }

  resetGrid() {
    document.getElementById('gridEl').innerHTML = '';
    return this;
  }
}

export default BlockGrid;
