function main() {
  const canvas = document.getElementById("c3d");
  const ctx = canvas.getContext("webgl");
  if (!ctx) {
    alert(`Could not load canvas.
      Please ensure that your browser and machine support WebGL.`);
    return;
  } else {

    let vertexShaderSource = document.getElementById("vertex-shader");
    let fragmentShaderSource = document.getElementById("fragment-shader");
    let vertexShader = createShader(ctx, ctx.VERTEX_SOURCE, vertexShaderSource);
    let fragmentShader = createShader(ctx, ctx.FRAGMENT_SOURCE, fragmentShaderSource);

    var program = createProgram(ctx, vertexShader, fragmentShader);

    var positionAttributeLocation = ctx.getAttribLocation(program, "a_position");
    var positionBuffer = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, positionBuffer);
    // three 2d points
    var positions = [
      0, 0,
      0, 0.5,
      0.7, 0,
    ];
    ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(positions), ctx.STATIC_DRAW);
    ctx.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    ctx.clearColor(0, 0, 0, 0);
    ctx.clear(ctx.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    ctx.enableVertexAttribArray(positionAttributeLocation);
    ctx.bindBuffer(ctx.ARRAY_BUFFER, positionBuffer);
    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    let size = 2;          // 2 components per iteration
    let type = ctx.FLOAT;   // the data is 32bit floats
    let normalize = false; // don't normalize the data
    let stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    let offset = 0;        // start at the beginning of the buffer
    ctx.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

    let primitiveType = gl.TRIANGLES;
    let offset = 0;
    let count = 3;
    ctx.drawArrays(primitiveType, offset, count);
  }
}

function createShader(ctx, type, source) {
  let shader = ctx.createShader(type);
  ctx.shaderSource(shader, source);
  ctx.compileShader(shader);
  let success = ctx.getShaderParameter(shader, ctx.COMPILE_STATUS);
  if (success) {
    return shader;
  }
  alert(ctx.getShaderInfoLog(shader));
  ctx.deleteShader(shader);
}

function createProgram(ctx, vertexShader, fragmentShader) {
  let program = ctx.createProgram();
  ctx.attachShader(program, vertexShader);
  ctx.attachShader(program, fragmentShader);
  ctx.linkProgram(program);
  let success = ctx.getProgramParameter(program, ctx.LINK_STATUS);
  if (success) {
    return program;
  }

  alert(ctx.getProgramInfoLog(program));
  ctx.deleteProgram(program);
}
