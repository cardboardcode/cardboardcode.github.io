// Gists panel — client-side fetch of cardboardcode's public Gists.
// Runs only on the homepage (.gists-list guard). No-op on all other pages.
// GitHub Pages constraint: owner name is a JS literal (Liquid is NOT processed
// in .assets/ files at build time).

(function () {
  'use strict';

  var GITHUB_OWNER = 'cardboardcode';
  var API_URL = 'https://api.github.com/users/' + GITHUB_OWNER + '/gists';

  document.querySelectorAll('.gists-list').forEach(function (list) {
    fetch(API_URL)
      .then(function (res) {
        if (!res.ok) {
          throw new Error('HTTP ' + res.status);
        }
        return res.json();
      })
      .then(function (gists) {
        if (!Array.isArray(gists) || gists.length === 0) {
          setPlaceholder(list, 'No Gists yet.', false);
          return;
        }
        gists.sort(function (a, b) {
          var titleA = gistTitle(a);
          var titleB = gistTitle(b);
          return titleA.localeCompare(titleB, undefined, { sensitivity: 'base' });
        });
        renderGists(list, gists);
      })
      .catch(function () {
        setPlaceholder(list, 'Gists unavailable.', true);
      });
  });

  // Resolve a human-readable title for a gist. The Gists API does not return a
  // `name` for file-based gists — the human-readable title lives in `description`
  // (set when you save a gist). Fall back to the first filename, then the id.
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
      a.href = gist.html_url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = gistTitle(gist);
      li.appendChild(a);
      list.appendChild(li);
    });
  }
})();
