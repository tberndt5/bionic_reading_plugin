function applyBoldEffect(fraction, fontWeight, scaleTransform) {
  // Remove existing effects if any
  document.querySelectorAll('span.boldfirst-enhanced').forEach(el => el.outerHTML = el.textContent);
  
  // Inject dynamic CSS
  const existingStyle = document.getElementById('boldfirst-style');
  if (existingStyle) existingStyle.remove();

  const style = document.createElement('style');
  style.id = 'boldfirst-style';
  style.innerHTML = `
    b.custom-bold {
      font-weight: ${fontWeight} !important;
      transform: scale(${scaleTransform});
      display: inline-block;
      text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.2);
    }`;
  document.head.appendChild(style);

  // Apply bold effect
  function boldText(node) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      const span = document.createElement('span');
      span.classList.add('boldfirst-enhanced');
      span.innerHTML = node.textContent.replace(/\b([a-zA-Z]+)\b/g, (match) => {
        const boldLength = Math.ceil(match.length / fraction);
        return `<b class="custom-bold">${match.slice(0, boldLength)}</b>${match.slice(boldLength)}`;
      });
      node.replaceWith(span);
    } else if (node.nodeType === Node.ELEMENT_NODE &&
               !['SCRIPT', 'STYLE', 'TEXTAREA', 'CODE', 'PRE', 'NOSCRIPT'].includes(node.tagName)) {
      node.childNodes.forEach(child => boldText(child));
    }
  }

  boldText(document.body);
}

// Retrieve settings dynamically
chrome.storage.sync.get(['boldFraction', 'fontWeight', 'scaleTransform'], (result) => {
  const fraction = result.boldFraction || 3;
  const fontWeight = result.fontWeight || 800;
  const scaleTransform = result.scaleTransform || 1.05;

  applyBoldEffect(fraction, fontWeight, scaleTransform);
});


