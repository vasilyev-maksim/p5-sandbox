let mode = true;

function mouseClicked() {
  mode = !mode;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

  // createCapture(VIDEO).position(0, 0);

  beginShape();
  vertex(100, 100);
  bezierVertex(100, 150, 150, 200, 200, 200);
  endShape();
}
