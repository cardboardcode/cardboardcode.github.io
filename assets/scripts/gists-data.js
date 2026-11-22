/**
 * Gists data — shared fetch + cache for cardboardcode's public Gists.
 *
 * Consumed by:
 *   - gists.js  (homepage right-rail panel rendering)
 *   - search.js (site-search index of gist titles/descriptions)
 *
 * Fetches https://api.github.com/users/cardboardcode/gists at most once per
 * browser session (cached in sessionStorage, with in-memory fallback for
 * private-browsing contexts where storage access throws). No network cost
 * beyond the first call, so combining the panel and search usage stays well
 * inside GitHub's unauthenticated rate limit.
 *
 * Exposes window.__gistsData(): Promise<[{ title, url, description, files[] }]>,
 * rejecting on network/API failure — consumers are expected to degrade
 * gracefully (panel shows its placeholder; search falls back to posts only).
 */
(function () {
  'use strict';

  var GITHUB_OWNER = 'cardboardcode';
  var API_URL = 'https://api.github.com/users/' + GITHUB_OWNER + '/gists';
  var CACHE_KEY = 'cardboardcode.gists.v1';

  var memoryCache = null;

  function store(key, value) {
    try {
      window.sessionStorage.setItem(key, value);
    } catch (e) { /* private browsing / storage full — memory cache still works */ }
  }

  function read(key) {
    try {
      return window.sessionStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  // Resolve a human-readable title for a gist (same logic as the panel:
  // description > first filename > id).
  function gistTitle(gist) {
    if (gist.description && gist.description.trim()) {
      return gist.description.trim();
    }
    if (gist.files) {
      var keys = Object.keys(gist.files);
      if (keys.length > 0) {
        return keys[0];
      }
    }
    return gist.id;
  }

  // Normalize the API payload to the minimal shape consumers need.
  function normalize(gists) {
    if (!Array.isArray(gists)) return [];
    return gists
      .map(function (g) {
        var keys = g.files ? Object.keys(g.files) : [];
        return {
          title: gistTitle(g),
          url: g.html_url,
          description: (g.description || '').trim(),
          files: keys
        };
      })
      .filter(function (g) { return g.title && g.url; });
  }

  window.__gistsData = function __gistsData() {
    // 1) Already resolved this session.
    if (window.__gistsLoaded) return window.__gistsLoaded;

    // 2) Session-cache hit.
    var cached = read(CACHE_KEY);
    if (cached) {
      try {
        var parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) {
          window.__gistsLoaded = Promise.resolve(parsed);
          return window.__gistsLoaded;
        }
      } catch (e) { /* corrupt cache — fall through to refetch */ }
    }

    // 3) Network fetch (single in-flight promise reused by all callers).
    window.__gistsLoaded = fetch(API_URL)
      .then(function (res) {
        if (!res.ok) throw new Error('Gists API HTTP ' + res.status);
        return res.json();
      })
      .then(function (gists) {
        var data = normalize(gists);
        store(CACHE_KEY, JSON.stringify(data));
        memoryCache = data;
        return data;
      });

    // Failure: drop the promise so the next call retries (e.g. transient
    // network blip), and reset the memory cache.
    window.__gistsLoaded.catch(function () {
      window.__gistsLoaded = null;
      memoryCache = null;
    });

    return window.__gistsLoaded;
  };
}());
