// Minimal lightbox for .post-content images. Vanilla JS, no deps.
// - Delegated click handler on post images
// - Esc / backdrop / close button all dismiss
// - Arrow keys cycle within the current post's images
// - Focus is returned to the trigger on close
(() => {
  const root = document.querySelector('.post-content');
  if (!root) return;

  const images = Array.from(root.querySelectorAll('img'));
  if (images.length === 0) return;

  // DOM
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.hidden = true;
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');

  const figure = document.createElement('figure');
  const img = document.createElement('img');
  const caption = document.createElement('figcaption');
  figure.append(img, caption);

  const closeBtn = document.createElement('button');
  closeBtn.className = 'lightbox-close';
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', 'Close image');
  closeBtn.innerHTML = '&times;';

  overlay.append(closeBtn, figure);
  document.body.appendChild(overlay);

  let current = 0;
  let lastFocus = null;
  let isOpen = false;

  function show(index) {
    current = ((index % images.length) + images.length) % images.length;
    const target = images[current];
    img.src = target.currentSrc || target.src;
    img.alt = target.alt || '';
    caption.textContent = target.alt || '';
    overlay.hidden = false;
    isOpen = true;
    document.body.classList.add('lightbox-open');
  }

  function dismiss() {
    overlay.hidden = true;
    isOpen = false;
    document.body.classList.remove('lightbox-open');
    if (lastFocus) lastFocus.focus();
  }

  root.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLImageElement)) return;
    const index = images.indexOf(target);
    if (index === -1) return;
    lastFocus = target;
    show(index);
  });

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) dismiss();
  });

  closeBtn.addEventListener('click', dismiss);

  document.addEventListener('keydown', (event) => {
    if (!isOpen) return;
    if (event.key === 'Escape') {
      dismiss();
    } else if (event.key === 'ArrowRight') {
      show(current + 1);
    } else if (event.key === 'ArrowLeft') {
      show(current - 1);
    } else if (event.key === 'Tab') {
      // Keep focus inside the overlay: only the close button is tabbable.
      event.preventDefault();
      closeBtn.focus();
    }
  });
})();
