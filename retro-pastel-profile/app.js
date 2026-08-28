let SECTIONS = ["home", "menu"];
const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
const setHtml = (id, val) => { const el = document.getElementById(id); if (el) el.innerHTML = val; };
const setMeta = (attr, key, val) => {
  if (!val) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute("content", val);
};
function switchSection(id) {
  const target = SECTIONS.includes(id) ? id : SECTIONS[0];
  document.querySelectorAll(".site-section").forEach(s => s.classList.toggle("active", s.id === `${target}-section`));
  document.querySelectorAll(".header-nav-list a, .sidebar-nav-list a").forEach(a => a.classList.toggle("active-nav", a.getAttribute("href") === `#${target}`));
  if (location.hash !== `#${target}`) history.pushState(null, "", `#${target}`);
}
function _previousSection() { const i = SECTIONS.indexOf(location.hash.replace("#", "") || SECTIONS[0]); switchSection(SECTIONS[(i - 1 + SECTIONS.length) % SECTIONS.length]); }
function _nextSection() { const i = SECTIONS.indexOf(location.hash.replace("#", "") || SECTIONS[0]); switchSection(SECTIONS[(i + 1) % SECTIONS.length]); }

document.addEventListener("DOMContentLoaded", () => {
  const cfg = window.SITE_CONFIG; if (!cfg) return;
  SECTIONS = cfg.header.navLinks.map(n => n.id);

  // Metadata & Social Embed Cards
  if (cfg.meta) {
    if (cfg.meta.title) {
      document.title = cfg.meta.title;
      setMeta("name", "title", cfg.meta.title);
      setMeta("property", "og:title", cfg.meta.title);
      setMeta("name", "twitter:title", cfg.meta.title);
    }
    if (cfg.meta.description) {
      setMeta("name", "description", cfg.meta.description);
      setMeta("property", "og:description", cfg.meta.description);
      setMeta("name", "twitter:description", cfg.meta.description);
    }
    if (cfg.meta.socialImage) {
      setMeta("property", "og:image", cfg.meta.socialImage);
      setMeta("name", "twitter:image", cfg.meta.socialImage);
    }
    if (cfg.meta.themeColor) {
      setMeta("name", "theme-color", cfg.meta.themeColor);
    }
    if (cfg.meta.domainUrl) {
      setMeta("property", "og:url", cfg.meta.domainUrl);
      setMeta("name", "twitter:url", cfg.meta.domainUrl);
    }
    setTxt("domain-pill-text", cfg.meta.domainPill || "yourdomain.com");
  }
  const b = document.getElementById("banner-img");
  if (b && cfg.header.bannerImage) {
    b.src = cfg.header.bannerImage.url; b.alt = cfg.header.bannerImage.alt || "Banner";
    const mh = cfg.header.bannerImage.maxHeight;
    if (mh && mh !== "none") { b.style.maxHeight = mh; b.style.objectFit = "cover"; } else { b.style.maxHeight = "none"; b.style.height = "auto"; }
  }
  setHtml("header-nav-links", cfg.header.navLinks.map(n => `<li><a href="#${n.id}" onclick="switchSection('${n.id}');return false;">${n.label}</a></li>`).join(""));
  document.querySelectorAll(".section-nav-target").forEach(el => el.innerHTML = cfg.header.navLinks.map(n => `<li><a href="#${n.id}" onclick="switchSection('${n.id}');return false;">♥ ${n.label}</a></li>`).join(""));

  // Home Section
  const hl = cfg.homeSection.leftColumn, hc = cfg.homeSection.centerColumn, hr = cfg.homeSection.rightColumn;
  document.getElementById("home-avatar").src = hl.avatarUrl; setTxt("home-name", hl.name); setHtml("home-tagline", `<p>${hl.tagline}</p>`);
  setTxt("home-stats-btn", hl.statsButtonLabel); setHtml("home-stats-list", hl.stats.map(s => `<li>♥ ${s.label} ${s.value}</li>`).join(""));
  setHtml("home-favorites", `<p><strong>${hl.favoriteThings.title}</strong><br>${hl.favoriteThings.items.map(i => `[<u>${i.category}</u>] : ${i.value}`).join("<br>")}</p>`);
  setTxt("home-variety-title", hl.varietySchedule.title); setTxt("home-variety-text", hl.varietySchedule.text);
  setHtml("home-heading", `<em>${hc.heading}</em>`); setTxt("home-subheading", hc.subheading);
  setHtml("home-paragraphs", hc.paragraphs.map(p => `<p class="p">${p}</p>`).join(""));
  setHtml("home-link-groups", hc.linkGroups.map(g => `<div class="link-group"><h3 class="link-group-title">${g.title}</h3><ul class="carrd-links-list">${g.links.map(l => `<li><a href="${l.url}" target="_blank" rel="noopener">${l.label}</a></li>`).join("")}</ul></div>`).join(""));
  setTxt("home-todos-title", hr.todosTitle); setHtml("home-todos-body", hr.todos.map(t => `<tr><td>${t}</td></tr>`).join(""));
  setTxt("home-status-title", hr.statusTitle); setTxt("home-status-text", hr.statusText.startsWith("♥ ") ? hr.statusText : `♥ ${hr.statusText}`);
  setTxt("home-calendar-title", hr.calendarTitle); setTxt("home-calendar-date", hr.calendarDate); setTxt("home-calendar-event", hr.calendarEvent);
  setTxt("home-side-sched-title", hr.asmrScheduleTitle || hr.sideScheduleTitle || "Side schedule");
  setHtml("home-side-sched-items", (hr.asmrScheduleItems || hr.sideScheduleItems || []).map(i => `<p>${i}</p>`).join(""));

  // Subpage Section (Menu / Commissions / Catalog)
  const sub = cfg.menuSection || cfg.asmrSection;
  if (sub) {
    const al = sub.leftColumn, ar = sub.rightColumn;
    setTxt("menu-comm-heading", al.commissionsHeading); setTxt("menu-comm-status", al.commissionsStatus); setTxt("menu-comm-desc", al.commissionsDesc);
    const cb = document.getElementById("menu-comm-btn"); if (cb) { cb.textContent = al.commissionButton.label; cb.href = al.commissionButton.url; }
    setTxt("menu-disclaimer-title", al.disclaimerTitle); setTxt("menu-disclaimer-text", al.disclaimerText);
    setTxt("menu-title", ar.title); setTxt("menu-desc", ar.description);
    setHtml("menu-categories", ar.categories.map(c => `<div class="asmr-category-block"><h3 class="asmr-cat-title">${c.title}</h3><ul class="triggers-items-list">${c.items.map(it => `<li>${it}</li>`).join("")}</ul></div>`).join(""));
  }
  setHtml("footer-text", cfg.footer.text);

  const toast = document.getElementById("toast");
  document.getElementById("domain-copy-btn").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(cfg.meta.domainUrl || location.href); } catch (e) {}
    toast.classList.add("show"); setTimeout(() => toast.classList.remove("show"), 2200);
  });
  window.addEventListener("hashchange", () => switchSection(location.hash.replace("#", ""))); switchSection(location.hash.replace("#", "") || "home");
});
