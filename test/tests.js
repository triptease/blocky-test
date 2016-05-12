import { Block, COLOURS, BlockGrid } from '../app/javascript/grid';
import { sampleGrid } from './fixtures';
import { sampleGrid2 } from './fixtures2';
import { sampleGrid3 } from './fixtures3';
import { assert } from 'chai';

let { describe, it, beforeEach } = window;

describe('Block', () => {
    it('should be created with correctly', () => {
        let testCoords = [
            [1, 2],
            [4, 9],
            [0, 0]
        ];

        testCoords.forEach(testCoord => {
            let block = new Block(...testCoord);
            assert.equal(block.x, testCoord[0], 'x is set correctly');
            assert.equal(block.y, testCoord[1], 'y is set correctly');
            assert.ok(COLOURS.indexOf(block.colour) > -1, 'colour is valid');
        });
    });
});

describe('blockClicked', () => {
    var blockGrid = new BlockGrid();
    beforeEach(function() {
        blockGrid.grid = sampleGrid;
    });
    it('should change [0, 8] to red and [0, 9] to grey', () => {
        blockGrid.blockClicked({}, blockGrid.grid[0][8]);
        assert.deepEqual(blockGrid.grid, sampleGrid2, 'are da same');
    });
    it('should change a lot to match the sampleGrid3', () => {
        blockGrid.blockClicked({}, blockGrid.grid[8][2]);
        assert.deepEqual(blockGrid.grid, sampleGrid3, 'are da same');
    });
});
