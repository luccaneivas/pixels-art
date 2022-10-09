const newColorBtn = document.getElementById('new-color');
const resizeBoardBtns = document.querySelectorAll('.change-size');
const clearBtn = document.querySelector('.clear-container');

let BOARD_SIZE = 6;

const randomColor = (quantity) => {
  const arrayColors = [];

  for (let i = 0; i < quantity; i += 1) {
    const randomNo = Math.floor(Math.random() * 16777215).toString(16);
    arrayColors.push(randomNo);
  }

  return arrayColors;
}

const generatePalette = (colors) => {
  for (let color of colors) {
    addPaletteColor(color);
  }
}

const addPaletteColor = () => {
  const palette = document.getElementById('color-palette');

  const newColor = document.createElement('div');
  newColor.className = 'color';
  newColor.style.backgroundColor = `#${randomColor(1)}`;
  newColor.addEventListener('click', changeSelectedColor);
  palette.insertBefore(newColor, palette.childNodes[palette.childNodes.length - 2]);
}

const addPixelBoard = (size) => {
  const pixels = document.getElementById('pixel-board');

  if (pixels.children.length > 0) {
    pixels.innerHTML = '';
  }

  for (let i = 0; i < size; i += 1) {
    const newLine = document.createElement('div');

    for (let j = 0; j < size; j += 1) {
      const newPixel = document.createElement('div');
      newPixel.className = 'pixel';
      newPixel.id = `${i}${j}`;
      newPixel.style.backgroundColor = 'white';
      newPixel.addEventListener('click', paintPixel);
      newLine.appendChild(newPixel);
    }

    pixels.appendChild(newLine);
  }
}

const selectedColor = (selected) => {
  const palette = document.getElementById('color-palette');
  const colorList = palette.children;

  for (let color of colorList) {
    if (color.style.backgroundColor === selected) {
      color.classList.add('selected');
    } else {
      color.classList.remove('selected');
    }
  }
}

const changeSelectedColor = (event) => {
  selectedColor(event.target.style.backgroundColor);
}

const paintPixel = (event) => {
  const selected = document.querySelector('.selected');
  const clicked = document.getElementById(event.target.id);
  clicked.style.backgroundColor = selected.style.backgroundColor;
}

const changeBoardSize = ({ target }) => {
  if (target.id === 'increment-size' && BOARD_SIZE < 10) {
    BOARD_SIZE += 1;
  } else {
    BOARD_SIZE -= 1;
  }

  addPixelBoard(BOARD_SIZE);
}

function clearPixels() {
  const allPixels = document.getElementsByClassName('pixel');
  for (let i = 0; i < allPixels.length; i += 1) {
    allPixels[i].style.backgroundColor = 'white';
  }
}

clearBtn.addEventListener('click', clearPixels);

newColorBtn.addEventListener('click', addPaletteColor);

resizeBoardBtns.forEach(btn => {
  btn.addEventListener('click', changeBoardSize);
});

generatePalette(randomColor(4));
addPixelBoard(BOARD_SIZE);
