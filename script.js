// ========================
// iSchoola interactions
// Fast, accessible, minimal
// ========================

// Mobile nav
const toggleBtn = document.querySelector(".nav-toggle");
const menu = document.querySelector("#navMenu");
if (toggleBtn && menu) {
  toggleBtn.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Dark mode toggle (high contrast)
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  const isDark = theme === "dark";
  themeToggle?.setAttribute("aria-pressed", String(isDark));
  localStorage.setItem("ischoola_theme", theme);
}

(function initTheme(){
  const saved = localStorage.getItem("ischoola_theme");
  if (saved === "light" || saved === "dark") {
    setTheme(saved);
    return;
  }
  // Prefer OS theme
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(prefersDark ? "dark" : "light");
})();

themeToggle?.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") || "light";
  setTheme(current === "dark" ? "light" : "dark");
});

// Kinetic typography hero (accessible + respects reduced motion)
const kineticWord = document.getElementById("kineticWord");
const words = ["systems", "innovation", "career tracks", "quality", "technology", "confidence"];
let wordIndex = 0;

const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function animateWordChange(next) {
  if (!kineticWord) return;
  if (reduceMotion) {
    kineticWord.textContent = next;
    return;
  }

  // Lightweight "kinetic" effect: slide + blur (no heavy libs)
  kineticWord.style.transition = "transform 220ms ease, filter 220ms ease, opacity 220ms ease";
  kineticWord.style.transform = "translateY(-8px)";
  kineticWord.style.filter = "blur(3px)";
  kineticWord.style.opacity = "0.25";

  setTimeout(() => {
    kineticWord.textContent = next;
    kineticWord.style.transform = "translateY(0)";
    kineticWord.style.filter = "blur(0)";
    kineticWord.style.opacity = "1";
  }, 230);
}

if (kineticWord) {
  setInterval(() => {
    wordIndex = (wordIndex + 1) % words.length;
    animateWordChange(words[wordIndex]);
  }, 1900);
}

// AI-ish micro module (shuffles short insights)
const aiShuffle = document.getElementById("aiShuffle");
const aiInsights = [
  "Diagnostics → targets → weekly growth plan.",
  "Career track + projects + university readiness.",
  "Personalized tutoring loops for SAT/ACT/EST.",
  "Parent visibility dashboards and LMS alignment.",
  "Quality assurance cycles with actionable coaching."
];
let aiIndex = 0;

aiShuffle?.addEventListener("click", () => {
  aiIndex = (aiIndex + 1) % aiInsights.length;
  const strip = document.querySelector(".ai-copy .muted");
  if (strip) strip.textContent = "— " + aiInsights[aiIndex];
});

// “Generate pathway idea” demo
const recommendBtn = document.getElementById("recommendBtn");
const box = document.getElementById("recommendationBox");
const ideas = [
  { title: "Engineering Track", text: "Pre-calculus + Physics + Robotics projects + SAT/ACT Math plan." },
  { title: "Entrepreneurship Track", text: "Economics + Business planning + Digital marketing + pitch-day coaching." },
  { title: "Computer Science Track", text: "Python + Web development + AI mini-projects + portfolio building." },
  { title: "Design Track", text: "Digital design + UX projects + interdisciplinary showcases + university portfolio prep." },
  { title: "Health Sciences Track", text: "Biology + lab skills + research writing + test strategy for science reasoning." }
];

recommendBtn?.addEventListener("click", () => {
  if (!box) return;
  const pick = ideas[Math.floor(Math.random() * ideas.length)];
  box.innerHTML = `<strong>Pathway idea: ${pick.title}</strong><br><span class="muted">${pick.text}</span>`;
  box.focus();
});
