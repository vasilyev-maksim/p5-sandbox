function grid2D(args) {
  const { minX, maxX, minY, maxY, stepX, stepY, callback } = args;

  grid1D({
    min: minX,
    max: maxX,
    step: stepX,
    callback: (x) => {
      grid1D({
        min: minY,
        max: maxY,
        step: stepY,
        callback: (y) => {
          callback(x, y);
        },
      });
    },
  });
}

function grid1D(args) {
  const { min, max, step, callback } = args;
  const leftover = (max - min) % step;
  const start = min + leftover / 2;

  for (let i = start; i <= max; i += step) {
    callback(i);
  }
}
