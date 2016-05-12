export const COLOURS = ['red', 'green', 'blue', 'yellow'];
const MAX_X = 10;
const MAX_Y = 10;
const GRID_ELEMENT = '#gridEl';
const EMPTY_COLOUR = 'grey';

/**
 * Assigns the EMPTY_COLOUR to the blocks that clicked/matched
 * @method
 * @param  {array} grid  The awesomely colourful grid
 * @param  {object} block The block that was clicked
 * @return {object}       With attributes grid: the grid, xWithEmpties: x's that have empty blocks
 */
var removeBlocks = (grid, block) => {
    var xWithEmpties = [];
    var colour = block.colour;
    /**
     * Search for same colour blocks
     * @method
     * @param  {number} x      The x to search in
     * @param  {number} y      The y to search in
     * @param  {string} ignore ['right', 'left', 'up', 'down'] The direction to ignore
     */
    const search = (x, y, ignore) => {
        if (grid[x][y].colour === colour) {
            grid[x][y].colour = EMPTY_COLOUR;
            xWithEmpties.push(x);
            if (ignore !== 'right' && x + 1 < MAX_X) {
                search(x + 1, y, 'left');
            }
            if (ignore !== 'left' && x - 1 > -1) {
                search(x - 1, y, 'right');
            }
            if (ignore !== 'down' && y - 1 > -1) {
                search(x, y - 1, 'up');
            }
            if (ignore !== 'up' && y + 1 < MAX_Y) {
                search(x, y + 1, 'down');
            }
        }
    };
    search(block.x, block.y);

    return {
        grid,
        xWithEmpties
    };
};

/**
 * Drops floating blocks :D
 * @method
 * @param  {array} grid         The grid!
 * @param  {array} xWithEmpties The x's that have empty blocks
 * @return {array}              The 'dropped' grid
 */
var dropBlocks = (grid, xWithEmpties) => {
    for (let i = 0, length = xWithEmpties.length; i < length; i++) {
        let x = xWithEmpties[i];
        let drops = 0;
        for (let y = 0; y < MAX_Y; y++) {
            if (grid[x][y].colour === EMPTY_COLOUR) {
                drops++;
            } else if (drops) {
                grid[x][y - drops].colour = grid[x][y].colour;
            }
        }
        while (drops) {
            grid[x][MAX_Y - drops].colour = EMPTY_COLOUR;
            drops--;
        }
    }

    return grid;
};

export class Block {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
    }
}

export class BlockGrid {
    /**
     * The BlockGrid constructor function
     * @method constructor
     * @return {object}    A new BlockGrid
     */
    constructor () {
        this.grid = [];

        for (let x = 0; x < MAX_X; x++) {
            let col = [];
            for (let y = 0; y < MAX_Y; y++) {
                col.push(new Block(x, y));
            }

            this.grid.push(col);
        }

        return this;
    }

    /**
     * Renders the grid
     * @method render
     * @param  {object}  el  The DOM element on which we will render the grid
     * @return {object}      The BlockGrid class
     */
    render (el = document.querySelector(GRID_ELEMENT)) {
        this.reset();
        for (let x = 0; x < MAX_X; x++) {
            let id = 'col_' + x;
            let colEl = document.createElement('div');
            colEl.className = 'col';
            colEl.id = id;
            if (el) {
                el.appendChild(colEl);

                for (let y = MAX_Y - 1; y >= 0; y--) {
                    let block = this.grid[x][y],
                        id = `block_${x}x${y}`,
                        blockEl = document.createElement('div');

                    blockEl.id = id;
                    blockEl.className = 'block';
                    blockEl.style.background = block.colour;
                    blockEl.addEventListener('click', evt => this.blockClicked(evt, block));
                    colEl.appendChild(blockEl);
                }
            }
        }

        return this;
    }

    /**
     * Resets the grid to create a new one
     * @method reset
     * @return {object}           The BlockGrid class
     */
    reset () {
        var myNode = document.querySelector(GRID_ELEMENT);
        if (myNode) {
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
        }

        return this;
    }

    /**
     * Handles the click on a block. Removes the same colour blocksToRemove
     * @method blockClicked
     * @param  {object}     e     The click event
     * @param  {object}     block The block clicked
     * @return {object}           The BlockGrid class
     */
    blockClicked (e, block) {
        var {grid: gridWithEmpties, xWithEmpties} = removeBlocks(this.grid, block);
        var newGrid = dropBlocks(gridWithEmpties, xWithEmpties);
        this.grid = newGrid;
        this.render();

        return this;
    }
}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());
