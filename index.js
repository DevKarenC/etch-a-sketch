// create a XX by XX grid of square divs (default is 16 by 16)
const sketchPad = document.querySelector(".sketch-pad");
console.log(getComputedStyle(sketchPad));
function makeGrid(gridNum) {
  for (let i = 0; i < gridNum; i++) {
    const outerDiv = document.createElement("div");
    for (let j = 0; j < gridNum; j++) {
      const innerDiv = document.createElement("div");
      innerDiv.classList.add("innerDiv");
      const px = `${(529 - gridNum - 1) / gridNum}px`;
      innerDiv.style.width = `${px}`;
      innerDiv.style.height = `${px}`;
      innerDiv.style.borderRight = "1px solid black";
      innerDiv.style.borderBottom = "1px solid black";
      outerDiv.appendChild(innerDiv);
    }
    sketchPad.appendChild(outerDiv);
    outerDiv.classList.add("outerDiv");
    outerDiv.style.borderTop = "1px solid black";
  }
}

makeGrid(16);

// add color effect to divs on hover
function handleHover() {
  const innerDivArray = Array.from(document.querySelectorAll(".innerDiv"));
  innerDivArray.forEach((innerDiv) => {
    innerDiv.addEventListener("mouseover", (event) => {
      event.target.style.backgroundColor = "#000000";
    });
  });
}

handleHover();

// reset the grid color
function resetGridColor() {
  const innerDivArray = Array.from(document.querySelectorAll(".innerDiv"));
  const resetButton = document.querySelector(".reset-button");
  resetButton.addEventListener("click", () => {
    innerDivArray.forEach((innerDiv) => {
      innerDiv.style.backgroundColor = "white";
    });
  });
}

resetGridColor();

// generate random color and assign to each div
function assignRandomColor() {
  function generateRandomColor() {
    const randomBetween = (min, max) =>
      min + Math.floor(Math.random() * (max - min + 1));
    const r = randomBetween(0, 255);
    const g = randomBetween(0, 255);
    const b = randomBetween(0, 255);
    const rgb = `rgb(${r},${g},${b})`;
    return rgb;
  }
  const innerDivArray = Array.from(document.querySelectorAll(".innerDiv"));
  const randomColorButton = document.querySelector(".random-color-button");
  randomColorButton.addEventListener("click", () => {
    innerDivArray.forEach((innerDiv) => {
      innerDiv.addEventListener("mouseover", (event) => {
        event.target.style.backgroundColor = generateRandomColor();
      });
    });
  });
}

assignRandomColor();

// assign user selected color as div color and modify styling of native color picker
function colorPicker() {
  const color_picker = document.getElementById("color-picker");
  const color_picker_wrapper = document.getElementById("color-picker-wrapper");
  const innerDivArray = Array.from(document.querySelectorAll(".innerDiv"));
  color_picker.onchange = function () {
    color_picker_wrapper.style.backgroundColor = color_picker.value;
    innerDivArray.forEach((innerDiv) => {
      innerDiv.addEventListener("mouseover", (event) => {
        event.target.style.backgroundColor = color_picker.value;
      });
    });
  };
  color_picker_wrapper.style.backgroundColor = color_picker.value;
}

colorPicker();

// display updated grid size value every time user drags the slider handle
function displayGridValue() {
  const slider = document.getElementById("grid-slider");
  const gridValue = document.getElementById("grid-value");
  gridValue.textContent = slider.value;
  slider.oninput = function () {
    gridValue.textContent = slider.value;
    resetGridPixels();
    makeGrid(Number(gridValue.textContent));
    handleHover();
    resetGridColor();
    assignRandomColor();
    colorPicker();
  };
}

displayGridValue();

// reset the grid inside the sketch pad
function resetGridPixels() {
  const innerDivArray = Array.from(document.querySelectorAll(".innerDiv"));
  const outerDivArray = Array.from(document.querySelectorAll(".outerDiv"));
  const sketchPad = document.querySelector(".sketch-pad");
  sketchPad.innerHTML = "";
}
