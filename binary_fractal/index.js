let MAX_DEPTH = 11;
const SPEED = parseInt(getQsParam("s")) || 20;
const TRACK_MOUSE = getQsParam("m") === "t";
const shapesToRender = getQsParam("r") || "rt";

let tiles = [];
let currentStep = 0;
let wasLeft = false;

function getQsParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

if (!TRACK_MOUSE) {
  setInterval(() => {
    currentStep++;
  }, SPEED);
}

function mouseClicked() {
  reInitTiles();
}

function recurTiles(x, y, W, H, vertical, depth, maxDepth = 4) {
  if (depth >= maxDepth) {
    return [];
  }

  return [
    [x, y, W, H],
    ...recurTiles(
      x,
      y,
      vertical ? W : W / 2,
      vertical ? H / 2 : H,
      !vertical,
      depth + 1,
      maxDepth
    ),
    ...recurTiles(
      vertical ? x : x + W / 2,
      vertical ? y + H / 2 : y,
      vertical ? W : W / 2,
      vertical ? H / 2 : H,
      !vertical,
      depth + 1,
      maxDepth
    ),
  ];
}

function _random(a = true, b = false) {
  return Math.random() > 0.5 ? a : b;
}

function reInitTiles() {
  tiles = recurTiles(0, 0, windowWidth, windowHeight, false, 0, ++MAX_DEPTH);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  reInitTiles();
  fill("rgba(0, 0, 0, 0.07)");
  stroke("white");
}

function draw() {
  background("orange");
  // beginShape();
  tiles?.forEach(([x, y, w, h], i) => {
    if (TRACK_MOUSE) {
      if (
        // i > 0 &&
        x <= mouseX &&
        mouseX <= x + w &&
        y <= mouseY &&
        mouseY <= y + h
      ) {
        if (shapesToRender.includes("t")) {
          triangle(x + w / 2, y, x + w, y + h, x, y + h);
        }

        if (shapesToRender.includes("e")) {
          ellipse(x + w / 2, y + h / 2, w, h);
        }

        if (shapesToRender.includes("r")) {
          rect(x, y, w, h);
        }

        // if (shapesToRender.includes("v")) {
        //   vertex(x + w / 2, y + h / 2);
        // }
      }
    } else {
      if (currentStep >= i) {
        if (shapesToRender.includes("r")) {
          rect(x, y, w, h);
        }

        if (shapesToRender.includes("t")) {
          triangle(x + w / 2, y, x + w, y + h, x, y + h);
        }

        if (shapesToRender.includes("e")) {
          ellipse(x + w / 2, y + h / 2, w, h);
        }
      }
    }
  });
  // endShape();

  //   const testTiles = tiles?.slice(0, 2);
  //   const [x, y, w, h] = testTiles[0];
  //   const [x2, y2, w2, h2] = testTiles[1];

  //   beginShape();
  //   vertex(x, y);
  //   bezierVertex(x, y + h, x + w, y + h, x + w, y);
  //   bezierVertex(x, y, x, y + h, x + w, y + h);
  //   endShape();
}
