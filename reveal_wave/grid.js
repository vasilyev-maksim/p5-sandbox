class Grid {
  constructor(xStepCount, pixelRadius, defaultColor) {
    this.xStepCount = xStepCount;
    this.pixelRadius = pixelRadius;
    this.defaultColor = defaultColor;
  }

  traverseGrid(callback) {
    grid2D({
      minX: 0,
      maxX: windowWidth,
      minY: 0,
      maxY: windowHeight,
      xStepCount: this.xStepCount,
      callback,
    });
  }

  renderPixels(colorProvider) {
    this.traverseGrid(({ x, y, xIndex, yIndex }) => {
      const color = colorProvider({ x, y, xIndex, yIndex });
      fill(color);
      stroke(this.defaultColor);
      strokeWeight(1);
      circle(x, y, this.pixelRadius);
    });
  }

  getIntersections(targetX, targetY, radiusMultiplier = 1) {
    let intersections = [];

    this.traverseGrid(({ x, y, xIndex, yIndex }) => {
      if (dist(targetX, targetY, x, y) < radiusMultiplier * this.pixelRadius) {
        intersections.push([xIndex, yIndex]);
      }
    });

    return intersections;
  }
}
