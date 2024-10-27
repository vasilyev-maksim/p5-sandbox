let delta = 0;
const N = 10;

function setup() {
  const D = windowWidth / N;
  const canvas = createCanvas(windowWidth + 2 * D, windowHeight + 2 * D);
  canvas.position(-D, -D);
}

let darkMode = true;

function mouseClicked() {
  darkMode = !darkMode;
}

function draw() {
  delta += 0.009;
  //  (D * (2 - radiusDelta ** 2)) / 2
  const D = windowWidth / N;
  const W = windowWidth + 2 * D;
  const H = windowHeight + 2 * D;
  const R = D / 2;
  const radius = (2 - (sin(delta) + 1) / 2) * R;

  background(darkMode ? 0 : 255, 255);
  stroke(!darkMode ? 0 : 255);
  fill(0, 0, 0, 0);
  translate(-(sqrt(3) * R) / 4, -R / 4);

  function drawCircle({ x, y }) {
    const r = Math.floor(((Math.abs(x - mouseX) % W) / W) * 255);
    const g = Math.floor(((Math.abs(y - mouseY) % H) / H) * 255);
    const b = Math.floor(255 - (r + g) / 2);
    fill(r, g, b, 100);
    circle(x, y, radius);
  }

  function drawFlowerOfLife() {
    grid2D({
      minX: 0,
      maxX: W,
      minY: 0,
      maxY: H,
      xStepLength: sqrt(3) * R,
      yStepLength: R,
      callback: drawCircle,
    });

    grid2D({
      minX: 0,
      maxX: W,
      minY: 0,
      maxY: H,
      xStepLength: sqrt(3) * R,
      yStepLength: R,
      callback: ({ x, y }) =>
        drawCircle({ x: x + (sqrt(3) * R) / 2, y: y + R / 2 }),
    });
  }

  drawFlowerOfLife();
}
