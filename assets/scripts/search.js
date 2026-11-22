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
  if (posts.length === 0 && !window.__gistsData) return;

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

  // ---- Gists index (lazy, async) ---------------------------------------
  // A second lunr index over gist title/description/file names, built on
  // demand from the shared gists-data.js fetch (cached per session). Gist
  // results are merged into the same displayed list as posts and badged in
  // the UI. If gists are unavailable (offline / rate-limited / the data
  // script missing) search simply returns posts — no error surfaced.
  let gistsIdxPromise = null; // lazily set: Promise<lunr.Index | null>
  let gistsByRef = new Map(); // gist title (the doc ref) -> gist object

  function getGistsIndex() {
    if (gistsIdxPromise) return gistsIdxPromise;
    if (typeof window.__gistsData !== "function") {
      gistsIdxPromise = Promise.resolve(null);
      return gistsIdxPromise;
    }
    gistsIdxPromise = window
      .__gistsData()
      .then((gists) => {
        if (!Array.isArray(gists) || gists.length === 0) return null;
        gistsByRef = new Map(gists.map((g) => [g.title, g]));
        return lunr(function () {
          this.ref("title");
          this.field("title", { boost: 10 });
          this.field("description");
          this.field("files"); // file names (e.g. a script name) also match
          for (const g of gists) {
            this.add({
              title: g.title,
              description: g.description || "",
              files: (g.files || []).join(" ")
            });
          }
        });
      })
      .catch(() => null); // network/API failure -> posts-only, never crash
    return gistsIdxPromise;
  }

  function searchGists(q) {
    return getGistsIndex().then((gIdx) => {
      if (!gIdx) return [];
      let matches;
      try {
        matches = gIdx.search(q);
      } catch (err) {
        // Malformed / single-token oddity: fall back to exact title match.
        matches = gistsByRef.has(q) ? [{ ref: q, score: 0 }] : [];
      }
      return matches
        .slice(0, 12)
        .map((m) => {
          const g = gistsByRef.get(m.ref);
          return g
            ? {
                type: "gist",
                title: g.title,
                url: g.url,
                excerpt: g.description || "",
                files: g.files,
                score: m.score
              }
            : null;
        })
        .filter(Boolean);
    });
  }

  function searchPosts(q) {
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
    const byTitle = new Map(posts.map((p) => [p.title, p]));
    return matches
      .map((m) => {
        const p = byTitle.get(m.ref);
        return p ? { ...p, type: "post", score: m.score } : null;
      })
      .filter(Boolean)
      .slice(0, 12);
  }

  // ---- Locate the header nav to inject the trigger into ---------------
  // Supports the minima master branch (remote_theme) header, where
  // .site-nav > .nav-items holds the nav-item anchors, plus the older
  // minima gem headers (.site-nav > .trigger, .nav-list). Appending the
  // button here keeps it inline with the other nav links and inside the
  // mobile (checkbox) dropdown too.
  if (document.querySelector(".search-trigger")) return; // already injected
  const navTrigger =
    document.querySelector(".site-header .site-nav .nav-items") ||
    document.querySelector(".site-header .site-nav .trigger") ||
    document.querySelector(".site-header .nav-list");
  if (!navTrigger) {
    // No recognizable nav found; bail politely.
    return;
  }
  const navIsList = navTrigger.classList.contains("nav-list");
  const navIsItems = navTrigger.classList.contains("nav-items");

  const ICON_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" ' +
    'stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" ' +
    'role="img" aria-hidden="true">' +
    '<circle cx="11" cy="11" r="7"></circle>' +
    '<line x1="20" y1="20" x2="16.2" y2="16.2"></line>' +
    "</svg>";

  // Trigger button, styled like a page-link/nav-item via .search-trigger.
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = navIsItems ? "nav-item search-trigger" : "search-trigger";
  btn.setAttribute("aria-haspopup", "true");
  btn.setAttribute("aria-expanded", "false");
  btn.setAttribute("aria-controls", "search-dropdown");
  btn.setAttribute("aria-label", "Search posts and gists");
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

  const GIST_BADGE_HTML =
    '<span class="result-type" data-type="gist" aria-label="GitHub gist">gist</span>';
  dropdown.innerHTML =
    '<form role="search" autocomplete="off">' +
    SEARCH_FORM_SVG +
    '<input class="search-input" type="search" ' +
    'placeholder="Search posts & gists…" aria-label="Search posts and gists" ' +
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

  let searchToken = 0; // increments per search; discards stale async gist results

  // Interleave the two ranked lists (each already score-descending) so a
  // single relevant gist isn't buried at the bottom, then cap the total.
  function mergeResults(postHits, gistHits) {
    const out = [];
    const maxLen = Math.max(postHits.length, gistHits.length);
    for (let i = 0; i < maxLen; i++) {
      if (postHits[i]) out.push(postHits[i]);
      if (gistHits[i]) out.push(gistHits[i]);
    }
    return out.slice(0, 12);
  }

  function runSearch(query) {
    const q = (query || "").trim();
    if (!q) {
      clearResults();
      emptyMsg.hidden = false;
      emptyMsg.textContent = "Type to search posts & gists…";
      return;
    }
    const token = ++searchToken;
    const postHits = searchPosts(q); // synchronous
    // Post hits show immediately; gist hits merge in once (or after) their
    // lazy index resolves. If the user starts typing again in the meantime,
    // the token guard below drops the stale response.
    results = postHits;
    renderResults(postHits, q);
    searchGists(q)
      .then((gistHits) => {
        if (token !== searchToken) return; // superseded by a newer search
        results = mergeResults(postHits, gistHits);
        renderResults(results, q);
      })
      .catch(() => {
        /* gists unavailable -> posts-only render already stands */
      });
  }

  function openResult(r) {
    if (r.type === "gist") {
      window.open(r.url, "_blank", "noopener"); // external github.com URL
    } else {
      window.location.href = r.url;
    }
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
      if (r.type === "gist") liEl.classList.add("is-gist");

      const titleEl = document.createElement("span");
      titleEl.className = "result-title";
      if (r.type === "gist") {
        const badge = GIST_BADGE_HTML;
        titleEl.insertAdjacentHTML("beforeend", badge);
      }
      titleEl.insertAdjacentText("beforeend", "\u00a0" + r.title);
      liEl.appendChild(titleEl);

      const excerpt = document.createElement("span");
      excerpt.className = "result-excerpt";
      if (r.excerpt) excerpt.textContent = r.excerpt;
      liEl.appendChild(excerpt);

      const meta = document.createElement("span");
      meta.className = "result-meta";
      const parts = [];
      if (r.type === "gist") {
        const files = (r.files || []).join(" · ");
        if (files) parts.push(files);
        parts.push("github.com / gist");
      } else {
        const cats = (r.categories || []).join(" · ");
        const date = r.date
          ? new Date(r.date.replace(" ", "T")).toISOString().slice(0, 10)
          : "";
        parts.push(...[cats, date].filter(Boolean));
      }
      meta.textContent = parts.join("  ·  ");
      liEl.appendChild(meta);

      liEl.addEventListener("click", () => openResult(r));
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
      const target = list[activeIndex] || list[0];
      const r = results[Number(target.dataset.index)];
      if (target && r) openResult(r);
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
