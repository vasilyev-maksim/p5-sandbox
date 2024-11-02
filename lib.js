function grid2D(args) {
  const {
    minX,
    maxX,
    minY,
    maxY,
    xStepCount,
    xStepLength,
    yStepCount,
    yStepLength,
    callback,
  } = args;

  if (xStepLength != null || xStepCount != null) {
    grid1D({
      min: minX,
      max: maxX,
      stepLength: xStepLength,
      stepCount: xStepCount,
      callback: ({
        x,
        index: xIndex,
        stepCount: _xStepCount,
        stepLength: _xStepLength,
      }) => {

        grid1D({
          min: minY,
          max: maxY,
          stepLength: yStepLength ?? _xStepLength,
          stepCount: yStepCount,
          callback: ({
            x: y,
            index: yIndex,
            stepCount: _yStepCount,
            stepLength: _yStepLength,
          }) => {
            callback({
              x,
              y,
              xIndex,
              yIndex,
              xStepCount: _xStepLength,
              xStepLength: _xStepLength,
              yStepCount: _yStepCount,
              yStepLength: _yStepLength,
            });
          },
        });
      },
    });
  } else {
    grid1D({
      min: minY,
      max: maxY,
      stepLength: yStepLength,
      stepCount: yStepCount,
      callback: ({
        x: y,
        index: yIndex,
        stepCount: _yStepCount,
        stepLength: _yStepLength,
      }) => {
        grid1D({
          min: minX,
          max: maxX,
          stepLength: xStepLength ?? _yStepLength,
          stepCount: xStepCount,
          callback: ({
            x,
            index: xIndex,
            stepCount: _xStepCount,
            stepLength: _xStepLength,
          }) => {
            callback({
              x,
              y,
              xIndex,
              yIndex,
              xStepCount: _xStepLength,
              xStepLength: _xStepLength,
              yStepCount: _yStepCount,
              yStepLength: _yStepLength,
            });
          },
        });
      },
    });
  }
}

function grid1D(args) {
  const { min, max, stepCount, stepLength, callback } = args;
  const length = max - min;
  const _stepLength = stepLength ?? Math.floor(length / stepCount);
  const padding = (length % _stepLength) / 2;
  const start = min + padding + _stepLength / 2;
  let i = 0;

  for (let x = start; x < max; x += _stepLength) {
    callback({ x, index: i++, stepCount, stepLength: _stepLength });
  }
}
