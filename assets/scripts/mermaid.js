// Load the Mermaid library as an ECMA module and render every
// ` ```mermaid ` fenced code block in the page into an inline SVG.
//
// Why: jekyll/kramdown on GitHub Pages emits such blocks as plain
// `<pre><code class="language-mermaid">` text — we post-process them
// client-side. The module must be loaded with `<script type="module">`
// so this top-level import is legal; modules are deferred by default,
// so the DOM is fully parsed when they run.
//
// Mermaid v11 is ESM and has no UMD global, so we import `default`
// directly from the published jsDelivr copy rather than relying on
// `window.mermaid`.

import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";

mermaid.initialize({
  startOnLoad: false,
  securityLevel: "loose",
  theme: "dark",
  // Colours tuned to the site's minima dark skin (see _config.yml
  // `minima.skin: dark`).
  themeVariables: {
    primaryColor: "#39adff",
    primaryTextColor: "#000000",
    secondaryColor: "#4f9ed9",
    secondaryTextColor: "#000000",
    tertiaryColor: "#6e7681",
    lineColor: "#c9d1d9",
    primaryBorderColor: "#000000",
    secondaryBorderColor: "#8e44ad",
    tertiaryBorderColor: "#8250df",
    edgeLabelBackground: "#161b22",
    mainBkg: "#1c2128",
    nodeBorder: "#c9d1d9",
    clusterBkg: "#1c2128",
    clusterBorder: "#484f58",
    titleColor: "#e6edf3",
    edgeLabelColor: "#e6edf3",
    fontFamily: "inherit",
  },
});

const blocks = document.querySelectorAll(
  "pre code.language-mermaid, pre code[class*='language-mermaid']"
);

blocks.forEach(function (block, i) {
  const pre = block.parentElement;
  if (!pre || pre.dataset.mermaidRendered) return;
  pre.dataset.mermaidRendered = "true";
  const diagram = block.textContent.trim();
  mermaid
    .render("mermaid-svg-" + i + "-" + Date.now(), diagram)
    .then(function (result) {
      // mermaid.render() resolves to { diagramType, svg, bindFunctions };
      // we only need the serialized SVG string.
      const wrapper = document.createElement("div");
      wrapper.className = "mermaid";
      wrapper.innerHTML = result.svg;
      pre.replaceWith(wrapper);
    })
    .catch(function (err) {
      // Render failed: leave the source so the reader still has
      // *something* to read instead of a blank diagram area.
      console.error("Mermaid render failed:", err);
      pre.removeAttribute("data-mermaid-rendered");
    });
});
