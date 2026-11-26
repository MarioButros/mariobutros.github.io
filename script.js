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
  themeToggle?.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  const icon = themeToggle?.querySelector(".icon");
  if (icon) icon.textContent = isDark ? "☀" : "◐";
  try { localStorage.setItem("ischoola_theme", theme); } catch { /* maintain current theme */ }
}

(function initTheme(){
  let saved;
  try { saved = localStorage.getItem("ischoola_theme"); } catch { /* use system preference */ }
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

// Career pathway examples
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

// Close the mobile navigation on Escape or an outside click.
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && menu?.classList.contains("open")) {
    menu.classList.remove("open");
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.focus();
  }
});
document.addEventListener("click", event => {
  if (menu?.classList.contains("open") && !event.target.closest(".nav")) {
    menu.classList.remove("open");
    toggleBtn.setAttribute("aria-expanded", "false");
  }
});

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

