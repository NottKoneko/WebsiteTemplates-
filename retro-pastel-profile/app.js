/**
 * RETRO PASTEL PROFILE - MAIN TEMPLATE SCRIPT
 * Renders config.js data into modular columns and widgets.
 * Supports single widgets, multi-widgets, duplicate widgets, and page switching.
 */

let SECTIONS = ["home", "menu"];

function setTxt(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val !== undefined && val !== null ? val : "";
}

function setHtml(id, val) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = val || "";
}

function setMeta(attr, key, val) {
  if (!val) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", val);
}

function switchSection(id) {
  const target = SECTIONS.includes(id) ? id : SECTIONS[0];
  document.querySelectorAll(".site-section").forEach(s => {
    s.classList.toggle("active", s.id === `${target}-section`);
    s.classList.toggle("inactive", s.id !== `${target}-section`);
  });
  document.querySelectorAll(".header-nav-list a, .sidebar-nav-list a").forEach(a => {
    a.classList.toggle("active-nav", a.getAttribute("href") === `#${target}`);
  });
  if (location.hash !== `#${target}`) history.pushState(null, "", `#${target}`);
}

function _previousSection() {
  const i = SECTIONS.indexOf(location.hash.replace("#", "") || SECTIONS[0]);
  switchSection(SECTIONS[(i - 1 + SECTIONS.length) % SECTIONS.length]);
}

function _nextSection() {
  const i = SECTIONS.indexOf(location.hash.replace("#", "") || SECTIONS[0]);
  switchSection(SECTIONS[(i + 1) % SECTIONS.length]);
}

// Convert legacy column object to widget array if needed
function normalizeColumnWidgets(colData, colType) {
  if (Array.isArray(colData)) return colData;
  if (!colData || typeof colData !== "object") return [];

  const widgets = [];
  if (colType === "homeLeft") {
    if (colData.avatarUrl) widgets.push({ type: "avatar", avatarUrl: colData.avatarUrl });
    if (colData.name || colData.tagline) widgets.push({ type: "profile", name: colData.name, tagline: colData.tagline });
    if (colData.stats && colData.stats.length > 0) widgets.push({ type: "stats", title: colData.statsButtonLabel || "stats", stats: colData.stats });
    if (colData.favoriteThings && colData.favoriteThings.items && colData.favoriteThings.items.length > 0) {
      widgets.push({ type: "favorites", title: colData.favoriteThings.title || "FAVORITE THINGS", items: colData.favoriteThings.items });
    }
    if (colData.varietySchedule && (colData.varietySchedule.title || colData.varietySchedule.text)) {
      widgets.push({ type: "schedule", title: colData.varietySchedule.title || "Main schedule", text: colData.varietySchedule.text || "" });
    }
  } else if (colType === "homeCenter") {
    if (colData.heading || colData.subheading || (colData.paragraphs && colData.paragraphs.length > 0)) {
      widgets.push({ type: "welcome", heading: colData.heading, subheading: colData.subheading, paragraphs: colData.paragraphs || [] });
    }
    if (colData.linkGroups && colData.linkGroups.length > 0) {
      widgets.push({ type: "linkGroups", linkGroups: colData.linkGroups });
    }
  } else if (colType === "homeRight") {
    if (colData.todos && colData.todos.length > 0) {
      widgets.push({ type: "todos", title: colData.todosTitle || "To dos:", todos: colData.todos });
    }
    if (colData.statusText || colData.statusTitle) {
      widgets.push({ type: "status", title: colData.statusTitle || "status", text: colData.statusText || "" });
    }
    if (colData.calendarDate || colData.calendarEvent || colData.calendarTitle) {
      widgets.push({ type: "calendar", title: colData.calendarTitle || "Calendar", date: colData.calendarDate || "", event: colData.calendarEvent || "" });
    }
    if (colData.sideScheduleItems && colData.sideScheduleItems.length > 0) {
      widgets.push({ type: "sideSchedule", title: colData.sideScheduleTitle || "Side schedule", items: colData.sideScheduleItems });
    }
  } else if (colType === "menuLeft") {
    if (colData.commissionsHeading || colData.commissionsDesc) {
      widgets.push({
        type: "commissions",
        heading: colData.commissionsHeading || "",
        status: colData.commissionsStatus || "",
        desc: colData.commissionsDesc || "",
        button: colData.commissionButton || { label: "Request Form", url: "#" },
      });
    }
    if (colData.disclaimerTitle || colData.disclaimerText) {
      widgets.push({ type: "disclaimer", title: colData.disclaimerTitle || "Notice & Policy", text: colData.disclaimerText || "" });
    }
  } else if (colType === "menuRight") {
    if (colData.title || colData.description || (colData.categories && colData.categories.length > 0)) {
      widgets.push({
        type: "catalog",
        title: colData.title || "Service Catalog / Menu",
        desc: colData.description || "",
        categories: colData.categories || [],
      });
    }
  }
  return widgets;
}

// Render individual widget to HTML string
function renderWidgetHtml(w) {
  if (!w || !w.type) return "";
  switch (w.type) {
    case "avatar":
      return `<div class="avatar-box"><img class="avatar-image" src="${w.avatarUrl || 'assets/avatar-placeholder.png'}" alt="Avatar" loading="eager"></div>`;
    case "profile":
      return `<div><h2 class="profile-name">${w.name || ''}</h2><div class="tagline-box"><p>${w.tagline || ''}</p></div></div>`;
    case "stats":
      return `<div class="stats-box"><h3 class="underlined-title">${w.title || 'stats'}</h3><ul class="stats-list">${(w.stats || []).map(s => `<li>♥ ${s.label} ${s.value}</li>`).join("")}</ul></div>`;
    case "favorites":
      return `<div class="favorites-box"><p><strong>${w.title || 'FAVORITE THINGS'}</strong><br>${(w.items || []).map(i => `[<u>${i.category}</u>] : ${i.value}`).join("<br>")}</p></div>`;
    case "schedule":
      return `<div class="schedule-box"><h3 class="underlined-title">${w.title || 'Schedule'}</h3><p class="schedule-text">${w.text || ''}</p></div>`;
    case "welcome":
    case "text":
      return `<div><div class="home-title-block">${w.heading ? `<h1 class="main-heading"><em>${w.heading}</em></h1>` : ''}${w.subheading ? `<p class="sub-heading">${w.subheading}</p>` : ''}</div><div class="bio-paragraphs">${(w.paragraphs || []).map(p => `<p class="p">${p}</p>`).join("")}</div></div>`;
    case "linkGroup":
      return `<div class="link-group"><h3 class="link-group-title">${w.title || 'Links'}</h3><ul class="theme-links-list">${(w.links || []).map(l => `<li><a href="${l.url}" target="_blank" rel="noopener">${l.label}</a></li>`).join("")}</ul></div>`;
    case "linkGroups":
      return `<div class="link-groups-container">${(w.linkGroups || []).map(g => `<div class="link-group"><h3 class="link-group-title">${g.title}</h3><ul class="theme-links-list">${(g.links || []).map(l => `<li><a href="${l.url}" target="_blank" rel="noopener">${l.label}</a></li>`).join("")}</ul></div>`).join("")}</div>`;
    case "todos":
      return `<div class="todos-box"><table class="theme-table"><thead><tr><th>${w.title || 'To dos:'}</th></tr></thead><tbody>${(w.todos || []).map(t => `<tr><td>${t}</td></tr>`).join("")}</tbody></table></div>`;
    case "status":
      return `<div class="status-widget"><h3 class="underlined-title">${w.title || 'status'}</h3><p class="status-msg">${(w.text || '').startsWith('♥ ') ? w.text : `♥ ${w.text || ''}`}</p></div>`;
    case "calendar":
      return `<div class="calendar-box"><h3 class="underlined-title">${w.title || 'Calendar'}</h3><table class="theme-table"><thead><tr><th>${w.date || ''}</th></tr></thead><tbody><tr><td>${w.event || ''}</td></tr></tbody></table></div>`;
    case "sideSchedule":
      return `<div class="schedule-box"><h3 class="underlined-title">${w.title || 'Side schedule'}</h3><div class="schedule-text">${(w.items || []).map(i => `<p>${i}</p>`).join("")}</div></div>`;
    case "commissions":
      return `<div class="commissions-section"><h3 class="comm-title"><span>${w.heading || ''}</span><br><span class="comm-status-text">${w.status || ''}</span></h3><p class="comm-desc">${w.desc || ''}</p>${w.button ? `<div class="comm-btn-wrap"><a href="${w.button.url || '#'}" target="_blank" rel="noopener noreferrer" class="comm-plain-link">${w.button.label || 'Request Form'}</a></div>` : ''}</div>`;
    case "disclaimer":
      return `<div class="disclaimer-widget"><h3 class="underlined-title">${w.title || 'Notice & Policy'}</h3><p class="disclaimer-text">${w.text || ''}</p></div>`;
    case "catalog":
      return `<div><h1 class="underlined-title big-title">${w.title || ''}</h1><p class="menu-desc">${w.desc || ''}</p><div class="catalog-categories-list">${(w.categories || []).map(c => `<div class="catalog-category-block"><h3 class="catalog-cat-title">${c.title}</h3><ul class="triggers-items-list">${(c.items || []).map(it => `<li>${it}</li>`).join("")}</ul></div>`).join("")}</div></div>`;
    default:
      return "";
  }
}

// Render column element with dividers between widgets
function renderColumnElement(container, widgets) {
  if (!container) return;
  const filtered = (widgets || []).filter(w => w && w.type);
  if (filtered.length === 0) {
    container.innerHTML = "";
    return;
  }
  container.innerHTML = filtered.map((w, idx) => {
    const html = renderWidgetHtml(w);
    return idx < filtered.length - 1 ? `${html}<hr class="theme-divider">` : html;
  }).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const cfg = window.SITE_CONFIG;
  if (!cfg) return;

  if (cfg.header && cfg.header.navLinks) {
    SECTIONS = cfg.header.navLinks.map(n => n.id);
  }

  // Metadata
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

  // Header Banner
  const b = document.getElementById("banner-img");
  if (b && cfg.header && cfg.header.bannerImage) {
    b.src = cfg.header.bannerImage.url || "assets/banner-placeholder.png";
    b.alt = cfg.header.bannerImage.alt || "Banner";
    const mh = cfg.header.bannerImage.maxHeight;
    if (mh && mh !== "none") {
      b.style.maxHeight = mh;
      b.style.objectFit = "cover";
    } else {
      b.style.maxHeight = "none";
      b.style.height = "auto";
    }
  }

  // Nav links
  if (cfg.header && cfg.header.navLinks) {
    setHtml("header-nav-links", cfg.header.navLinks.map(n => `<li><a href="#${n.id}" onclick="switchSection('${n.id}');return false;">${n.label}</a></li>`).join(""));
    document.querySelectorAll(".section-nav-target").forEach(el => {
      el.innerHTML = cfg.header.navLinks.map(n => `<li><a href="#${n.id}" onclick="switchSection('${n.id}');return false;">♥ ${n.label}</a></li>`).join("");
    });
  }

  // Render Home Columns
  if (cfg.homeSection) {
    const leftWidgets = normalizeColumnWidgets(cfg.homeSection.leftColumn, "homeLeft");
    const centerWidgets = normalizeColumnWidgets(cfg.homeSection.centerColumn, "homeCenter");
    const rightWidgets = normalizeColumnWidgets(cfg.homeSection.rightColumn, "homeRight");

    renderColumnElement(document.querySelector(".col-home-left"), leftWidgets);
    renderColumnElement(document.querySelector(".col-home-center"), centerWidgets);
    
    // For right column, keep navigation list at the top if present
    const rightCol = document.querySelector(".col-home-right");
    if (rightCol) {
      const navHeader = `<h3 class="underlined-title">navigation</h3><ul class="sidebar-nav-list section-nav-target">${(cfg.header && cfg.header.navLinks ? cfg.header.navLinks.map(n => `<li><a href="#${n.id}" onclick="switchSection('${n.id}');return false;">♥ ${n.label}</a></li>`).join("") : "")}</ul><hr class="theme-divider">`;
      const filtered = rightWidgets.filter(w => w && w.type);
      const rendered = filtered.map((w, idx) => {
        const html = renderWidgetHtml(w);
        return idx < filtered.length - 1 ? `${html}<hr class="theme-divider">` : html;
      }).join("");
      rightCol.innerHTML = navHeader + rendered;
    }
  }

  // Render Menu Section
  if (cfg.menuSection) {
    const menuLeft = normalizeColumnWidgets(cfg.menuSection.leftColumn, "menuLeft");
    const menuRight = normalizeColumnWidgets(cfg.menuSection.rightColumn, "menuRight");

    const subLeft = document.querySelector(".col-sub-left");
    if (subLeft) {
      const navHeader = `<div class="sidebar-nav-box"><h3 class="underlined-title">navigation</h3><ul class="sidebar-nav-list section-nav-target">${(cfg.header && cfg.header.navLinks ? cfg.header.navLinks.map(n => `<li><a href="#${n.id}" onclick="switchSection('${n.id}');return false;">♥ ${n.label}</a></li>`).join("") : "")}</ul></div><hr class="theme-divider">`;
      const filtered = menuLeft.filter(w => w && w.type);
      const rendered = filtered.map((w, idx) => {
        const html = renderWidgetHtml(w);
        return idx < filtered.length - 1 ? `${html}<hr class="theme-divider">` : html;
      }).join("");
      subLeft.innerHTML = navHeader + rendered;
    }

    renderColumnElement(document.querySelector(".col-sub-right"), menuRight);
  }

  // Footer
  if (cfg.footer && cfg.footer.text) {
    setHtml("footer-text", cfg.footer.text);
  }

  // Domain pill copy
  const toast = document.getElementById("toast");
  const copyBtn = document.getElementById("domain-copy-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(cfg.meta.domainUrl || location.href); } catch (e) {}
      if (toast) {
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2200);
      }
    });
  }

  window.addEventListener("hashchange", () => switchSection(location.hash.replace("#", "")));
  switchSection(location.hash.replace("#", "") || "home");
});
