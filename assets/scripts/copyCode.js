const fallbackCopy = (text) => {
  const tempTextArea = document.createElement('textarea');
  tempTextArea.textContent = text;
  tempTextArea.style.position = 'fixed';
  tempTextArea.style.opacity = '0';
  document.body.appendChild(tempTextArea);

  const selection = document.getSelection();
  const previousRange = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
  tempTextArea.select();
  document.execCommand('copy');
  if (previousRange) selection.addRange(previousRange);
  document.body.removeChild(tempTextArea);
};

const copyCode = async (clickEvent) => {
  const copyCodeButton = clickEvent.target;
  const code = copyCodeButton.getAttribute('data-code');

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(code);
    } else {
      fallbackCopy(code);
    }
  } catch (err) {
    fallbackCopy(code);
  }

  copyCodeButton.classList.add('copied');
  setTimeout(() => {
    copyCodeButton.classList.remove('copied');
  }, 2000);
};

document.querySelectorAll('.copy-code-button').forEach((copyCodeButton) => {
  copyCodeButton.addEventListener('click', copyCode);
});
