const cols = document.querySelectorAll('.col');
const reload = document.getElementById('reload');
const copied = document.querySelector('.copied');

// document.addEventListener('keydown', (event) => {
//   event.preventDefault();
//   if (event.code.toLowerCase() === 'space') {
//     setRandomColors();
//   }
// });

// function generateRandomColor() {
//   const hexCodes = '0123456789ABCDEF';
//   let color = '';
//   for (let i = 0; i < 6; i++) {
//     color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
//   }
//   return '#' + color;
// }
document.addEventListener('click', (event) => {
  const type = event.target.dataset.type;
  if (type === 'lock') {
    const node =
      event.target.tagName.toLowerCase() === 'i' ? event.target : event.target.children[0];
    node.classList.toggle('fa-lock-open');
    node.classList.toggle('fa-lock');
  } else if (type === 'copy') {
    copyToClickBoard(event.target.textContent);
  }
});

reload.addEventListener('click', () => {
  setRandomColors();
});
function copyToClickBoard(text) {
  copied.style.display = 'flex';
  copied.style.color = text;
  setTimeout(() => (copied.style.display = 'none'), 500);
  return navigator.clipboard.writeText(text);
}

function setRandomColors(isInitial) {
  const colors = isInitial ? getColorsFromHash() : [];
  cols.forEach((col, index) => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock');
    const text = col.querySelector('h2');

    if (isLocked) {
      colors.push(text.textContent);
      return;
    }

    const button = col.querySelector('button');
    const color = isInitial ? (colors[index] ? colors[index] : chroma.random()) : chroma.random(); //generateRandomColor();

    if (!isInitial) colors.push(color);

    text.textContent = color;
    col.style.background = color;

    setTextColor(text, color);
    setTextColor(button, color);
  });
  updateClorsHash(colors);
}

function setTextColor(obj, color) {
  const luminance = chroma(color).luminance();
  obj.style.color = luminance > 0.5 ? 'black' : 'white';
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split('-')
      .map((color) => '#' + color);
  }
  return [];
}

function updateClorsHash(colors = []) {
  document.location.hash = colors.map((col) => col.toString().substring(1)).join('-');
}

setRandomColors(true);
