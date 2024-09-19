function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  const W = windowWidth;
  const H = windowHeight;
  const S = 20;

  background(255);
  // stroke("red");
  // strokeWeight(0);

  grid2D({
    minX: 0,
    maxX: W,
    minY: 0,
    maxY: H,
    stepX: S,
    stepY: S,
    callback: (x, y) => {
      const d = dist(x, y, mouseX, mouseY);
      const maxSide = max(W, H);
      const opacity = (d / maxSide) ** 0.65 * 255;
      // stroke(255, 0, 0, opacity);
      fill(0, opacity);
      circle(x, y, S * 2);
    },
  });
}
