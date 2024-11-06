class Wave {
  diameter = 0;
  speed = 100;
  onEnd = null;

  constructor(speed = 80) {
    this.speed = speed;
  }

  start({ onEnd }) {
    this.diameter = 1;
    this.onEnd = onEnd;
  }

  render({ origin, color, maxDiameter }) {
    if (this.diameter > 0) {
      if (this.diameter < maxDiameter) {
        fill("rgba(0, 0, 0, 0)");
        strokeWeight(20);
        stroke(color);
        circle(origin.x, origin.y, this.diameter);
        this.diameter += this.speed;
      } else {
        this.diameter = 0;
        this.onEnd?.();
      }
    }
  }

  reachedPoint({ x, y }, { x: ox, y: oy }) {
    return dist(x, y, ox, oy) < this.diameter / 2;
  }
}
