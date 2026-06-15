let hintClickHandler = null;
let docClickHandler = null;
const THEME_KEY    = 'gss-theme';
const THEMES = ['system', 'dark', 'light'];
const root   = document.documentElement;

const ICONS = {
  dark: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/></svg>',

  light: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707"/></svg>',

  system: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M0 4s0-2 2-2h12s2 0 2 2v6s0 2-2 2h-4q0 1 .25 1.5H11a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1h.75Q6 13 6 12H2s-2 0-2-2zm1.398-.855a.76.76 0 0 0-.254.302A1.46 1.46 0 0 0 1 4v6c0 .325.078.502.145.602q.106.156.302.254a1.1 1.1 0 0 0 .352.109h13.201q.195-.049.302-.109a.76.76 0 0 0 .254-.302A1.46 1.46 0 0 0 15 10V4c0-.325-.078-.502-.145-.602a.76.76 0 0 0-.302-.254A1.1 1.1 0 0 0 14 3H2a1.1 1.1 0 0 0-.602.145"/></svg>'
};
  
function show_hints() {
    let hint = document.querySelectorAll(".hint");

    // handler for hint click
    hintClickHandler = function(e) {
        let el = e.currentTarget;
        hint.forEach(h => {    
            if (h !== el) h.classList.remove("active");    
        });    
        el.classList.toggle("active");    
        e.stopPropagation();
    };

    hint.forEach(el => {    
        el.addEventListener("click", hintClickHandler);    
    });    
    
    // handler for outside click
    docClickHandler = function(e) {
        if (!e.target.closest(".hint")) {    
            hint.forEach(h => h.classList.remove("active"));    
        }    
    };

    document.addEventListener("click", docClickHandler);
}

function stop_hints() {
    let hint = document.querySelectorAll(".hint");
    if (hintClickHandler) {
        hint.forEach(el => {
            el.removeEventListener("click", hintClickHandler);
        });
        hintClickHandler = null;
    }
    if (docClickHandler) {
        document.removeEventListener("click", docClickHandler);
        docClickHandler = null;
    }
}

function show_hidden(a, b, c, d, e) {
  const span = event.currentTarget;
  const figure = span.closest("figure");


  figure.innerHTML = `
    <img src="Data/${a}" alt="${b}">
    <figcaption>${b}<br>- 
      <span class="hint">${c}
        <span class="hint-box">
          <a href="${e}" target="_blank">${d}</a>
        </span>
      </span>
    </figcaption>
  `;

  // stop old listeners and restart fresh
  stop_hints();
  show_hints();
}

function play_videos(){
    const videos = document.querySelectorAll("video");
    videos.forEach(video => {
        video.addEventListener("play", () => {
            videos.forEach(v => {
                if (v !== video && !v.paused) {
                    v.pause();
                }
            });
        });
    });
}
  
function remove_loading() {
  document.querySelector("h1").style.filter = "none";
  document.querySelector("footer").style.filter = "none";
  document.querySelector("#card-3d").style.filter = "none";
  document.querySelector(".container").style.filter = "none";
  document.querySelector(".splash").classList.add("shrink");

document.querySelector("#themeToggle").style.filter = "none";
}

function init_scroll_reveal() {
  const wrapperObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-visible');
        wrapperObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const childObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('scroll-visible', entry.isIntersecting);
    });
  }, { 
    rootMargin: "-10% 0px -10% 0px",
    threshold: 0 
  });

  const wrappers = document.querySelectorAll('details.wrapper');
  wrappers.forEach(card => {
    if (card.hasAttribute('open')) {
    card.classList.remove('scroll-reveal');
      card.classList.add('scroll-visible');
    } else {
      card.classList.add('scroll-reveal');
      wrapperObserver.observe(card);
    }
  });

  wrappers.forEach(wrapper => {
    wrapper.querySelectorAll(':scope > .content > details, :scope > details').forEach(child => {
      child.classList.add('scroll-reveal');
      childObserver.observe(child);
    });
  });

  const resourceWrapper = [...wrappers].find(w =>
    w.querySelector(':scope > summary')?.textContent.trim() === 'Resources'
  );
  if (resourceWrapper) {
    resourceWrapper.querySelectorAll('figure').forEach(fig => {
      fig.classList.add('scroll-reveal');
      childObserver.observe(fig);
    });
  }

  const linksWrapper = [...document.querySelectorAll('details')].find(d =>
    d.querySelector(':scope > summary')?.textContent.trim() === 'Links'
  );
  if (linksWrapper) {
    linksWrapper.querySelectorAll('li').forEach((li, i) => {
      li.classList.add('scroll-reveal-left');
      li.style.transitionDelay = `${i * 0.05}s`;
      childObserver.observe(li);
    });
  }
}

function applyTheme(theme) {
  current = theme;
  root.classList.remove('theme-dark', 'theme-light');
  if (theme === 'dark')  root.classList.add('theme-dark');
  if (theme === 'light') root.classList.add('theme-light');
  localStorage.setItem(THEME_KEY, theme);
  var btn = document.getElementById('themeToggle');
  if (btn) btn.innerHTML = ICONS[theme];
}

function initScrollRibbon() {
  if (document.getElementById("scrollRibbonCanvas")) return;

  const canvas = document.createElement("canvas");
  canvas.id = "scrollRibbonCanvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d", { alpha: true });

  const state = {
    w: 0,
    h: 0,
    dpr: Math.min(1.5, window.devicePixelRatio || 1),
    target: 0,
    view: 0,
    guide: [],
    running: false,
    reduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches
  };

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  function hash(n) {
    const s = Math.sin(n * 127.1 + 311.7) * 43758.5453123;
    return s - Math.floor(s);
  }

  function smoothstep(t) {
    return t * t * (3 - 2 * t);
  }

  function noise1D(x) {
    const i = Math.floor(x);
    const f = x - i;
    const a = hash(i);
    const b = hash(i + 1);
    return lerp(a, b, smoothstep(f));
  }

  function fbm(x) {
    let value = 0;
    let amplitude = 0.5;
    let frequency = 1;

    for (let i = 0; i < 4; i++) {
      value += amplitude * (noise1D(x * frequency) - 0.5);
      frequency *= 2;
      amplitude *= 0.5;
    }

    return value;
  }

  function catmullRom(p0, p1, p2, p3, t) {
    const t2 = t * t;
    const t3 = t2 * t;
    return 0.5 * (
      2 * p1 +
      (-p0 + p2) * t +
      (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
      (-p0 + 3 * p1 - 3 * p2 + p3) * t3
    );
  }

  function maxScroll() {
    return Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  }

  function resizeCanvas() {
    state.w = window.innerWidth;
    state.h = window.innerHeight;
    state.dpr = Math.min(1.5, window.devicePixelRatio || 1);

    canvas.width = Math.floor(state.w * state.dpr);
    canvas.height = Math.floor(state.h * state.dpr);
    ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);

    buildGuide();
  }

  function buildGuide() {
    const count = Math.max(12, Math.round(state.h / 120));
    const maxX = state.w * 0.74;

    state.guide = [];

    for (let i = 0; i <= count; i++) {
      const t = i / count;

      const envelope = Math.pow(Math.sin(Math.PI * t), 0.95);
      const midBend = Math.exp(-Math.pow((t - 0.52) / 0.18, 2));
      const longWave = Math.sin(t * Math.PI * 2.1 + 0.55);
      const midWave = Math.sin(t * Math.PI * 5.7 + 1.8);
      const shortWave = Math.sin(t * Math.PI * 11.0 + 0.25);
      const random = (fbm(t * 5.0 + 3.4) - 0.5) * 2;

      const base = maxX * t;
      const meander =
        0.48 * longWave +
        0.26 * midWave +
        0.12 * shortWave +
        0.18 * random;

      const strongMiddleTurn = midBend * (
        0.72 * Math.sin(t * Math.PI * 2.0 + 1.15) +
        0.32 * Math.sin(t * Math.PI * 4.0 + 0.3)
      );

      const x =
        base * (1 - 0.15 * (1 - Math.pow(t, 0.75))) +
        envelope * state.w * 0.16 * meander +
        midBend * state.w * 0.28 * strongMiddleTurn;

      state.guide.push({ t, x: clamp(x, 0, state.w - 18) });
    }

    if (state.guide.length) {
      state.guide[0].x = 0;
    }
  }

  function guideX(p) {
    const pts = state.guide;
    if (!pts.length) return 0;

    const last = pts.length - 1;
    const scaled = clamp(p, 0, 1) * last;
    const i = Math.floor(scaled);
    const t = scaled - i;

    const i0 = Math.max(0, i - 1);
    const i1 = i;
    const i2 = Math.min(last, i + 1);
    const i3 = Math.min(last, i + 2);

    return catmullRom(
      pts[i0].x,
      pts[i1].x,
      pts[i2].x,
      pts[i3].x,
      t
    );
  }

  function pointAtProgress(p) {
    return {
      x: guideX(p),
      y: clamp(p, 0, 1) * state.h
    };
  }

  function updateTarget() {
    state.target = clamp(window.scrollY / maxScroll(), 0, 1);
    requestRender();
  }

  function requestRender() {
    if (!state.running) {
      state.running = true;
      requestAnimationFrame(tick);
    }
  }

  function drawRibbon(progress) {
    ctx.clearRect(0, 0, state.w, state.h);

    const clamped = clamp(progress, 0, 1);
    const segments = Math.max(40, Math.round(40 + clamped * 50));
    const points = new Array(segments + 1);

    for (let i = 0; i <= segments; i++) {
      points[i] = pointAtProgress((i / segments) * clamped);
    }

    if (points.length < 2) return;

    for (let i = 1; i < points.length; i++) {
      const age = i / (points.length - 1);
      const alpha = Math.pow(age, 2.25);

      const p0 = points[i - 1];
      const p1 = points[i];

      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.strokeStyle = `rgba(255, 208, 145, ${alpha})`;
      ctx.lineWidth = 1.8 + age * 1.6;
      ctx.lineCap = "round";
      ctx.stroke();
    }

    const head = points[points.length - 1];
    const halo = ctx.createRadialGradient(head.x, head.y, 2, head.x, head.y, 18);
    halo.addColorStop(0, "rgba(255, 207, 138, 0.10)");
    halo.addColorStop(0.45, "rgba(255, 157, 57, 0.05)");
    halo.addColorStop(1, "rgba(255, 157, 57, 0)");

    ctx.beginPath();
    ctx.arc(head.x, head.y, 18, 0, Math.PI * 2);
    ctx.fillStyle = halo;
    ctx.fill();
  }

  function tick() {
    if (state.reduced) {
      state.view = state.target;
    } else {
      const diff = state.target - state.view;
      const speed = clamp(0.12 + Math.abs(diff) * 0.38, 0.10, 0.32);
      state.view += diff * speed;
    }

    drawRibbon(state.view);

    const active = Math.abs(state.target - state.view) > 0.0008;
    if (active) {
      requestAnimationFrame(tick);
    } else {
      state.running = false;
    }
  }

  window.addEventListener("resize", () => {
    resizeCanvas();
    updateTarget();
  }, { passive: true });

  window.addEventListener("scroll", updateTarget, { passive: true });

  window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener?.("change", (e) => {
    state.reduced = e.matches;
    updateTarget();
  });

  resizeCanvas();
  updateTarget();
}

window.onload = function () {
  let currentTheme = localStorage.getItem(THEME_KEY);
  if (currentTheme === null) {
    currentTheme = "system";
  }
  applyTheme(currentTheme);
  show_hints();
  play_videos();
    
  const btn = document.getElementById('themeToggle');
  btn.addEventListener('click', function (){
  applyTheme(THEMES[(THEMES.indexOf(current) + 1) % THEMES.length]);
  })
  setTimeout(() => {
    remove_loading();
    initScrollRibbon();
    init_scroll_reveal();
  }, 500);
};


