// Option 1: JS-applied lazy loading + async decoding.
// Keeps the first image in a post eager (it's likely above the fold and
// matters for LCP), defers the rest. Scoped to post content so header
// avatars / social badges are untouched.
document.querySelectorAll('.post-content').forEach((postContent) => {
  const images = postContent.querySelectorAll('img');
  images.forEach((img, index) => {
    if (index === 0) return;
    img.loading = 'lazy';
    img.decoding = 'async';
  });
});
