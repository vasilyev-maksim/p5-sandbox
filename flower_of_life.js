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
  delta += 0.009;
  //  (D * (2 - radiusDelta ** 2)) / 2
  const D = windowWidth / N;
  const R = D / 2;
  const radius = (2 - (sin(delta) + 1) / 2) * R;

  background(darkMode ? 0 : 255, 255);
  stroke(!darkMode ? 0 : 255);
  fill(0, 0, 0, 0);
  translate(-(sqrt(3) * R) / 4, -R / 4);

  function drawCircle(x, y) {
    const r = Math.floor(
      ((Math.abs(x - mouseX) % windowWidth) / windowWidth) * 255
    );
    const g = Math.floor(
      ((Math.abs(y - mouseY) % windowHeight) / windowHeight) * 255
    );
    const b = Math.floor(255 - (r + g) / 2);
    fill(r, g, b, 100);
    circle(x, y, radius);
  }

  function drawFlowerOfLife() {
    grid2D({
      minX: 0,
      maxX: windowWidth,
      minY: 0,
      maxY: windowHeight,
      stepX: sqrt(3) * R,
      stepY: R,
      callback: drawCircle,
    });

    grid2D({
      minX: 0,
      maxX: windowWidth,
      minY: 0,
      maxY: windowHeight,
      stepX: sqrt(3) * R,
      stepY: R,
      callback: (x, y) => drawCircle(x + (sqrt(3) * R) / 2, y + R / 2),
    });

    // getGrid({
    //   minX: 0,
    //   maxX: windowWidth,
    //   minY: 0,
    //   maxY: windowHeight,
    //   stepX: sqrt(3) * R,
    //   stepY: R,
    //   shiftY: R / 2,
    //   shiftX: (sqrt(3) * R) / 2,
    // }).forEach(drawCircle);
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
