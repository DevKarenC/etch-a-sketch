// create a 16 by 16 grid of square divs
const sketchPad = document.querySelector(".sketch-pad");
function makeGrid() {
  for (let i = 0; i < 16; i++) {
    const outerDiv = document.createElement("div");
    for (let j = 0; j < 16; j++) {
      const innerDiv = document.createElement("div");
      innerDiv.classList.add("innerDiv");
      outerDiv.appendChild(innerDiv);
    }
    sketchPad.appendChild(outerDiv);
    outerDiv.classList.add("outerDiv");
  }
}

makeGrid();

// add color effect to divs on hover
function handleHover() {
  const innerDivArray = Array.from(document.querySelectorAll(".innerDiv"));
  innerDivArray.forEach((innerDiv) => {
    innerDiv.addEventListener("mouseover", (event) => {
      event.target.style.backgroundColor = "turquoise";
    });
  });
}

handleHover();

// reset the grid
function resetGrid() {
  const innerDivArray = Array.from(document.querySelectorAll(".innerDiv"));
  const resetButton = document.querySelector(".reset-button");
  resetButton.addEventListener("click", () => {
    innerDivArray.forEach((innerDiv) => {
      innerDiv.style.backgroundColor = "white";
    });
  });
}

resetGrid();

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
