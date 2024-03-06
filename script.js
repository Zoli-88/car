// ===== Variables =====
// DOM Elements
const $rangeLabel = document.querySelector('label[for="scale"]');
const $rangeInput = document.querySelector('input[id="scale"]');
const $car = document.querySelector('.car-svg');

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

// ===== Functions =====
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