/**
 * RETRO PASTEL PROFILE - REAL-TIME WORKSPACE & MODULAR SECTION MANAGER
 * Allows adding, duplicating, reordering, and removing widgets anywhere in any column.
 * Real-time keystroke live preview, clean focused inspector, page outline, undo/redo, auto-save, and config export.
 */

(function () {
  'use strict';

  // --- STATE ---
  let DEFAULT_CONFIG = null;
  let CURRENT_CONFIG = null;
  let historyStack = [];
  let historyPointer = -1;
  const MAX_HISTORY = 50;
  const STORAGE_KEY = 'retro_pastel_profile_draft_config_v3';
  let activePageSection = 'home';
  let activeColumnKey = 'homeCenter'; // 'homeLeft', 'homeCenter', 'homeRight', 'menuLeft', 'menuRight', 'meta', 'banner'
  let activeWidgetIndex = 0;
  let activeSidebarTab = 'edit'; // 'edit' or 'outline'
  let activeInspectorMode = 'form'; // 'form' or 'raw'
  let autoSaveTimeout = null;

  // SVG Icons
  const ICON_UP_SVG = '<svg class="editor-arrow-svg" viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>';
  const ICON_DOWN_SVG = '<svg class="editor-arrow-svg" viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>';
  const ICON_DUP_SVG = '<svg class="editor-btn-svg" viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
  const ICON_DEL_SVG = '<svg class="editor-btn-svg" viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>';

  // Human-readable labels for columns
  const COLUMN_NAMES = {
    homeCenter: 'Center Column (Main Content)',
    homeLeft: 'Left Column (Sidebar)',
    homeRight: 'Right Column (Sidebar)',
    menuLeft: 'Left Column (Commissions)',
    menuRight: 'Right Column (Service Catalog)',
    meta: 'Website Metadata & Domain',
    banner: 'Header Banner Image',
  };

  // Widget Types Definitions & Starter Templates
  const WIDGET_TEMPLATES = {
    welcome: {
      type: 'welcome',
      label: 'Welcome / Text Block',
      desc: 'Main title, subtitle, and paragraph notes.',
      defaultData: {
        type: 'welcome',
        heading: 'Welcome to my room~',
        subheading: 'Official information board & notes',
        paragraphs: [
          '⧽・꒰ Welcome to my cozy corner! ꒱',
          '・Customize this text box directly in the editor.',
        ],
      },
    },
    profile: {
      type: 'profile',
      label: 'Profile Name & Tagline',
      desc: 'Display name and short creator intro.',
      defaultData: {
        type: 'profile',
        name: 'CreatorName',
        tagline: 'A short customizable creator tagline or cozy intro.',
      },
    },
    avatar: {
      type: 'avatar',
      label: 'Avatar Image',
      desc: 'Profile picture or character illustration.',
      defaultData: {
        type: 'avatar',
        avatarUrl: 'assets/avatar-placeholder.png',
      },
    },
    stats: {
      type: 'stats',
      label: 'Stats Rating Box',
      desc: 'Stats box with custom labels and star ratings.',
      defaultData: {
        type: 'stats',
        title: 'stats',
        stats: [
          { label: 'Energy', value: '★★★★☆' },
          { label: 'Creativity', value: '★★★★★' },
          { label: 'Comfy', value: '★★★★★' },
        ],
      },
    },
    favorites: {
      type: 'favorites',
      label: 'Favorite Things List',
      desc: 'Categorized list of interests, games, or music.',
      defaultData: {
        type: 'favorites',
        title: 'FAVORITE THINGS',
        items: [
          { category: 'Interests', value: 'Drawing, Gaming, Music' },
          { category: 'Hobbies', value: 'Coffee, Baking, Reading' },
        ],
      },
    },
    schedule: {
      type: 'schedule',
      label: 'Schedule Box',
      desc: 'Stream, event, or release schedule notice.',
      defaultData: {
        type: 'schedule',
        title: 'Schedule',
        text: '⧽・Every Monday & Thursday stream at 6pm EST.',
      },
    },
    linkGroup: {
      type: 'linkGroup',
      label: 'Link Category Group',
      desc: 'Category block with clickable links.',
      defaultData: {
        type: 'linkGroup',
        title: 'Social & Links',
        links: [
          { label: 'Main Account', url: 'https://x.com/' },
          { label: 'Discord Server', url: 'https://discord.gg/' },
        ],
      },
    },
    todos: {
      type: 'todos',
      label: 'To-Do List',
      desc: 'Tasks and checklist table.',
      defaultData: {
        type: 'todos',
        title: 'To dos:',
        todos: ['Update schedule', 'Draw new emotes', 'Drink plenty of water'],
      },
    },
    status: {
      type: 'status',
      label: 'Status Note',
      desc: 'Current status note and activity banner.',
      defaultData: {
        type: 'status',
        title: 'status',
        text: '♥ Working on new creative projects & stream assets!',
      },
    },
    calendar: {
      type: 'calendar',
      label: 'Calendar Event',
      desc: 'Upcoming event date and description.',
      defaultData: {
        type: 'calendar',
        title: 'Calendar',
        date: 'Upcoming Event:',
        event: 'Next community stream and special announcement.',
      },
    },
    sideSchedule: {
      type: 'sideSchedule',
      label: 'Multi-Item Schedule',
      desc: 'Weekly bulleted schedule items.',
      defaultData: {
        type: 'sideSchedule',
        title: 'Side schedule',
        items: ['⧽・Every Sunday weekly video release.', '・Every Friday game night at 7pm EST.'],
      },
    },
    commissions: {
      type: 'commissions',
      label: 'Commissions Block',
      desc: 'Commission status, description, and request button.',
      defaultData: {
        type: 'commissions',
        heading: 'Custom Commissions',
        status: 'OPEN',
        desc: '⧽・Custom creative commissions and personal requests are currently open.',
        button: { label: 'Request Form', url: 'https://forms.google.com/' },
      },
    },
    disclaimer: {
      type: 'disclaimer',
      label: 'Notice & Policy Box',
      desc: 'Important guidelines, rules, or policy note.',
      defaultData: {
        type: 'disclaimer',
        title: 'Notice & Policy',
        text: '⧽・All content is created for cozy entertainment. Please maintain respectful community boundaries!',
      },
    },
    catalog: {
      type: 'catalog',
      label: 'Service Catalog / Menu',
      desc: 'Catalog title and category item blocks.',
      defaultData: {
        type: 'catalog',
        title: 'Service Catalog / Menu',
        desc: '⧽・Browse available options below.',
        categories: [
          { title: 'Art & Emotes', items: ['Emote Pack 1', 'Badge Tier 1'] },
        ],
      },
    },
  };

  // --- UTILS ---
  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function setTxt(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val !== undefined && val !== null ? val : '';
  }

  function setHtml(id, val) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = val || '';
  }

  // --- NORMALIZE COLUMNS INTO WIDGET ARRAYS ---
  function normalizeToModularConfig(cfg) {
    const res = deepClone(cfg);
    res.homeSection = res.homeSection || {};
    res.menuSection = res.menuSection || {};

    res.homeSection.leftColumn = normalizeCol(res.homeSection.leftColumn, 'homeLeft');
    res.homeSection.centerColumn = normalizeCol(res.homeSection.centerColumn, 'homeCenter');
    res.homeSection.rightColumn = normalizeCol(res.homeSection.rightColumn, 'homeRight');
    res.menuSection.leftColumn = normalizeCol(res.menuSection.leftColumn, 'menuLeft');
    res.menuSection.rightColumn = normalizeCol(res.menuSection.rightColumn, 'menuRight');

    return res;
  }

  function normalizeCol(colData, colType) {
    if (Array.isArray(colData)) return colData;
    if (!colData || typeof colData !== 'object') return [];

    const widgets = [];
    if (colType === 'homeLeft') {
      if (colData.avatarUrl) widgets.push({ type: 'avatar', avatarUrl: colData.avatarUrl });
      if (colData.name || colData.tagline) widgets.push({ type: 'profile', name: colData.name, tagline: colData.tagline });
      if (colData.stats && colData.stats.length > 0) widgets.push({ type: 'stats', title: colData.statsButtonLabel || 'stats', stats: colData.stats });
      if (colData.favoriteThings && colData.favoriteThings.items && colData.favoriteThings.items.length > 0) {
        widgets.push({ type: 'favorites', title: colData.favoriteThings.title || 'FAVORITE THINGS', items: colData.favoriteThings.items });
      }
      if (colData.varietySchedule && (colData.varietySchedule.title || colData.varietySchedule.text)) {
        widgets.push({ type: 'schedule', title: colData.varietySchedule.title || 'Main schedule', text: colData.varietySchedule.text || '' });
      }
    } else if (colType === 'homeCenter') {
      if (colData.heading || colData.subheading || (colData.paragraphs && colData.paragraphs.length > 0)) {
        widgets.push({ type: 'welcome', heading: colData.heading || '', subheading: colData.subheading || '', paragraphs: colData.paragraphs || [] });
      }
      if (colData.linkGroups && colData.linkGroups.length > 0) {
        colData.linkGroups.forEach(g => {
          widgets.push({ type: 'linkGroup', title: g.title, links: g.links || [] });
        });
      }
    } else if (colType === 'homeRight') {
      if (colData.todos && colData.todos.length > 0) {
        widgets.push({ type: 'todos', title: colData.todosTitle || 'To dos:', todos: colData.todos });
      }
      if (colData.statusText || colData.statusTitle) {
        widgets.push({ type: 'status', title: colData.statusTitle || 'status', text: colData.statusText || '' });
      }
      if (colData.calendarDate || colData.calendarEvent || colData.calendarTitle) {
        widgets.push({ type: 'calendar', title: colData.calendarTitle || 'Calendar', date: colData.calendarDate || '', event: colData.calendarEvent || '' });
      }
      if (colData.sideScheduleItems && colData.sideScheduleItems.length > 0) {
        widgets.push({ type: 'sideSchedule', title: colData.sideScheduleTitle || 'Side schedule', items: colData.sideScheduleItems });
      }
    } else if (colType === 'menuLeft') {
      if (colData.commissionsHeading || colData.commissionsDesc) {
        widgets.push({
          type: 'commissions',
          heading: colData.commissionsHeading || 'Custom Commissions',
          status: colData.commissionsStatus || 'OPEN',
          desc: colData.commissionsDesc || '',
          button: colData.commissionButton || { label: 'Request Form', url: '#' },
        });
      }
      if (colData.disclaimerTitle || colData.disclaimerText) {
        widgets.push({ type: 'disclaimer', title: colData.disclaimerTitle || 'Notice & Policy', text: colData.disclaimerText || '' });
      }
    } else if (colType === 'menuRight') {
      if (colData.title || colData.description || (colData.categories && colData.categories.length > 0)) {
        widgets.push({
          type: 'catalog',
          title: colData.title || 'Service Catalog / Menu',
          desc: colData.description || '',
          categories: colData.categories || [],
        });
      }
    }
    return widgets;
  }

  // --- INITIALIZATION ---
  window.addEventListener('DOMContentLoaded', () => {
    if (!window.SITE_CONFIG) return;

    DEFAULT_CONFIG = normalizeToModularConfig(window.SITE_CONFIG);

    const savedDraft = localStorage.getItem(STORAGE_KEY);
    if (savedDraft) {
      try {
        CURRENT_CONFIG = normalizeToModularConfig(JSON.parse(savedDraft));
      } catch (e) {
        CURRENT_CONFIG = deepClone(DEFAULT_CONFIG);
      }
    } else {
      CURRENT_CONFIG = deepClone(DEFAULT_CONFIG);
    }

    historyStack = [deepClone(CURRENT_CONFIG)];
    historyPointer = 0;

    renderSite(CURRENT_CONFIG);
    updateToolbarUI();
    setupEventListeners();
    selectWidget('homeCenter', 0);

    // Show tutorial on first visit
    if (!localStorage.getItem('retro_pastel_tutorial_seen')) {
      setTimeout(() => {
        openModal('tutorial-modal');
        localStorage.setItem('retro_pastel_tutorial_seen', 'true');
      }, 400);
    }
  });

  // --- HISTORY & PERSISTENCE ---
  function commitHistorySnapshot() {
    if (historyPointer < historyStack.length - 1) {
      historyStack = historyStack.slice(0, historyPointer + 1);
    }
    historyStack.push(deepClone(CURRENT_CONFIG));
    if (historyStack.length > MAX_HISTORY) {
      historyStack.shift();
    } else {
      historyPointer++;
    }
    updateToolbarUI();
  }

  function triggerAutoSave() {
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(CURRENT_CONFIG));
        const statusEl = document.getElementById('save-status-text');
        if (statusEl) statusEl.textContent = 'saved';
      } catch (e) {
        console.error('LocalStorage write failed', e);
      }
    }, 250);

    const statusEl = document.getElementById('save-status-text');
    if (statusEl) statusEl.textContent = 'saving...';
  }

  function undo() {
    if (historyPointer > 0) {
      historyPointer--;
      CURRENT_CONFIG = deepClone(historyStack[historyPointer]);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(CURRENT_CONFIG));
      renderSite(CURRENT_CONFIG);
      renderActiveSidebarView();
      updateToolbarUI();
      showToast('Undo');
    }
  }

  function redo() {
    if (historyPointer < historyStack.length - 1) {
      historyPointer++;
      CURRENT_CONFIG = deepClone(historyStack[historyPointer]);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(CURRENT_CONFIG));
      renderSite(CURRENT_CONFIG);
      renderActiveSidebarView();
      updateToolbarUI();
      showToast('Redo');
    }
  }

  function resetToDefault() {
    CURRENT_CONFIG = deepClone(DEFAULT_CONFIG);
    commitHistorySnapshot();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(CURRENT_CONFIG));
    renderSite(CURRENT_CONFIG);
    renderActiveSidebarView();
    closeModal('reset-confirm-modal');
    showToast('Reset to defaults');
  }

  function updateToolbarUI() {
    const undoBtn = document.getElementById('btn-undo');
    const redoBtn = document.getElementById('btn-redo');
    if (undoBtn) undoBtn.disabled = historyPointer <= 0;
    if (redoBtn) redoBtn.disabled = historyPointer >= historyStack.length - 1;
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1800);
  }

  // --- PAGE SWITCHER ---
  function switchPageSection(id) {
    activePageSection = id;
    document.querySelectorAll('.site-section').forEach(s => {
      s.classList.toggle('active', s.id === `${id}-section`);
      s.classList.toggle('inactive', s.id !== `${id}-section`);
    });

    document.querySelectorAll('.editor-page-tab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.section === id);
    });

    document.querySelectorAll('.header-nav-list a, .sidebar-nav-list a').forEach(a => {
      a.classList.toggle('active-nav', a.getAttribute('href') === `#${id}`);
    });
  }

  window.editorSwitchSection = switchPageSection;

  // --- GET COLUMN ARRAY ---
  function getColumnArray(colKey) {
    const cfg = CURRENT_CONFIG;
    if (!cfg) return [];
    if (colKey === 'homeLeft') return cfg.homeSection.leftColumn;
    if (colKey === 'homeCenter') return cfg.homeSection.centerColumn;
    if (colKey === 'homeRight') return cfg.homeSection.rightColumn;
    if (colKey === 'menuLeft') return cfg.menuSection.leftColumn;
    if (colKey === 'menuRight') return cfg.menuSection.rightColumn;
    return [];
  }

  // --- DUPLICATE, MOVE, ADD, REMOVE WIDGETS ---
  function duplicateWidget(colKey, widgetIndex) {
    const col = getColumnArray(colKey);
    if (!col || !col[widgetIndex]) return;

    const cloned = deepClone(col[widgetIndex]);
    col.splice(widgetIndex + 1, 0, cloned);

    renderSite(CURRENT_CONFIG);
    commitHistorySnapshot();
    triggerAutoSave();
    selectWidget(colKey, widgetIndex + 1);
    showToast('Duplicated section');
  }

  function moveWidget(colKey, widgetIndex, direction) {
    const col = getColumnArray(colKey);
    if (!col || widgetIndex < 0 || widgetIndex >= col.length) return;

    const targetIndex = widgetIndex + direction;
    if (targetIndex < 0 || targetIndex >= col.length) return;

    const item = col.splice(widgetIndex, 1)[0];
    col.splice(targetIndex, 0, item);

    renderSite(CURRENT_CONFIG);
    commitHistorySnapshot();
    triggerAutoSave();
    selectWidget(colKey, targetIndex);
    showToast(direction > 0 ? 'Moved down' : 'Moved up');
  }

  function removeWidget(colKey, widgetIndex) {
    const col = getColumnArray(colKey);
    if (!col || !col[widgetIndex]) return;

    const removed = col.splice(widgetIndex, 1)[0];

    renderSite(CURRENT_CONFIG);
    commitHistorySnapshot();
    triggerAutoSave();

    const newIndex = Math.max(0, Math.min(widgetIndex, col.length - 1));
    selectWidget(colKey, newIndex);
    showToast(`Deleted ${removed.type || 'section'}`);
  }

  function addWidgetToColumn(colKey, widgetType) {
    const template = WIDGET_TEMPLATES[widgetType];
    if (!template) return;

    const col = getColumnArray(colKey);
    const newWidget = deepClone(template.defaultData);
    col.push(newWidget);

    renderSite(CURRENT_CONFIG);
    commitHistorySnapshot();
    triggerAutoSave();
    selectWidget(colKey, col.length - 1);
    closeModal('add-section-modal');
    showToast(`Added ${template.label}`);
  }

  window.duplicateWidget = duplicateWidget;
  window.moveWidget = moveWidget;
  window.removeWidget = removeWidget;
  window.addWidgetToColumn = addWidgetToColumn;

  // --- SELECTION & TAB SYNC ---
  function switchSidebarTab(tab) {
    activeSidebarTab = tab;
    const tabEditBtn = document.getElementById('sidebar-tab-edit');
    const tabOutlineBtn = document.getElementById('sidebar-tab-outline');
    const editHeader = document.getElementById('sidebar-edit-header');
    const outlineHeader = document.getElementById('sidebar-outline-header');
    const editView = document.getElementById('view-edit-section');
    const outlineView = document.getElementById('view-page-outline');

    if (tab === 'edit') {
      if (tabEditBtn) tabEditBtn.classList.add('active');
      if (tabOutlineBtn) tabOutlineBtn.classList.remove('active');
      if (editHeader) editHeader.style.display = 'flex';
      if (outlineHeader) outlineHeader.style.display = 'none';
      if (editView) editView.style.display = 'block';
      if (outlineView) outlineView.style.display = 'none';
      renderEditInspector();
    } else {
      if (tabOutlineBtn) tabOutlineBtn.classList.add('active');
      if (tabEditBtn) tabEditBtn.classList.remove('active');
      if (outlineHeader) outlineHeader.style.display = 'flex';
      if (editHeader) editHeader.style.display = 'none';
      if (outlineView) outlineView.style.display = 'block';
      if (editView) editView.style.display = 'none';
      renderPageOutline();
    }
  }

  function selectWidget(colKey, widgetIndex) {
    activeColumnKey = colKey;
    activeWidgetIndex = widgetIndex;

    // Switch to edit tab
    switchSidebarTab('edit');

    // Auto-switch page tab
    if (colKey.startsWith('menu')) {
      if (activePageSection !== 'menu') switchPageSection('menu');
    } else if (colKey.startsWith('home')) {
      if (activePageSection !== 'home') switchPageSection('home');
    }

    // Highlight selected widget on canvas
    document.querySelectorAll('.editor-widget-wrapper').forEach(el => {
      const match = el.dataset.colKey === colKey && Number(el.dataset.widgetIndex) === widgetIndex;
      el.classList.toggle('active-editing', match);
    });

    renderEditInspector();
  }

  window.selectWidget = selectWidget;

  function renderActiveSidebarView() {
    if (activeSidebarTab === 'outline') {
      renderPageOutline();
    } else {
      renderEditInspector();
    }
  }

  // --- RENDER LIVE SITE ON CANVAS ---
  function renderSite(cfg) {
    if (!cfg) return;

    // Meta & Header
    document.title = (cfg.meta && cfg.meta.title) ? `[edit] ${cfg.meta.title}` : 'Retro Pastel Profile (Editor)';
    setTxt('domain-pill-text', (cfg.meta && cfg.meta.domainPill) ? cfg.meta.domainPill : 'yourdomain.com');

    const bContainer = document.querySelector('.banner-container');
    const b = document.getElementById('banner-img');
    if (bContainer && b) {
      if (cfg.header && cfg.header.bannerImage && cfg.header.bannerImage.url) {
        bContainer.style.display = '';
        b.src = cfg.header.bannerImage.url;
        b.alt = cfg.header.bannerImage.alt || 'Banner';
        const mh = cfg.header.bannerImage.maxHeight;
        if (mh && mh !== 'none') {
          b.style.maxHeight = mh;
          b.style.objectFit = 'cover';
        } else {
          b.style.maxHeight = 'none';
          b.style.height = 'auto';
        }
      } else {
        bContainer.style.display = 'none';
      }
    }

    if (cfg.header && cfg.header.navLinks) {
      setHtml('header-nav-links', cfg.header.navLinks.map(n =>
        `<li><a href="#${n.id}" onclick="window.editorSwitchSection('${n.id}');return false;">${escapeHtml(n.label)}</a></li>`
      ).join(''));
    }

    // Render Home Columns
    renderInteractiveColumn('.col-home-left', 'homeLeft', cfg.homeSection.leftColumn);
    renderInteractiveColumn('.col-home-center', 'homeCenter', cfg.homeSection.centerColumn);

    const rightCol = document.querySelector('.col-home-right');
    if (rightCol) {
      const navHeader = `<h3 class="underlined-title">navigation</h3><ul class="sidebar-nav-list section-nav-target">${(cfg.header && cfg.header.navLinks ? cfg.header.navLinks.map(n => `<li><a href="#${n.id}" onclick="window.editorSwitchSection('${n.id}');return false;">♥ ${escapeHtml(n.label)}</a></li>`).join('') : '')}</ul><hr class="theme-divider">`;
      renderInteractiveColumnWithPrefix(rightCol, 'homeRight', cfg.homeSection.rightColumn, navHeader);
    }

    // Render Menu Columns
    const subLeft = document.querySelector('.col-sub-left');
    if (subLeft) {
      const navHeader = `<div class="sidebar-nav-box"><h3 class="underlined-title">navigation</h3><ul class="sidebar-nav-list section-nav-target">${(cfg.header && cfg.header.navLinks ? cfg.header.navLinks.map(n => `<li><a href="#${n.id}" onclick="window.editorSwitchSection('${n.id}');return false;">♥ ${escapeHtml(n.label)}</a></li>`).join('') : '')}</ul></div><hr class="theme-divider">`;
      renderInteractiveColumnWithPrefix(subLeft, 'menuLeft', cfg.menuSection.leftColumn, navHeader);
    }
    renderInteractiveColumn('.col-sub-right', 'menuRight', cfg.menuSection.rightColumn);

    // Footer
    if (cfg.footer && cfg.footer.text) {
      setHtml('footer-text', cfg.footer.text);
    }
  }

  function renderInteractiveColumn(selector, colKey, widgets) {
    const container = document.querySelector(selector);
    if (!container) return;
    renderInteractiveColumnWithPrefix(container, colKey, widgets, '');
  }

  function renderInteractiveColumnWithPrefix(container, colKey, widgets, prefixHtml) {
    const list = widgets || [];
    let html = prefixHtml || '';

    list.forEach((w, idx) => {
      const innerHtml = renderWidgetHtml(w);
      const isFirst = idx === 0;
      const isLast = idx === list.length - 1;

      html += `
        <div class="editor-widget-wrapper ${activeColumnKey === colKey && activeWidgetIndex === idx ? 'active-editing' : ''}" data-col-key="${colKey}" data-widget-index="${idx}">
          <div class="editor-widget-toolbar">
            <button type="button" class="editor-tool-btn" title="Move up" onclick="event.stopPropagation(); window.moveWidget('${colKey}', ${idx}, -1);" ${isFirst ? 'disabled style="opacity:0.3;"' : ''}>${ICON_UP_SVG}</button>
            <button type="button" class="editor-tool-btn" title="Move down" onclick="event.stopPropagation(); window.moveWidget('${colKey}', ${idx}, 1);" ${isLast ? 'disabled style="opacity:0.3;"' : ''}>${ICON_DOWN_SVG}</button>
            <button type="button" class="editor-tool-btn" title="Duplicate section" onclick="event.stopPropagation(); window.duplicateWidget('${colKey}', ${idx});">${ICON_DUP_SVG} duplicate</button>
            <button type="button" class="editor-tool-btn btn-tool-del" title="Delete section" onclick="event.stopPropagation(); window.removeWidget('${colKey}', ${idx});">${ICON_DEL_SVG}</button>
          </div>
          ${innerHtml}
        </div>
      `;

      if (idx < list.length - 1) {
        html += `<hr class="theme-divider">`;
      }
    });

    html += `
      <button type="button" class="editor-col-add-btn" onclick="window.openAddSectionModal('${colKey}')">
        + add section to this column
      </button>
    `;

    container.innerHTML = html;
  }

  function renderWidgetHtml(w) {
    if (!w || !w.type) return '';
    switch (w.type) {
      case 'avatar':
        return `<div class="avatar-box"><img class="avatar-image" src="${escapeHtml(w.avatarUrl || 'assets/avatar-placeholder.png')}" alt="Avatar"></div>`;
      case 'profile':
        return `<div><h2 class="profile-name">${escapeHtml(w.name || '')}</h2><div class="tagline-box"><p>${escapeHtml(w.tagline || '')}</p></div></div>`;
      case 'stats':
        return `<div class="stats-box"><h3 class="underlined-title">${escapeHtml(w.title || 'stats')}</h3><ul class="stats-list">${(w.stats || []).map(s => `<li>♥ ${escapeHtml(s.label)} ${escapeHtml(s.value)}</li>`).join('')}</ul></div>`;
      case 'favorites':
        return `<div class="favorites-box"><p><strong>${escapeHtml(w.title || 'FAVORITE THINGS')}</strong><br>${(w.items || []).map(i => `[<u>${escapeHtml(i.category)}</u>] : ${escapeHtml(i.value)}`).join('<br>')}</p></div>`;
      case 'schedule':
        return `<div class="schedule-box"><h3 class="underlined-title">${escapeHtml(w.title || 'Schedule')}</h3><p class="schedule-text">${escapeHtml(w.text || '')}</p></div>`;
      case 'welcome':
      case 'text':
        return `<div><div class="home-title-block">${w.heading ? `<h1 class="main-heading"><em>${escapeHtml(w.heading)}</em></h1>` : ''}${w.subheading ? `<p class="sub-heading">${escapeHtml(w.subheading)}</p>` : ''}</div><div class="bio-paragraphs">${(w.paragraphs || []).map(p => `<p class="p">${escapeHtml(p)}</p>`).join('')}</div></div>`;
      case 'linkGroup':
        return `<div class="link-group"><h3 class="link-group-title">${escapeHtml(w.title || 'Links')}</h3><ul class="theme-links-list">${(w.links || []).map(l => `<li><a href="${escapeHtml(l.url)}" target="_blank" rel="noopener">${escapeHtml(l.label)}</a></li>`).join('')}</ul></div>`;
      case 'todos':
        return `<div class="todos-box"><table class="theme-table"><thead><tr><th>${escapeHtml(w.title || 'To dos:')}</th></tr></thead><tbody>${(w.todos || []).map(t => `<tr><td>${escapeHtml(t)}</td></tr>`).join('')}</tbody></table></div>`;
      case 'status':
        return `<div class="status-widget"><h3 class="underlined-title">${escapeHtml(w.title || 'status')}</h3><p class="status-msg">${(w.text || '').startsWith('♥ ') ? escapeHtml(w.text) : `♥ ${escapeHtml(w.text || '')}`}</p></div>`;
      case 'calendar':
        return `<div class="calendar-box"><h3 class="underlined-title">${escapeHtml(w.title || 'Calendar')}</h3><table class="theme-table"><thead><tr><th>${escapeHtml(w.date || '')}</th></tr></thead><tbody><tr><td>${escapeHtml(w.event || '')}</td></tr></tbody></table></div>`;
      case 'sideSchedule':
        return `<div class="schedule-box"><h3 class="underlined-title">${escapeHtml(w.title || 'Side schedule')}</h3><div class="schedule-text">${(w.items || []).map(i => `<p>${escapeHtml(i)}</p>`).join('')}</div></div>`;
      case 'commissions':
        return `<div class="commissions-section"><h3 class="comm-title"><span>${escapeHtml(w.heading || '')}</span><br><span class="comm-status-text">${escapeHtml(w.status || '')}</span></h3><p class="comm-desc">${escapeHtml(w.desc || '')}</p>${w.button ? `<div class="comm-btn-wrap"><a href="${escapeHtml(w.button.url || '#')}" target="_blank" rel="noopener noreferrer" class="comm-plain-link">${escapeHtml(w.button.label || 'Request Form')}</a></div>` : ''}</div>`;
      case 'disclaimer':
        return `<div class="disclaimer-widget"><h3 class="underlined-title">${escapeHtml(w.title || 'Notice & Policy')}</h3><p class="disclaimer-text">${escapeHtml(w.text || '')}</p></div>`;
      case 'catalog':
        return `<div><h1 class="underlined-title big-title">${escapeHtml(w.title || '')}</h1><p class="menu-desc">${escapeHtml(w.desc || '')}</p><div class="catalog-categories-list">${(w.categories || []).map(c => `<div class="catalog-category-block"><h3 class="catalog-cat-title">${escapeHtml(c.title)}</h3><ul class="triggers-items-list">${(c.items || []).map(it => `<li>${escapeHtml(it)}</li>`).join('')}</ul></div>`).join('')}</div></div>`;
      default:
        return '';
    }
  }

  // --- EDIT INSPECTOR (FOCUSED SECTION VIEW) ---
  function renderEditInspector() {
    const badgeEl = document.getElementById('active-sec-badge');
    const titleEl = document.getElementById('active-sec-title');
    const btnUp = document.getElementById('btn-sec-up');
    const btnDown = document.getElementById('btn-sec-down');
    const btnDup = document.getElementById('btn-sec-dup');
    const btnDel = document.getElementById('btn-sec-del');
    const formPanel = document.getElementById('sidebar-form-panel');
    const rawTextarea = document.getElementById('sidebar-raw-textarea');
    const rawError = document.getElementById('sidebar-raw-error');

    if (badgeEl) badgeEl.textContent = COLUMN_NAMES[activeColumnKey] || 'Active Section';

    if (activeColumnKey === 'meta') {
      if (titleEl) titleEl.textContent = 'Metadata & Social Card';
      if (btnUp) btnUp.style.display = 'none';
      if (btnDown) btnDown.style.display = 'none';
      if (btnDup) btnDup.style.display = 'none';
      if (btnDel) btnDel.style.display = 'none';

      const data = CURRENT_CONFIG.meta || {};
      if (rawTextarea) rawTextarea.value = JSON.stringify(data, null, 2);
      if (formPanel) {
        formPanel.innerHTML = buildMetaFormHtml(data);
        attachLiveFormListeners(formPanel);
      }
      return;
    }

    if (activeColumnKey === 'banner') {
      if (titleEl) titleEl.textContent = 'Header Banner Image';
      if (btnUp) btnUp.style.display = 'none';
      if (btnDown) btnDown.style.display = 'none';
      if (btnDup) btnDup.style.display = 'none';
      if (btnDel) btnDel.style.display = 'none';

      const data = (CURRENT_CONFIG.header && CURRENT_CONFIG.header.bannerImage) || {};
      if (rawTextarea) rawTextarea.value = JSON.stringify(data, null, 2);
      if (formPanel) {
        formPanel.innerHTML = buildBannerFormHtml(data);
        attachLiveFormListeners(formPanel);
      }
      return;
    }

    // Normal column widget
    if (btnUp) btnUp.style.display = 'inline-flex';
    if (btnDown) btnDown.style.display = 'inline-flex';
    if (btnDup) btnDup.style.display = 'inline-flex';
    if (btnDel) btnDel.style.display = 'inline-flex';

    const col = getColumnArray(activeColumnKey);
    if (!col || col.length === 0) {
      if (titleEl) titleEl.textContent = 'No sections in column';
      if (btnUp) btnUp.disabled = true;
      if (btnDown) btnDown.disabled = true;
      if (btnDup) btnDup.disabled = true;
      if (btnDel) btnDel.disabled = true;
      if (formPanel) {
        formPanel.innerHTML = `
          <div class="section-removed-state">
            <p>This column is currently empty.</p>
            <button type="button" class="editor-btn-action-sm editor-btn-add-sec" onclick="window.openAddSectionModal('${activeColumnKey}')">+ Add section here</button>
          </div>
        `;
      }
      if (rawTextarea) rawTextarea.value = '[]';
      return;
    }

    const safeIndex = Math.max(0, Math.min(activeWidgetIndex, col.length - 1));
    activeWidgetIndex = safeIndex;
    const widget = col[safeIndex];

    if (titleEl) titleEl.textContent = getWidgetTitleLabel(widget);

    if (btnUp) {
      btnUp.innerHTML = `${ICON_UP_SVG} up`;
      btnUp.disabled = safeIndex === 0;
      btnUp.onclick = () => moveWidget(activeColumnKey, safeIndex, -1);
    }
    if (btnDown) {
      btnDown.innerHTML = `${ICON_DOWN_SVG} down`;
      btnDown.disabled = safeIndex === col.length - 1;
      btnDown.onclick = () => moveWidget(activeColumnKey, safeIndex, 1);
    }
    if (btnDup) {
      btnDup.innerHTML = `${ICON_DUP_SVG} dup`;
      btnDup.disabled = false;
      btnDup.onclick = () => duplicateWidget(activeColumnKey, safeIndex);
    }
    if (btnDel) {
      btnDel.innerHTML = `${ICON_DEL_SVG}`;
      btnDel.disabled = false;
      btnDel.onclick = () => removeWidget(activeColumnKey, safeIndex);
    }

    if (rawTextarea) {
      rawTextarea.value = JSON.stringify(widget, null, 2);
    }
    if (rawError) rawError.classList.remove('show');

    if (formPanel) {
      formPanel.innerHTML = buildWidgetFormHtml(widget);
      attachLiveFormListeners(formPanel);
    }
  }

  function getWidgetTitleLabel(w) {
    if (!w) return 'Section';
    if (w.title) return w.title;
    if (w.name) return w.name;
    if (w.heading) return w.heading;
    const tmpl = WIDGET_TEMPLATES[w.type];
    return tmpl ? tmpl.label : (w.type || 'Section');
  }

  // --- PAGE OUTLINE VIEW ---
  function renderPageOutline() {
    const outlineContainer = document.getElementById('view-page-outline');
    if (!outlineContainer) return;

    const sections = [
      { key: 'homeCenter', name: 'Center Column (Main Content)', col: CURRENT_CONFIG.homeSection.centerColumn },
      { key: 'homeLeft', name: 'Left Column (Sidebar)', col: CURRENT_CONFIG.homeSection.leftColumn },
      { key: 'homeRight', name: 'Right Column (Sidebar)', col: CURRENT_CONFIG.homeSection.rightColumn },
      { key: 'menuLeft', name: 'Commissions (Menu Page)', col: CURRENT_CONFIG.menuSection.leftColumn },
      { key: 'menuRight', name: 'Service Catalog (Menu Page)', col: CURRENT_CONFIG.menuSection.rightColumn },
    ];

    let html = '';

    sections.forEach(sec => {
      const list = sec.col || [];
      html += `
        <div class="outline-column-block">
          <div class="outline-column-title">
            <span>${escapeHtml(sec.name)}</span>
            <button type="button" class="editor-btn-action-sm editor-btn-add-sec" style="font-size: 0.65rem;" onclick="window.openAddSectionModal('${sec.key}')">+ add</button>
          </div>
          <div class="editor-repeater-list">
            ${list.map((w, idx) => `
              <div class="outline-widget-item ${activeColumnKey === sec.key && activeWidgetIndex === idx ? 'active' : ''}" onclick="window.selectWidget('${sec.key}', ${idx})">
                <span class="outline-widget-label"><strong>#${idx + 1}</strong> ${escapeHtml(getWidgetTitleLabel(w))}</span>
                <div class="outline-actions" onclick="event.stopPropagation();">
                  <button type="button" class="editor-tool-btn" title="Move up" onclick="window.moveWidget('${sec.key}', ${idx}, -1);" ${idx === 0 ? 'disabled style="opacity:0.3;"' : ''}>${ICON_UP_SVG}</button>
                  <button type="button" class="editor-tool-btn" title="Move down" onclick="window.moveWidget('${sec.key}', ${idx}, 1);" ${idx === list.length - 1 ? 'disabled style="opacity:0.3;"' : ''}>${ICON_DOWN_SVG}</button>
                  <button type="button" class="editor-tool-btn" title="Duplicate" onclick="window.duplicateWidget('${sec.key}', ${idx});">${ICON_DUP_SVG}</button>
                  <button type="button" class="editor-tool-btn btn-tool-del" title="Delete" onclick="window.removeWidget('${sec.key}', ${idx});">${ICON_DEL_SVG}</button>
                </div>
              </div>
            `).join('')}
            ${list.length === 0 ? '<p style="font-size:0.70rem; color:#888; margin:2px 0;">No sections in this column.</p>' : ''}
          </div>
        </div>
      `;
    });

    outlineContainer.innerHTML = html;
  }

  // --- FORM BUILDERS ---
  function buildMetaFormHtml(data) {
    return `
      <div class="editor-form-group">
        <label class="editor-form-label">Page Title</label>
        <input type="text" data-field="title" class="editor-input live-inp" value="${escapeHtml(data.title || '')}">
      </div>
      <div class="editor-form-group">
        <label class="editor-form-label">Description</label>
        <textarea data-field="description" class="editor-textarea live-inp">${escapeHtml(data.description || '')}</textarea>
      </div>
      <div class="editor-row">
        <div class="editor-form-group">
          <label class="editor-form-label">Domain Text</label>
          <input type="text" data-field="domainPill" class="editor-input live-inp" value="${escapeHtml(data.domainPill || '')}">
        </div>
        <div class="editor-form-group">
          <label class="editor-form-label">Domain URL</label>
          <input type="text" data-field="domainUrl" class="editor-input live-inp" value="${escapeHtml(data.domainUrl || '')}">
        </div>
      </div>
      <div class="editor-row">
        <div class="editor-form-group">
          <label class="editor-form-label">Social Card Image</label>
          <input type="text" data-field="socialImage" class="editor-input live-inp" value="${escapeHtml(data.socialImage || '')}">
        </div>
        <div class="editor-form-group">
          <label class="editor-form-label">Theme Color</label>
          <input type="text" data-field="themeColor" class="editor-input live-inp" value="${escapeHtml(data.themeColor || '#FFB3D8')}">
        </div>
      </div>
    `;
  }

  function buildBannerFormHtml(data) {
    return `
      <div class="editor-form-group">
        <label class="editor-form-label">Banner Image URL</label>
        <input type="text" data-field="url" class="editor-input live-inp" value="${escapeHtml(data.url || '')}">
      </div>
      <div class="editor-row">
        <div class="editor-form-group">
          <label class="editor-form-label">Alt Text</label>
          <input type="text" data-field="alt" class="editor-input live-inp" value="${escapeHtml(data.alt || '')}">
        </div>
        <div class="editor-form-group">
          <label class="editor-form-label">Max Height</label>
          <input type="text" data-field="maxHeight" class="editor-input live-inp" value="${escapeHtml(data.maxHeight || '180px')}">
        </div>
      </div>
      <div class="editor-img-preview-box">
        <img src="${escapeHtml(data.url || 'assets/banner-placeholder.png')}" alt="Banner Preview">
      </div>
    `;
  }

  function buildWidgetFormHtml(w) {
    if (!w) return '';
    switch (w.type) {
      case 'avatar':
        return `
          <div class="editor-form-group">
            <label class="editor-form-label">Avatar Image URL</label>
            <input type="text" data-field="avatarUrl" class="editor-input live-inp" value="${escapeHtml(w.avatarUrl || '')}">
          </div>
          <div class="editor-img-preview-box">
            <img src="${escapeHtml(w.avatarUrl || 'assets/avatar-placeholder.png')}" alt="Preview" style="width: 70px; height: 70px; object-fit: contain;">
          </div>
        `;

      case 'profile':
        return `
          <div class="editor-form-group">
            <label class="editor-form-label">Name</label>
            <input type="text" data-field="name" class="editor-input live-inp" value="${escapeHtml(w.name || '')}">
          </div>
          <div class="editor-form-group">
            <label class="editor-form-label">Tagline</label>
            <textarea data-field="tagline" class="editor-textarea live-inp">${escapeHtml(w.tagline || '')}</textarea>
          </div>
        `;

      case 'welcome':
      case 'text': {
        const paras = w.paragraphs || [];
        return `
          <div class="editor-form-group">
            <label class="editor-form-label">Main Heading</label>
            <input type="text" data-field="heading" class="editor-input live-inp" value="${escapeHtml(w.heading || '')}">
          </div>
          <div class="editor-form-group">
            <label class="editor-form-label">Subheading</label>
            <input type="text" data-field="subheading" class="editor-input live-inp" value="${escapeHtml(w.subheading || '')}">
          </div>
          <div class="editor-form-group">
            <label class="editor-form-label">Paragraphs</label>
            <div id="sidebar-bio-list" class="editor-repeater-list">
              ${paras.map((p, i) => `
                <div class="editor-repeater-item" data-index="${i}">
                  <textarea class="editor-textarea bio-para live-repeater" style="min-height: 50px;">${escapeHtml(p)}</textarea>
                  <div style="text-align: right;">
                    <button type="button" class="editor-btn-icon btn-delete" onclick="this.closest('.editor-repeater-item').remove(); window.syncRepeaterChange();">delete</button>
                  </div>
                </div>
              `).join('')}
            </div>
            <button type="button" class="editor-btn-add" onclick="window.addBioPara()">+ Add paragraph</button>
          </div>
        `;
      }

      case 'stats': {
        const statsList = w.stats || [];
        return `
          <div class="editor-form-group">
            <label class="editor-form-label">Section Title</label>
            <input type="text" data-field="title" class="editor-input live-inp" value="${escapeHtml(w.title || 'stats')}">
          </div>
          <div class="editor-form-group">
            <label class="editor-form-label">Stats Items</label>
            <div id="sidebar-stats-list" class="editor-repeater-list">
              ${statsList.map((st, i) => `
                <div class="editor-repeater-item" data-index="${i}">
                  <div class="editor-row">
                    <input type="text" class="editor-input stat-label live-repeater" placeholder="Label" value="${escapeHtml(st.label)}">
                    <input type="text" class="editor-input stat-val live-repeater" placeholder="Value (e.g. ★★★★☆)" value="${escapeHtml(st.value)}">
                  </div>
                  <div style="text-align: right;">
                    <button type="button" class="editor-btn-icon btn-delete" onclick="this.closest('.editor-repeater-item').remove(); window.syncRepeaterChange();">delete</button>
                  </div>
                </div>
              `).join('')}
            </div>
            <button type="button" class="editor-btn-add" onclick="window.addStatItem()">+ Add item</button>
          </div>
        `;
      }

      case 'favorites': {
        const favItems = w.items || [];
        return `
          <div class="editor-form-group">
            <label class="editor-form-label">Title</label>
            <input type="text" data-field="title" class="editor-input live-inp" value="${escapeHtml(w.title || 'FAVORITE THINGS')}">
          </div>
          <div class="editor-form-group">
            <label class="editor-form-label">Items</label>
            <div id="sidebar-fav-list" class="editor-repeater-list">
              ${favItems.map((fi, i) => `
                <div class="editor-repeater-item" data-index="${i}">
                  <div class="editor-row">
                    <input type="text" class="editor-input fav-cat live-repeater" placeholder="Category" value="${escapeHtml(fi.category)}">
                    <input type="text" class="editor-input fav-val live-repeater" placeholder="Value" value="${escapeHtml(fi.value)}">
                  </div>
                  <div style="text-align: right;">
                    <button type="button" class="editor-btn-icon btn-delete" onclick="this.closest('.editor-repeater-item').remove(); window.syncRepeaterChange();">delete</button>
                  </div>
                </div>
              `).join('')}
            </div>
            <button type="button" class="editor-btn-add" onclick="window.addFavItem()">+ Add item</button>
          </div>
        `;
      }

      case 'schedule':
        return `
          <div class="editor-form-group">
            <label class="editor-form-label">Title</label>
            <input type="text" data-field="title" class="editor-input live-inp" value="${escapeHtml(w.title || 'Schedule')}">
          </div>
          <div class="editor-form-group">
            <label class="editor-form-label">Text</label>
            <textarea data-field="text" class="editor-textarea live-inp">${escapeHtml(w.text || '')}</textarea>
          </div>
        `;

      case 'linkGroup': {
        const links = w.links || [];
        return `
          <div class="editor-form-group">
            <label class="editor-form-label">Category Title</label>
            <input type="text" data-field="title" class="editor-input live-inp" value="${escapeHtml(w.title || 'Links')}">
          </div>
          <div class="editor-form-group">
            <label class="editor-form-label">Links</label>
            <div id="sidebar-single-links-list" class="editor-repeater-list">
              ${links.map(l => `
                <div class="editor-row link-item-row" style="align-items: center;">
                  <input type="text" class="editor-input link-label live-repeater" placeholder="Label" value="${escapeHtml(l.label)}">
                  <div style="display: flex; gap: 4px;">
                    <input type="text" class="editor-input link-url live-repeater" placeholder="https://..." value="${escapeHtml(l.url)}">
                    <button type="button" class="editor-btn-icon btn-delete" onclick="this.closest('.link-item-row').remove(); window.syncRepeaterChange();">✖</button>
                  </div>
                </div>
              `).join('')}
            </div>
            <button type="button" class="editor-btn-add" onclick="window.addSingleLink()">+ Add link</button>
          </div>
        `;
      }

      case 'todos': {
        const todos = w.todos || [];
        return `
          <div class="editor-form-group">
            <label class="editor-form-label">Title</label>
            <input type="text" data-field="title" class="editor-input live-inp" value="${escapeHtml(w.title || 'To dos:')}">
          </div>
          <div class="editor-form-group">
            <label class="editor-form-label">Items</label>
            <div id="sidebar-todos-list" class="editor-repeater-list">
              ${todos.map(td => `
                <div class="editor-repeater-item" style="padding: 4px 8px; flex-direction: row; align-items: center; justify-content: space-between;">
                  <input type="text" class="editor-input todo-text live-repeater" value="${escapeHtml(td)}" style="width: 85%;">
                  <button type="button" class="editor-btn-icon btn-delete" onclick="this.closest('.editor-repeater-item').remove(); window.syncRepeaterChange();">✖</button>
                </div>
              `).join('')}
            </div>
            <button type="button" class="editor-btn-add" onclick="window.addTodoItem()">+ Add to-do</button>
          </div>
        `;
      }

      case 'status':
        return `
          <div class="editor-form-group">
            <label class="editor-form-label">Title</label>
            <input type="text" data-field="title" class="editor-input live-inp" value="${escapeHtml(w.title || 'status')}">
          </div>
          <div class="editor-form-group">
            <label class="editor-form-label">Status Text</label>
            <textarea data-field="text" class="editor-textarea live-inp">${escapeHtml(w.text || '')}</textarea>
          </div>
        `;

      case 'calendar':
        return `
          <div class="editor-form-group">
            <label class="editor-form-label">Title</label>
            <input type="text" data-field="title" class="editor-input live-inp" value="${escapeHtml(w.title || 'Calendar')}">
          </div>
          <div class="editor-form-group">
            <label class="editor-form-label">Date</label>
            <input type="text" data-field="date" class="editor-input live-inp" value="${escapeHtml(w.date || '')}">
          </div>
          <div class="editor-form-group">
            <label class="editor-form-label">Event</label>
            <textarea data-field="event" class="editor-textarea live-inp">${escapeHtml(w.event || '')}</textarea>
          </div>
        `;

      case 'sideSchedule': {
        const sideItems = w.items || [];
        return `
          <div class="editor-form-group">
            <label class="editor-form-label">Title</label>
            <input type="text" data-field="title" class="editor-input live-inp" value="${escapeHtml(w.title || 'Side schedule')}">
          </div>
          <div class="editor-form-group">
            <label class="editor-form-label">Items</label>
            <div id="sidebar-side-list" class="editor-repeater-list">
              ${sideItems.map(si => `
                <div class="editor-repeater-item" style="padding: 4px 8px; flex-direction: row; align-items: center; justify-content: space-between;">
                  <input type="text" class="editor-input side-text live-repeater" value="${escapeHtml(si)}" style="width: 85%;">
                  <button type="button" class="editor-btn-icon btn-delete" onclick="this.closest('.editor-repeater-item').remove(); window.syncRepeaterChange();">✖</button>
                </div>
              `).join('')}
            </div>
            <button type="button" class="editor-btn-add" onclick="window.addSideScheduleItem()">+ Add item</button>
          </div>
        `;
      }

      case 'commissions': {
        const btn = w.button || {};
        return `
          <div class="editor-row">
            <div class="editor-form-group">
              <label class="editor-form-label">Heading</label>
              <input type="text" data-field="heading" class="editor-input live-inp" value="${escapeHtml(w.heading || 'Custom Commissions')}">
            </div>
            <div class="editor-form-group">
              <label class="editor-form-label">Status Tag</label>
              <input type="text" data-field="status" class="editor-input live-inp" value="${escapeHtml(w.status || 'OPEN')}">
            </div>
          </div>
          <div class="editor-form-group">
            <label class="editor-form-label">Description</label>
            <textarea data-field="desc" class="editor-textarea live-inp">${escapeHtml(w.desc || '')}</textarea>
          </div>
          <div class="editor-row">
            <div class="editor-form-group">
              <label class="editor-form-label">Button Label</label>
              <input type="text" data-field="btnLabel" class="editor-input live-inp" value="${escapeHtml(btn.label || 'Request Form')}">
            </div>
            <div class="editor-form-group">
              <label class="editor-form-label">Button URL</label>
              <input type="text" data-field="btnUrl" class="editor-input live-inp" value="${escapeHtml(btn.url || '')}">
            </div>
          </div>
        `;
      }

      case 'disclaimer':
        return `
          <div class="editor-form-group">
            <label class="editor-form-label">Notice Title</label>
            <input type="text" data-field="title" class="editor-input live-inp" value="${escapeHtml(w.title || 'Notice & Policy')}">
          </div>
          <div class="editor-form-group">
            <label class="editor-form-label">Notice Text</label>
            <textarea data-field="text" class="editor-textarea live-inp">${escapeHtml(w.text || '')}</textarea>
          </div>
        `;

      case 'catalog': {
        const catList = w.categories || [];
        return `
          <div class="editor-form-group">
            <label class="editor-form-label">Title</label>
            <input type="text" data-field="title" class="editor-input live-inp" value="${escapeHtml(w.title || 'Service Catalog / Menu')}">
          </div>
          <div class="editor-form-group">
            <label class="editor-form-label">Description</label>
            <textarea data-field="desc" class="editor-textarea live-inp">${escapeHtml(w.desc || '')}</textarea>
          </div>
          <div class="editor-form-group">
            <label class="editor-form-label">Categories</label>
            <div id="sidebar-catalog-list" class="editor-repeater-list">
              ${catList.map(c => `
                <div class="editor-repeater-item catalog-cat-card">
                  <div class="editor-repeater-item-header">
                    <input type="text" class="editor-input cat-title-input live-repeater" style="font-weight: 700; width: 70%;" placeholder="Category" value="${escapeHtml(c.title)}">
                    <button type="button" class="editor-btn-icon btn-delete" onclick="this.closest('.catalog-cat-card').remove(); window.syncRepeaterChange();">delete</button>
                  </div>
                  <div class="cat-items-box editor-repeater-list" style="margin-top: 4px;">
                    ${(c.items || []).map(it => `
                      <div class="editor-row cat-item-row" style="grid-template-columns: 1fr auto; align-items: center;">
                        <input type="text" class="editor-input cat-item-text live-repeater" placeholder="Item" value="${escapeHtml(it)}">
                        <button type="button" class="editor-btn-icon btn-delete" onclick="this.closest('.cat-item-row').remove(); window.syncRepeaterChange();">✖</button>
                      </div>
                    `).join('')}
                  </div>
                  <button type="button" class="editor-btn-add" style="padding: 3px; font-size: 0.70rem; margin-top: 2px;" onclick="window.addCatalogItemToGroup(this)">+ Add item</button>
                </div>
              `).join('')}
            </div>
            <button type="button" class="editor-btn-add" style="margin-top: 6px;" onclick="window.addCatalogCategory()">+ Add category</button>
          </div>
        `;
      }

      default:
        return '';
    }
  }

  // --- LIVE FORM EVENT LISTENERS ---
  function attachLiveFormListeners(container) {
    container.querySelectorAll('.live-inp').forEach(inp => {
      inp.addEventListener('input', () => {
        handleSimpleFormInput();
      });
      inp.addEventListener('change', () => {
        commitHistorySnapshot();
      });
    });

    container.querySelectorAll('.live-repeater').forEach(inp => {
      inp.addEventListener('input', () => {
        handleRepeaterInput();
      });
      inp.addEventListener('change', () => {
        commitHistorySnapshot();
      });
    });
  }

  function handleSimpleFormInput() {
    if (activeColumnKey === 'meta') {
      CURRENT_CONFIG.meta = CURRENT_CONFIG.meta || {};
      document.querySelectorAll('#sidebar-form-panel .live-inp').forEach(inp => {
        if (inp.dataset.field) CURRENT_CONFIG.meta[inp.dataset.field] = inp.value;
      });
      renderSite(CURRENT_CONFIG);
      triggerAutoSave();
      return;
    }

    if (activeColumnKey === 'banner') {
      CURRENT_CONFIG.header = CURRENT_CONFIG.header || {};
      CURRENT_CONFIG.header.bannerImage = CURRENT_CONFIG.header.bannerImage || {};
      document.querySelectorAll('#sidebar-form-panel .live-inp').forEach(inp => {
        if (inp.dataset.field) CURRENT_CONFIG.header.bannerImage[inp.dataset.field] = inp.value;
      });
      renderSite(CURRENT_CONFIG);
      triggerAutoSave();
      return;
    }

    const col = getColumnArray(activeColumnKey);
    const widget = col[activeWidgetIndex];
    if (!widget) return;

    document.querySelectorAll('#sidebar-form-panel .live-inp').forEach(inp => {
      const field = inp.dataset.field;
      if (!field) return;

      if (widget.type === 'commissions') {
        if (field === 'btnLabel') {
          widget.button = widget.button || {};
          widget.button.label = inp.value;
        } else if (field === 'btnUrl') {
          widget.button = widget.button || {};
          widget.button.url = inp.value;
        } else {
          widget[field] = inp.value;
        }
      } else {
        widget[field] = inp.value;
      }
    });

    // Update section title live in header
    const titleEl = document.getElementById('active-sec-title');
    if (titleEl) titleEl.textContent = getWidgetTitleLabel(widget);

    renderSite(CURRENT_CONFIG);
    triggerAutoSave();

    const rawTextarea = document.getElementById('sidebar-raw-textarea');
    if (rawTextarea) rawTextarea.value = JSON.stringify(widget, null, 2);
  }

  function handleRepeaterInput() {
    const col = getColumnArray(activeColumnKey);
    const widget = col[activeWidgetIndex];
    if (!widget) return;

    if (widget.type === 'stats') {
      const items = [];
      document.querySelectorAll('#sidebar-stats-list .editor-repeater-item').forEach(el => {
        const l = el.querySelector('.stat-label').value.trim();
        const v = el.querySelector('.stat-val').value.trim();
        if (l || v) items.push({ label: l, value: v });
      });
      widget.stats = items;
    } else if (widget.type === 'favorites') {
      const items = [];
      document.querySelectorAll('#sidebar-fav-list .editor-repeater-item').forEach(el => {
        const c = el.querySelector('.fav-cat').value.trim();
        const v = el.querySelector('.fav-val').value.trim();
        if (c || v) items.push({ category: c, value: v });
      });
      widget.items = items;
    } else if (widget.type === 'welcome' || widget.type === 'text') {
      const paras = [];
      document.querySelectorAll('#sidebar-bio-list .bio-para').forEach(el => {
        paras.push(el.value);
      });
      widget.paragraphs = paras;
    } else if (widget.type === 'linkGroup') {
      const links = [];
      document.querySelectorAll('#sidebar-single-links-list .link-item-row').forEach(lEl => {
        const lbl = lEl.querySelector('.link-label').value;
        const u = lEl.querySelector('.link-url').value;
        links.push({ label: lbl, url: u });
      });
      widget.links = links;
    } else if (widget.type === 'todos') {
      const todos = [];
      document.querySelectorAll('#sidebar-todos-list .todo-text').forEach(el => {
        todos.push(el.value);
      });
      widget.todos = todos;
    } else if (widget.type === 'sideSchedule') {
      const items = [];
      document.querySelectorAll('#sidebar-side-list .side-text').forEach(el => {
        items.push(el.value);
      });
      widget.items = items;
    } else if (widget.type === 'catalog') {
      const cats = [];
      document.querySelectorAll('#sidebar-catalog-list .catalog-cat-card').forEach(cEl => {
        const title = cEl.querySelector('.cat-title-input').value;
        const items = [];
        cEl.querySelectorAll('.cat-item-text').forEach(iEl => {
          items.push(iEl.value);
        });
        cats.push({ title: title, items: items });
      });
      widget.categories = cats;
    }

    renderSite(CURRENT_CONFIG);
    triggerAutoSave();

    const rawTextarea = document.getElementById('sidebar-raw-textarea');
    if (rawTextarea) rawTextarea.value = JSON.stringify(widget, null, 2);
  }

  window.syncRepeaterChange = function () {
    handleRepeaterInput();
    commitHistorySnapshot();
  };

  // --- REPEATER ADD HELPERS ---
  window.addStatItem = function () {
    const list = document.getElementById('sidebar-stats-list');
    if (!list) return;
    const div = document.createElement('div');
    div.className = 'editor-repeater-item';
    div.innerHTML = `
      <div class="editor-row">
        <input type="text" class="editor-input stat-label live-repeater" placeholder="Label">
        <input type="text" class="editor-input stat-val live-repeater" placeholder="Value">
      </div>
      <div style="text-align: right;">
        <button type="button" class="editor-btn-icon btn-delete" onclick="this.closest('.editor-repeater-item').remove(); window.syncRepeaterChange();">delete</button>
      </div>
    `;
    list.appendChild(div);
    attachLiveFormListeners(div);
    window.syncRepeaterChange();
  };

  window.addFavItem = function () {
    const list = document.getElementById('sidebar-fav-list');
    if (!list) return;
    const div = document.createElement('div');
    div.className = 'editor-repeater-item';
    div.innerHTML = `
      <div class="editor-row">
        <input type="text" class="editor-input fav-cat live-repeater" placeholder="Category">
        <input type="text" class="editor-input fav-val live-repeater" placeholder="Value">
      </div>
      <div style="text-align: right;">
        <button type="button" class="editor-btn-icon btn-delete" onclick="this.closest('.editor-repeater-item').remove(); window.syncRepeaterChange();">delete</button>
      </div>
    `;
    list.appendChild(div);
    attachLiveFormListeners(div);
    window.syncRepeaterChange();
  };

  window.addBioPara = function () {
    const list = document.getElementById('sidebar-bio-list');
    if (!list) return;
    const div = document.createElement('div');
    div.className = 'editor-repeater-item';
    div.innerHTML = `
      <textarea class="editor-textarea bio-para live-repeater" style="min-height: 50px;" placeholder="Paragraph text..."></textarea>
      <div style="text-align: right;">
        <button type="button" class="editor-btn-icon btn-delete" onclick="this.closest('.editor-repeater-item').remove(); window.syncRepeaterChange();">delete</button>
      </div>
    `;
    list.appendChild(div);
    attachLiveFormListeners(div);
    window.syncRepeaterChange();
  };

  window.addSingleLink = function () {
    const list = document.getElementById('sidebar-single-links-list');
    if (!list) return;
    const div = document.createElement('div');
    div.className = 'editor-row link-item-row';
    div.style.alignItems = 'center';
    div.innerHTML = `
      <input type="text" class="editor-input link-label live-repeater" placeholder="Label">
      <div style="display: flex; gap: 4px;">
        <input type="text" class="editor-input link-url live-repeater" placeholder="https://..." value="https://">
        <button type="button" class="editor-btn-icon btn-delete" onclick="this.closest('.link-item-row').remove(); window.syncRepeaterChange();">✖</button>
      </div>
    `;
    list.appendChild(div);
    attachLiveFormListeners(div);
    window.syncRepeaterChange();
  };

  window.addTodoItem = function () {
    const list = document.getElementById('sidebar-todos-list');
    if (!list) return;
    const div = document.createElement('div');
    div.className = 'editor-repeater-item';
    div.style.cssText = 'padding: 4px 8px; flex-direction: row; align-items: center; justify-content: space-between;';
    div.innerHTML = `
      <input type="text" class="editor-input todo-text live-repeater" placeholder="To-do text..." style="width: 85%;">
      <button type="button" class="editor-btn-icon btn-delete" onclick="this.closest('.editor-repeater-item').remove(); window.syncRepeaterChange();">✖</button>
    `;
    list.appendChild(div);
    attachLiveFormListeners(div);
    window.syncRepeaterChange();
  };

  window.addSideScheduleItem = function () {
    const list = document.getElementById('sidebar-side-list');
    if (!list) return;
    const div = document.createElement('div');
    div.className = 'editor-repeater-item';
    div.style.cssText = 'padding: 4px 8px; flex-direction: row; align-items: center; justify-content: space-between;';
    div.innerHTML = `
      <input type="text" class="editor-input side-text live-repeater" placeholder="Schedule item..." style="width: 85%;">
      <button type="button" class="editor-btn-icon btn-delete" onclick="this.closest('.editor-repeater-item').remove(); window.syncRepeaterChange();">✖</button>
    `;
    list.appendChild(div);
    attachLiveFormListeners(div);
    window.syncRepeaterChange();
  };

  window.addCatalogCategory = function () {
    const list = document.getElementById('sidebar-catalog-list');
    if (!list) return;
    const div = document.createElement('div');
    div.className = 'editor-repeater-item catalog-cat-card';
    div.innerHTML = `
      <div class="editor-repeater-item-header">
        <input type="text" class="editor-input cat-title-input live-repeater" style="font-weight: 700; width: 70%;" placeholder="Category" value="New Category">
        <button type="button" class="editor-btn-icon btn-delete" onclick="this.closest('.catalog-cat-card').remove(); window.syncRepeaterChange();">delete</button>
      </div>
      <div class="cat-items-box editor-repeater-list" style="margin-top: 4px;">
        <div class="editor-row cat-item-row" style="grid-template-columns: 1fr auto; align-items: center;">
          <input type="text" class="editor-input cat-item-text live-repeater" placeholder="Item" value="Option 1">
          <button type="button" class="editor-btn-icon btn-delete" onclick="this.closest('.cat-item-row').remove(); window.syncRepeaterChange();">✖</button>
        </div>
      </div>
      <button type="button" class="editor-btn-add" style="padding: 3px; font-size: 0.70rem; margin-top: 2px;" onclick="window.addCatalogItemToGroup(this)">+ Add item</button>
    `;
    list.appendChild(div);
    attachLiveFormListeners(div);
    window.syncRepeaterChange();
  };

  window.addCatalogItemToGroup = function (btn) {
    const container = btn.previousElementSibling;
    if (!container) return;
    const div = document.createElement('div');
    div.className = 'editor-row cat-item-row';
    div.style.cssText = 'grid-template-columns: 1fr auto; align-items: center;';
    div.innerHTML = `
      <input type="text" class="editor-input cat-item-text live-repeater" placeholder="Item">
      <button type="button" class="editor-btn-icon btn-delete" onclick="this.closest('.cat-item-row').remove(); window.syncRepeaterChange();">✖</button>
    `;
    container.appendChild(div);
    attachLiveFormListeners(div);
    window.syncRepeaterChange();
  };

  // --- RAW JSON SYNC ---
  function handleRawJsonInput() {
    const textarea = document.getElementById('sidebar-raw-textarea');
    const errorBox = document.getElementById('sidebar-raw-error');
    if (!textarea) return;

    try {
      const parsed = JSON.parse(textarea.value);
      if (errorBox) errorBox.classList.remove('show');

      if (activeColumnKey === 'meta') {
        CURRENT_CONFIG.meta = parsed;
      } else if (activeColumnKey === 'banner') {
        CURRENT_CONFIG.header = CURRENT_CONFIG.header || {};
        CURRENT_CONFIG.header.bannerImage = parsed;
      } else {
        const col = getColumnArray(activeColumnKey);
        if (col && col[activeWidgetIndex]) {
          col[activeWidgetIndex] = parsed;
        }
      }

      renderSite(CURRENT_CONFIG);
      triggerAutoSave();
    } catch (err) {
      if (errorBox) {
        errorBox.textContent = `Invalid JSON: ${err.message}`;
        errorBox.classList.add('show');
      }
    }
  }

  // --- ADD SECTION MODAL PICKER ---
  let pendingAddColKey = 'homeCenter';

  function openAddSectionModal(colKey) {
    pendingAddColKey = colKey || activeColumnKey || 'homeCenter';
    if (pendingAddColKey === 'meta' || pendingAddColKey === 'banner') {
      pendingAddColKey = 'homeCenter';
    }

    const list = document.getElementById('add-section-list');
    if (!list) return;

    const itemsHtml = Object.keys(WIDGET_TEMPLATES).map(k => {
      const tmpl = WIDGET_TEMPLATES[k];
      return `
        <div class="section-picker-item">
          <div class="section-picker-info">
            <h4>${escapeHtml(tmpl.label)}</h4>
            <p>${escapeHtml(tmpl.desc)}</p>
          </div>
          <div>
            <button type="button" class="section-picker-add-btn" onclick="window.addWidgetToColumn('${pendingAddColKey}', '${k}')">+ Add</button>
          </div>
        </div>
      `;
    }).join('');

    list.innerHTML = itemsHtml;
    openModal('add-section-modal');
  }

  window.openAddSectionModal = openAddSectionModal;

  // --- MODAL CONTROLS ---
  function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('open');
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('open');
  }

  window.closeModal = closeModal;

  // --- EXPORT CONFIG.JS ---
  function generateConfigFileContent(cfg) {
    const jsonStr = JSON.stringify(cfg, null, 2);
    return `/**
 * SITE CONFIGURATION
 * Open-Source Retro Pastel Profile Template Boilerplate
 * Generated directly from the Web Template Editor.
 */

window.SITE_CONFIG = ${jsonStr};
`;
  }

  function openFinishModal() {
    const codeBlock = document.getElementById('export-code-block');
    if (!codeBlock) return;

    const fullCode = generateConfigFileContent(CURRENT_CONFIG);
    codeBlock.textContent = fullCode;
    openModal('finish-export-modal');
  }

  function copyConfigCode() {
    const code = generateConfigFileContent(CURRENT_CONFIG);
    navigator.clipboard.writeText(code).then(() => {
      showToast('Copied code');
      const btn = document.getElementById('btn-copy-code');
      if (btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = 'copied';
        setTimeout(() => btn.innerHTML = originalText, 2000);
      }
    }).catch(() => {
      showToast('Copy failed');
    });
  }

  function downloadConfigFile() {
    const code = generateConfigFileContent(CURRENT_CONFIG);
    const blob = new Blob([code], { type: 'text/javascript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'config.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Downloaded config.js');
  }

  // --- SETUP EVENT LISTENERS ---
  function setupEventListeners() {
    // Toolbar buttons
    const undoBtn = document.getElementById('btn-undo');
    if (undoBtn) undoBtn.addEventListener('click', undo);

    const redoBtn = document.getElementById('btn-redo');
    if (redoBtn) redoBtn.addEventListener('click', redo);

    const tutorialBtn = document.getElementById('btn-tutorial');
    if (tutorialBtn) {
      tutorialBtn.addEventListener('click', () => {
        openModal('tutorial-modal');
      });
    }

    const resetBtn = document.getElementById('btn-reset');
    if (resetBtn) resetBtn.addEventListener('click', () => openModal('reset-confirm-modal'));

    const confirmResetBtn = document.getElementById('btn-confirm-reset');
    if (confirmResetBtn) confirmResetBtn.addEventListener('click', resetToDefault);

    const finishBtn = document.getElementById('btn-finish');
    if (finishBtn) finishBtn.addEventListener('click', openFinishModal);

    const copyCodeBtn = document.getElementById('btn-copy-code');
    if (copyCodeBtn) copyCodeBtn.addEventListener('click', copyConfigCode);

    const downloadCodeBtn = document.getElementById('btn-download-code');
    if (downloadCodeBtn) downloadCodeBtn.addEventListener('click', downloadConfigFile);

    const outlineToggle = document.getElementById('btn-toggle-outlines');
    if (outlineToggle) {
      outlineToggle.addEventListener('click', () => {
        document.body.classList.toggle('show-outlines');
        outlineToggle.classList.toggle('active');
        const isActive = document.body.classList.contains('show-outlines');
        outlineToggle.textContent = isActive ? 'outlines: on' : 'outlines: off';
      });
    }

    // Page tabs (Home / Menu)
    document.querySelectorAll('.editor-page-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        switchPageSection(btn.dataset.section);
      });
    });

    // Sidebar tab switcher (Edit Section vs Page Structure)
    const tabEditBtn = document.getElementById('sidebar-tab-edit');
    const tabOutlineBtn = document.getElementById('sidebar-tab-outline');
    if (tabEditBtn) tabEditBtn.addEventListener('click', () => switchSidebarTab('edit'));
    if (tabOutlineBtn) tabOutlineBtn.addEventListener('click', () => switchSidebarTab('outline'));

    // Add Section button in sidebar header
    const addSecBtn = document.getElementById('btn-open-add-section');
    if (addSecBtn) {
      addSecBtn.addEventListener('click', () => {
        openAddSectionModal(activeColumnKey);
      });
    }

    const addOutlineSecBtn = document.getElementById('btn-outline-add-section');
    if (addOutlineSecBtn) {
      addOutlineSecBtn.addEventListener('click', () => {
        openAddSectionModal('homeCenter');
      });
    }

    // Form / Raw JSON switchers
    const btnForm = document.getElementById('btn-sidebar-form');
    const btnRaw = document.getElementById('btn-sidebar-raw');
    const formPanel = document.getElementById('sidebar-form-panel');
    const rawPanel = document.getElementById('sidebar-raw-panel');

    if (btnForm && btnRaw) {
      btnForm.addEventListener('click', () => {
        activeInspectorMode = 'form';
        btnForm.classList.add('active');
        btnRaw.classList.remove('active');
        if (formPanel) formPanel.style.display = 'block';
        if (rawPanel) rawPanel.style.display = 'none';
        renderEditInspector();
      });

      btnRaw.addEventListener('click', () => {
        activeInspectorMode = 'raw';
        btnRaw.classList.add('active');
        btnForm.classList.remove('active');
        if (formPanel) formPanel.style.display = 'none';
        if (rawPanel) rawPanel.style.display = 'flex';
        renderEditInspector();
      });
    }

    // Raw JSON Textarea Live Listener
    const rawTextarea = document.getElementById('sidebar-raw-textarea');
    if (rawTextarea) {
      rawTextarea.addEventListener('input', handleRawJsonInput);
      rawTextarea.addEventListener('change', () => {
        commitHistorySnapshot();
      });
    }

    // On-Canvas Click Selection
    document.addEventListener('click', (e) => {
      const widgetWrap = e.target.closest('.editor-widget-wrapper');
      if (widgetWrap && widgetWrap.dataset.colKey) {
        e.preventDefault();
        e.stopPropagation();
        selectWidget(widgetWrap.dataset.colKey, Number(widgetWrap.dataset.widgetIndex));
      }
    });

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          redo();
        } else {
          e.preventDefault();
          undo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        redo();
      }
    });
  }

})();
