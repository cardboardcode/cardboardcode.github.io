const svg = document.getElementById('my-graph');
const tooltip = document.querySelector('.tooltip');


// Define dictionary of character classes
// Define your nodes data here (replace with your data)
const nodes = [
  { id: 1, x: 735/2, y: 5, label: 'FIGHTER', info: 'FIGHTER', color: 'red'},
  { id: 2, x: 30, y: 770, label: 'ROGUE', info: 'ROGUE', color: 'green'},
  { id: 3, x: 735, y: 770, label: 'MAGE', info: 'MAGE', color: 'blue'},
];

// Function to draw a circle node
function drawNode(node) {
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', node.x);
  circle.setAttribute('cy', node.y);
  circle.setAttribute('r', 5);
  circle.setAttribute('fill', node.color);
  circle.classList.add('node');
  circle.dataset.nodeId = node.id;

  // Add event listener for hover text
  circle.addEventListener('mouseover', (e) => {
    tooltip.textContent = nodes.find(n => n.id === parseInt(e.target.dataset.nodeId)).info;
    tooltip.style.left = `${e.clientX + 10}px`;
    tooltip.style.top = `${e.clientY + 10}px`;
    tooltip.style.opacity = 1;
  });

  circle.addEventListener('mouseout', () => {
    tooltip.style.opacity = 0;
  });

  // Add text label to node
  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.textContent = node.label;

  // Calculate text positioning based on circle attributes
  const textHeight = parseInt(text.getAttribute('font-size') || 10); // Assuming default font size of 10
  const textY = node.y + circle.getAttribute('r') + textHeight; // Position text below circle with some offset

  text.setAttribute('x', node.x);
  text.setAttribute('y', textY);
  text.setAttribute('fill', 'black'); // White text color
  text.classList.add('node', 'text');

  let innerText = document.createTextNode(
    "This is the text!"
  );

  text.appendChild(innerText);
  circle.appendChild(text);
  svg.appendChild(circle);
}

// Function to animate the graph drawing
function animateGraph() {
  nodes.forEach(drawNode);
}

// Call the animation function
animateGraph();
