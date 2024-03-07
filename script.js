// ===== Variables =====
// DOM Elements
// Scale related
const $rangeLabel = document.querySelector('label[for="scale"]');
const $rangeInput = document.querySelector('input[id="scale"]');
const $car = document.querySelector('.car-svg');

// Color related
const $bodyColorInput = document.querySelector('input[id="body-color"]');

// Body
const $bodyFrontColor = document.querySelector('[id="body-front-color"]');
const $bodyBackColor = document.querySelector('[id="body-back-color"]');

// Windows
const $windowColorInput = document.querySelector('input[id="window-color"]');
const $sideWindowColor = document.querySelector('[id="side-window-color"]');
const $frontWindowColor = document.querySelector('[id="front-window-color"]');

const car = {
  bodyColor: {
    front: $bodyFrontColor,
    back: $bodyBackColor
  },
  windowColor: {
    front: $frontWindowColor,
    side: $sideWindowColor
  }
}

// id="paint7_linear_3_405" - side window gradient
// id="paint6_linear_3_405" - front window gradient

// Car scale related values
const minScaleValue = 0.75;
const maxScaleValue = 1.25;
const minInputRange = 1;
const maxInputRange = 100;

// Initial scale of the car (default)
const initialScaleValue = 1;
const initialZoomLevel = '50';

// Initialize car scale with the default value and display the initial zoom level
initialScale();
displayInitialZoomLevel();

// ===== Event Listeners =====
$rangeInput.addEventListener('input', scaleCar);
$bodyColorInput.addEventListener('input', paintCarBody);
$windowColorInput.addEventListener('input', paintCarWindows);

// ===== Functions =====
// Scale related
function initialScale() {
  $car.style.transform = `scale(${initialScaleValue})`;
}

function displayInitialZoomLevel() {
  $rangeLabel.textContent = `Zoom level: ${initialZoomLevel}%`;
}

function scaleCar() {
  const scaleValue = Math.round(Number(this.value));

  $car.style.transform = `scale(${mapValue(scaleValue, minInputRange, maxInputRange, minScaleValue, maxScaleValue)})`;  
  displayZoomLevel(scaleValue);
}

function displayZoomLevel(scaleValue) {
  $rangeLabel.textContent = `Zoom level: ${scaleValue}%`;
}

function mapValue(value, minInput, maxInput, minOutput, maxOutput) {
  return minOutput + ((value - minInput) / (maxInput - minInput)) * (maxOutput - minOutput);
}

// Color related
function paintCarBody() {
  const colorValue = this.value;
  car.bodyColor.front.setAttribute('stop-color', colorValue);
  car.bodyColor.back.setAttribute('stop-color', colorValue);
}

function paintCarWindows() {
  const colorValue = this.value;
  car.windowColor.front.setAttribute('stop-color', colorValue);
  car.windowColor.side.setAttribute('stop-color', colorValue);
}