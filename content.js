// Inject custom CSS for bold letters with enhanced visibility
const style = document.createElement('style');
style.innerHTML = `
  b.custom-bold {
    font-weight: 900 !important;
    transform: scale(1.03);
    display: inline-block;
    text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.2);
  }
`;
document.head.appendChild(style);

// Bold first 1/3 of each word clearly
function boldFirstThird(node) {
  if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
    const span = document.createElement('span');
    span.innerHTML = node.textContent.replace(/\b([a-zA-Z]+)\b/g, (match) => {
      const boldLength = Math.ceil(match.length / 3);
      const boldPart = match.slice(0, boldLength);
      const remainingPart = match.slice(boldLength);
      return `<b class="custom-bold">${boldPart}</b>${remainingPart}`;
    });
    node.replaceWith(span);
  } else if (
    node.nodeType === Node.ELEMENT_NODE &&
    !['SCRIPT', 'STYLE', 'TEXTAREA', 'CODE', 'PRE', 'NOSCRIPT'].includes(node.t>
  ) {
    node.childNodes.forEach(child => boldFirstThird(child));
  }
}

boldFirstThird(document.body);
