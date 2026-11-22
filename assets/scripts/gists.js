// Gists panel — homepage right-rail panel listing cardboardcode's public Gists.
// Runs only on the homepage (.gists-list guard). No-op on all other pages.
// The fetch + sessionStorage cache live in gists-data.js (shared with search.js);
// this file only owns the panel rendering.

(function () {
  'use strict';

  var lists = document.querySelectorAll('.gists-list');
  if (!lists.length) return;
  if (typeof window.__gistsData !== 'function') {
    // gists-data.js missing — degrade to the placeholder.
    lists.forEach(function (list) { setPlaceholder(list, 'Gists unavailable.', true); });
    return;
  }

  window.__gistsData()
    .then(function (gists) {
      if (!Array.isArray(gists) || gists.length === 0) {
        lists.forEach(function (list) { setPlaceholder(list, 'No Gists yet.', false); });
        return;
      }
      gists.sort(function (a, b) {
        var titleA = a.title;
        var titleB = b.title;
        return titleA.localeCompare(titleB, undefined, { sensitivity: 'base' });
      });
      lists.forEach(function (list) { renderGists(list, gists); });
    })
    .catch(function () {
      lists.forEach(function (list) { setPlaceholder(list, 'Gists unavailable.', true); });
    });

  function setPlaceholder(list, text, isError) {
    list.innerHTML = '';
    var li = document.createElement('li');
    li.className = 'gists-placeholder' + (isError ? ' gists-error' : '');
    li.textContent = text;
    list.appendChild(li);
  }

  function renderGists(list, gists) {
    list.innerHTML = '';
    gists.forEach(function (gist) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = gist.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = gist.title;
      li.appendChild(a);
      list.appendChild(li);
    });
  }
})();
