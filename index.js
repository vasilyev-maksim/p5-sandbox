function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  const W = windowWidth;
  const H = windowHeight;
  const P = 100;

  background(255);
  fill("green");
  rect(P, P, W - P * 2, H - P * 2);

  grid2D({
    minX: P,
    maxX: W - P,
    minY: P,
    maxY: H - P,
    stepX: 100,
    stepY: 100,
    callback: (x, y) => {
      fill(0);
      circle(x, y, 2);
    },
  });
}
