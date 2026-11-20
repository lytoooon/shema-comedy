// WebGL marbled-ink background behind the page. Tune it in scripts/config.js (FLUID).
// Skipped for reduced motion, and quietly disabled if WebGL isn't available.
import { gsap, REDUCED_MOTION } from "../core/motion.js";
import { scrollMotion } from "../core/scroll-velocity.js";
import { FLUID } from "../config.js";
import { vertexSource, fragmentSource } from "./shaders.js";

const MAX_PIXEL_RATIO = 0.8; // the pattern is soft, so render below screen resolution

export function createFluidBackground() {
  const canvas = document.querySelector("[data-fluid]");
  if (!canvas || REDUCED_MOTION) return;

  const gl = canvas.getContext("webgl", { alpha: true, antialias: false, powerPreference: "low-power" });
  const program = gl && createProgram(gl);
  if (!program) {
    canvas.remove();
    return;
  }

  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );
  const position = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const uniform = (name) => gl.getUniformLocation(program, name);
  const u = {
    resolution: uniform("u_resolution"),
    time: uniform("u_time"),
    scroll: uniform("u_scroll"),
    streak: uniform("u_streak"),
  };
  gl.uniform1f(uniform("u_stretch"), FLUID.streakStretch);
  gl.uniform1f(uniform("u_opacity"), FLUID.opacity);
  gl.uniform3fv(uniform("u_ink"), hexToRgb(FLUID.ink));
  gl.uniform3fv(uniform("u_wash"), hexToRgb(FLUID.wash));

  let pixelRatio = 1;
  function resize() {
    pixelRatio = gsap.utils.clamp(0.6, MAX_PIXEL_RATIO, window.devicePixelRatio * 0.5);
    canvas.width = Math.max(1, Math.round(window.innerWidth * pixelRatio));
    canvas.height = Math.max(1, Math.round(window.innerHeight * pixelRatio));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(u.resolution, canvas.width, canvas.height);
  }

  // Fast scrolling pushes the ink further than the scroll itself, for a streaky rush.
  let streakOffset = 0;
  function draw(time) {
    streakOffset += Math.abs(scrollMotion.delta) * scrollMotion.speed * FLUID.streakBoost;
    gl.uniform1f(u.time, time * FLUID.speed);
    gl.uniform1f(u.scroll, (window.scrollY + streakOffset) * pixelRatio);
    gl.uniform1f(u.streak, scrollMotion.speed);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });
  gsap.ticker.add(draw); // shares the page's frame loop; browsers pause it in background tabs

  canvas.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    gsap.ticker.remove(draw);
  });
}

function createProgram(gl) {
  const compile = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
    console.warn("Fluid background: shader failed to compile.", gl.getShaderInfoLog(shader));
    return null;
  };

  const vertex = compile(gl.VERTEX_SHADER, vertexSource);
  const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertex || !fragment) return null;

  const program = gl.createProgram();
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program;
  console.warn("Fluid background: shader program failed to link.", gl.getProgramInfoLog(program));
  return null;
}

/** "#2c2621" → [0.17, 0.15, 0.13] */
function hexToRgb(hex) {
  const value = parseInt(hex.replace("#", ""), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255].map((channel) => channel / 255);
}
