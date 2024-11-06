const PIXELS_COUNT_H = 100;
const PIXELS_PADDING = 2;
const DEFAULT_COLOR = "#DDD";
const BRUSH_WIDTH = 2;
const DARK_MODE = false;
const BG = DARK_MODE ? "#1e1e1e" : "#fff";
const EDIT_MODE = false;

let clickPoint = null;
let completeColors = [];

let wave;
let editMode;
let grid;
let image;

function setup() {
  editMode = new EditMode(EDIT_MODE);
  wave = new Wave();
  const radius = windowWidth / PIXELS_COUNT_H - PIXELS_PADDING;
  grid = new Grid(PIXELS_COUNT_H, radius, DEFAULT_COLOR);
  image = new LayeredImage();
  image.addLayer(LAYERS);

  createCanvas(windowWidth, windowHeight);
}

function mouseMoved(event) {
  if (editMode.enabled && (event.ctrlKey || event.shiftKey)) {
    const intersections = grid.getIntersections(mouseX, mouseY, 1);
    intersections.forEach(([xIndex, yIndex]) => {
      editMode.setMarked(xIndex, yIndex, event.ctrlKey);
    });

    console.log("pixels", editMode.toString());
  }
}

function mouseClicked() {
  if (!editMode.enabled) {
    clickPoint = { x: mouseX, y: mouseY };
    wave.start({
      onEnd: () => {
        completeColors.push(image.getCurrentSubLayerColor());
        image.nextSubLayer();
      },
    });
  }
}

function draw() {
  background(BG);

  grid.renderPixels(({ x, y, xIndex, yIndex }) => {
    const color = image.getPixelColor(xIndex, yIndex) ?? DEFAULT_COLOR;
    return editMode.enabled
      ? editMode.isMarked(xIndex, yIndex)
        ? "red"
        : DEFAULT_COLOR
      : clickPoint &&
        (wave.reachedPoint({ x, y }, clickPoint) ||
          completeColors.includes(color))
      ? color
      : DEFAULT_COLOR;
  });

  // console.log(image.getCurrentColor());

  wave.render({
    origin: clickPoint,
    color: image.getCurrentColor(),
    maxDiameter: windowWidth * 2,
  });

  // console.log([...new Set(clicked)]);
}
