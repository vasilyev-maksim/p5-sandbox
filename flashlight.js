let mode = true;

function mouseClicked() {
  mode = !mode;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  const W = windowWidth;
  const H = windowHeight;
  const S = 20;

  background(255);

  grid2D({
    minX: 0,
    maxX: W,
    minY: 0,
    maxY: H,
    stepX: S,
    stepY: S,
    callback: (x, y) => {
      const d = dist(x, y, mouseX, mouseY);
      const fr = 120;
      const maxSide = max(W, H);
      const r = d / maxSide;
      const opacity = r ** 0.5 * 255;

      fill(0, opacity);
      circle(x, y, S * 2 * (mode && d < fr ? (d / fr) ** 2.5 : 1));
    },
  });
}
