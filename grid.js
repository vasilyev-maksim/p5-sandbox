function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  grid2D({
    minX: 0,
    maxX: windowWidth,
    minY: 0,
    maxY: windowHeight,
    xStepCount: 3,
    // yStepLength: 250,
    callback: ({ x, y }) => {
      fill("red");
      // stroke("#CCC");
      // strokeWeight(1);
      circle(x, y, 10);
    },
  });
}
