export const vertexSource = `
          attribute vec2 a_position;
          varying vec2 v_uv;
          void main() {
            v_uv = a_position * 0.5 + 0.5;
            gl_Position = vec4(a_position, 0.0, 1.0);
          }
        `;

export const fragmentSource = (speed, opacity) => `
          precision mediump float;
          varying vec2 v_uv;
          uniform vec2 u_resolution;
          uniform float u_time;
          uniform float u_scroll;
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
            float time = u_time * ${speed.toFixed(2)};
            vec2 p = v_uv * vec2(u_resolution.x / u_resolution.y, 1.0) * 3.0;
            p.y += (u_scroll / u_resolution.y) * 3.0;
            vec2 flow = vec2(fbm(p + vec2(0.0, time)), fbm(p + vec2(4.4, -time * 0.73)));
            float field = fbm(p + flow * 2.1 + vec2(-time * 0.55, time * 0.31));
            float pooledInk = fbm(p * 0.68 + flow * 1.25 + vec2(time * 0.18, -time * 0.22));
            float contour = abs(field - 0.49);
            float web = 1.0 - smoothstep(0.012, 0.058, contour);
            float ink = 1.0 - smoothstep(0.31, 0.57, pooledInk);
            vec3 brown = vec3(0.27, 0.16, 0.10);
            vec3 warm = vec3(0.48, 0.35, 0.25);
            vec3 color = mix(brown, warm, smoothstep(0.0, 0.1, contour));
            float alpha = clamp(web * 0.48 + ink * 0.25, 0.0, ${opacity.toFixed(2)});
            gl_FragColor = vec4(color, alpha);
          }
        `;
