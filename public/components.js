/* React Bits islands — RubberSegment, BorderGlow, BlurText.
   Loaded as a native ES module, no bundler: React/ReactDOM/Motion/htm all
   come from ESM CDNs, and Tailwind's Play CDN (loaded in index.html) compiles
   the utility classes these components ship with. */

import React from "react";
import { createRoot } from "react-dom/client";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "https://esm.sh/motion@11.15.0/react?external=react,react-dom";
import htm from "https://esm.sh/htm@3.1.1";

const html = htm.bind(React.createElement);
const { useEffect, useLayoutEffect, useRef, useState } = React;

/* ---------------------------------------------------------------- */
/* RubberSegment                                                     */
/* ---------------------------------------------------------------- */

const EASE_OUT = [0.23, 1, 0.32, 1];
const SPRING_UI = { type: "spring", duration: 0.3, bounce: 0 };
const SPRING_MOMENTUM = { type: "spring", duration: 0.4, bounce: 0.2 };
const SPRING_RELAX = { type: "spring", duration: 0.16, bounce: 0 };
const DILATE = 0.19;
const HANDOFF = 0.15;
const FLICK = 110;
const MAX_VELOCITY = 2000;
const DEADZONE = 4;
const SLOP = 10;
const RUBBER = 0.55;
const SIZES = {
  sm: { height: 28, font: 12, pad: 10, min: 36 },
  md: { height: 36, font: 13, pad: 14, min: 44 },
  lg: { height: 44, font: 14, pad: 18, min: 48 }
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const rubber = (over, dim) => (over * dim * RUBBER) / (dim + RUBBER * Math.abs(over));
const project = (v, glide) => {
  const d = 1 - 0.1 * Math.pow(0.05, glide / 100);
  return ((v / 1000) * d) / (1 - d);
};
const velocityOf = (hist, now) => {
  const recent = hist.filter(([t]) => now - t <= 100);
  if (recent.length < 2) return 0;
  const [t0, x0] = recent[0];
  const [t1, x1] = recent[recent.length - 1];
  return t1 - t0 >= 8 ? ((x1 - x0) / (t1 - t0)) * 1000 : 0;
};
const nearestSlot = (slots, x) => {
  let best = 0;
  for (let i = 1; i < slots.length; i++) {
    if (Math.abs((slots[i].l + slots[i].r) / 2 - x) < Math.abs((slots[best].l + slots[best].r) / 2 - x)) best = i;
  }
  return best;
};

function RubberSegment({
  items,
  value,
  defaultValue,
  onChange,
  trackColor = "#27272a",
  thumbColor = "#fafafa",
  textColor = "#fafafa",
  activeTextColor = "#18181b",
  size = "md",
  radius = 10,
  inset = 3,
  equalSlots = true,
  stretch = 100,
  squash = 3,
  speed = 1,
  glide = 75,
  draggable = true,
  disabled = false,
  className = "",
  "aria-label": ariaLabel = "Segmented control"
}) {
  const list = items.map(item => (typeof item === "string" ? { value: item, label: item } : item));
  const [inner, setInner] = useState(defaultValue ?? list[0]?.value);
  const current = value !== undefined ? value : inner;
  const index = Math.max(0, list.findIndex(item => item.value === current));
  const reduce = useReducedMotion();

  const trackRef = useRef(null);
  const itemRefs = useRef([]);
  const slots = useRef([]);
  const box = useRef(null);
  const committed = useRef(index);
  const handoff = useRef(0);
  const drag = useRef(null);
  const gen = useRef(0);

  const edgeL = useMotionValue(0);
  const edgeR = useMotionValue(0);
  const innerW = useMotionValue(0);
  const thumbRadius = Math.max(0, radius - inset);
  const clipPath = useTransform(
    () => `inset(0 ${Math.max(0, innerW.get() - edgeR.get())}px 0 ${Math.max(0, edgeL.get())}px round ${thumbRadius}px)`
  );

  const t = seconds => seconds / speed;

  const jumpTo = i => {
    const s = slots.current[i];
    if (!s) return;
    clearTimeout(handoff.current);
    gen.current += 1;
    edgeL.jump(s.l);
    edgeR.jump(s.r);
  };

  const measure = () => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    box.current = rect;
    slots.current = list.map((_, i) => {
      const el = itemRefs.current[i];
      if (!el) return { l: 0, r: 0 };
      const r = el.getBoundingClientRect();
      return { l: r.left - rect.left - inset, r: r.right - rect.left - inset };
    });
    innerW.set(rect.width - inset * 2);
    jumpTo(committed.current);
  };

  const listKey = list.map(item => item.value).join("|");
  useLayoutEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    if (typeof document !== "undefined" && document.fonts) document.fonts.ready.then(measure);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listKey, size, inset, equalSlots]);

  useEffect(() => {
    if (!drag.current && committed.current !== index) {
      committed.current = index;
      jumpTo(index);
    }
  });

  useEffect(
    () => () => {
      clearTimeout(handoff.current);
      edgeL.stop();
      edgeR.stop();
    },
    [edgeL, edgeR]
  );

  const commit = i => {
    committed.current = i;
    if (i === index) return;
    if (value === undefined) setInner(list[i].value);
    onChange?.(list[i].value, i);
  };

  const land = (to, v, flick, withSquash) => {
    const b = slots.current[to];
    if (!b) return;
    const g = ++gen.current;
    const dir = Math.sign((b.l + b.r) / 2 - (edgeL.get() + edgeR.get()) / 2) || 1;
    const [lead, leadTo, trail, trailTo] = dir > 0 ? [edgeR, b.r, edgeL, b.l] : [edgeL, b.l, edgeR, b.r];
    const velocityFor = mv => clamp(v === null ? mv.getVelocity() : v, -MAX_VELOCITY, MAX_VELOCITY);
    animate(lead, leadTo, {
      ...(flick ? SPRING_MOMENTUM : SPRING_UI),
      duration: t(flick ? 0.4 : 0.3),
      velocity: velocityFor(lead)
    });
    const trailVelocity = velocityFor(trail);
    if (!withSquash || squash <= 0) {
      animate(trail, trailTo, { ...SPRING_UI, duration: t(0.3), velocity: trailVelocity });
      return;
    }
    animate(trail, trailTo + dir * squash, { ...SPRING_UI, duration: t(0.3), velocity: trailVelocity }).then(() => {
      if (gen.current === g) animate(trail, trailTo, { ...SPRING_RELAX, duration: t(0.16) });
    });
  };

  const travel = (from, to) => {
    const a = slots.current[from];
    const b = slots.current[to];
    if (!a || !b) return;
    clearTimeout(handoff.current);
    gen.current += 1;
    if (reduce) {
      edgeL.jump(b.l);
      edgeR.jump(b.r);
      return;
    }
    const u = stretch / 100;
    const tween = { duration: t(DILATE), ease: EASE_OUT };
    animate(edgeL, b.l + (Math.min(a.l, b.l) - b.l) * u, tween);
    animate(edgeR, b.r + (Math.max(a.r, b.r) - b.r) * u, tween);
    handoff.current = setTimeout(() => land(to, null, false, true), t(HANDOFF) * 1000);
  };

  const localX = e => e.clientX - (box.current ? box.current.left : 0) - inset;

  const handlePointerDown = (e, i) => {
    if (disabled || drag.current || e.button !== 0) return;
    box.current = trackRef.current.getBoundingClientRect();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    const x = localX(e);
    const onThumb = draggable && x >= edgeL.get() && x <= edgeR.get();
    drag.current = { id: e.pointerId, x0: x, slot: i, onThumb, live: false, offset: 0, w: 0, hist: [[e.timeStamp, x]] };
    if (onThumb) {
      clearTimeout(handoff.current);
      gen.current += 1;
      edgeL.stop();
      edgeR.stop();
    } else if (!reduce) {
      e.currentTarget.dataset.pressed = "";
    }
  };

  const handlePointerMove = e => {
    const d = drag.current;
    if (!d || e.pointerId !== d.id || !d.onThumb) return;
    const x = localX(e);
    d.hist.push([e.timeStamp, x]);
    if (d.hist.length > 8) d.hist.shift();
    if (!d.live) {
      if (Math.abs(x - d.x0) < DEADZONE) return;
      d.live = true;
      d.offset = x - edgeL.get();
      d.w = edgeR.get() - edgeL.get();
      if (trackRef.current) trackRef.current.dataset.held = "";
    }
    const width = innerW.get();
    const l = x - d.offset;
    const maxL = width - d.w;
    if (reduce) {
      const c = clamp(l, 0, maxL);
      edgeL.set(c);
      edgeR.set(c + d.w);
    } else if (l < 0) {
      edgeL.set(0);
      edgeR.set(d.w - rubber(-l, d.w));
    } else if (l > maxL) {
      edgeR.set(width);
      edgeL.set(maxL + rubber(l - maxL, d.w));
    } else {
      edgeL.set(l);
      edgeR.set(l + d.w);
    }
  };

  const release = () => {
    const d = drag.current;
    drag.current = null;
    if (trackRef.current) delete trackRef.current.dataset.held;
    const el = itemRefs.current[d.slot];
    if (el) delete el.dataset.pressed;
    return d;
  };

  const handlePointerUp = e => {
    const d = drag.current;
    if (!d || e.pointerId !== d.id) return;
    release();
    const x = localX(e);
    if (!d.live) {
      if (Math.abs(x - d.x0) <= SLOP && d.slot !== committed.current) {
        const from = committed.current;
        commit(d.slot);
        travel(from, d.slot);
      }
      return;
    }
    const v = velocityOf(d.hist, e.timeStamp);
    const flick = Math.abs(v) > FLICK;
    let to = nearestSlot(slots.current, (edgeL.get() + edgeR.get()) / 2 + project(v, glide));
    if (flick && to === committed.current) to = clamp(to + Math.sign(v), 0, list.length - 1);
    commit(to);
    if (reduce) jumpTo(to);
    else land(to, v, flick, flick);
  };

  const handlePointerCancel = e => {
    const d = drag.current;
    if (!d || e.pointerId !== d.id) return;
    release();
    if (!d.live) return;
    if (reduce) jumpTo(committed.current);
    else land(committed.current, null, false, false);
  };

  const handleKeyDown = e => {
    if (disabled) return;
    const last = list.length - 1;
    let next = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = Math.min(last, index + 1);
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = Math.max(0, index - 1);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    if (next === index) return;
    commit(next);
    jumpTo(next);
    itemRefs.current[next]?.focus();
  };

  const preset = SIZES[size] || SIZES.md;

  const trackClassName = `group relative inline-grid grid-flow-col auto-cols-auto align-middle select-none touch-pan-y [font-family:inherit] [-webkit-tap-highlight-color:transparent] [-webkit-touch-callout:none] p-[var(--rs-inset)] rounded-[var(--rs-radius)] [background:var(--rs-track)] data-[equal]:auto-cols-[minmax(0,1fr)] data-[held]:cursor-grabbing aria-disabled:pointer-events-none aria-disabled:opacity-50${className ? ` ${className}` : ""}`;
  const btnClassName =
    "inline-flex h-[calc(var(--rs-h)-var(--rs-inset)*2)] min-w-[var(--rs-min)] items-center justify-center gap-1.5 m-0 border-0 bg-transparent px-[var(--rs-pad)] py-0 rounded-[var(--rs-thumb-radius)] [font:inherit] text-[length:var(--rs-font)] font-medium leading-none whitespace-nowrap outline-none [transition:opacity_160ms_ease,transform_160ms_var(--rs-ease-out)] motion-reduce:[transition:opacity_160ms_ease] cursor-pointer [color:var(--rs-ink)] opacity-70 aria-checked:cursor-default group-data-[draggable]:aria-checked:cursor-grab group-data-[held]:cursor-grabbing data-[pressed]:[transform:scale(0.96)] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:[outline-color:var(--rs-thumb)] [@media(hover:hover)_and_(pointer:fine)]:[&[aria-checked=false]:hover]:opacity-90";
  const thumbSpanClassName =
    "inline-flex h-[calc(var(--rs-h)-var(--rs-inset)*2)] min-w-[var(--rs-min)] items-center justify-center gap-1.5 m-0 border-0 bg-transparent px-[var(--rs-pad)] py-0 rounded-[var(--rs-thumb-radius)] [font:inherit] text-[length:var(--rs-font)] font-medium leading-none whitespace-nowrap outline-none [transition:opacity_160ms_ease,transform_160ms_var(--rs-ease-out)] motion-reduce:[transition:opacity_160ms_ease] cursor-default [color:inherit]";

  return html`
    <div
      ref=${trackRef}
      role="radiogroup"
      aria-label=${ariaLabel}
      aria-disabled=${disabled || undefined}
      data-equal=${equalSlots ? "" : undefined}
      data-draggable=${draggable && !disabled ? "" : undefined}
      className=${trackClassName}
      style=${{
        "--rs-track": trackColor,
        "--rs-thumb": thumbColor,
        "--rs-ink": textColor,
        "--rs-ink-active": activeTextColor,
        "--rs-radius": `${radius}px`,
        "--rs-inset": `${inset}px`,
        "--rs-thumb-radius": `${thumbRadius}px`,
        "--rs-h": `${preset.height}px`,
        "--rs-font": `${preset.font}px`,
        "--rs-pad": `${preset.pad}px`,
        "--rs-min": `${preset.min}px`,
        "--rs-ease-out": "cubic-bezier(0.23, 1, 0.32, 1)"
      }}
      onPointerMove=${handlePointerMove}
      onPointerUp=${handlePointerUp}
      onPointerCancel=${handlePointerCancel}
      onLostPointerCapture=${handlePointerCancel}
    >
      ${list.map(
        (item, i) => html`
        <button
          key=${item.value}
          ref=${el => {
            itemRefs.current[i] = el;
          }}
          type="button"
          role="radio"
          aria-checked=${i === index}
          tabIndex=${i === index ? 0 : -1}
          disabled=${disabled}
          className=${btnClassName}
          onPointerDown=${e => handlePointerDown(e, i)}
          onKeyDown=${handleKeyDown}
        >${item.icon || ""}${item.label}</button>
      `
      )}
      <${motion.div}
        className="pointer-events-none absolute inset-[var(--rs-inset)] grid grid-flow-col auto-cols-auto group-data-[equal]:auto-cols-[minmax(0,1fr)] [background:var(--rs-thumb)] [color:var(--rs-ink-active)]"
        aria-hidden="true"
        style=${{ clipPath }}
      >
        ${list.map(
          item => html`
          <span key=${item.value} className=${thumbSpanClassName}>${item.icon || ""}${item.label}</span>
        `
        )}
      <//>
    </div>
  `;
}

/* ---------------------------------------------------------------- */
/* BorderGlow                                                        */
/* ---------------------------------------------------------------- */

function parseHSL(hslStr) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildBoxShadow(glowColor, intensity) {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const layers = [
    [0, 0, 0, 1, 100, true], [0, 0, 1, 0, 60, true], [0, 0, 3, 0, 50, true],
    [0, 0, 6, 0, 40, true], [0, 0, 15, 0, 30, true], [0, 0, 25, 2, 20, true],
    [0, 0, 50, 2, 10, true],
    [0, 0, 1, 0, 60, false], [0, 0, 3, 0, 50, false], [0, 0, 6, 0, 40, false],
    [0, 0, 15, 0, 30, false], [0, 0, 25, 2, 20, false], [0, 0, 50, 2, 10, false]
  ];
  return layers
    .map(([x, y, blur, spread, alpha, inset]) => {
      const a = Math.min(alpha * intensity, 100);
      return `${inset ? "inset " : ""}${x}px ${y}px ${blur}px ${spread}px hsl(${base} / ${a}%)`;
    })
    .join(", ");
}

function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}
function easeInCubic(x) {
  return x * x * x;
}

function animateValue({ start = 0, end = 100, duration = 1000, delay = 0, ease = easeOutCubic, onUpdate, onEnd }) {
  const t0 = performance.now() + delay;
  function tick() {
    const elapsed = performance.now() - t0;
    const tt = Math.min(elapsed / duration, 1);
    onUpdate(start + (end - start) * ease(tt));
    if (tt < 1) requestAnimationFrame(tick);
    else if (onEnd) onEnd();
  }
  setTimeout(() => requestAnimationFrame(tick), delay);
}

const GRADIENT_POSITIONS = ["80% 55%", "69% 34%", "8% 6%", "41% 38%", "86% 85%", "82% 18%", "51% 4%"];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildMeshGradients(colors) {
  const gradients = [];
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
    gradients.push(`radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`);
  }
  gradients.push(`linear-gradient(${colors[0]} 0 100%)`);
  return gradients;
}

function isLightColor(color) {
  const value = color.trim().replace("#", "");
  if (!/^[\da-f]{3}([\da-f]{3})?$/i.test(value)) return false;
  const hex = value.length === 3 ? value.split("").map(char => char + char).join("") : value;
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4, 6), 16);
  return red * 0.2126 + green * 0.7152 + blue * 0.0722 > 180;
}

function BorderGlow({
  children,
  className = "",
  edgeSensitivity = 30,
  glowColor = "40 80 80",
  backgroundColor = "#120F17",
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1.0,
  coneSpread = 25,
  animated = false,
  colors = ["#c084fc", "#f472b6", "#38bdf8"],
  fillOpacity = 0.5
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorAngle, setCursorAngle] = useState(45);
  const [edgeProximity, setEdgeProximity] = useState(0);
  const [sweepActive, setSweepActive] = useState(false);

  const getCenterOfElement = el => {
    const { width, height } = el.getBoundingClientRect();
    return [width / 2, height / 2];
  };

  const getEdgeProximity = (el, x, y) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    let kx = Infinity;
    let ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
  };

  const getCursorAngle = (el, x, y) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    if (dx === 0 && dy === 0) return 0;
    const radians = Math.atan2(dy, dx);
    let degrees = radians * (180 / Math.PI) + 90;
    if (degrees < 0) degrees += 360;
    return degrees;
  };

  const handlePointerMove = e => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setEdgeProximity(getEdgeProximity(card, x, y));
    setCursorAngle(getCursorAngle(card, x, y));
  };

  useEffect(() => {
    if (!animated) return;
    const angleStart = 110;
    const angleEnd = 465;
    setSweepActive(true);
    setCursorAngle(angleStart);

    animateValue({ duration: 500, onUpdate: v => setEdgeProximity(v / 100) });
    animateValue({
      ease: easeInCubic,
      duration: 1500,
      end: 50,
      onUpdate: v => setCursorAngle((angleEnd - angleStart) * (v / 100) + angleStart)
    });
    animateValue({
      ease: easeOutCubic,
      delay: 1500,
      duration: 2250,
      start: 50,
      end: 100,
      onUpdate: v => setCursorAngle((angleEnd - angleStart) * (v / 100) + angleStart)
    });
    animateValue({
      ease: easeInCubic,
      delay: 2500,
      duration: 1500,
      start: 100,
      end: 0,
      onUpdate: v => setEdgeProximity(v / 100),
      onEnd: () => setSweepActive(false)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animated]);

  const colorSensitivity = edgeSensitivity + 20;
  const isVisible = isHovered || sweepActive;
  const borderOpacity = isVisible ? Math.max(0, (edgeProximity * 100 - colorSensitivity) / (100 - colorSensitivity)) : 0;
  const glowOpacity = isVisible ? Math.max(0, (edgeProximity * 100 - edgeSensitivity) / (100 - edgeSensitivity)) : 0;

  const meshGradients = buildMeshGradients(colors);
  const borderBg = meshGradients.map(g => `${g} border-box`);
  const fillBg = meshGradients.map(g => `${g} padding-box`);
  const angleDeg = `${cursorAngle.toFixed(3)}deg`;
  const lightSurface = isLightColor(backgroundColor);
  const maskStack = [
    "linear-gradient(to bottom, black, black)",
    "radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%)",
    "radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%)",
    "radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%)",
    "radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%)",
    "radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%)",
    `conic-gradient(from ${angleDeg} at center, transparent 5%, black 15%, black 85%, transparent 95%)`
  ].join(", ");

  return html`
    <div
      ref=${cardRef}
      onPointerMove=${handlePointerMove}
      onPointerEnter=${() => setIsHovered(true)}
      onPointerLeave=${() => setIsHovered(false)}
      className=${`relative grid isolate border ${className}`}
      style=${{
        background: backgroundColor,
        borderColor: lightSurface ? "rgb(24 24 27 / 12%)" : "rgb(255 255 255 / 15%)",
        borderRadius: `${borderRadius}px`,
        transform: "translate3d(0, 0, 0.01px)",
        boxShadow: lightSurface
          ? "rgb(24 24 27 / 4%) 0 1px 2px, rgb(24 24 27 / 5%) 0 8px 24px"
          : "rgba(0,0,0,0.1) 0 1px 2px, rgba(0,0,0,0.1) 0 2px 4px, rgba(0,0,0,0.1) 0 4px 8px, rgba(0,0,0,0.1) 0 8px 16px, rgba(0,0,0,0.1) 0 16px 32px, rgba(0,0,0,0.1) 0 32px 64px"
      }}
    >
      <div
        className="absolute inset-0 rounded-[inherit] -z-[1]"
        style=${{
          border: "1px solid transparent",
          background: ["linear-gradient(" + backgroundColor + " 0 100%) padding-box", "linear-gradient(rgb(255 255 255 / 0%) 0% 100%) border-box", ...borderBg].join(", "),
          opacity: borderOpacity,
          maskImage: `conic-gradient(from ${angleDeg} at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`,
          WebkitMaskImage: `conic-gradient(from ${angleDeg} at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`,
          transition: isVisible ? "opacity 0.25s ease-out" : "opacity 0.75s ease-in-out"
        }}
      ></div>

      <div
        className="absolute inset-0 rounded-[inherit] -z-[1]"
        style=${{
          border: "1px solid transparent",
          background: fillBg.join(", "),
          maskImage: maskStack,
          WebkitMaskImage: maskStack,
          maskComposite: "subtract, add, add, add, add, add",
          WebkitMaskComposite: "source-out, source-over, source-over, source-over, source-over, source-over",
          opacity: borderOpacity * fillOpacity,
          mixBlendMode: lightSurface ? "normal" : "soft-light",
          transition: isVisible ? "opacity 0.25s ease-out" : "opacity 0.75s ease-in-out"
        }}
      ></div>

      <span
        className="absolute pointer-events-none z-[1] rounded-[inherit]"
        style=${{
          inset: `${-glowRadius}px`,
          maskImage: `conic-gradient(from ${angleDeg} at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`,
          WebkitMaskImage: `conic-gradient(from ${angleDeg} at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`,
          opacity: glowOpacity,
          mixBlendMode: lightSurface ? "normal" : "plus-lighter",
          transition: isVisible ? "opacity 0.25s ease-out" : "opacity 0.75s ease-in-out"
        }}
      >
        <span
          className="absolute rounded-[inherit]"
          style=${{ inset: `${glowRadius}px`, boxShadow: buildBoxShadow(glowColor, glowIntensity) }}
        ></span>
      </span>

      <div className="flex flex-col relative overflow-auto z-[1]">${children}</div>
    </div>
  `;
}

/* ---------------------------------------------------------------- */
/* BlurText                                                           */
/* ---------------------------------------------------------------- */

const buildKeyframes = (from, steps) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);
  const keyframes = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
};

function BlurText({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = t => t,
  onAnimationComplete,
  stepDuration = 0.35
}) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = direction === "top" ? { filter: "blur(10px)", opacity: 0, y: -50 } : { filter: "blur(10px)", opacity: 0, y: 50 };
  const defaultTo = [
    { filter: "blur(5px)", opacity: 0.5, y: direction === "top" ? 5 : -5 },
    { filter: "blur(0px)", opacity: 1, y: 0 }
  ];

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  return html`
    <p ref=${ref} className=${`blur-text ${className} flex flex-wrap`}>
      ${elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);
        const spanTransition = { duration: totalDuration, times, delay: (index * delay) / 1000, ease: easing };
        return html`
          <${motion.span}
            key=${index}
            className="inline-block will-change-[transform,filter,opacity]"
            initial=${fromSnapshot}
            animate=${inView ? animateKeyframes : fromSnapshot}
            transition=${spanTransition}
            onAnimationComplete=${index === elements.length - 1 ? onAnimationComplete : undefined}
          >${segment === " " ? " " : segment}${animateBy === "words" && index < elements.length - 1 ? " " : ""}<//>
        `;
      })}
    </p>
  `;
}

/* ---------------------------------------------------------------- */
/* Mounting                                                            */
/* ---------------------------------------------------------------- */

const ORCHID_PALETTE = ["#f5941e", "#e6127e", "#7a1e9c"];

function mountRubberFilter() {
  const el = document.getElementById("rubberFilterMount");
  if (!el) return;
  const root = createRoot(el);
  root.render(
    html`<${RubberSegment}
      items=${[
        { value: "all", label: "All Grants" },
        { value: "national", label: "National" },
        { value: "international", label: "International" },
        { value: "fellowship", label: "Fellowships" }
      ]}
      defaultValue="all"
      onChange=${value => window.ORCHID?.setFilter?.(value)}
      trackColor="rgba(30, 19, 56, 0.06)"
      thumbColor="#ffffff"
      textColor="#4b4363"
      activeTextColor="#1c1330"
      size="md"
      radius=${999}
      inset=${4}
      equalSlots=${false}
      stretch=${90}
      squash=${3}
      speed=${1.1}
      glide=${70}
      draggable=${true}
      aria-label="Filter grants by category"
      className="glass"
    />`
  );
}

/* Purely decorative: mounts an animated glow "behind" a real, independently
   rendered card (see .glow-frame / .glow-decor in style.css). This keeps the
   React island fully decoupled from app.js's own DOM writes into the card
   next to it, so there's no mount-order race between the two scripts. */
function mountBorderGlow(id, options) {
  const container = document.getElementById(id);
  if (!container) return;
  const root = createRoot(container);
  root.render(html`<${BorderGlow} ...${options} className=${`w-full h-full ${options.className || ""}`} />`);
}

function mountBlurTaglines() {
  const el = document.getElementById("heroTaglineMount");
  if (!el) return;
  const text = el.textContent.replace(/\s+/g, " ").trim();
  const root = createRoot(el);
  root.render(
    html`<${BlurText}
      text=${text}
      delay=${80}
      animateBy="words"
      direction="top"
      stepDuration=${0.3}
      className="hero-tagline-blur"
    />`
  );
}

mountRubberFilter();
mountBlurTaglines();

mountBorderGlow("heroStatsGlow", {
  edgeSensitivity: 35,
  glowColor: "330 85% 60%",
  backgroundColor: "rgba(255,255,255,0.5)",
  borderRadius: 24,
  glowRadius: 36,
  glowIntensity: 1,
  coneSpread: 28,
  animated: true,
  colors: ORCHID_PALETTE,
  className: "glass border-glow-wrap"
});

mountBorderGlow("letterGlowMount", {
  edgeSensitivity: 30,
  glowColor: "330 80% 58%",
  backgroundColor: "rgba(255,255,255,0.55)",
  borderRadius: 26,
  glowRadius: 40,
  glowIntensity: 1,
  coneSpread: 25,
  animated: true,
  colors: ORCHID_PALETTE,
  className: "glass border-glow-wrap"
});

mountBorderGlow("closingGlowMount", {
  edgeSensitivity: 25,
  glowColor: "20 90% 60%",
  backgroundColor: "rgba(255,255,255,0.55)",
  borderRadius: 30,
  glowRadius: 46,
  glowIntensity: 1.1,
  coneSpread: 30,
  animated: true,
  colors: ORCHID_PALETTE,
  className: "glass border-glow-wrap"
});
