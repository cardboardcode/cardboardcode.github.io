---
layout: page
title: Résumé
permalink: /resume/
---

<style>
  /* Resume page: embedded PDF viewer with a smooth fade/scale reveal.
     Scoped to .resume-shell so it doesn't affect other site pages. */
  .resume-shell {
    margin: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .resume-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 0 0.25rem;
  }
  .resume-file-label {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 0.9rem;
    opacity: 0.75;
  }
  .resume-download {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 0.85rem;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    color: rgb(255, 255, 255);
    background-color: rgb(180, 0, 0);
    text-decoration: none;
    transition: transform 120ms ease, filter 120ms ease;
  }
  .resume-download:hover { transform: translateY(-1px); filter: brightness(1.1); }
  .resume-frame {
    width: 100%;
    /* Fill the viewport below the site header + toolbar so the document
       renders at a comfortable reading size. */
    height: calc(100vh - 16rem);
    min-height: 480px;
    border: 1px solid rgba(128, 128, 128, 0.25);
    border-radius: 12px;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.18);
    background-color: rgb(244, 244, 244);
    /* Start hidden; revealed by .is-loaded (fade + gentle rise/unscale). */
    opacity: 0;
    transform: translateY(12px) scale(0.985);
    transition: opacity 420ms ease,
                transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
    will-change: opacity, transform;
  }
  .resume-frame.is-loaded { opacity: 1; transform: translateY(0) scale(1); }
  @media (max-width: 768px) {
    .resume-frame { height: calc(100vh - 20rem); min-height: 420px; border-radius: 8px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .resume-frame, .resume-download { transition: none; }
  }
</style>

<div class="resume-shell">
  <div class="resume-toolbar">
    <span class="resume-file-label">files/resume.pdf</span>
    <a class="resume-download"
       href="{{ site.baseurl }}/files/resume.pdf"
       target="_blank"
       rel="noopener"><span>Open / download PDF</span></a>
  </div>

  <iframe class="resume-frame"
          src="{{ site.baseurl }}/files/resume.pdf"
          title="Résumé (PDF)"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
    Your browser does not support inline PDF previews.
    <a href="{{ site.baseurl }}/files/resume.pdf">Download resume.pdf</a> instead.
  </iframe>
</div>

<script>
  // Reveal the PDF frame once it has started loading so the site chrome
  // and the document appear to transition in together.
  (function () {
    var frame = document.querySelector('.resume-frame');
    if (!frame) return;
    var shown = false;
    function reveal() { if (!shown) { shown = true; frame.classList.add('is-loaded'); } }
    frame.addEventListener('load', reveal, { once: true });
    // Safety net: reveal anyway if the 'load' event never fires.
    setTimeout(reveal, 1500);
    // Also reveal on user interaction — some PDF plugins defer 'load'.
    ['click','touchstart','keydown'].forEach(function (evt) {
      window.addEventListener(evt, reveal, { once: true, passive: true });
    });
  })();
</script>
