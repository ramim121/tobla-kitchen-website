import { useEffect, useRef, useState, type RefObject } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   Full-page steam for the construction gate.

   One fragment shader draws soft, curling vapour over the whole viewport:
   a plume that rises off the plate (its position is read from the DOM), a
   thinner haze that drifts up across the full width, and a small swirl where
   the pointer moves through it.

   Steam is soft by nature, so the canvas renders at a fraction of the screen
   resolution and is scaled up by CSS. That keeps it cheap on phones; if the
   device still struggles, the resolution steps down on its own.
   No WebGL → a CSS fallback. Reduced motion → one still frame.
   ──────────────────────────────────────────────────────────────────────── */

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 u_res;     // canvas size in pixels
uniform float u_time;   // seconds
uniform vec3 u_src;     // plate: x, y in 0..1 (y up), radius in screen heights
uniform vec3 u_ptr;     // pointer: x, y in 0..1 (y up), energy 0..1
uniform float u_burst;  // 0..1, floods the screen with steam (unlock reveal)
uniform float u_gain;   // overall strength

vec2 hash22(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy) * 2.0 - 1.0;
}

// gradient noise, roughly -0.7..0.7
float gnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  float a = dot(hash22(i), f);
  float b = dot(hash22(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0));
  float c = dot(hash22(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0));
  float d = dot(hash22(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

const mat2 ROT = mat2(0.8, -0.6, 0.6, 0.8);

float fbm4(vec2 p) {
  float s = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    s += a * gnoise(p);
    p = ROT * p * 2.03 + vec2(11.3, 7.9);
    a *= 0.5;
  }
  return s;
}

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

// One curl of steam off the plate: a soft ribbon whose centre line wanders
// as it climbs. It starts thin and bright, then widens and thins away.
// p is measured from the plate (x right, y up), in screen heights.
float curl(vec2 p, float seed, float t, float R) {
  float h = p.y;
  float r1 = hash11(seed);
  float r2 = hash11(seed + 17.0);
  float r3 = hash11(seed + 41.0);
  float r4 = hash11(seed + 73.0);
  float ph = r1 * 6.2831;
  float len = 0.28 + 0.62 * r3;                       // how high it reaches
  float k = 6.5 + 6.0 * r2;                           // how wavy
  float v = 0.8 + 0.9 * r4;                           // how fast the wave climbs
  float hp = max(h, 0.0);
  float amp = 0.008 + 0.105 * hp;                     // sways more the higher it gets
  float cx = (r2 - 0.5) * 1.5 * R * (1.0 + 0.9 * hp / len)
           + amp * sin(hp * k - t * v + ph)
           + amp * 0.45 * sin(hp * k * 2.3 - t * v * 1.6 + ph * 2.1)
           - 0.10 * hp * hp;                           // a light draught to the left
  float w = 0.0050 + 0.032 * hp;                      // widens as it cools
  float dx = (p.x - cx) / w;
  float body = exp(-dx * dx);
  float halo = exp(-dx * dx / 14.0);
  float life = 0.55 + 0.45 * sin(t * (0.22 + 0.25 * r4) + ph * 2.0);   // each curl comes and goes
  float fade = smoothstep(0.0, 0.05, h) * (1.0 - smoothstep(len * 0.4, len, h));
  float puff = 0.62 + 0.38 * sin(hp * 10.0 - t * (1.3 + r2) + ph * 3.0);  // puffs travelling up
  return (body * 0.5 + halo * 0.15) * life * fade * puff * min(2.2, 0.011 / w + 0.4);
}

// Tall, faint veils that rise from the bottom edge all the way across the page.
// One veil per column of the screen; each pixel only looks at its neighbours.
// c = spacing in screen heights, seed = which set of veils.
float veils(vec2 p, float t, float c, float seed) {
  float id = floor(p.x / c);
  float h = p.y;
  float acc = 0.0;
  for (int j = -1; j <= 1; j++) {
    float cid = id + float(j) + seed;
    float r1 = hash11(cid * 1.7 + 3.0);
    float r2 = hash11(cid * 2.3 + 11.0);
    float r3 = hash11(cid * 3.1 + 29.0);
    float ph = r1 * 6.2831;
    float amp = (0.07 + 0.30 * h) * c;
    float k = 4.0 + 5.0 * r2;
    float v = 0.4 + 0.5 * r3;
    float cx = (cid - seed + 0.2 + 0.6 * r1) * c
             + amp * sin(h * k - t * v + ph)
             + amp * 0.5 * sin(h * k * 2.1 - t * v * 1.7 + ph * 1.9)
             - 0.06 * h;
    float w = (0.028 + 0.115 * h) * c;
    float dx = (p.x - cx) / w;
    float body = exp(-dx * dx);
    float halo = exp(-dx * dx / 10.0);
    float life = 0.5 + 0.5 * sin(t * (0.16 + 0.2 * r2) + ph * 2.0);
    float fade = smoothstep(-0.03, 0.2, h) * (1.0 - smoothstep(0.4 + 0.5 * r3, 1.1, h));
    float puff = 0.6 + 0.4 * sin(h * 6.0 - t * (0.7 + r3) + ph);
    acc += (body * 0.55 + halo * 0.2) * life * fade * puff;
  }
  return acc;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float asp = u_res.x / u_res.y;
  vec2 p = vec2(uv.x * asp, uv.y);          // screen height = 1
  float t = u_time;

  // the pointer stirs the steam: a little swirl and a push outwards
  vec2 m = vec2(u_ptr.x * asp, u_ptr.y);
  vec2 dm = p - m;
  float infl = u_ptr.z * exp(-dot(dm, dm) / 0.012);
  float ang = infl * 1.7;
  float cs = cos(ang);
  float sn = sin(ang);
  p = m + mat2(cs, -sn, sn, cs) * dm * (1.0 + 0.4 * infl);

  // slow turbulence bends every ribbon a little, so nothing looks drawn with a ruler
  vec2 flow = vec2(-0.02, 0.085);
  vec2 turb = vec2(fbm4(p * 2.1 - flow * t * 1.4), fbm4(p * 2.1 - flow * t * 1.2 + vec2(5.2, 1.3)));
  float grain = fbm4(p * vec2(5.0, 2.2) - flow * t * 3.0 + turb);
  vec2 pw = p + turb * 0.045;

  vec2 src = vec2(u_src.x * asp, u_src.y);
  vec2 d = pw - src;
  float R = u_src.z;

  float plume = 0.0;
  for (int i = 0; i < 8; i++) {
    plume += curl(d, float(i) * 7.31 + 1.0, t, R);
  }

  float veil = veils(pw, t, 0.27, 0.0) + 0.6 * veils(pw + vec2(0.11, 0.0), t * 1.15, 0.17, 40.0);

  // a breath of soft haze around the plume and along the bottom, for depth
  float hh = max(d.y, 0.0);
  float around = exp(-pow(d.x / (R * 1.4 + 0.5 * hh), 2.0)) * smoothstep(0.0, R, d.y) * (1.0 - smoothstep(0.2, 0.9, d.y));
  float haze = (0.5 + turb.x + turb.y) * (around * 0.10 + exp(-uv.y * 4.0) * 0.05);

  float body = 0.72 + 0.9 * grain;          // breaks the ribbons up so they read as vapour
  float dens = plume * 1.25 * body + min(veil * 0.66 * body, 0.36) + max(haze, 0.0);
  dens *= 1.0 - 0.8 * infl;                 // the pointer clears a small hole

  float a = clamp(dens * u_gain, 0.0, 0.72);

  // unlock: steam billows up from the bottom until the screen is covered
  float flood = smoothstep(0.0, 1.0, u_burst * 1.9 - uv.y * 0.9 + (turb.x + grain) * 0.8 * (1.0 - u_burst));
  a = mix(a, 1.0, flood);

  // warm white, a little amber close to the plate (lit from below)
  float near = exp(-dot(d, d) / (R * R * 9.0));
  vec3 col = mix(vec3(1.0, 0.975, 0.945), vec3(1.0, 0.85, 0.68), near * 0.5);
  col = mix(col, vec3(1.0, 0.992, 0.984), flood);

  // a pinch of dither so the soft gradients never band
  float dither = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 255.0;
  a = clamp(a + dither, 0.0, 1.0);

  gl_FragColor = vec4(col * a, a);          // premultiplied alpha
}
`;

type Props = {
  /** The element the steam rises from (the plate). */
  sourceRef: RefObject<HTMLElement | null>;
  /** Freeze the steam on its current frame. */
  paused?: boolean;
  /** Flood the screen with steam (the unlock reveal). */
  burst?: boolean;
  className?: string;
};

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function Vapour({ sourceRef, paused = false, burst = false, className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);
  const live = useRef({ paused, burst });
  const wake = useRef<() => void>(() => {});

  useEffect(() => {
    live.current.paused = paused;
    live.current.burst = burst;
    wake.current();
  }, [paused, burst]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    }) as WebGLRenderingContext | null;
    if (!gl) {
      setFallback(true);
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();
    if (!vs || !fs || !program) {
      setFallback(true);
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setFallback(true);
      return;
    }
    gl.useProgram(program);

    // one big triangle covers the screen
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const U = {
      res: gl.getUniformLocation(program, "u_res"),
      time: gl.getUniformLocation(program, "u_time"),
      src: gl.getUniformLocation(program, "u_src"),
      ptr: gl.getUniformLocation(program, "u_ptr"),
      burst: gl.getUniformLocation(program, "u_burst"),
      gain: gl.getUniformLocation(program, "u_gain"),
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const highp = (gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT)?.precision ?? 0) > 0;

    let stopped = false;
    let raf = 0;
    let last = 0;
    let time = 24; // start "warm": the plume is already up when the page appears
    let burstNow = 0;
    let budget = 300_000; // pixels the canvas may spend; steps down if frames run slow
    let slowFrames = 0;
    let tick = 0;
    const src = { x: 0.72, y: 0.5, r: 0.2 };
    const ptr = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, k: 0 };

    const resize = () => {
      const cw = Math.max(1, canvas.clientWidth);
      const ch = Math.max(1, canvas.clientHeight);
      const scale = Math.min(0.8, Math.sqrt(budget / (cw * ch)));
      const w = Math.max(64, Math.round(cw * scale));
      const h = Math.max(64, Math.round(ch * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    // Where the plate is, measured against the canvas itself (so a phone's
    // sliding browser bars can never put the plume in the wrong place).
    const readSource = () => {
      const el = sourceRef.current;
      if (!el) return;
      const c = canvas.getBoundingClientRect();
      if (c.width < 1 || c.height < 1) return;
      const r = el.getBoundingClientRect();
      src.x = (r.left + r.width / 2 - c.left) / c.width;
      src.y = 1 - (r.top + r.height * 0.46 - c.top) / c.height;
      src.r = (r.width * 0.3) / c.height;
    };

    const draw = () => {
      gl.uniform2f(U.res, canvas.width, canvas.height);
      gl.uniform1f(U.time, highp ? time : time % 180);
      gl.uniform3f(U.src, src.x, src.y, src.r);
      gl.uniform3f(U.ptr, ptr.x, ptr.y, ptr.k);
      gl.uniform1f(U.burst, burstNow);
      gl.uniform1f(U.gain, canvas.clientWidth < 640 ? 0.86 : 1);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const frame = (now: number) => {
      raf = 0;
      if (stopped) return;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016;
      const elapsed = last ? (now - last) / 1000 : 0.016;
      last = now;
      const { paused: isPaused, burst: isBurst } = live.current;

      if (!isPaused && !reduce) time += dt;

      // The plate can move with no resize event at all (switching language
      // re-centres it), so look again a few times a second.
      tick += 1;
      if ((tick & 7) === 0) {
        resize();
        readSource();
      }

      // unlock flood eases in over ~0.7s
      const target = isBurst ? 1 : 0;
      burstNow += Math.sign(target - burstNow) * Math.min(Math.abs(target - burstNow), dt / 0.7);

      // pointer: follow smoothly, let the stir die away
      ptr.x += (ptr.tx - ptr.x) * Math.min(1, dt * 9);
      ptr.y += (ptr.ty - ptr.y) * Math.min(1, dt * 9);
      ptr.k = isPaused ? 0 : ptr.k * Math.exp(-dt * 1.6);

      // Slow device? Spend fewer pixels (never fewer than ~1/4 of the start).
      // A steady 30 fps (battery saver) does not count as slow.
      if (elapsed > 0.045) slowFrames += 1;
      else slowFrames = Math.max(0, slowFrames - 1);
      if (slowFrames > 24 && budget > 80_000) {
        budget = Math.round(budget * 0.62);
        slowFrames = 0;
        resize();
      }

      draw();

      const settling = Math.abs(target - burstNow) > 0.001 || ptr.k > 0.01;
      if ((!isPaused && !reduce) || settling) schedule();
      else last = 0;
    };

    const schedule = () => {
      if (!raf && !stopped) raf = requestAnimationFrame(frame);
    };
    wake.current = schedule;

    const onResize = () => {
      resize();
      readSource();
      schedule();
    };
    const onScroll = () => {
      readSource();
      schedule();
    };
    const onPointer = (e: PointerEvent) => {
      if (reduce || live.current.paused) return; // a frozen frame stays frozen
      const c = canvas.getBoundingClientRect();
      if (c.width < 1 || c.height < 1) return;
      const nx = (e.clientX - c.left) / c.width;
      const ny = 1 - (e.clientY - c.top) / c.height;
      const moved = Math.hypot(nx - ptr.tx, ny - ptr.ty);
      ptr.tx = nx;
      ptr.ty = ny;
      ptr.k = Math.min(1, ptr.k + moved * 6);
      schedule();
    };
    const onLost = (e: Event) => {
      e.preventDefault();
      stopped = true;
      setFallback(true);
    };

    const ro = new ResizeObserver(onResize);
    ro.observe(document.documentElement);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    canvas.addEventListener("webglcontextlost", onLost);

    resize();
    readSource();
    schedule();

    return () => {
      stopped = true;
      wake.current = () => {};
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [sourceRef]);

  if (fallback) {
    // No WebGL: three soft clouds drifting up, in CSS.
    return (
      <div aria-hidden="true" className={`gate-vapour-fallback ${paused ? "is-paused" : ""} ${className}`}>
        <span />
        <span />
        <span />
      </div>
    );
  }

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
