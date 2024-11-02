class EditMode {
  marked = {};

  constructor(enabled) {
    this.enabled = !!enabled;
  }

  isMarked(x, y) {
    return !!this.marked[x + " " + y];
  }

  setMarked(x, y, isMarked) {
    this.marked[x + " " + y] = isMarked;
  }

  toggleMarked(x, y) {
    this.setMarked(x, y, !this.isMarked(x, y));
  }

  toString() {
    return Object.entries(this.marked)
      .filter(([, v]) => v)
      .map(([k]) => k)
      .join("_");
  }
}
