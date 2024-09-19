function grid2D(args) {
  const { minX, maxX, minY, maxY, stepX, stepY, callback } = args;

  grid1D({
    min: minX,
    max: maxX,
    step: stepX,
    callback: (x, xi) => {
      grid1D({
        min: minY,
        max: maxY,
        step: stepY,
        callback: (y, yi) => {
          callback(x, y, xi, yi);
        },
      });
    },
  });
}

function grid1D(args) {
  const { min, max, step, callback } = args;
  const leftover = (max - min) % step;
  const start = min + leftover / 2;
  let i = 0;

  for (let x = start; x <= max; x += step) {
    callback(x, i);
    i++;
  }
}
