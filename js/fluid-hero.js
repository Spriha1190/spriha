/**
 * Interactive Mouse-Reactive Silk & Caustic Fluid Hero Canvas
 * Uses a custom WebGL2 GLSL fragment shader (inspired by abdullahrubab.me)
 * with graceful 2D interactive silk-wave fallback, theme reactivity,
 * off-screen IntersectionObserver pausing, and prefers-reduced-motion support.
 */
(() => {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const isDarkActive = () => {
    const meta = document.querySelector('meta[name="color-scheme"]')?.content || 'dark';
    return meta !== 'light';
  };

  let mouseX = 0.72;
  let mouseY = 0.42;
  let targetX = 0.72;
  let targetY = 0.42;
  let ripplePower = 0.0;
  let isVisible = true;
  let rafId = null;

  const updatePointer = (clientX, clientY) => {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    targetX = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    targetY = Math.min(1, Math.max(0, 1 - (clientY - rect.top) / rect.height));
  };

  const heroSection = canvas.parentElement;
  heroSection?.addEventListener('pointermove', (e) => {
    updatePointer(e.clientX, e.clientY);
  }, { passive: true });

  heroSection?.addEventListener('pointerdown', (e) => {
    updatePointer(e.clientX, e.clientY);
    ripplePower = 1.0;
  }, { passive: true });

  const resize = () => {
    const rect = heroSection.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const w = Math.max(300, Math.floor(rect.width * dpr));
    const h = Math.max(300, Math.floor(rect.height * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  };

  // Attempt WebGL2 Shader Renderer
  const gl = canvas.getContext('webgl2', { alpha: true, antialias: false, powerPreference: 'low-power' });

  if (gl) {
    const vsSource = `#version 300 es
      in vec2 a_pos;
      void main() {
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;

    const fsSource = `#version 300 es
      precision highp float;
      uniform vec2 u_res;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_ripple;
      uniform float u_dark;
      out vec4 outColor;

      float waveField(vec2 p, float t) {
        float w = 0.0;
        w += sin(p.x * 3.1 + t * 0.55 + sin(p.y * 2.2 - t * 0.35));
        w += cos(p.y * 3.6 - t * 0.45 + cos(p.x * 2.4 + t * 0.4));
        w += 0.6 * sin((p.x + p.y) * 4.5 + t * 0.65);
        return w * 0.33;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / max(u_res, vec2(1.0));
        float aspect = u_res.x / max(u_res.y, 1.0);
        vec2 p = vec2(uv.x * aspect, uv.y);
        vec2 m = vec2(u_mouse.x * aspect, u_mouse.y);

        float dist = length(p - m);
        float pointerWave = exp(-dist * 3.4) * sin(dist * 24.0 - u_time * 3.2) * (0.28 + u_ripple * 0.45);
        float f1 = waveField(p * 1.45 + pointerWave * 0.4, u_time);
        float f2 = waveField(p * 2.2 - f1 * 0.35, u_time * 0.85);
        float caustic = smoothstep(0.15, 0.95, 0.5 + 0.5 * sin((f1 + f2) * 2.8 + pointerWave * 2.2));
        float halo = exp(-dist * 2.6) * (0.32 + u_ripple * 0.35);

        vec3 lightRose = vec3(0.651, 0.106, 0.333);
        vec3 lightGold = vec3(0.702, 0.506, 0.278);
        vec3 darkRose = vec3(0.957, 0.447, 0.714);
        vec3 darkGold = vec3(0.902, 0.737, 0.510);

        vec3 accent = mix(lightRose, darkRose, u_dark);
        vec3 gold = mix(lightGold, darkGold, u_dark);
        vec3 tint = mix(accent, gold, clamp(0.45 + 0.5 * f2, 0.0, 1.0));

        float alpha = (caustic * 0.14 + halo * 0.18) * mix(0.85, 1.0, u_dark);
        outColor = vec4(tint * alpha, alpha);
      }
    `;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const vs = compile(gl.VERTEX_SHADER, vsSource);
    const fs = compile(gl.FRAGMENT_SHADER, fsSource);
    const prog = vs && fs ? gl.createProgram() : null;

    if (prog) {
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
    }

    if (prog && gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW
      );
      const posLoc = gl.getAttribLocation(prog, 'a_pos');
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      const uRes = gl.getUniformLocation(prog, 'u_res');
      const uTime = gl.getUniformLocation(prog, 'u_time');
      const uMouse = gl.getUniformLocation(prog, 'u_mouse');
      const uRipple = gl.getUniformLocation(prog, 'u_ripple');
      const uDark = gl.getUniformLocation(prog, 'u_dark');

      const start = performance.now();

      const renderWebGL = (now) => {
        if (!isVisible) {
          rafId = null;
          return;
        }
        resize();
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(prog);

        mouseX += (targetX - mouseX) * 0.08;
        mouseY += (targetY - mouseY) * 0.08;
        ripplePower *= 0.94;

        const t = prefersReducedMotion.matches ? 1.2 : (now - start) * 0.001;
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform1f(uTime, t);
        gl.uniform2f(uMouse, mouseX, mouseY);
        gl.uniform1f(uRipple, ripplePower);
        gl.uniform1f(uDark, isDarkActive() ? 1.0 : 0.0);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        if (!prefersReducedMotion.matches) {
          rafId = requestAnimationFrame(renderWebGL);
        } else {
          rafId = null;
        }
      };

      const startLoop = () => {
        if (rafId === null) rafId = requestAnimationFrame(renderWebGL);
      };

      window.addEventListener('resize', () => {
        resize();
        if (prefersReducedMotion.matches) renderWebGL(performance.now());
      });

      if ('IntersectionObserver' in window && heroSection) {
        const io = new IntersectionObserver((entries) => {
          isVisible = entries[0].isIntersecting;
          if (isVisible) startLoop();
        }, { threshold: 0.05 });
        io.observe(heroSection);
      } else {
        startLoop();
      }
      return;
    }
  }

  // Graceful 2D Interactive Silk-Wave Fallback
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const particles = Array.from({ length: 26 }, (_, i) => ({
    x: Math.random(),
    y: Math.random(),
    r: 2 + (i % 3) * 1.4,
    vx: (Math.random() - 0.5) * 0.0005,
    vy: (Math.random() - 0.5) * 0.0005,
    gold: i % 2 === 0
  }));

  const render2D = () => {
    if (!isVisible) {
      rafId = null;
      return;
    }
    resize();
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    mouseX += (targetX - mouseX) * 0.08;
    mouseY += (targetY - mouseY) * 0.08;

    const styles = getComputedStyle(document.documentElement);
    const rose = styles.getPropertyValue('--accent').trim() || '#A61B55';
    const gold = styles.getPropertyValue('--gold').trim() || '#B38147';

    // Mouse silk glow
    const gx = mouseX * w;
    const gy = (1 - mouseY) * h;
    const grad = ctx.createRadialGradient(gx, gy, 10, gx, gy, Math.min(w, h) * 0.45);
    grad.addColorStop(0, isDarkActive() ? 'rgba(244, 114, 182, 0.20)' : 'rgba(166, 27, 85, 0.12)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    for (const p of particles) {
      if (!prefersReducedMotion.matches) {
        p.x = (p.x + p.vx + 1) % 1;
        p.y = (p.y + p.vy + 1) % 1;
      }
      ctx.beginPath();
      ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.gold ? gold : rose;
      ctx.globalAlpha = 0.25;
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    if (!prefersReducedMotion.matches) rafId = requestAnimationFrame(render2D);
    else rafId = null;
  };

  if ('IntersectionObserver' in window && heroSection) {
    const io = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
      if (isVisible && rafId === null) rafId = requestAnimationFrame(render2D);
    }, { threshold: 0.05 });
    io.observe(heroSection);
  } else {
    rafId = requestAnimationFrame(render2D);
  }
})();
