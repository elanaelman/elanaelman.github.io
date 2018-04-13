function main() {
  const canvas = document.getElementById("c3d");
  const ctx = canvas.getContext("webgl");
  if (!ctx) {
    alert(`Could not load canvas.
      Please ensure that your browser and machine support WebGL.`);
    return;
  }
  ctx.clearColor(0, 0, 1, 1);
  ctx.clear(ctx.COLOR_BUFFER_BIT);
}
