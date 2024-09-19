let delta = 0;
const N = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

let darkMode = true;

function mouseClicked() {
  darkMode = !darkMode;
}

function draw() {
  delta = (delta + 0.01) % 2;
  const radiusDelta = Math.abs(1 - delta);
  const D = windowWidth / N;
  const R = D / 2;

  background(darkMode ? 0 : 255);
  stroke(!darkMode ? 0 : 255);
  fill(0, 0, 0, 0);
  // translate(-R / 2, -R / 2);

  function drawCircle(coords) {
    const r = Math.floor(
      ((Math.abs(coords[0] - mouseX) % windowWidth) / windowWidth) * 255
    );
    const g = Math.floor(
      ((Math.abs(coords[1] - mouseY) % windowHeight) / windowHeight) * 255
    );
    const b = Math.floor(255 - (r + g) / 2);
    fill(r, g, b, 100);
    circle(coords[0], coords[1], D * radiusDelta);
  }

  function drawFlowerOfLife() {
    getGrid({
      minX: 0,
      maxX: windowWidth,
      minY: 0,
      maxY: windowHeight,
      stepX: sqrt(3) * R,
      stepY: R,
    }).forEach(drawCircle);

    getGrid({
      minX: 0,
      maxX: windowWidth,
      minY: 0,
      maxY: windowHeight,
      stepX: sqrt(3) * R,
      stepY: R,
      shiftY: R / 2,
      shiftX: (sqrt(3) * R) / 2,
    }).forEach(drawCircle);
  }

  drawFlowerOfLife();
}

function getGrid(args) {
  const { minX, maxX, minY, maxY, stepX, stepY, shiftX = 0, shiftY = 0 } = args;
  const grid = [];
  for (let dx = 0; dx - stepX <= maxX; dx += stepX) {
    for (let dy = 0; dy - stepY <= maxY; dy += stepY) {
      grid.push([minX + dx + shiftX, minY + dy + shiftY]);
    }
  }
  return grid;
}

function getRadialGrid(x, y, r, steps, shift = 0) {
  const grid = [];
  for (let i = 0; i < steps; i += 1) {
    grid.push([
      x + r * cos((Math.PI * 2 * i) / steps + shift),
      y + r * sin((Math.PI * 2 * i) / steps + shift),
    ]);
  }
  return grid;
}
