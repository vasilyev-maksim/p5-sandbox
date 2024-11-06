class LayeredImage {
  layers = [];
  currentLayer = 0;
  currentSubLayer = 0;

  nextLayer() {
    this.currentLayer++;
    this.currentSubLayer = 0;
  }

  getCurrentLayer() {
    return this.layers[this.currentLayer];
  }

  getCurrentSubLayerColor() {
    return this.getCurrentLayer().colors[this.currentSubLayer];
  }

  nextSubLayer() {
    if (this.getCurrentLayer().colors.length - 1 > this.currentSubLayer) {
      this.currentSubLayer++;
    }
  }

  addLayer(layer) {
    const newLayer = {
      colors: layer.map((x) => x.color),
      pixels: layer.reduce(
        (acc, subLayer) => ({ ...acc, ...getPixelMap(subLayer) }),
        {}
      ),
    };

    this.layers.push(newLayer);
  }

  getPixelColor(xi, yi) {
    const color = this.getCurrentLayer().pixels[xi + " " + yi];
    return this.getCurrentLayer().colors.indexOf(color) <= this.currentSubLayer
      ? color
      : undefined;
  }

  getCurrentColor() {
    return this.getCurrentLayer().colors[this.currentSubLayer];
  }
}
