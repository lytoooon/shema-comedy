// Full-screen quad.
export const vertexSource = /* glsl */ `
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// Marbled ink: fine contour lines (u_ink) over soft pools (u_wash). Scrolling scrolls the
// pattern, and fast scrolling stretches it into streaks (u_streak).
export const fragmentSource = /* glsl */ `
  #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
  #else
    precision mediump float;
  #endif

  varying vec2 v_uv;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_scroll;
  uniform float u_streak;
  uniform float u_stretch;
  uniform float u_opacity;
  uniform vec3 u_ink;
  uniform vec3 u_wash;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += noise(p) * amplitude;
      p = p * 2.03 + vec2(17.1, 9.2);
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    float time = u_time;
    vec2 p = v_uv * vec2(u_resolution.x / u_resolution.y, 1.0) * 3.0;
    p.y = (p.y - 1.5) / (1.0 + u_streak * u_stretch) + 1.5;
    p.y += (u_scroll / u_resolution.y) * 3.0;

    vec2 flow = vec2(fbm(p + vec2(0.0, time)), fbm(p + vec2(4.4, -time * 0.73)));
    float field = fbm(p + flow * 2.1 + vec2(-time * 0.55, time * 0.31));
    float pooled = fbm(p * 0.68 + flow * 1.25 + vec2(time * 0.18, -time * 0.22));

    float contour = abs(field - 0.49);
    float lines = 1.0 - smoothstep(0.012, 0.058, contour);
    float pools = 1.0 - smoothstep(0.31, 0.57, pooled);

    vec3 color = mix(u_ink, u_wash, smoothstep(0.0, 0.1, contour));
    float alpha = clamp(lines * 0.55 + pools * 0.22, 0.0, 1.0) * u_opacity;
    gl_FragColor = vec4(color * alpha, alpha); // premultiplied, as the page compositor expects
  }
`;
