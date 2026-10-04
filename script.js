// Floating CTA: show once the demo video reaches the middle of the screen
const floatCta = document.getElementById("float-cta");
const demoEl = document.getElementById("demo");
const onScroll = () => {
  const on = demoEl.getBoundingClientRect().top < window.innerHeight / 2;
  floatCta.classList.toggle("is-on", on);
  floatCta.toggleAttribute("aria-hidden", !on);
  floatCta.tabIndex = on ? 0 : -1;
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// "Reads your restaurant" card: waveform + review counter
const wave = document.getElementById("wave");
const bars = Array.from({ length: 64 }, () => wave.appendChild(document.createElement("i")));
const count = document.getElementById("scan-count");
let reviews = 0;
setInterval(() => {
  bars.forEach((b, i) => {
    const edge = i > bars.length - 10 ? 1 : 0.15;
    b.style.height = 5 + Math.random() * 50 * edge + "px";
  });
  reviews = reviews >= 248 ? 0 : reviews + 3;
  count.textContent = reviews;
}, 150);

// "Reads your restaurant" card: type out a new restaurant + review on a loop
const ticker = document.getElementById("review-ticker");
const spots = [
  "Boudin Bakery · ★ 4.4 · “Hopped in to get bread: DELICIOUS SOURDOUGH!”",
  "In-N-Out Burger · ★ 4.3 · “The most popular burger on the West Coast”",
  "Fogo de Chão · ★ 4.7 · “Serious Steak Done Right”",
  "Tony’s Pizza Napoletana · ★ 4.5 · “Fantastic pizza. Must be the best dough in town.”",
  "Fog Harbor Fish House · ★ 4.5 · “Great restaurant!! Food was very good! Service was good.”",
];
// Shuffle so every visit shows a different lineup
for (let i = spots.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [spots[i], spots[j]] = [spots[j], spots[i]];
}
const tabs = Array.from(document.querySelectorAll("#scan-tabs span:nth-child(odd)"));
const setTab = (n) => tabs.forEach((t, i) => t.classList.toggle("is-on", i === n));
let spot = 0;
const typeSpot = () => {
  const line = spots[spot];
  let i = 0;
  reviews = 0;
  ticker.classList.remove("is-out");
  setTab(0);
  const step = () => {
    ticker.textContent = line.slice(0, ++i);
    if (i < line.length) return setTimeout(step, 25 + Math.random() * 45);
    setTab(1);
    setTimeout(() => setTab(2), 1700);
    setTimeout(() => {
      ticker.classList.add("is-out");
      setTimeout(() => { spot = (spot + 1) % spots.length; typeSpot(); }, 400);
    }, 3400);
  };
  step();
};
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  setInterval(() => { spot = (spot + 1) % spots.length; ticker.textContent = spots[spot]; }, 4000);
} else {
  typeSpot();
}

// "Creates your ad" card: fake render progress loop
const bar = document.getElementById("progress-bar");
const text = document.getElementById("stage-text");
const stages = [
  [0, "Reading your reviews…"],
  [25, "Writing your script…"],
  [50, "Cutting your ad…"],
  [80, "Adding music…"],
  [100, "Ready to publish ✓"],
];

let progress = 0;
const tick = () => {
  progress = progress >= 100 ? 0 : Math.min(100, progress + 2);
  bar.style.width = progress + "%";
  text.textContent = stages.filter(([at]) => progress >= at).pop()[1];
  setTimeout(tick, progress >= 100 ? 2000 : 120);
};
tick();

// "Built for results" tablet: rotate through restaurants and their ads
const tablet = document.getElementById("tablet");
const img = (id) => `https://images.unsplash.com/photo-${id}?w=240&q=70&auto=format&fit=crop`;
const ads = [
  { name: "Hinodeya Ramen", title: "Fall Menu Launch — 1 Minute Ad",
    shots: ["1569718212165-3a8278d5f624", "1612927601601-6638404737ce", "1591325418441-ff678baf78ef"],
    lines: ["Tonight, a bowl built on clear, delicate dashi.", "Slow push-in on the ramen.", "Springy noodles, lifted from the bowl.",
      "★★★★★ Top review from Google Maps", "Hinodeya Ramen. Embarcadero, San Francisco."] },
  { name: "Boudin Bakery", title: "Sourdough Weekend — 1 Minute Ad",
    shots: ["1597604391235-a7429b4b350c", "1590301157172-7ba48dd1c2b2", "1567042661848-7161ce446f85"],
    lines: ["Fresh sourdough, straight from the oven.", "Slow push-in on a crusty loaf.", "Tear it open, still warm.",
      "★★★★★ “Hopped in to get bread: DELICIOUS SOURDOUGH!”", "Boudin Bakery. Fisherman’s Wharf, San Francisco."] },
  { name: "In-N-Out Burger", title: "Burger Night — 1 Minute Ad",
    shots: ["1568901346375-23c9450c58cd", "1572802419224-296b0aeee0d9", "1594212699903-ec8a3eca50f5"],
    lines: ["One burger, done the classic way.", "Close-up of a double cheeseburger.", "Hot fries on the side.",
      "★★★★★ “The most popular burger on the West Coast”", "In-N-Out Burger. Fisherman’s Wharf, San Francisco."] },
  { name: "Fogo de Chão", title: "Date Night Special — 1 Minute Ad",
    shots: ["1558030089-02acba3c214e", "1594041680534-e8c8cdebd659", "1601356616077-695728ae17cb"],
    lines: ["Fire-grilled meats, carved at your table.", "Slow pan across the grill.", "Come hungry.",
      "★★★★★ “Serious Steak Done Right”", "Fogo de Chão. SoMa, San Francisco."] },
  { name: "Tony’s Pizza Napoletana", title: "Pizza Week — 1 Minute Ad",
    shots: ["1574071318508-1cdbab80d002", "1537734796389-e1fc293cf856", "1598023696416-0193a0bcd302"],
    lines: ["Pizza, fresh from the oven.", "Dough stretched by hand.", "Twelve styles to choose from.",
      "★★★★★ “Fantastic pizza. Must be the best dough in town.”", "Tony’s Pizza Napoletana. North Beach, San Francisco."] },
  { name: "Fog Harbor Fish House", title: "Seafood Season — 1 Minute Ad",
    shots: ["1519351635902-7c60d09cb2ed", "1557267725-c530b236f446", "1651323018466-b36b7df1d2b1"],
    lines: ["Fresh seafood by the Bay.", "Overhead shot of the seafood spread.", "Pull up a chair on Pier 39.",
      "★★★★★ “Worth the visit”", "Fog Harbor Fish House. Pier 39, San Francisco."] },
];
ads.forEach((ad) => ad.shots.forEach((id) => { new Image().src = img(id); })); // preload so swaps don't flash
const field = (key) => Array.from(tablet.querySelectorAll(`[data-t="${key}"]`));
let ad = 0;
setInterval(() => {
  tablet.classList.add("is-swapping");
  setTimeout(() => {
    ad = (ad + 1) % ads.length;
    const { name, title, shots, lines } = ads[ad];
    field("name")[0].textContent = name;
    field("title")[0].textContent = title;
    field("shot").forEach((el, i) => { el.src = img(shots[i]); });
    field("line").forEach((el, i) => { el.textContent = lines[i]; });
    tablet.classList.remove("is-swapping");
  }, 350);
}, 6000);

// ---------- Scroll animations ----------
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Tag elements to reveal; siblings in the same group get a stagger index
const revealGroups = [
  ".section .heading", ".section .sub",
  ".how__card", ".showcase", ".feat",
  ".compat__label", ".compat", ".split__art", ".stat",
  ".faq details", ".cta__inner > *", ".footer__grid",
];
revealGroups.forEach((sel) => {
  const seen = new Map();
  document.querySelectorAll(sel).forEach((el) => {
    const i = seen.get(el.parentElement) || 0;
    seen.set(el.parentElement, i + 1);
    el.dataset.reveal = "";
    el.style.setProperty("--i", i);
  });
});
document.querySelectorAll(".window__list li, .tline").forEach((el) => {
  el.style.setProperty("--li", Array.from(el.parentElement.children).filter((c) => c.matches("li, .tline")).indexOf(el));
});

const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
  }),
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

// Hero parallax
const hero = document.querySelector(".hero");
let ticking = false;
const onFrame = () => {
  ticking = false;
  const y = window.scrollY;
  if (y < 1200) hero.style.setProperty("--scroll", y);
};
if (!reduceMotion) {
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onFrame); } }, { passive: true });
  onFrame();
}
