/**
 * Site search: header search icon + dropdown, full-text via lunr.js.
 *
 * - Index source: JSON embedded in the page (see _includes/search-feed.html,
 *   rendered into a <script type="application/json" id="search-data"> by
 *   layout default.html). No network fetch, content never leaves the page.
 * - Injects a magnifying-glass button into the site header nav and a
 *   dropdown panel with a ranked result list.
 * - Keyboard: Enter selects the highlighted result, ArrowUp/Down move the
 *   highlight, Escape closes. Tab is preserved.
 * - Clicking outside closes the dropdown.
 * - Respects prefers-reduced-motion (no transitions).
 *
 * Assumes `lunr` (global from vendor/lunr.min.js) and DOM is ready.
 */
(() => {
  "use strict";

  const dataEl = document.getElementById("search-data");
  if (!dataEl) return; // not a site with search enabled
  let posts = [];
  try {
    posts = JSON.parse(dataEl.textContent);
  } catch (err) {
    console.error("search: failed to parse search data", err);
    return;
  }
  if (posts.length === 0) return;

  // ---- Build the lunr index -------------------------------------------
  let idx;
  try {
    idx = lunr(function () {
      this.ref("title");
      this.field("title", { boost: 10 });
      this.field("categories", { boost: 5 });
      this.field("excerpt");
      for (const p of posts) {
        this.add(p);
      }
    });
  } catch (err) {
    console.error("search: failed to build lunr index", err);
    return;
  }

  // ---- Locate the header nav to inject the trigger into ---------------
  // Works with the minima theme (gem) header: .site-nav > .trigger holds the
  // page-link anchors; we append the search icon there so it aligns with the
  // other nav links and stays visible in the mobile (checkbox) nav too.
  const navTrigger =
    document.querySelector(".site-header .site-nav .trigger") ||
    document.querySelector(".site-header .nav-list");
  if (!navTrigger) {
    // No recognizable nav found; bail politely.
    return;
  }
  const navIsList = navTrigger.classList.contains("nav-list");

  const ICON_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" ' +
    'stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" ' +
    'role="img" aria-hidden="true">' +
    '<circle cx="11" cy="11" r="7"></circle>' +
    '<line x1="20" y1="20" x2="16.2" y2="16.2"></line>' +
    "</svg>";

  // Trigger button, styled like a page-link via .search-trigger.
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "search-trigger";
  btn.setAttribute("aria-haspopup", "true");
  btn.setAttribute("aria-expanded", "false");
  btn.setAttribute("aria-controls", "search-dropdown");
  btn.setAttribute("aria-label", "Search posts");
  btn.innerHTML = ICON_SVG;
  if (navIsList) {
    const li = document.createElement("li");
    li.className = "search-trigger-item";
    li.appendChild(btn);
    navTrigger.appendChild(li);
  } else {
    navTrigger.appendChild(btn);
  }

  // ---- Dropdown panel --------------------------------------------------
  const dropdown = document.createElement("div");
  dropdown.id = "search-dropdown";
  dropdown.className = "search-dropdown";
  dropdown.hidden = true;
  dropdown.setAttribute("role", "dialog");
  dropdown.setAttribute("aria-label", "Search results");
  const SEARCH_FORM_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" ' +
    'stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" ' +
    'aria-hidden="true"><circle cx="11" cy="11" r="7"></circle>' +
    '<line x1="20" y1="20" x2="16.2" y2="16.2"></line></svg>';

  dropdown.innerHTML =
    '<form role="search" autocomplete="off">' +
    SEARCH_FORM_SVG +
    '<input class="search-input" type="search" ' +
    'placeholder="Search posts…" aria-label="Search posts" ' +
    'spellcheck="false" />' +
    '<span class="kbd-hint">Esc</span>' +
    "</form>" +
    '<ul class="search-results" role="listbox"></ul>' +
    '<p class="search-empty" hidden>No matches.</p>';
  document.body.appendChild(dropdown);

  const input = dropdown.querySelector(".search-input");
  const resultsList = dropdown.querySelector(".search-results");
  const emptyMsg = dropdown.querySelector(".search-empty");

  // ---- State -----------------------------------------------------------
  let results = []; // [{ title, url, categories[], score }]
  let activeIndex = -1;
  let isOpen = false;
  let lastFocus = null;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function open() {
    if (isOpen) return;
    if (!btn.getClientRects().length) return; // trigger hidden (e.g. mobile nav closed)
    isOpen = true;
    lastFocus = document.activeElement;
    dropdown.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    // Re-query header position so the dropdown anchors correctly.
    positionDropdown();
    input.focus();
  }

  function close(refocus) {
    if (!isOpen) return;
    isOpen = false;
    dropdown.hidden = true;
    btn.setAttribute("aria-expanded", "false");
    clearResults();
    if (refocus && lastFocus) lastFocus.focus();
  }

  function positionDropdown() {
    // Anchor under the trigger, right edge aligned with it, clamped to
    // viewport width. Recalculated on resize / open.
    const rect = btn.getBoundingClientRect();
    const width = dropdown.offsetWidth || 300;
    const margin = 12;
    let left = rect.left + rect.width / 2 - width / 2;
    left = Math.max(margin, Math.min(left, window.innerWidth - width - margin));
    dropdown.style.left = left + "px";
    dropdown.style.top = rect.bottom + 6 + "px";
  }

  function clearResults() {
    results = [];
    activeIndex = -1;
    resultsList.replaceChildren();
  }

  function runSearch(query) {
    const q = (query || "").trim();
    if (!q) {
      clearResults();
      emptyMsg.hidden = false;
      emptyMsg.textContent = "Type to search this site…";
      return;
    }
    let matches = [];
    try {
      matches = idx.search(q);
    } catch (err) {
      // lunr throws on empty / malformed queries; fall back to substring.
      matches = posts
        .filter(
          (p) =>
            p.title.toLowerCase().includes(q.toLowerCase()) ||
            p.categories.some((c) =>
              String(c).toLowerCase().includes(q.toLowerCase())
            )
        )
        .map((p) => ({ ref: p.title, score: 0 }));
    }
    // Map refs (titles) back to post objects.
    const byTitle = new Map(posts.map((p) => [p.title, p]));
    results = matches
      .map((m) => {
        const p = byTitle.get(m.ref);
        return p ? { ...p, score: m.score } : null;
      })
      .filter(Boolean)
      .slice(0, 12);
    renderResults(results, q);
  }

  function renderResults(list, query) {
    resultsList.replaceChildren();
    emptyMsg.hidden = list.length > 0;
    if (list.length === 0) {
      emptyMsg.textContent = `No matches for "${query}".`;
      return;
    }
    activeIndex = -1;
    list.forEach((r, i) => {
      const liEl = document.createElement("li");
      liEl.setAttribute("role", "option");
      liEl.dataset.url = r.url;
      liEl.dataset.index = String(i);

      const titleEl = document.createElement("span");
      titleEl.className = "result-title";
      titleEl.textContent = r.title;
      liEl.appendChild(titleEl);

      const excerpt = document.createElement("span");
      excerpt.className = "result-excerpt";
      if (r.excerpt) excerpt.textContent = r.excerpt;
      liEl.appendChild(excerpt);

      const meta = document.createElement("span");
      meta.className = "result-meta";
      const cats = (r.categories || []).join(" · ");
      const date = r.date
        ? new Date(r.date.replace(" ", "T")).toISOString().slice(0, 10)
        : "";
      meta.textContent = [cats, date].filter(Boolean).join("  ·  ");
      liEl.appendChild(meta);

      liEl.addEventListener("click", () => {
        window.location.href = r.url;
      });
      resultsList.appendChild(liEl);
    });
  }

  function setActive(i) {
    const items = resultsList.querySelectorAll("li");
    if (!items.length) return;
    activeIndex = (i + items.length) % items.length;
    items.forEach((el, idx) => {
      el.classList.toggle("active", idx === activeIndex);
    });
    resultsList.querySelector(".active")?.scrollIntoView({
      block: "nearest",
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  // ---- Events ------------------------------------------------------------
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (isOpen) {
      close(true);
    } else {
      open();
      if (results.length === 0) runSearch(input.value);
    }
  });

  input.addEventListener("input", () => runSearch(input.value));

  input.addEventListener("keydown", (e) => {
    const list = resultsList.querySelectorAll("li");
    if (e.key === "ArrowDown" && list.length) {
      e.preventDefault();
      setActive(activeIndex + 1);
    } else if (e.key === "ArrowUp" && list.length) {
      e.preventDefault();
      setActive(activeIndex - 1);
    } else if (e.key === "Enter" && list.length) {
      e.preventDefault();
      const target =
        list[activeIndex] || list[0];
      if (target) window.location.href = target.dataset.url;
    } else if (e.key === "Escape") {
      e.preventDefault();
      close(true);
    }
  });

  document.addEventListener("click", (e) => {
    if (!isOpen) return;
    if (dropdown.contains(e.target) || btn === e.target) return;
    close(false);
  });



  window.addEventListener("resize", () => {
    if (isOpen) positionDropdown();
  });
})();
