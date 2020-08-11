import Block, { COLOURS } from './Block';

describe('Block', () => {
  it('should be created with correct coordinates and one of the valid colours', () => {
    const testCoords = [
      [1, 2],
      [4, 9],
      [0, 0],
    ];

    testCoords.forEach(testCoord => {
      const block = new Block(...testCoord);
      expect(block.x).toBe(testCoord[0]);
      expect(block.y).toBe(testCoord[1]);
      expect(COLOURS).toContain(block.colour);
    });
  });
});
