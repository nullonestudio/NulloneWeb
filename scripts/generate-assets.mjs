/**
 * Generates the placeholder brand imagery in /public (case-study art, team portraits, icons).
 * Run once with: `npx -y playwright@1 --version >/dev/null && node scripts/generate-assets.mjs`
 * Replace any output with real photography/screens later — paths are referenced from src/content/*.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = (p) => join(root, "public", p);

// deterministic PRNG
function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

const LOGO = (x, y, s, sw = 6.5, op = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s / 100})" fill="none" stroke="#fff" stroke-width="${sw}" stroke-linecap="round" opacity="${op}"><circle cx="54" cy="46" r="33"/><path d="M77 23 20 80"/></g>`;

const grain = `<filter id="g"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .07 0"/></filter><rect width="100%" height="100%" filter="url(#g)"/>`;

function frame(w, h, inner, { bg = "#0c0c0c", glow = [0.7, 0.2] } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <radialGradient id="glow" cx="${glow[0]}" cy="${glow[1]}" r=".9"><stop offset="0" stop-color="#2a2a2a"/><stop offset="1" stop-color="${bg}"/></radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#fff" stroke-opacity=".045"/></pattern>
    <linearGradient id="fadeDown" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".25"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#glow)"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>
  ${inner}
  ${grain}
</svg>`;
}

const brackets = (x, y, w, h, s = 22, op = 0.6) =>
  `<g fill="none" stroke="#fff" stroke-opacity="${op}" stroke-width="1.5">
    <path d="M${x} ${y + s}V${y}H${x + s}"/><path d="M${x + w - s} ${y}H${x + w}V${y + s}"/>
    <path d="M${x} ${y + h - s}V${y + h}H${x + s}"/><path d="M${x + w - s} ${y + h}H${x + w}V${y + h - s}"/></g>`;

function window_(x, y, w, h, content) {
  return `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="#111" stroke="#fff" stroke-opacity=".12"/>
  <circle cx="${x + 24}" cy="${y + 22}" r="5" fill="#fff" fill-opacity=".25"/><circle cx="${x + 42}" cy="${y + 22}" r="5" fill="#fff" fill-opacity=".15"/><circle cx="${x + 60}" cy="${y + 22}" r="5" fill="#fff" fill-opacity=".1"/>
  <line x1="${x}" x2="${x + w}" y1="${y + 44}" y2="${y + 44}" stroke="#fff" stroke-opacity=".08"/>${content}</g>`;
}

function linePath(r, x, y, w, h, n = 24, smooth = 0.5) {
  let v = 0.5;
  const pts = [];
  for (let i = 0; i < n; i++) {
    v = Math.min(0.95, Math.max(0.05, v + (r() - 0.45) * smooth * 0.4));
    pts.push([x + (i / (n - 1)) * w, y + h - v * h]);
  }
  return pts;
}
const toD = (pts) => pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");

/* ───── scenes ───── */
function fintech(v) {
  const r = rng(11 + v * 7);
  const W = 1600, H = 1200;
  const x = 150, y = 150, w = 1300, h = 900;
  let c = "";
  // sidebar
  c += `<rect x="${x}" y="${y + 44}" width="220" height="${h - 44}" fill="#0e0e0e"/>`;
  c += LOGO(x + 28, y + 70, 36, 7);
  for (let i = 0; i < 7; i++) c += `<rect x="${x + 30}" y="${y + 150 + i * 46}" width="${110 + r() * 60}" height="10" rx="5" fill="#fff" fill-opacity="${i === v ? 0.8 : 0.18}"/>`;
  const cx = x + 260;
  // KPI tiles
  for (let i = 0; i < 4; i++) {
    const tx = cx + i * 255, ty = y + 80;
    c += `<rect x="${tx}" y="${ty}" width="235" height="120" rx="10" fill="#151515" stroke="#fff" stroke-opacity=".08"/>`;
    c += `<rect x="${tx + 20}" y="${ty + 22}" width="80" height="8" rx="4" fill="#fff" fill-opacity=".3"/>`;
    c += `<text x="${tx + 20}" y="${ty + 82}" fill="#fff" font-family="Arial" font-size="38" font-weight="300">${["₹4.2Cr", "1,284", "98.1%", "2.4d"][i]}</text>`;
  }
  if (v === 2) {
    // big analytics chart
    const pts = linePath(r, cx + 20, y + 260, 990, 540, 40, 0.9);
    c += `<path d="${toD(pts)} L${cx + 1010} ${y + 800} L${cx + 20} ${y + 800}Z" fill="url(#fadeDown)" opacity=".5"/><path d="${toD(pts)}" fill="none" stroke="#fff" stroke-width="3"/>`;
    const p2 = linePath(r, cx + 20, y + 300, 990, 500, 40, 0.8);
    c += `<path d="${toD(p2)}" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2" stroke-dasharray="6 8"/>`;
  } else if (v === 1) {
    // kanban pipeline
    for (let col = 0; col < 4; col++) {
      const kx = cx + col * 255;
      c += `<rect x="${kx}" y="${y + 230}" width="235" height="620" rx="10" fill="#0f0f0f" stroke="#fff" stroke-opacity=".06"/>`;
      c += `<rect x="${kx + 18}" y="${y + 252}" width="90" height="9" rx="4" fill="#fff" fill-opacity=".5"/>`;
      const n = 2 + Math.floor(r() * 4);
      for (let k = 0; k < n; k++) {
        c += `<rect x="${kx + 14}" y="${y + 285 + k * 108}" width="207" height="92" rx="8" fill="#181818"/>`;
        c += `<rect x="${kx + 30}" y="${y + 305 + k * 108}" width="${100 + r() * 70}" height="8" rx="4" fill="#fff" fill-opacity=".55"/>`;
        c += `<rect x="${kx + 30}" y="${y + 325 + k * 108}" width="${60 + r() * 60}" height="7" rx="3.5" fill="#fff" fill-opacity=".2"/>`;
        c += `<circle cx="${kx + 196}" cy="${y + 355 + k * 108}" r="10" fill="#fff" fill-opacity=".15"/>`;
      }
    }
  } else {
    // chart + table
    const pts = linePath(r, cx + 30, y + 260, 560, 260, 26, 0.8);
    c += `<rect x="${cx}" y="${y + 230}" width="620" height="320" rx="10" fill="#141414" stroke="#fff" stroke-opacity=".08"/>`;
    c += `<path d="${toD(pts)} L${cx + 590} ${y + 520} L${cx + 30} ${y + 520}Z" fill="url(#fadeDown)" opacity=".5"/><path d="${toD(pts)}" fill="none" stroke="#fff" stroke-width="2.5"/>`;
    c += `<rect x="${cx + 640}" y="${y + 230}" width="370" height="320" rx="10" fill="#141414" stroke="#fff" stroke-opacity=".08"/>`;
    for (let b = 0; b < 8; b++) {
      const bh = 40 + r() * 200;
      c += `<rect x="${cx + 670 + b * 40}" y="${y + 520 - bh}" width="22" height="${bh}" rx="3" fill="#fff" fill-opacity="${0.2 + (b === 5 ? 0.7 : r() * 0.25)}"/>`;
    }
    for (let row = 0; row < 6; row++) {
      const ry = y + 580 + row * 48;
      c += `<line x1="${cx}" x2="${cx + 1010}" y1="${ry + 40}" y2="${ry + 40}" stroke="#fff" stroke-opacity=".06"/>`;
      c += `<circle cx="${cx + 16}" cy="${ry + 18}" r="10" fill="#fff" fill-opacity=".14"/>`;
      c += `<rect x="${cx + 40}" y="${ry + 13}" width="${140 + r() * 80}" height="9" rx="4" fill="#fff" fill-opacity=".45"/>`;
      c += `<rect x="${cx + 420}" y="${ry + 13}" width="90" height="9" rx="4" fill="#fff" fill-opacity=".22"/>`;
      c += `<rect x="${cx + 640}" y="${ry + 8}" width="86" height="20" rx="10" fill="none" stroke="#fff" stroke-opacity="${row % 3 === 0 ? 0.7 : 0.25}"/>`;
      c += `<rect x="${cx + 880}" y="${ry + 13}" width="110" height="9" rx="4" fill="#fff" fill-opacity=".3"/>`;
    }
  }
  return frame(W, H, window_(x, y, w, h, c) + brackets(90, 90, 1420, 1020));
}

function iso(px, py, pz, s) {
  return [800 + (px - py) * s * 0.866, 640 + (px + py) * s * 0.5 - pz * s];
}
function box(x, y, z, w, d, hgt, s, op = 0.6) {
  const P = (a, b, c) => iso(a, b, c, s).map((n) => n.toFixed(1)).join(" ");
  const top = `M${P(x, y, z + hgt)} L${P(x + w, y, z + hgt)} L${P(x + w, y + d, z + hgt)} L${P(x, y + d, z + hgt)}Z`;
  const left = `M${P(x, y + d, z)} L${P(x, y + d, z + hgt)} L${P(x + w, y + d, z + hgt)} L${P(x + w, y + d, z)}Z`;
  const right = `M${P(x + w, y, z)} L${P(x + w, y, z + hgt)} L${P(x + w, y + d, z + hgt)} L${P(x + w, y + d, z)}Z`;
  return `<path d="${left}" fill="#151515" stroke="#fff" stroke-opacity="${op}"/><path d="${right}" fill="#1c1c1c" stroke="#fff" stroke-opacity="${op}"/><path d="${top}" fill="#232323" stroke="#fff" stroke-opacity="${op}"/>`;
}
function immersive(v) {
  const s = v === 1 ? 46 : 38;
  let c = "";
  // floor grid
  for (let i = -8; i <= 8; i++) {
    const a = iso(i, -8, 0, s), b = iso(i, 8, 0, s), c1 = iso(-8, i, 0, s), d = iso(8, i, 0, s);
    c += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#fff" stroke-opacity=".07"/><line x1="${c1[0]}" y1="${c1[1]}" x2="${d[0]}" y2="${d[1]}" stroke="#fff" stroke-opacity=".07"/>`;
  }
  const lift = v === 1 ? 1.4 : 0;
  c += box(-3, -2, 0, 6, 4, 1.2, s);
  c += box(-2.5, -1.5, 1.2 + lift * 0.5, 3, 3, 2.2, s);
  c += box(0.8, -1.2, 1.2 + lift, 1.8, 2.4, 1.4, s);
  c += box(-2, -1, 3.4 + lift * 1.5, 2, 2, 0.6, s, 0.8);
  c += box(1, -0.8, 2.6 + lift * 2, 0.6, 1.6, 2.2, s);
  if (v === 1) {
    for (const [px, py, pz] of [[0, 0, 4.5], [1.3, 0, 5.3], [-1, 0, 6.8]]) {
      const [ax, ay] = iso(px, py, pz, s);
      c += `<line x1="${ax}" y1="${ay}" x2="${ax + 240}" y2="${ay - 60}" stroke="#fff" stroke-opacity=".5"/><circle cx="${ax}" cy="${ay}" r="5" fill="#fff"/><rect x="${ax + 240}" y="${ay - 76}" width="150" height="32" rx="16" fill="none" stroke="#fff" stroke-opacity=".6"/><rect x="${ax + 260}" y="${ay - 64}" width="100" height="8" rx="4" fill="#fff" fill-opacity=".6"/>`;
    }
  }
  if (v === 2) {
    c = `<g transform="translate(140 120) scale(.82)">${c}</g>`;
    c += window_(980, 200, 480, 300, `<rect x="1004" y="270" width="200" height="10" rx="5" fill="#fff" fill-opacity=".6"/><rect x="1004" y="295" width="380" height="8" rx="4" fill="#fff" fill-opacity=".2"/><rect x="1004" y="315" width="320" height="8" rx="4" fill="#fff" fill-opacity=".2"/><rect x="1004" y="430" width="140" height="40" rx="20" fill="#fff"/>`);
  }
  // headset reticle
  c += `<g opacity=".5"><circle cx="800" cy="600" r="420" fill="none" stroke="#fff" stroke-opacity=".08"/><circle cx="800" cy="600" r="6" fill="none" stroke="#fff"/></g>`;
  return frame(1600, 1200, c + brackets(90, 90, 1420, 1020), { glow: [0.5, 0.45] });
}

function vex(v) {
  const r = rng(77 + v);
  let c = "";
  const cx = 800, cy = 600;
  for (let i = 0; i < 6; i++) c += `<polygon points="${[...Array(6)].map((_, k) => { const a = (Math.PI / 3) * k + Math.PI / 6; const R = 120 + i * 85; return `${cx + R * Math.cos(a)},${cy + R * Math.sin(a)}`; }).join(" ")}" fill="none" stroke="#fff" stroke-opacity="${0.04 + i * 0.03}"/>`;
  if (v !== 2) {
    for (let t = 0; t < 3; t++) {
      let x = cx + (r() - 0.5) * 500, y = cy + (r() - 0.5) * 400, a = r() * 6.28;
      let d = `M${x} ${y}`;
      for (let k = 0; k < 40; k++) { a += (r() - 0.5) * 0.6; x += Math.cos(a) * 18; y += Math.sin(a) * 18; d += ` L${x.toFixed(1)} ${y.toFixed(1)}`; }
      c += `<path d="${d}" fill="none" stroke="#fff" stroke-opacity="${t === 0 ? 0.9 : 0.35}" stroke-width="${t === 0 ? 4 : 2}" stroke-linecap="round"/>`;
      c += `<circle cx="${x}" cy="${y}" r="${t === 0 ? 16 : 11}" fill="${t === 0 ? "#fff" : "none"}" stroke="#fff" stroke-width="2"/>`;
    }
    for (let k = 0; k < 14; k++) c += `<rect x="${cx + (r() - 0.5) * 900}" y="${cy + (r() - 0.5) * 700}" width="14" height="14" fill="none" stroke="#fff" stroke-opacity=".5" transform="rotate(45)" transform-origin="center"/>`;
    c += `<text x="150" y="190" fill="#fff" font-family="Arial" font-size="28" letter-spacing="8" opacity=".8">VEX</text><text x="1450" y="190" text-anchor="end" fill="#fff" font-family="Arial" font-size="28" opacity=".8">03 : 12</text>`;
    c += `<rect x="150" y="1000" width="420" height="8" rx="4" fill="#fff" fill-opacity=".15"/><rect x="150" y="1000" width="${120 + v * 160}" height="8" rx="4" fill="#fff"/>`;
  } else {
    c += window_(400, 220, 800, 760, [...Array(7)].map((_, i) => `<text x="440" y="${330 + i * 88}" fill="#fff" font-family="Arial" font-size="26" opacity="${i === 0 ? 1 : 0.5}">${String(i + 1).padStart(2, "0")}</text><rect x="510" y="${312 + i * 88}" width="${200 + r() * 160}" height="12" rx="6" fill="#fff" fill-opacity="${i === 0 ? 0.9 : 0.3}"/><text x="1160" y="${330 + i * 88}" text-anchor="end" fill="#fff" font-family="Arial" font-size="26" opacity="${i === 0 ? 1 : 0.5}">${Math.round(3000 - i * 230 - r() * 100)}</text>`).join(""));
  }
  c += LOGO(cx - 40, cy - 40, 80, 5, 0.25);
  return frame(1600, 1200, c + brackets(90, 90, 1420, 1020), { glow: [0.5, 0.5] });
}

function phone(x, y, w, h, inner) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="46" fill="#111" stroke="#fff" stroke-opacity=".25" stroke-width="2"/><rect x="${x + w / 2 - 50}" y="${y + 18}" width="100" height="26" rx="13" fill="#000"/>${inner}`;
}
function sync(v) {
  const r = rng(301 + v);
  let c = "";
  const cal = (x, y, cols, rows, cw, ch) => {
    let s = "";
    for (let i = 0; i < cols; i++) s += `<rect x="${x + i * cw + 6}" y="${y - 28}" width="${cw * 0.5}" height="8" rx="4" fill="#fff" fill-opacity=".35"/>`;
    for (let i = 0; i <= cols; i++) s += `<line x1="${x + i * cw}" x2="${x + i * cw}" y1="${y}" y2="${y + rows * ch}" stroke="#fff" stroke-opacity=".06"/>`;
    for (let j = 0; j <= rows; j++) s += `<line x1="${x}" x2="${x + cols * cw}" y1="${y + j * ch}" y2="${y + j * ch}" stroke="#fff" stroke-opacity=".06"/>`;
    for (let k = 0; k < cols * 1.6; k++) {
      const col = Math.floor(r() * cols), row = Math.floor(r() * (rows - 2)), len = 1 + Math.floor(r() * 2);
      const hi = r() > 0.75;
      s += `<rect x="${x + col * cw + 5}" y="${y + row * ch + 4}" width="${cw - 10}" height="${len * ch - 8}" rx="8" fill="${hi ? "#fff" : "#1d1d1d"}" fill-opacity="${hi ? 0.9 : 1}" stroke="#fff" stroke-opacity=".12"/>`;
      s += `<rect x="${x + col * cw + 16}" y="${y + row * ch + 16}" width="${cw * 0.45}" height="7" rx="3.5" fill="${hi ? "#000" : "#fff"}" fill-opacity=".5"/>`;
    }
    return s;
  };
  if (v === 0) {
    c += window_(200, 260, 1000, 680, cal(240, 360, 7, 7, 130, 76));
    c += phone(1060, 330, 340, 700, `<rect x="1090" y="410" width="160" height="12" rx="6" fill="#fff" fill-opacity=".8"/>` + [...Array(6)].map((_, i) => `<rect x="1090" y="${450 + i * 90}" width="280" height="74" rx="14" fill="${i === 1 ? "#fff" : "#1a1a1a"}"/><rect x="1108" y="${468 + i * 90}" width="${120 + r() * 80}" height="9" rx="4" fill="${i === 1 ? "#000" : "#fff"}" fill-opacity=".6"/><rect x="1108" y="${488 + i * 90}" width="80" height="7" rx="3.5" fill="${i === 1 ? "#000" : "#fff"}" fill-opacity=".3"/>`).join(""));
  } else if (v === 1) {
    c += phone(580, 140, 440, 920, `<text x="620" y="250" fill="#fff" font-family="Arial" font-size="30">This week</text>` + cal(620, 330, 3, 9, 120, 74));
  } else {
    c += window_(160, 200, 1280, 800, cal(420, 320, 6, 8, 160, 76) + [...Array(8)].map((_, i) => `<circle cx="200" cy="${300 + i * 80}" r="16" fill="#fff" fill-opacity=".15"/><rect x="226" y="${294 + i * 80}" width="${100 + r() * 60}" height="10" rx="5" fill="#fff" fill-opacity=".4"/>`).join(""));
  }
  return frame(1600, 1200, c + brackets(90, 90, 1420, 1020), { glow: [0.3, 0.3] });
}

function asme(v) {
  const r = rng(909 + v);
  let c = "";
  if (v === 0) {
    let inner = "";
    for (let i = 0; i < 3; i++) {
      const tx = 210 + i * 400;
      inner += `<rect x="${tx}" y="330" width="370" height="170" rx="12" fill="#151515" stroke="#fff" stroke-opacity=".08"/><text x="${tx + 28}" y="440" fill="#fff" font-family="Arial" font-size="56" font-weight="300">${["2,048", "312", "96%"][i]}</text><rect x="${tx + 28}" y="365" width="120" height="9" rx="4" fill="#fff" fill-opacity=".35"/>`;
    }
    for (let b = 0; b < 24; b++) { const bh = 30 + r() * 300; inner += `<rect x="${220 + b * 48}" y="${880 - bh}" width="28" height="${bh}" rx="4" fill="#fff" fill-opacity="${0.15 + r() * 0.5}"/>`; }
    c += window_(170, 250, 1260, 700, inner);
  } else if (v === 1) {
    c += box(-2, -2, 0, 4, 4, 2, 50, 0.5);
    c += phone(900, 200, 420, 820, `<rect x="930" y="300" width="360" height="560" rx="12" fill="none" stroke="#fff" stroke-opacity=".4" stroke-dasharray="8 8"/><circle cx="1110" cy="580" r="60" fill="none" stroke="#fff"/><line x1="1110" y1="500" x2="1110" y2="660" stroke="#fff" stroke-opacity=".5"/><line x1="1030" y1="580" x2="1190" y2="580" stroke="#fff" stroke-opacity=".5"/><rect x="940" y="900" width="340" height="70" rx="35" fill="#fff"/>`);
  } else {
    const nodes = [[300, 400], [650, 300], [650, 600], [1000, 450], [1300, 300], [1300, 650], [650, 880], [1000, 820]];
    const edges = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5], [2, 6], [6, 7], [7, 5]];
    for (const [a, b] of edges) c += `<path d="M${nodes[a][0]} ${nodes[a][1]} C${(nodes[a][0] + nodes[b][0]) / 2} ${nodes[a][1]} ${(nodes[a][0] + nodes[b][0]) / 2} ${nodes[b][1]} ${nodes[b][0]} ${nodes[b][1]}" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2"/>`;
    nodes.forEach(([x, y], i) => (c += `<rect x="${x - 90}" y="${y - 34}" width="180" height="68" rx="12" fill="${i === 3 ? "#fff" : "#151515"}" stroke="#fff" stroke-opacity=".3"/><rect x="${x - 62}" y="${y - 6}" width="${80 + r() * 40}" height="10" rx="5" fill="${i === 3 ? "#000" : "#fff"}" fill-opacity=".6"/>`));
  }
  return frame(1600, 1200, c + brackets(90, 90, 1420, 1020), { glow: [0.6, 0.25] });
}

function portrait(seed, initials) {
  const r = rng(seed);
  const W = 1000, H = 1250;
  const tilt = (r() - 0.5) * 8;
  const lx = 0.25 + r() * 0.5;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="bg" cx="${lx}" cy=".25" r="1"><stop offset="0" stop-color="#3a3a3a"/><stop offset=".6" stop-color="#151515"/><stop offset="1" stop-color="#0a0a0a"/></radialGradient>
    <linearGradient id="sk" x1="${lx < 0.5 ? 0 : 1}" y1="0" x2="${lx < 0.5 ? 1 : 0}" y2="1"><stop offset="0" stop-color="#8a8a8a"/><stop offset=".55" stop-color="#3a3a3a"/><stop offset="1" stop-color="#151515"/></linearGradient>
    <linearGradient id="cl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2a2a"/><stop offset="1" stop-color="#0d0d0d"/></linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <g transform="rotate(${tilt} 500 700)">
    <path d="M140 1250 C150 980 300 900 500 890 C700 900 850 980 860 1250Z" fill="url(#cl)"/>
    <rect x="430" y="700" width="140" height="220" rx="60" fill="url(#sk)"/>
    <ellipse cx="500" cy="560" rx="${175 + r() * 15}" ry="${220 + r() * 15}" fill="url(#sk)"/>
    <path d="M${318 + r() * 8} ${560 + r() * 30} C${300 + r() * 10} 330 ${700 - r() * 10} 330 ${682 - r() * 8} ${560 + r() * 30} C${650} ${430 + r() * 30} ${350} ${430 + r() * 30} ${318 + r() * 8} ${560 + r() * 30}Z" fill="#0e0e0e"/>
  </g>
  <text x="60" y="1190" fill="#fff" fill-opacity=".14" font-family="Arial" font-size="40" letter-spacing="10">${initials}</text>
  ${grain}
</svg>`;
}

const iconSvg = (size, pad = 0.22, radius = 0.22) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100"><rect width="100" height="100" rx="${radius * 100}" fill="#0A0A0A"/><g fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" transform="translate(50 50) scale(${1 - pad}) translate(-50 -50)"><circle cx="54" cy="46" r="33"/><path d="M77 23 20 80"/></g></svg>`;

const jobs = [];
const scenes = { "fintech-dashboard-reboot": fintech, "immersive-b2b-sales-demo": immersive, vex, sync, asme };
for (const [slug, fn] of Object.entries(scenes)) {
  [0, 1, 2].forEach((v) => jobs.push({ out: `images/work/${slug}${v ? `-${v + 1}` : ""}.jpg`, svg: fn(v), w: 1600, h: 1200, type: "jpeg" }));
}
const people = [["mustafa-abbas", "MA"], ["mirza-shah-hussain", "MSH"], ["member-1", "N1"], ["member-2", "N1"], ["member-3", "N1"], ["member-4", "N1"]];
people.forEach(([slug, ini], i) => jobs.push({ out: `images/team/${slug}.jpg`, svg: portrait(1000 + i * 37, ini), w: 1000, h: 1250, type: "jpeg" }));
jobs.push({ out: "icons/icon-192.png", svg: iconSvg(192), w: 192, h: 192, type: "png" });
jobs.push({ out: "icons/icon-512.png", svg: iconSvg(512), w: 512, h: 512, type: "png" });
jobs.push({ out: "icons/icon-maskable-512.png", svg: iconSvg(512, 0.42, 0), w: 512, h: 512, type: "png" });
jobs.push({ out: "logo.png", svg: iconSvg(512, 0.2, 0), w: 512, h: 512, type: "png" });
jobs.push({ out: "../src/app/apple-icon.png", svg: iconSvg(180, 0.26, 0), w: 180, h: 180, type: "png" });

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage();
for (const job of jobs) {
  await page.setViewportSize({ width: job.w, height: job.h });
  await page.setContent(`<html><body style="margin:0;background:#0a0a0a">${job.svg}</body></html>`);
  const file = pub(job.out);
  await mkdir(dirname(file), { recursive: true });
  await page.screenshot({ path: file, type: job.type, quality: job.type === "jpeg" ? 86 : undefined, clip: { x: 0, y: 0, width: job.w, height: job.h } });
  console.log("✓", job.out);
}
await browser.close();
