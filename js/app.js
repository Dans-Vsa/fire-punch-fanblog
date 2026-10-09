/* FROZEN INK — interactions */
(() => {
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(pointer: fine)").matches;

  /* ---------------- language ---------------- */
  let lang = localStorage.getItem("fp-lang") || "id";
  const i18nEls = [...document.querySelectorAll("[data-i18n]")];
  i18nEls.forEach(el => (el.dataset.id = el.innerHTML));

  function applyLang() {
    root.lang = lang;
    i18nEls.forEach(el => {
      const k = el.dataset.i18n;
      el.innerHTML = lang === "en" && EN[k] ? EN[k] : el.dataset.id;
    });
    document.getElementById("lang").textContent = lang === "en" ? "ID" : "EN";
    renderCast();
    renderArcs();
    renderShelf();
    renderTrivia();
  }
  const t = (id, en) => (lang === "en" ? en : id);
  document.getElementById("lang").addEventListener("click", () => {
    lang = lang === "id" ? "en" : "id";
    localStorage.setItem("fp-lang", lang);
    applyLang();
  });

  /* ---------------- content ---------------- */
  const charCard = (c, cls) => `
      <button class="${cls}${c.tone === "ice" ? " char--ice" : ""} wipe" type="button">
        <span class="char__img"><img src="${c.img}" alt="" loading="lazy" decoding="async" style="object-position:${c.pos}"></span>
        <span class="char__jp" aria-hidden="true">${c.jp}</span>
        <span class="char__plate">
          <span class="char__name">${lang === "en" && c.nameEn ? c.nameEn : c.name}</span>
          <span class="char__desc">${c[lang]}</span>
        </span>
      </button>`;

  function renderCast() {
    const wrap = document.getElementById("cast"), side = document.getElementById("side");
    wrap.innerHTML = CAST.map(c => charCard(c, "char")).join("");
    side.innerHTML = SIDE.map(c => charCard(c, "char char--side")).join("");
    document.querySelectorAll(".char").forEach((el, i) => {
      el.style.transitionDelay = (i % 8) * 70 + "ms, 0s, 0s";
      io.observe(el);
      el.addEventListener("click", () => {
        const on = !el.classList.contains("lit");
        document.querySelectorAll(".char.lit").forEach(x => x.classList.remove("lit"));
        el.classList.toggle("lit", on);
        if (on) burst(el);
      });
    });
  }

  /* ---------------- arcs ---------------- */
  const pad = n => String(n).padStart(2, "0");
  function renderArcs() {
    document.getElementById("ruler-track").innerHTML = ARCS.map(a => `
      <a class="ruler__seg" href="#arc-${a.no}" style="flex-grow:${a.ch[1] - a.ch[0] + 1}" data-arc="${a.no}">
        <span class="ruler__ticks" style="--n:${a.ch[1] - a.ch[0] + 1}" aria-hidden="true"></span>
        <span class="ruler__name">${pad(a.no)} ${a.name}</span>
        <span class="ruler__ch mono">${a.ch[0]}–${a.ch[1]}</span>
      </a>`).join("");

    const list = document.getElementById("arcs-list");
    list.innerHTML = ARCS.map(a => `
      <article class="arc wipe" id="arc-${a.no}" data-arc="${a.no}">
        <div class="arc__visual">
          <img src="${a.img}" alt="${t("Sampul volume", "Volume cover")} ${a.img.match(/vol(\d)/)[1]}" loading="lazy" decoding="async" width="440" height="691">
          <span class="arc__no" aria-hidden="true">${pad(a.no)}</span>
        </div>
        <div class="arc__body">
          <p class="mono arc__meta">${t("Bab", "Chapters")} ${a.ch[0]}–${a.ch[1]} · ${t("Vol.", "Vol.")} ${a.vol} · ${a.ch[1] - a.ch[0] + 1} ${t("bab", "ch")}</p>
          <h3 class="arc__name">${a.name} <span class="jp">${a.jp}</span></h3>
          <p class="arc__hook">${a.hook[lang]}</p>
          <p class="arc__tease">${a.tease[lang]}</p>
          <ul class="arc__tags mono">${a.tags[lang].map(x => `<li>#${x}</li>`).join("")}</ul>
          <div class="seal">
            <div class="spoil" id="spoil-${a.no}" inert aria-hidden="true">
              <h4 class="mono">${t("Yang terjadi", "What happened")}</h4>
              <p>${a.happened[lang]}</p>
              <h4 class="mono">${t("Tafsiran", "Interpretation")}</h4>
              <p>${a.meaning[lang]}</p>
              <p class="spoil__note">${t("Tafsiran kami, bukan pernyataan resmi Fujimoto.", "Our interpretation, not Fujimoto's official statement.")}</p>
              <button class="spoil__close mono" type="button">${t("Bekukan lagi", "Freeze again")} ❄</button>
            </div>
            <canvas class="ice" aria-hidden="true"></canvas>
            <button class="seal__btn" type="button" aria-controls="spoil-${a.no}" aria-expanded="false">
              <span class="seal__flake" aria-hidden="true">❄</span>
              <span class="mono">${t("Klik untuk melelehkan spoiler", "Click to melt the spoiler")}</span>
            </button>
          </div>
        </div>
      </article>`).join("");

    list.querySelectorAll(".arc").forEach(el => { io.observe(el); arcIO.observe(el); });
    list.querySelectorAll(".seal").forEach(setupSeal);
  }

  /* ---------------- frozen spoiler seal ----------------
     A canvas ice sheet (frost texture, snow cap, icicles) covers the spoiler.
     Click → cracks spread from the button, a ragged hole melts outward,
     water drips carve trails, steam rises. "Freeze again" grows the ice back. */
  const rand = (a, b) => a + Math.random() * (b - a);

  function makeIce(W, H, dpr) {
    const c = document.createElement("canvas");
    c.width = W * dpr; c.height = H * dpr;
    const g = c.getContext("2d");
    g.setTransform(dpr, 0, 0, dpr, 0, 0);

    // ice body: cold blue-grey, slightly translucent so the text ghosts through
    const base = g.createLinearGradient(0, 0, W * .3, H);
    base.addColorStop(0, "rgba(222,234,240,.80)");
    base.addColorStop(.55, "rgba(176,196,207,.72)");
    base.addColorStop(1, "rgba(140,163,176,.78)");
    g.fillStyle = base; g.fillRect(0, 0, W, H);

    // glassy streaks
    g.save(); g.rotate(-.5);
    for (let i = 0; i < 7; i++) {
      g.fillStyle = `rgba(255,255,255,${rand(.06, .16)})`;
      g.fillRect(rand(-W * .2, W), rand(0, H * 1.6), rand(W * .4, W), rand(6, 24));
    }
    g.restore();

    // speckles / trapped bubbles
    const n = Math.round(W * H / 90);
    for (let i = 0; i < n; i++) {
      g.fillStyle = `rgba(255,255,255,${rand(.05, .35)})`;
      g.beginPath(); g.arc(rand(0, W), rand(0, H), rand(.3, 1.4), 0, 7); g.fill();
    }

    // frost ferns creeping in from the edges
    const fern = (x, y, a, len, d) => {
      if (d === 0 || len < 2) return;
      const x2 = x + Math.cos(a) * len, y2 = y + Math.sin(a) * len;
      g.strokeStyle = `rgba(255,255,255,${.18 + d * .08})`; g.lineWidth = d * .45;
      g.beginPath(); g.moveTo(x, y); g.lineTo(x2, y2); g.stroke();
      fern(x2, y2, a + rand(.35, .75), len * .62, d - 1);
      fern(x2, y2, a - rand(.35, .75), len * .62, d - 1);
      fern(x2, y2, a + rand(-.15, .15), len * .7, d - 1);
    };
    for (let i = 0; i < Math.round((W + H) / 40); i++) {
      const side = Math.floor(rand(0, 4));
      const [x, y, a] = side === 0 ? [rand(0, W), H, -Math.PI / 2] : side === 1 ? [0, rand(0, H), 0]
        : side === 2 ? [W, rand(0, H), Math.PI] : [rand(0, W), 26, Math.PI / 2];
      fern(x, y, a + rand(-.5, .5), rand(14, 34), 4);
    }

    // icicles hanging from the snow cap (manga: pale fill + ink outline)
    g.lineJoin = "round";
    for (let x = rand(8, 30); x < W - 8; x += rand(26, 64)) {
      const w = rand(5, 11), len = rand(14, 42);
      g.beginPath(); g.moveTo(x - w, 16); g.lineTo(x + w, 16); g.lineTo(x + rand(-2, 2), 16 + len); g.closePath();
      g.fillStyle = "rgba(236,244,248,.95)"; g.fill();
      g.strokeStyle = "#0a0a0a"; g.lineWidth = 1.4; g.stroke();
      g.strokeStyle = "rgba(255,255,255,.9)"; g.lineWidth = 1;
      g.beginPath(); g.moveTo(x - w * .4, 19); g.lineTo(x, 12 + len * .7); g.stroke();
    }

    // snow cap: union of blobs — ink strokes first, white fills on top
    const blobs = [];
    for (let x = -12; x < W + 16; x += rand(9, 18)) blobs.push([x, rand(2, 9), rand(8, 15)]);
    for (let x = -12; x < W + 16; x += rand(30, 70)) blobs.push([x, H - rand(0, 3), rand(4, 9)]);   // drift at the bottom
    g.strokeStyle = "#0a0a0a"; g.lineWidth = 3;
    blobs.forEach(([x, y, r]) => { g.beginPath(); g.arc(x, y, r, 0, 7); g.stroke(); });
    g.fillStyle = "#f6f6f3";
    blobs.forEach(([x, y, r]) => { g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); });
    g.fillStyle = "rgba(10,10,10,.12)";                                            // screentone shade under the cap
    for (let x = 0; x < W; x += 5) for (let y = 12; y < 20; y += 5) { g.beginPath(); g.arc(x + (y % 10 ? 2.5 : 0), y, .9, 0, 7); g.fill(); }
    return c;
  }

  function setupSeal(seal) {
    const btn = seal.querySelector(".seal__btn"), spoil = seal.querySelector(".spoil");
    const cv = seal.querySelector(".ice"), cx = cv.getContext("2d");
    const wob = Array.from({ length: 28 }, () => Math.random());
    let W = 0, H = 0, tex = null, state = "frozen", t0 = 0, last = 0;
    let r = 0, rMax = 0, ox = 0, oy = 0, cracks = [], drips = [], steam = [];

    const setMelt = v => seal.style.setProperty("--melt", v.toFixed(3));
    const edge = (a, time) => {           // ragged, slowly wobbling melt front
      const f = ((a / (Math.PI * 2)) % 1 + 1) % 1 * wob.length, i = Math.floor(f), k = f - i;
      const n = wob[i] * (1 - k) + wob[(i + 1) % wob.length] * k;
      return .72 + .5 * n + Math.sin(a * 5 + time * 3) * .04;
    };

    function size() {
      const b = seal.getBoundingClientRect();
      if (b.width < 2 || b.height < 2) return false;
      const dpr = Math.min(2, devicePixelRatio || 1);
      W = b.width; H = b.height;
      cv.width = W * dpr; cv.height = H * dpr;
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      tex = makeIce(W, H, dpr);
      const bb = btn.getBoundingClientRect();
      ox = bb.left - b.left + bb.width / 2; oy = bb.top - b.top + bb.height / 2;
      rMax = Math.hypot(Math.max(ox, W - ox), Math.max(oy, H - oy)) * 1.25;
      cracks = Array.from({ length: 11 }, (_, i) => {
        let a = (i / 11) * Math.PI * 2 + rand(-.2, .2), x = ox, y = oy; const pts = [[x, y]];
        const segs = Math.round(rand(5, 10));
        for (let s = 0; s < segs; s++) { a += rand(-.45, .45); x += Math.cos(a) * rand(10, 24); y += Math.sin(a) * rand(8, 20); pts.push([x, y]); }
        return pts;
      });
      return true;
    }

    function hole(time) {
      cx.beginPath();
      for (let i = 0; i <= 80; i++) {
        const a = (i / 80) * Math.PI * 2, rr = r * edge(a, time);
        const x = ox + Math.cos(a) * rr, y = oy + Math.sin(a) * rr * .8;
        i ? cx.lineTo(x, y) : cx.moveTo(x, y);
      }
      cx.closePath();
    }

    function draw(time, crackP) {
      cx.globalCompositeOperation = "source-over";
      cx.clearRect(0, 0, W, H);
      if (!tex) return;
      cx.drawImage(tex, 0, 0, W, H);

      // cracks spreading from the click
      if (crackP > 0) {
        cracks.forEach(pts => {
          const upto = crackP * (pts.length - 1);
          for (const [col, lw, off] of [["rgba(10,10,10,.55)", 1.6, 1], ["rgba(255,255,255,.95)", 1.1, 0]]) {
            cx.strokeStyle = col; cx.lineWidth = lw; cx.beginPath();
            for (let i = 0; i <= upto; i++) {
              const [x, y] = pts[i]; i ? cx.lineTo(x + off, y + off) : cx.moveTo(x + off, y + off);
            }
            const i = Math.floor(upto), k = upto - i;
            if (i < pts.length - 1) cx.lineTo(pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k + off, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k + off);
            cx.stroke();
          }
        });
      }
      if (r <= 0) return;

      // melt: cut the hole and the drip trails out of the ice
      cx.globalCompositeOperation = "destination-out";
      hole(time); cx.fill();
      drips.forEach(d => {
        cx.beginPath(); cx.roundRect(d.x - d.w / 2, d.y - 4, d.w, d.len + 4, d.w / 2); cx.fill();
      });
      cx.globalCompositeOperation = "source-over";

      // wet rim
      hole(time);
      cx.strokeStyle = "rgba(120,150,166,.55)"; cx.lineWidth = 5; cx.stroke();
      cx.strokeStyle = "rgba(255,255,255,.85)"; cx.lineWidth = 1.6; cx.stroke();
      // water drops at the end of each trail
      drips.forEach(d => {
        cx.beginPath(); cx.arc(d.x, d.y + d.len, d.w * .75, 0, 7);
        cx.fillStyle = "rgba(225,238,245,.9)"; cx.fill();
        cx.strokeStyle = "rgba(10,10,10,.7)"; cx.lineWidth = 1; cx.stroke();
      });
      // steam
      steam.forEach(s => {
        cx.beginPath(); cx.arc(s.x, s.y, s.r, 0, 7);
        cx.fillStyle = `rgba(240,240,236,${s.life * .35})`; cx.fill();
      });
    }

    function frame(now) {
      const dt = Math.min(.05, (now - last) / 1000); last = now;
      const time = now / 1000, el = (now - t0) / 1000;

      if (state === "melting") {
        const D = 1.9, p = Math.min(1, el / D);
        const crackP = Math.min(1, el / .35);
        r = el < .3 ? 0 : rMax * Math.pow((el - .3) / (D - .3), 1.7);
        setMelt(p);
        // new drips from the lower half of the melt front
        if (r > 8 && Math.random() < .55) {
          const a = rand(.15, .85) * Math.PI, rr = r * edge(a, time);
          drips.push({ x: ox + Math.cos(a) * rr, y: oy + Math.sin(a) * rr * .8, len: 0, w: rand(3, 7), v: rand(40, 140) });
        }
        if (r > 6 && Math.random() < .6) {
          const a = rand(0, Math.PI * 2), rr = r * edge(a, time);
          steam.push({ x: ox + Math.cos(a) * rr, y: oy + Math.sin(a) * rr * .8, r: rand(4, 10), vy: rand(-55, -25), vx: rand(-12, 12), life: 1 });
        }
        drips.forEach(d => { d.len += d.v * dt; d.v += 30 * dt; });
        steam.forEach(s => { s.y += s.vy * dt; s.x += s.vx * dt; s.r += 10 * dt; s.life -= dt * 1.2; });
        steam = steam.filter(s => s.life > 0);
        draw(time, crackP);
        if (p >= 1) { finishOpen(); return; }
      } else if (state === "freezing") {
        const D = 1.1, p = Math.min(1, el / D);
        r = rMax * Math.pow(1 - p, 2);                // ice closes in from the edges
        setMelt(1 - p);
        draw(time, 0);
        if (p >= 1) { state = "frozen"; r = 0; draw(time, 0); return; }
      }
      requestAnimationFrame(frame);
    }

    function finishOpen() {
      state = "open";
      seal.classList.remove("melting"); seal.classList.add("open");
      spoil.inert = false; spoil.removeAttribute("aria-hidden");
      btn.setAttribute("aria-expanded", "true");
      spoil.querySelector(".spoil__close").focus({ preventScroll: true });
    }

    btn.addEventListener("click", () => {
      if (state !== "frozen") return;
      if (reduce) { setMelt(1); finishOpen(); return; }
      size();
      state = "melting"; seal.classList.add("melting");
      drips = []; steam = []; r = 0;
      t0 = last = performance.now();
      burst(btn); burst(btn);
      requestAnimationFrame(frame);
    });

    spoil.querySelector(".spoil__close").addEventListener("click", () => {
      seal.classList.remove("open");
      spoil.inert = true; spoil.setAttribute("aria-hidden", "true");
      btn.setAttribute("aria-expanded", "false");
      if (reduce) { state = "frozen"; setMelt(0); size(); draw(0, 0); btn.focus({ preventScroll: true }); return; }
      seal.classList.add("freezing");
      // wait for the panel to collapse back, then grow the ice from the edges
      setTimeout(() => {
        size(); drips = []; steam = [];
        state = "freezing"; t0 = last = performance.now();
        seal.classList.remove("freezing");
        requestAnimationFrame(frame);
        btn.focus({ preventScroll: true });
      }, 150);
      seal.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
    });

    // (re)draw the ice whenever the frozen seal changes size (fonts, resize, lang)
    new ResizeObserver(() => { if (state === "frozen" && size()) draw(0, 0); }).observe(seal);
  }

  // highlight the active arc on the chapter ruler
  const arcIO = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      document.querySelectorAll(".ruler__seg").forEach(s => s.classList.toggle("on", s.dataset.arc === e.target.dataset.arc));
    }
  }, { rootMargin: "-45% 0px -45% 0px" });

  function renderShelf() {
    const fmt = new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "id-ID", { day: "numeric", month: "short", year: "numeric" });
    document.getElementById("shelf").innerHTML = VOLUMES.map(v => `
      <figure class="vol">
        <img src="assets/img/vol/t/vol${v.v}.webp" alt="${t("Sampul Fire Punch volume", "Fire Punch volume")} ${v.v}" loading="lazy" decoding="async" width="220" height="346">
        <figcaption class="mono"><b>Vol. ${v.v}</b>${fmt.format(new Date(v.date + "T12:00:00"))}<br>${t("Bab", "Ch.")} ${v.ch}</figcaption>
      </figure>`).join("");
  }
  function renderTrivia() {
    document.getElementById("trivia").innerHTML = TRIVIA.map(t => `<li>${t[lang]}</li>`).join("");
  }

  /* ---------------- heat (hold to ignite) ---------------- */
  let heat = 0, holding = false, lastHeat = -1;
  const ignite = document.getElementById("ignite");
  const hero = document.querySelector(".hero");
  const start = e => {
    if (e.target.closest("a, .lang")) return;
    holding = true;
  };
  const stop = () => (holding = false);
  hero.addEventListener("pointerdown", start);
  addEventListener("pointerup", stop);
  addEventListener("pointercancel", stop);
  ignite.addEventListener("keydown", e => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); holding = true; } });
  ignite.addEventListener("keyup", stop);
  ignite.addEventListener("blur", stop);
  ignite.addEventListener("contextmenu", e => e.preventDefault());

  /* ---------------- pointer ---------------- */
  const ptr = { x: -999, y: -999, vx: 0, active: false };
  addEventListener("pointermove", e => {
    if (ptr.active) ptr.vx = ptr.vx * .7 + (e.clientX - ptr.x) * .3;
    ptr.x = e.clientX; ptr.y = e.clientY; ptr.active = true;
  });
  document.addEventListener("pointerleave", () => (ptr.active = false));

  /* ---------------- weather canvas ---------------- */
  const cv = document.getElementById("weather");
  const cx = cv.getContext("2d");
  let W, H, DPR, flakes = [], embers = [];
  let wind = 0, scrollV = 0, lastScroll = scrollY;

  function resize() {
    DPR = Math.min(devicePixelRatio || 1, 1.5);   // full-screen snow doesn't need retina-sharp pixels
    W = innerWidth; H = innerHeight;
    cv.width = W * DPR; cv.height = H * DPR;
    cx.setTransform(DPR, 0, 0, DPR, 0, 0);
    const n = Math.min(320, Math.round((W * H) / 6500));
    flakes = Array.from({ length: n }, () => newFlake(true));
    sizeFire();
  }
  function newFlake(anywhere) {
    const z = Math.random();               // depth: 0 far, 1 near
    return {
      x: Math.random() * (W + 200) - 100,
      y: anywhere ? Math.random() * H : -10,
      r: .6 + z * 2.6,
      vy: .5 + z * 1.8,
      sway: Math.random() * Math.PI * 2,
      z
    };
  }
  function addEmber(x, y, power = 1) {
    if (embers.length > 400) return;
    embers.push({
      x, y,
      vx: (Math.random() - .5) * 1.6 * power,
      vy: -(.6 + Math.random() * 2.2) * power,
      life: 1, decay: .012 + Math.random() * .02,
      r: .8 + Math.random() * 2.2
    });
  }
  function burst(el) {
    const b = el.getBoundingClientRect();
    for (let i = 0; i < 40; i++) addEmber(b.left + Math.random() * b.width, b.bottom - Math.random() * 20, 1.6);
  }

  function weather() {
    cx.clearRect(0, 0, W, H);
    const meltR = 60 + heat * 220;

    // heat glow around the cursor
    if (ptr.active && finePointer) {
      const g = cx.createRadialGradient(ptr.x, ptr.y, 0, ptr.x, ptr.y, meltR * 1.4);
      g.addColorStop(0, `rgba(255,120,40,${.10 + heat * .30})`);
      g.addColorStop(1, "rgba(255,77,18,0)");
      cx.fillStyle = g;
      cx.fillRect(ptr.x - meltR * 1.4, ptr.y - meltR * 1.4, meltR * 2.8, meltR * 2.8);
      if (Math.random() < .15 + heat * .9) addEmber(ptr.x + (Math.random() - .5) * meltR * .6, ptr.y + (Math.random() - .5) * meltR * .4, .8 + heat);
    }

    // snow: white flakes with ink outline (reads on both ink & paper)
    wind += ((ptr.vx * .06) + Math.sin(performance.now() / 4000) * .8 - wind) * .02;
    cx.lineWidth = 1;
    cx.strokeStyle = "rgba(10,10,10,.55)";
    cx.fillStyle = "#f5f5f2";
    for (const f of flakes) {
      f.sway += .01 + f.z * .02;
      f.x += wind * (.4 + f.z) + Math.sin(f.sway) * .4;
      f.y += f.vy * (1 - heat * .35) - scrollV * f.z * .25;
      if (f.y > H + 10 || f.x < -120 || f.x > W + 120 || f.y < -40) Object.assign(f, newFlake(false), { x: Math.random() * W });
      if (ptr.active) {
        const dx = f.x - ptr.x, dy = f.y - ptr.y;
        if (dx * dx + dy * dy < meltR * meltR) {   // melts into an ember
          addEmber(f.x, f.y, .6);
          Object.assign(f, newFlake(false), { x: Math.random() * W });
          continue;
        }
      }
      cx.beginPath();
      cx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      cx.fill();
      if (f.r > 1.6) cx.stroke();
    }

    // embers
    for (let i = embers.length - 1; i >= 0; i--) {
      const e = embers[i];
      e.x += e.vx + wind * .3; e.y += e.vy; e.vy *= .985; e.life -= e.decay;
      if (e.life <= 0) { embers.splice(i, 1); continue; }
      cx.fillStyle = `rgba(255,${120 + e.life * 100 | 0},${30 + e.life * 40 | 0},${e.life})`;
      cx.fillRect(e.x, e.y, e.r, e.r);
    }
  }

  /* ---------------- pixel fire (hero) ---------------- */
  const fc = document.getElementById("fire");
  const fx = fc.getContext("2d");
  const FW = 140, FH = 70;
  let fireBuf = new Uint8Array(FW * FH), img, heroVisible = true;
  fc.width = FW; fc.height = FH;
  img = fx.createImageData(FW, FH);
  const FIRE = [[7,7,7],[31,7,7],[47,15,7],[71,15,7],[87,23,7],[103,31,7],[119,31,7],[143,39,7],[159,47,7],[175,63,7],[191,71,7],[199,71,7],[223,79,7],[223,87,7],[223,87,7],[215,95,7],[215,95,7],[215,103,15],[207,111,15],[207,119,15],[207,127,15],[207,135,23],[199,135,23],[199,143,23],[199,151,31],[191,159,31],[191,159,31],[191,167,39],[191,167,39],[191,175,47],[183,175,47],[183,183,47],[183,183,55],[207,207,111],[223,223,159],[239,239,199],[255,255,255]];
  function sizeFire() { /* canvas is CSS-scaled; nothing to do */ }
  function fire() {
    const src = 10 + heat * 26;             // source intensity follows heat
    const base = (FH - 1) * FW;
    for (let x = 0; x < FW; x++) fireBuf[base + x] = Math.max(0, Math.min(36, src - Math.random() * 10 | 0));
    for (let x = 0; x < FW; x++) {
      for (let y = 1; y < FH; y++) {
        const i = y * FW + x, rnd = Math.random() * 3 | 0;
        const v = fireBuf[i] - (rnd & 1) - (Math.random() < .4 ? 1 : 0);
        const to = i - FW - rnd + 1;
        if (to >= 0) fireBuf[to] = v < 0 ? 0 : v;
      }
    }
    const d = img.data;
    for (let i = 0; i < fireBuf.length; i++) {
      const v = fireBuf[i], c = FIRE[v], gray = v * 7;
      // cold = ink & white smoke, hot = colour fire
      d[i * 4]     = gray + (c[0] - gray) * heat;
      d[i * 4 + 1] = gray + (c[1] - gray) * heat;
      d[i * 4 + 2] = gray + (c[2] - gray) * heat;
      d[i * 4 + 3] = v < 2 ? 0 : Math.min(255, v * 12);
    }
    fx.putImageData(img, 0, 0);
  }
  new IntersectionObserver(([e]) => (heroVisible = e.isIntersecting)).observe(hero);

  /* ---------------- HUD temperature ---------------- */
  const tempEl = document.getElementById("temp");
  const hudFill = document.querySelector(".hud__bar");
  const zones = [...document.querySelectorAll("[data-temp]")];
  let baseTemp = -41, shownTemp = -41, shownInt = null;
  // the section crossing the middle of the viewport sets the base temperature (no per-frame layout reads)
  const zoneIO = new IntersectionObserver(entries => {
    for (const e of entries) if (e.isIntersecting) baseTemp = +e.target.dataset.temp;
  }, { rootMargin: "-50% 0px -50% 0px" });
  zones.forEach(z => zoneIO.observe(z));
  function hud() {
    const target = baseTemp + heat * 70;
    shownTemp += (target - shownTemp) * .08;
    const t = Math.round(shownTemp);
    if (t === shownInt) return;                    // only touch the DOM when the number changes
    shownInt = t;
    tempEl.textContent = (t < 0 ? "−" : "") + Math.abs(t) + "°C";
    hudFill.style.setProperty("--fill", Math.max(4, Math.min(100, (t + 45) / 1.1)) + "%");
  }

  /* ---------------- main loop ---------------- */
  let lastT = performance.now();
  function loop(now) {
    const dt = Math.min(6, (now - lastT) / 16.67); lastT = now;   // frame-rate independent heat
    heat += (holding ? (1 - heat) * .045 + .004 : -heat * .02 - .002) * dt;
    heat = Math.max(0, Math.min(1, heat));
    if (Math.abs(heat - lastHeat) > .002) { root.style.setProperty("--heat", heat.toFixed(3)); lastHeat = heat; }
    scrollV = scrollV * .85 + (scrollY - lastScroll) * .15; lastScroll = scrollY;
    ptr.vx *= .95;
    weather();
    if (heroVisible) fire();
    hud();
    updateCover();
    requestAnimationFrame(loop);
  }

  /* ---------------- Agni cover: heat reveals colour ---------------- */
  const cover = document.getElementById("cover");
  let coverR = 0, coverTarget = 0;
  cover.addEventListener("pointermove", e => {
    const b = cover.getBoundingClientRect();
    cover.style.setProperty("--mx", ((e.clientX - b.left) / b.width) * 100 + "%");
    cover.style.setProperty("--my", ((e.clientY - b.top) / b.height) * 100 + "%");
    coverTarget = 1;
    if (reduce) { coverR = 140; cover.style.setProperty("--r", "140px"); }
  });
  cover.addEventListener("pointerleave", () => (coverTarget = 0));
  cover.addEventListener("pointerdown", () => (holding = true));
  function updateCover() {
    coverR += (coverTarget * (90 + heat * 260) - coverR) * .1;
    if (coverR > .5 || coverTarget) cover.style.setProperty("--r", coverR.toFixed(1) + "px");
  }

  /* ---------------- panel wipes, chapter bands, counters ---------------- */
  const io = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add("is-in");
      io.unobserve(e.target);
      if (e.target.classList.contains("stat")) count(e.target.querySelector("b"));
    }
  }, { threshold: 0, rootMargin: "0px 0px -12% 0px" });   // ratio stays 0 while clipped, so no threshold
  document.querySelectorAll(".wipe, .chapter").forEach(el => io.observe(el));

  function count(el) {
    const end = +el.dataset.count, from = end > 1000 ? end - 40 : 0, t0 = performance.now(), dur = 1300;
    const step = now => {
      const p = Math.min(1, (now - t0) / dur), k = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(from + (end - from) * k);
      if (p < 1) requestAnimationFrame(step);
    };
    reduce ? (el.textContent = end) : requestAnimationFrame(step);
  }

  /* ---------------- boot ---------------- */
  applyLang();
  addEventListener("resize", resize);
  resize();
  if (reduce) {
    heat = 0; weather(); fire(); hud();
    addEventListener("scroll", hud, { passive: true });
  } else {
    requestAnimationFrame(loop);
  }
})();
