import { REDUCED_MOTION } from "../motion.js";
import { FLUID_SPEED, FLUID_OPACITY } from "../config.js";
import { vertexSource, fragmentSource as buildFragment } from "./shaders.js";

export function createFluidBackground() {
  if (REDUCED_MOTION) return;
  const canvas = document.getElementById("fluid-canvas");
  const gl = canvas.getContext("webgl", { alpha: true, antialias: false, powerPreference: "low-power" });
  if (!gl) {
    console.warn("WebGL is unavailable; the fluid background is disabled.");
    return;
  }

  function compileShader(type, source) {
    const shader = gl.createShader(type);
    if (!shader) {
      console.warn("The fluid shader could not be allocated.");
      return null;
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn("The fluid shader could not compile.", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  const vertexShader = compileShader(gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = compileShader(gl.FRAGMENT_SHADER, buildFragment(FLUID_SPEED, FLUID_OPACITY));
  if (!vertexShader || !fragmentShader) return;

  const program = gl.createProgram();
  if (!program) {
    console.warn("The fluid shader program could not be allocated.");
    return;
  }
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn("The fluid shader program could not link.", gl.getProgramInfoLog(program));
    return;
  }

  const buffer = gl.createBuffer();
  if (!buffer) {
    console.warn("The fluid vertex buffer could not be allocated.");
    return;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );
  gl.useProgram(program);
  const position = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const resolution = gl.getUniformLocation(program, "u_resolution");
  const time = gl.getUniformLocation(program, "u_time");
  const scrollOffset = gl.getUniformLocation(program, "u_scroll");
  let pixelRatio = 1;
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  function resizeFluidCanvas() {
    pixelRatio = Math.min(window.devicePixelRatio * 0.5, 0.8);
    canvas.width = Math.max(1, Math.round(window.innerWidth * pixelRatio));
    canvas.height = Math.max(1, Math.round(window.innerHeight * pixelRatio));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(resolution, canvas.width, canvas.height);
  }

  let frameRequest = 0;
  let startTime = 0;

  function drawFluid(timestamp) {
    if (document.hidden) return;
    if (!startTime) startTime = timestamp;
    gl.uniform1f(time, (timestamp - startTime) / 1000);
    gl.uniform1f(scrollOffset, window.scrollY * pixelRatio);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    frameRequest = window.requestAnimationFrame(drawFluid);
  }

  function syncFluidVisibility() {
    if (document.hidden) {
      window.cancelAnimationFrame(frameRequest);
      frameRequest = 0;
    } else if (!frameRequest) {
      frameRequest = window.requestAnimationFrame(drawFluid);
    }
  }

  resizeFluidCanvas();
  window.addEventListener("resize", resizeFluidCanvas, { passive: true });
  document.addEventListener("visibilitychange", syncFluidVisibility);
  syncFluidVisibility();
}
